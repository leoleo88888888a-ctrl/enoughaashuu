"use client";

import { useState, useRef, useCallback } from "react";
import { UploadCloud, Image as ImageIcon, CheckCircle, RefreshCcw, Download, X } from "lucide-react";
import { processGeminiImage } from "@/lib/watermark";

export default function GeminiRemover() {
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            startAutoRemove(e.target.files[0]);
        }
    };

    const startAutoRemove = async (selectedFile: File) => {
        if (!selectedFile.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }

        setResultUrl(null);
        setError(null);
        setIsProcessing(true);

        try {
            const resultDataUrl = await processGeminiImage(selectedFile);
            setResultUrl(resultDataUrl);
        } catch (err: unknown) {
            console.error("Enough Aashuu image processing error:", err);
            const message = err instanceof Error ? err.message : "An unexpected error occurred while processing the image.";
            setError(message);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            startAutoRemove(e.dataTransfer.files[0]);
        }
    }, []);

    const resetState = () => {
        setResultUrl(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
            <div className="w-full glass rounded-3xl p-6 md:p-8 relative overflow-hidden">
                {/* Glow effect behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {!isProcessing && !resultUrl ? (
                    <div
                        className={`relative flex flex-col items-center justify-center w-full rounded-2xl border border-white/10 transition-all duration-300 ease-in-out cursor-pointer px-4 py-10 md:py-12 ${isDragging
                            ? "bg-blue-500/10 scale-[1.01] ring-2 ring-blue-500/40"
                            : "bg-black/40 hover:bg-white/5"
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                            }}
                            className="inline-flex items-center justify-center gap-3 px-8 py-6 rounded-3xl text-xl md:text-2xl font-semibold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 hover:from-blue-600 hover:to-blue-400 transition-all min-w-[260px] w-full max-w-[780px]"
                        >
                            <UploadCloud className="w-9 h-9" />
                            Upload Your Image
                        </button>

                        <p className="mt-10 text-2xl text-gray-400 text-center leading-relaxed">
                            or drag and drop your Gemini-generated image anywhere here
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm md:text-base">
                            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                                <ImageIcon className="w-5 h-5" /> PNG, JPG, WebP
                            </span>
                            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                                <CheckCircle className="w-5 h-5 text-green-400" /> 100% Private
                            </span>
                            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                                <RefreshCcw className="w-5 h-5 text-amber-400" /> Instant Results
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in zoom-in-95 duration-500 w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-white flex items-center">
                                {isProcessing ? (
                                    <>
                                        <RefreshCcw className="w-5 h-5 text-blue-400 mr-2 animate-spin" />
                                        Removing Watermark...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                                        Cleaned Successfully
                                    </>
                                )}
                            </h3>
                            <button
                                onClick={resetState}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white"
                                title="Clear image"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-8">
                            <h4 className="flex items-center justify-center text-sm font-medium text-blue-400 uppercase tracking-widest bg-blue-900/20 py-2 rounded-xl border border-blue-500/20">
                                Clean Result
                            </h4>
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-800 bg-black shadow-2xl flex flex-col justify-center items-center">
                                {resultUrl ? (
                                    <div className="relative w-full h-full group">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={resultUrl}
                                            alt="Enough Aashuu cleaned image"
                                            className="object-contain w-full h-full group-hover:scale-[1.02] transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 ring-4 ring-inset ring-green-500/20 pointer-events-none rounded-2xl" />
                                        <div className="absolute top-4 right-4 bg-green-500/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-green-500/30 text-xs text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                            Cleaned Successfully
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-blue-400 space-y-4">
                                        <div className="relative">
                                            <RefreshCcw className="w-12 h-12 animate-spin opacity-80" />
                                            <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 rounded-full" />
                                        </div>
                                        <p className="animate-pulse font-medium tracking-widest text-sm uppercase">Auto-removing watermark...</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center flex-wrap gap-4 border-t border-gray-800 pt-8 mt-4">
                            {resultUrl && (
                                <a
                                    href={resultUrl}
                                    download="enough-aashuu.png"
                                    className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-2xl text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] min-w-[200px] gap-2"
                                >
                                    <Download className="w-5 h-5" /> Download Clean Image
                                </a>
                            )}

                            <button
                                onClick={resetState}
                                className="flex items-center justify-center px-8 py-4 border border-white/15 text-base font-semibold rounded-2xl text-white bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-black transition-all min-w-[200px] gap-2"
                            >
                                <UploadCloud className="w-5 h-5" /> Upload Another Image
                            </button>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start text-red-400 relative z-10 w-full">
                        <X className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="font-medium">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
