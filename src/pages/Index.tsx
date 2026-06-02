import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import {
  ChevronRight, Bot, Cpu, Factory, GraduationCap, Microscope,
  BrainCircuit, ArrowRight, Wrench, Code2, Search as SearchIcon,
  Shield, Users, Award, Globe, Truck, Headphones,
  CheckCircle2
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
        <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-12 relative z-[2]">
          <div className="flex-1 max-w-xl">
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

      {/* ===== WHAT WE DO ===== */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0B1020 0%, #14213D 100%)' }}>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
            <ScrollReveal className="lg:sticky lg:top-32">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 opacity-80">Core Capabilities</p>
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] text-white mb-6">
                What We<br />Do
              </h2>
              <p className="text-white/50 text-lg leading-relaxed max-w-md">
                End-to-end robotics solutions — from product sourcing and system integration to custom engineering and AI deployment.
              </p>
            </ScrollReveal>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />
              <div className="space-y-1">
                {PILLARS.map(({ title, description, icon: Icon, link }, i) => (
                  <ScrollReveal key={title}>
                    <Link
                      to={link}
                      className="group relative flex items-start gap-6 pl-14 pr-6 py-7 rounded-xl transition-all duration-500 hover:bg-white/[0.04] border border-transparent hover:border-accent/20"
                    >
                      <div className="absolute left-[18px] top-9 w-3.5 h-3.5 rounded-full border-2 border-accent/50 bg-[#0B1020] group-hover:bg-accent group-hover:border-accent transition-all duration-300 group-hover:shadow-[0_0_12px_hsl(var(--accent)/0.6)]" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="h-5 w-5 text-accent/70 group-hover:text-accent transition-colors duration-300" />
                          <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">{title}</h3>
                        </div>
                        <p className="text-white/40 group-hover:text-white/60 transition-colors duration-300 leading-relaxed">{description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 mt-1 flex-shrink-0" />
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT CATEGORIES ===== */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #14213D 0%, #0B1020 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ScrollReveal>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-4 opacity-80 text-center">Explore</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16">Product Categories</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map(({ title, description, link, image }, i) => (
              <ScrollReveal
                key={title}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <Link to={link} className="block relative" style={{ aspectRatio: i === 0 ? '16/10' : '4/3' }}>
                  <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 30px 4px hsl(var(--accent) / 0.25), 0 0 20px 2px hsl(var(--accent) / 0.15)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors duration-300">{title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{description}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
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
