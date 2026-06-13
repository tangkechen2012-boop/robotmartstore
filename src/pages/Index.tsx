import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import {
  ChevronRight, Bot, Cpu, Factory, GraduationCap, Microscope,
  BrainCircuit, ArrowRight, Wrench, Code2, Search as SearchIcon,
  Shield, Users, Award, Globe, Truck, Headphones,
  CheckCircle2, Recycle
} from "lucide-react";

import { useEffect } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroBackground } from "@/components/HeroBackground";
import { FAQSection } from "@/components/FAQSection";

const PILLARS = [
  {
    title: "Products",
    description: "Humanoid robots, quadruped systems, robotic arms, and precision components from the world's leading manufacturers.",
    icon: Bot,
    link: "/products",
  },
  {
    title: "Services & Technology",
    description: "System integration, technical support, AI deployment, and lifecycle maintenance for robotics platforms.",
    icon: Wrench,
    link: "/services-technology",
  },
  {
    title: "Custom Development",
    description: "End-to-end robotics engineering — concept to prototype — including mechanical design, embedded systems, and AI.",
    icon: Code2,
    link: "/custom-development",
  },
  {
    title: "Applications",
    description: "Robotics solutions for education, industrial automation, inspection, and AI research deployments.",
    icon: BrainCircuit,
    link: "/applications",
  },
];

const CATEGORIES = [
  { title: "Humanoid Robots", link: "/products/humanoid-robots", description: "Humanoid robot platforms for research, education, embodied AI, and advanced deployment.", image: "/images/categories/humanoid.webp" },
  { title: "Quadruped Robots", link: "/products/quadruped-robots", description: "Quadruped robot dogs and agile legged platforms for mobility, interaction, and robotics research.", image: "/images/categories/quadruped.webp" },
  { title: "Robot Accessories", link: "/products/robot-accessories", description: "Robot accessories and components including dexterous hands, tactile sensors, and related robotics add-ons.", image: "/images/categories/accessories.webp" },
  { title: "Toy Robots", link: "/products/toy-robots", description: "Consumer-friendly robots for companionship, home interaction, family entertainment, and playful automation.", image: "/images/categories/research.webp" },
];

const STATS = [
  { value: "50+", label: "Engineering Team" },
  { value: "200+", label: "Global Clients" },
  { value: "120+", label: "R&D Projects" },
  { value: "12+", label: "Years Experience" },
];

const TRUST_ITEMS = [
  { icon: Shield, label: "Industry-grade Hardware" },
  { icon: Wrench, label: "System Integration Expertise" },
  { icon: Headphones, label: "Global Technical Support" },
  { icon: Code2, label: "OEM & Custom Development" },
];

const Index = () => {
  const { data: products, isLoading } = useShopifyProducts(8);
  const { data: preOwnedProducts, isLoading: preOwnedLoading } = useShopifyProducts(4, "tag:Pre-Owned");

  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What types of robots does RobotMart sell?",
          "acceptedAnswer": { "@type": "Answer", "text": "RobotMart provides humanoid robots, quadruped robots, robotic arms, industrial robots, educational robotics kits, and robot parts including motors, sensors, controllers, and batteries." }
        },
        {
          "@type": "Question",
          "name": "Does RobotMart offer custom robotics development?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. RobotMart offers end-to-end custom robotics development including mechanical design, embedded systems, AI integration, and prototyping services." }
        },
        {
          "@type": "Question",
          "name": "Does RobotMart ship internationally?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. RobotMart ships globally from US-based warehouses with fast domestic delivery and international shipping to most countries." }
        }
      ]
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-accent/30 text-primary-foreground py-24 overflow-hidden">
        <HeroBackground />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-[1]" />
        <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12 relative z-[2]">
          <div className="flex-1 max-w-xl md:ml-8 lg:ml-16">
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Engineering-Grade Robotics Solutions
            </h1>
            <p className="text-lg opacity-80 mb-8">
              Humanoid robots, industrial automation systems, and AI-powered robotics for enterprise and research.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="rounded-pill px-8 font-semibold bg-accent hover:bg-accent/90 text-accent-foreground hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-accent/25">
                <Link to="/products">Explore Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-pill px-8 font-semibold border-accent text-accent-foreground bg-transparent hover:bg-accent/10 hover:scale-105 transition-all duration-200">
                <Link to="/contact">Talk to an Engineer</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-lg h-[440px] flex items-center justify-center">
            <img
              src="/images/hero-robot-transparent.png"
              alt="Humanoid Robot"
              width={1024}
              height={1024}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-muted-foreground">
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs font-medium tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold">Featured Products</h2>
          <Button asChild variant="link" className="px-0 font-semibold">
            <Link to="/products" className="flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products?.map(product => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Pre-Owned Inventory */}
      {preOwnedProducts && preOwnedProducts.length > 0 && (
        <section className="border-y border-border bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-pill bg-accent/10 text-accent px-3 py-1 mb-3">
                  <Recycle className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold tracking-wide uppercase">Pre-Owned Inventory</span>
                </div>
                <h2 className="text-3xl font-extrabold">Tested Pre-Owned Robotics</h2>
                <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                  Inspected humanoid and quadruped units sourced for education, research, and pilot deployments. Each unit is unique — pricing, accessories, freight, and warranty assumptions are confirmed through a quote-first review.
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-pill font-semibold">
                <Link to="/products/pre-owned" className="flex items-center gap-1">
                  View pre-owned inventory <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            {preOwnedLoading ? (
              <p>Loading pre-owned inventory...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {preOwnedProducts.map(product => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== WHAT WE DO ===== */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0B1020 0%, #14213D 100%)' }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ScrollReveal className="max-w-3xl mb-14">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 opacity-80">Core Capabilities</p>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.1] text-white mb-4">
              What We Do
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed">
              End-to-end robotics solutions — from product sourcing and system integration to custom engineering and AI deployment.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map(({ title, description, icon: Icon, link }, i) => (
              <ScrollReveal key={title}>
                <Link
                  to={link}
                  className="group relative flex flex-col h-full p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/40 transition-colors duration-300">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <span className="font-mono text-xs text-white/30 tracking-wider">0{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">{description}</p>
                  <div className="mt-6 flex items-center gap-2 text-accent/70 group-hover:text-accent transition-colors duration-300">
                    <span className="text-xs font-semibold tracking-wide uppercase">Learn more</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCT CATEGORIES ===== */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #14213D 0%, #0B1020 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 opacity-80">Explore</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white">Product Categories</h2>
            </div>
            <Button asChild variant="link" className="px-0 font-semibold text-accent hover:text-accent/80 self-start md:self-end">
              <Link to="/products" className="flex items-center gap-1">
                View all products <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map(({ title, description, link, image }) => (
              <ScrollReveal key={title} className="group">
                <Link
                  to={link}
                  className="block relative rounded-2xl overflow-hidden border border-white/[0.08] hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 bg-white/[0.03]"
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-[#0B1020]/20 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-white group-hover:text-accent transition-colors duration-300">{title}</h3>
                      <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{description}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* Stats */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {STATS.map(({ value, label }) => (
            <ScrollReveal key={label} className="flex flex-col items-center">
              <p className="text-4xl font-extrabold">{value}</p>
              <p className="uppercase tracking-widest text-sm opacity-70">{label}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Ready to Deploy Robotics at Scale?</h2>
          <Button asChild size="lg" className="rounded-pill px-10 font-semibold bg-accent hover:bg-accent/90 text-accent-foreground hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-accent/25">
            <Link to="/contact">Start a Conversation</Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />
    </div>
  );
};

export default Index;
