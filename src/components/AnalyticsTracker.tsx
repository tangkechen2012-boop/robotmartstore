import { useEffect, useState } from "react";
import { useLocation } from "@/lib/router-compat";
import { Button } from "@/components/ui/button";
import { getStoredConsent, hasAnyTracking, initAnalytics, isConsentRegion, setConsent, trackPageView } from "@/lib/analytics";

/** Fires a page_view on every route change and shows the EU/EEA/UK consent banner. Inert when no IDs are set. */
export const AnalyticsTracker = () => {
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!hasAnyTracking()) return;
    initAnalytics();
    if (isConsentRegion() && !getStoredConsent()) setShowBanner(true);
  }, []);

  useEffect(() => {
    if (!hasAnyTracking()) return;
    // Wait a tick so the page title from Helmet is applied
    const t = window.setTimeout(() => trackPageView(location.pathname + location.search), 0);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.search]);

  if (!showBanner) return null;

  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    setShowBanner(false);
  };

  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-[60] p-4">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-4 shadow-lg flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-sm text-muted-foreground flex-1">
          We use cookies for analytics and advertising measurement. You can accept or reject non-essential cookies.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => choose("denied")}>Reject</Button>
          <Button size="sm" onClick={() => choose("granted")}>Accept</Button>
        </div>
      </div>
    </div>
  );
};
