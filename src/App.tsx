import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import CollectionPage from "./pages/CollectionPage";
import SupportPage from "./pages/SupportPage";
import BrandsPage from "./pages/BrandsPage";
import BlogPage from "./pages/BlogPage";
import ShopifyPolicyPage from "./pages/ShopifyPolicyPage";
import LegalNoticePage from "./pages/LegalNoticePage";
import ContactInformationPolicyPage from "./pages/ContactInformationPolicyPage";
import ServicesPage from "./pages/ServicesPage";
import CustomDevelopmentPage from "./pages/CustomDevelopmentPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import RequestQuotePage from "./pages/RequestQuotePage";
import ProcurementPage from "./pages/ProcurementPage";
import NotFound from "./pages/NotFound";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
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
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
