"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, X } from "lucide-react";

const INSTALL_PROMPT_DISMISS_KEY = "removebanana-install-dismissed-until";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallAppPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === "undefined") return false;

    const standaloneMatch = window.matchMedia("(display-mode: standalone)").matches;
    const iosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    return standaloneMatch || iosStandalone;
  });
  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window === "undefined") return false;

    const dismissedUntilRaw = window.localStorage.getItem(INSTALL_PROMPT_DISMISS_KEY);
    const dismissedUntil = dismissedUntilRaw ? Number(dismissedUntilRaw) : 0;

    return Number.isFinite(dismissedUntil) && dismissedUntil > Date.now();
  });

  const canShow = useMemo(() => !isInstalled && !isDismissed && deferredPrompt !== null, [isInstalled, isDismissed, deferredPrompt]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Silent fail: install prompt can still work in some browsers.
      });
    }

    if (isInstalled) return;

    const onBeforeInstallPrompt = (event: Event) => {
      const installEvent = event as BeforeInstallPromptEvent;
      installEvent.preventDefault();
      setDeferredPrompt(installEvent);
    };

    const onInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsDismissed(false);
      window.localStorage.removeItem(INSTALL_PROMPT_DISMISS_KEY);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [isInstalled]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    const until = Date.now() + DISMISS_DURATION_MS;
    window.localStorage.setItem(INSTALL_PROMPT_DISMISS_KEY, String(until));
    setIsDismissed(true);
  };

  if (!canShow) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[80]">
      <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-black/70 backdrop-blur-xl px-2 py-2 shadow-xl shadow-black/40">
        <button
          type="button"
          onClick={handleInstall}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-2 text-xs sm:text-sm font-medium text-white hover:from-blue-500 hover:to-blue-400 transition-colors"
          aria-label="Install app"
        >
          <Download className="h-4 w-4" />
          Install App
        </button>

        <button
          type="button"
          onClick={handleDismiss}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close install prompt"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
