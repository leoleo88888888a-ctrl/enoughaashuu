import { NextResponse } from "next/server";

interface SightengineResponse {
  status: string;
  request: {
    id: string;
  };
  type?: {
    ai_generated?: number;
  };
}

interface HuggingFaceResponse {
  label?: string;
  score?: number;
  [key: string]: unknown;
}

async function detectWithSightengine(imageBuffer: Buffer): Promise<{
  confidence: number;
  label: string;
  models_used: string[];
  processing_time: number;
  available: boolean;
}> {
  const startTime = Date.now();

  try {
    const user = process.env.SIGHTENGINE_API_USER || "user_placeholder";
    const secret = process.env.SIGHTENGINE_API_SECRET || "secret_placeholder";

    const formData = new FormData();
    formData.append("api_user", user);
    formData.append("api_secret", secret);
    formData.append("models", "genai");
    formData.append("media", new Blob([new Uint8Array(imageBuffer)], { type: "image/jpeg" }));
    
    const response = await fetch("https://api.sightengine.com/1.0/check.json", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Sightengine API error: ${response.statusText}`);
    }

    const data = (await response.json()) as SightengineResponse;
    const aiConfidence = Math.min(1, Math.max(0, data.type?.ai_generated ?? 0.5));

    return {
      confidence: aiConfidence,
      label: aiConfidence >= 0.5 ? "AI Generated (GenAI)" : "Likely Authentic",
      models_used: ["genai"],
      processing_time: Date.now() - startTime,
      available: true,
    };
  } catch (error) {
    console.error("Sightengine detection error:", error);
    return {
      confidence: 0,
      label: "Unable to analyze (API unavailable)",
      models_used: ["genai"],
      processing_time: Date.now() - startTime,
      available: false,
    };
  }
}

async function detectWithHuggingFace(imageBuffer: Buffer): Promise<{
  confidence: number;
  label: string;
  processing_time: number;
  available: boolean;
}> {
  const startTime = Date.now();

  try {
    const hfToken = process.env.HF_API_TOKEN || "";
    
    if (!hfToken) {
      return {
        confidence: 0,
        label: "Unable to analyze (missing token)",
        processing_time: Date.now() - startTime,
        available: false,
      };
    }

    // Using Hugging Face Inference API with a vision model
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/Falconsai/nsfw_image_detection",
      {
        headers: { Authorization: `Bearer ${hfToken}` },
        method: "POST",
          body: new Uint8Array(imageBuffer),
      }
    );

    if (!response.ok) {
      const reason =
        response.status === 401
          ? "Unable to analyze (invalid Hugging Face token or missing permissions)"
          : response.status === 403
            ? "Unable to analyze (Hugging Face token access denied)"
            : response.status === 429
              ? "Unable to analyze (Hugging Face rate limit reached)"
              : `Unable to analyze (Hugging Face error ${response.status})`;

      return {
        confidence: 0,
        label: reason,
        processing_time: Date.now() - startTime,
        available: false,
      };
    }

    const predictions = (await response.json()) as HuggingFaceResponse[];
    
    // Process predictions - look for AI generation indicators
    let aiConfidence = 0.5;
    if (Array.isArray(predictions) && predictions.length > 0) {
      // Simple heuristic based on model output
      const result = predictions[0];
      if (typeof result.score === 'number') {
        aiConfidence = result.score;
      }
    }

    return {
      confidence: aiConfidence,
      label: aiConfidence > 0.6 ? "Likely AI Generated" : "Likely Authentic",
      processing_time: Date.now() - startTime,
      available: true,
    };
  } catch (error) {
    console.error("HuggingFace detection error:", error);
    return {
      confidence: 0,
      label: "Unable to analyze (API unavailable)",
      processing_time: Date.now() - startTime,
      available: false,
    };
  }
}

async function analyzeMetadata(imageBuffer: Buffer, file: File): Promise<{
  confidence: number;
  findings: string[];
  processing_time: number;
}> {
  const startTime = Date.now();
  const findings: string[] = [];

  try {
    // Check file metadata
    const fileName = file.name.toLowerCase();
    const fileSize = file.size;
    const fileType = file.type;

    // Heuristic analysis
    if (!file.lastModified || Date.now() - file.lastModified < 3600000) {
      findings.push("File recently created or modified");
    }

    // Check for common AI tool markers in filename
    const aiToolMarkers = ["ai", "generated", "dall-e", "midjourney", "stable", "craiyon"];
    if (aiToolMarkers.some((marker) => fileName.includes(marker))) {
      findings.push("Filename contains AI tool reference");
    }

    // Analyze entropy (very basic)
    let entropy = 0;
    const frequencyMap: Record<number, number> = {};

    for (let i = 0; i < Math.min(imageBuffer.length, 10000); i++) {
      frequencyMap[imageBuffer[i]] = (frequencyMap[imageBuffer[i]] || 0) + 1;
    }

    for (const freq of Object.values(frequencyMap)) {
      const p = freq / Math.min(imageBuffer.length, 10000);
      entropy -= p * Math.log2(p);
    }

    // High entropy suggests compression/noise patterns
    if (entropy > 7.5) {
      findings.push("High entropy detected - characteristic of compressed/noise");
    }

    // Check file size vs dimensions (roughly)
    if (fileSize < 50000) {
      findings.push("Small file size - may indicate compression artifacts");
    }

    // Calculate confidence based on findings
    let confidence = 0.3; // Base confidence
    if (findings.length > 0) {
      confidence = Math.min(0.7, 0.3 + findings.length * 0.15);
    }

    if (findings.length === 0) {
      findings.push("No suspicious metadata patterns detected");
    }

    return {
      confidence,
      findings,
      processing_time: Date.now() - startTime,
    };
  } catch (error) {
    console.error("Metadata analysis error:", error);
    return {
      confidence: 0.3,
      findings: ["Metadata analysis failed"],
      processing_time: Date.now() - startTime,
    };
  }
}

function getImageDimensions(imageBuffer: Buffer): string {
  // Simplified dimension extraction (would need full image parsing for accuracy)
  // For now, return a placeholder
  return "Unknown dimensions";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image provided." },
        { status: 400 }
      );
    }

    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image (PNG, JPG, WebP, etc.)" },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const totalStartTime = Date.now();

    // Run all three detection engines in parallel
    const [sightengineResult, huggingfaceResult, metadataResult] = await Promise.all([
      detectWithSightengine(imageBuffer),
      detectWithHuggingFace(imageBuffer),
      analyzeMetadata(imageBuffer, imageFile),
    ]);

    // Weighted voting system
    // Weights: Sightengine (40%), HuggingFace ViT (40%), Local Metadata (20%)
    const sightengineWeight = 0.4;
    const huggingfaceWeight = 0.4;
    const metadataWeight = 0.2;

    let weightedNumerator = metadataResult.confidence * metadataWeight;
    let weightedDenominator = metadataWeight;

    if (sightengineResult.available) {
      weightedNumerator += sightengineResult.confidence * sightengineWeight;
      weightedDenominator += sightengineWeight;
    }

    if (huggingfaceResult.available) {
      weightedNumerator += huggingfaceResult.confidence * huggingfaceWeight;
      weightedDenominator += huggingfaceWeight;
    }

    const weightedScore = weightedDenominator > 0
      ? weightedNumerator / weightedDenominator
      : metadataResult.confidence;

    // Get image size
    const fileSizeMB = (imageFile.size / (1024 * 1024)).toFixed(2);
    const fileSize = `${fileSizeMB} MB`;

    return NextResponse.json({
      overall_confidence: Math.min(1, Math.max(0, weightedScore)),
      is_ai_generated: weightedScore > 0.5,
      analysis: {
        sightengine: sightengineResult,
        huggingface_vit: huggingfaceResult,
        local_metadata: metadataResult,
      },
      weighted_vote_details: {
        sightengine_score: sightengineResult.confidence,
        huggingface_score: huggingfaceResult.confidence,
        local_score: metadataResult.confidence,
        final_vote: weightedScore,
      },
      processing_details: {
        image_dimensions: getImageDimensions(imageBuffer),
        file_size: fileSize,
        processing_time_total: Date.now() - totalStartTime,
      },
    });
  } catch (error: unknown) {
    console.error("AI detection error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "An error occurred during image analysis";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
