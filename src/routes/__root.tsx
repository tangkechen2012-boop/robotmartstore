import type { ReactNode } from "react";
import { useEffect, Suspense } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  type ErrorComponentProps,
  useRouter,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { useCartSync } from "@/hooks/useCartSync";
import NotFound from "@/pages/NotFound";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { COMPANY } from "@/lib/company";
import appCss from "../styles.css?url";

const SITE_URL = "https://www.robotmart.store/";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.brand,
  url: SITE_URL,
  legalName: COMPANY.legalName,
  logo: "https://www.robotmart.store/brand/robotmart-social.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.city,
    addressRegion: COMPANY.address.region,
    postalCode: COMPANY.address.postalCode,
    addressCountry: "US",
  },
  telephone: "+1-318-608-2420",
  email: COMPANY.email,
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RobotMart",
  url: SITE_URL,
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Site-wide head only. Each page renders its own title/description/canonical/OG via <Seo>.
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "author", content: "RobotMart" },
      { name: "google-site-verification", content: "sfLy8jrEKzZyO20rBCR_3L8C00Ge0WMHhGaZTO9jZ2w" },
    ],
    links: [
      { rel: "preconnect", href: "https://cdn.shopify.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://cdn.shopify.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationLd) },
      { type: "application/ld+json", children: JSON.stringify(websiteLd) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundInLayout,
  errorComponent: RootError,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" aria-label="Loading" />
  </div>
);

function AppLayout({ children }: { children: ReactNode }) {
  useCartSync();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnalyticsTracker />
        <AppLayout>
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </AppLayout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function NotFoundInLayout() {
  return <NotFound />;
}

function RootError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-3">This page didn't load</h1>
        <p className="text-muted-foreground mb-6">
          Something went wrong on our side. Please try again, or contact {COMPANY.email}.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            className="rounded-pill bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold"
            onClick={() => {
              void router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <Link to="/" className="rounded-pill border border-border px-5 py-2 text-sm font-semibold">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
