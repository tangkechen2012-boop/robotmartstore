import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";

// Code-split secondary routes so the homepage ships a smaller initial bundle.
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const BrandsPage = lazy(() => import("./pages/BrandsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ShopifyPolicyPage = lazy(() => import("./pages/ShopifyPolicyPage"));
const LegalNoticePage = lazy(() => import("./pages/LegalNoticePage"));
const ContactInformationPolicyPage = lazy(() => import("./pages/ContactInformationPolicyPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const CustomDevelopmentPage = lazy(() => import("./pages/CustomDevelopmentPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ApplicationsPage = lazy(() => import("./pages/ApplicationsPage"));
const RequestQuotePage = lazy(() => import("./pages/RequestQuotePage"));
const ProcurementPage = lazy(() => import("./pages/ProcurementPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  useCartSync();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" aria-label="Loading" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:handle" element={<ProductDetail />} />
              <Route path="/products" element={<CollectionPage />} />
              <Route path="/products/:slug" element={<CollectionPage />} />
              <Route path="/collections/:slug" element={<CollectionPage />} />
              <Route path="/services-technology" element={<ServicesPage />} />
              <Route path="/custom-development" element={<CustomDevelopmentPage />} />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/procurement" element={<ProcurementPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/request-quote" element={<RequestQuotePage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/privacy" element={<ShopifyPolicyPage policyKey="privacyPolicy" path="/privacy" />} />
              <Route path="/terms" element={<ShopifyPolicyPage policyKey="termsOfService" path="/terms" />} />
              <Route path="/policies/privacy-policy" element={<ShopifyPolicyPage policyKey="privacyPolicy" path="/policies/privacy-policy" />} />
              <Route path="/policies/terms-of-service" element={<ShopifyPolicyPage policyKey="termsOfService" path="/policies/terms-of-service" />} />
              <Route path="/policies/refund-policy" element={<ShopifyPolicyPage policyKey="refundPolicy" path="/policies/refund-policy" />} />
              <Route path="/policies/shipping-policy" element={<ShopifyPolicyPage policyKey="shippingPolicy" path="/policies/shipping-policy" />} />
              <Route path="/policies/contact-information" element={<ContactInformationPolicyPage />} />
              <Route path="/policies/legal-notice" element={<LegalNoticePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
