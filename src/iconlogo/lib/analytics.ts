export interface ExportPayload {
  format: string;
  icon: string;
  color: string;
  border: number;
  background: string;
}

type UmamiClient = {
  track: (eventName: string, eventData?: Record<string, unknown>) => void;
};

export function trackEvent(eventName: string, eventData?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const analytics = (window as Window & { umami?: UmamiClient }).umami;
  if (!analytics || typeof analytics.track !== "function") return;

  if (eventData) {
    analytics.track(eventName, eventData);
  } else {
    analytics.track(eventName);
  }
}

export function trackDownload(payload: ExportPayload) {
  trackEvent("download logo", {
    format: payload.format,
    icon: payload.icon,
    color: payload.color,
    border: payload.border,
    background: payload.background,
  });
}
