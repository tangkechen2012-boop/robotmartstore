import { useEffect } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { ProductEcosystem } from "@/components/home/ProductEcosystem";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CoreCapabilities } from "@/components/home/CoreCapabilities";
import { SolutionsByIndustry } from "@/components/home/SolutionsByIndustry";
import { DeploymentHighlights } from "@/components/home/DeploymentHighlights";
import { WhyRobotmart } from "@/components/home/WhyRobotmart";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FAQSection } from "@/components/home/FAQSection";

const Index = () => {
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What types of robotics systems does Robotmart provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Robotmart offers humanoid robots, quadruped robots, industrial robotic arms, mobile robotics platforms (AMR/AGV), and AI-powered vision systems.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide system integration services?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We provide engineering consultation, system integration, AI deployment, and on-site commissioning support.",
          },
        },
        {
          "@type": "Question",
          name: "Does Robotmart ship internationally?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Robotmart ships globally from US-based warehouses with fast domestic delivery and international shipping.",
          },
        },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrustBar />
      <ProductEcosystem />
      <FeaturedProducts />
      <CoreCapabilities />
      <SolutionsByIndustry />
      <DeploymentHighlights />
      <WhyRobotmart />
      <FinalCTA />
      <FAQSection />
    </div>
  );
};

export default Index;
