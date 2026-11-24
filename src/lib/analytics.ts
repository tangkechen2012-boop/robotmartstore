/**
 * Analytics config. IDs stay EMPTY until the store owner supplies them.
 * Placeholders: {{GTM_ID}}, {{GA4_MEASUREMENT_ID}} (G-XXXXXXXXXX, not the GA4 property number), {{META_PIXEL_ID}}.
 * Set via env (VITE_GTM_ID, VITE_GA4_MEASUREMENT_ID, VITE_META_PIXEL_ID) or edit here.
 * With an empty ID, no script for that tool is loaded.
 */
export const GTM_ID: string = import.meta.env.VITE_GTM_ID || "";
export const GA4_MEASUREMENT_ID: string = import.meta.env.VITE_GA4_MEASUREMENT_ID || "";
export const META_PIXEL_ID: string = import.meta.env.VITE_META_PIXEL_ID || "";

export const CROSS_DOMAINS = ["robotmart.store", "www.robotmart.store", "hello-world-8lwxi.myshopify.com", "checkout.shopify.com"];

const CONSENT_KEY = "rm_cookie_consent"; // "granted" | "denied"

type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; fbq?: ((...a: unknown[]) => void) & Record<string, unknown>; _fbq?: unknown };
const w = () => window as W;

export const hasAnyTracking = () => !!(GTM_ID || GA4_MEASUREMENT_ID || META_PIXEL_ID);

/** EU/EEA/UK visitor heuristic based on browser timezone. */
export function isConsentRegion(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    return tz.startsWith("Europe/") || tz === "Atlantic/Reykjavik" || tz === "Atlantic/Canary" || tz === "Atlantic/Madeira" || tz === "Atlantic/Azores";
  } catch { return false; }
}

export function getStoredConsent(): "granted" | "denied" | null {
  try { const v = localStorage.getItem(CONSENT_KEY); return v === "granted" || v === "denied" ? v : null; } catch { return null; }
}

function consentGranted(): boolean {
  if (!isConsentRegion()) return true;
  return getStoredConsent() === "granted";
}

// gtag.js requires the Arguments object, not an array.
function gtag(..._args: unknown[]) {
  const win = w();
  win.dataLayer = win.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  win.dataLayer.push(arguments);
}

function loadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

let initialized = false;
let pixelLoaded = false;

function loadMetaPixel() {
  if (!META_PIXEL_ID || pixelLoaded) return;
  pixelLoaded = true;
  const win = w();
  const fbq = function (...args: unknown[]) {
    (fbq as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] }).callMethod
      ? (fbq as unknown as { callMethod: (...a: unknown[]) => void }).callMethod(...args)
      : (fbq as unknown as { queue: unknown[] }).queue.push(args);
  } as unknown as W["fbq"] & { queue: unknown[]; loaded: boolean; version: string; push: unknown };
  fbq!.queue = [];
  fbq!.loaded = true;
  fbq!.version = "2.0";
  fbq!.push = fbq;
  win.fbq = fbq;
  if (!win._fbq) win._fbq = fbq;
  loadScript("https://connect.facebook.net/en_US/fbevents.js");
  win.fbq!("init", META_PIXEL_ID);
}

/** Call once at startup. Does nothing when every ID is empty. */
export function initAnalytics() {
  if (initialized || !hasAnyTracking()) return;
  initialized = true;
  const win = w();
  win.dataLayer = win.dataLayer || [];
  win.gtag = gtag;

  const granted = consentGranted();
  const state = granted ? "granted" : "denied";
  // Google Consent Mode v2 defaults (denied for EU/EEA/UK until accepted)
  gtag("consent", "default", {
    ad_storage: state, ad_user_data: state, ad_personalization: state, analytics_storage: state,
  });

  if (GTM_ID) {
    win.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`);
  } else if (GA4_MEASUREMENT_ID) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`);
    gtag("js", new Date());
    gtag("config", GA4_MEASUREMENT_ID, { send_page_view: false, linker: { domains: CROSS_DOMAINS } });
  }

  if (granted) loadMetaPixel();
}

export function setConsent(value: "granted" | "denied") {
  try { localStorage.setItem(CONSENT_KEY, value); } catch { /* ignore */ }
  if (!hasAnyTracking()) return;
  gtag("consent", "update", {
    ad_storage: value, ad_user_data: value, ad_personalization: value, analytics_storage: value,
  });
  if (value === "granted") {
    loadMetaPixel();
    fbq("track", "PageView");
  }
}

function push(obj: Record<string, unknown>) {
  if (!hasAnyTracking()) return;
  const win = w();
  win.dataLayer = win.dataLayer || [];
  if (obj.ecommerce) win.dataLayer.push({ ecommerce: null });
  win.dataLayer.push(obj);
}

function fbq(...args: unknown[]) {
  if (pixelLoaded && w().fbq) w().fbq!(...args);
}

export type AnalyticsItem = {
  item_id: string; // Shopify variant ID
  item_name: string;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
  price: number;
  quantity: number;
};

const value = (items: AnalyticsItem[]) => items.reduce((s, i) => s + i.price * i.quantity, 0);

export function trackPageView(path: string) {
  push({ event: "page_view", page_path: path, page_location: window.location.href, page_title: document.title });
  if (!GTM_ID && GA4_MEASUREMENT_ID) {
    gtag("event", "page_view", { page_path: path, page_location: window.location.href, page_title: document.title });
  }
  fbq("track", "PageView");
}

function ecommerce(event: string, metaEvent: string, items: AnalyticsItem[]) {
  const v = value(items);
  push({ event, ecommerce: { currency: "USD", value: v, items } });
  if (!GTM_ID && GA4_MEASUREMENT_ID) gtag("event", event, { currency: "USD", value: v, items });
  fbq("track", metaEvent, {
    currency: "USD", value: v, content_type: "product",
    content_ids: items.map((i) => i.item_id), contents: items.map((i) => ({ id: i.item_id, quantity: i.quantity })),
  });
}

export const trackViewItem = (item: AnalyticsItem) => ecommerce("view_item", "ViewContent", [item]);
export const trackAddToCart = (item: AnalyticsItem) => ecommerce("add_to_cart", "AddToCart", [item]);
export const trackBeginCheckout = (items: AnalyticsItem[]) => ecommerce("begin_checkout", "InitiateCheckout", items);

export function trackLead(formType: "quote" | "bulk_quote" | "contact" | "newsletter", extra: Record<string, unknown> = {}) {
  push({ event: "generate_lead", form_type: formType, ...extra });
  if (!GTM_ID && GA4_MEASUREMENT_ID) gtag("event", "generate_lead", { form_type: formType, ...extra });
  fbq("track", "Lead", { content_category: formType });
}
