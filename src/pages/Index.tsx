import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import {
  ChevronRight, Bot, Cpu, Factory, GraduationCap, Microscope,
  BrainCircuit, ArrowRight, Wrench, Code2, Search as SearchIcon,
  Shield, Users, Award, Globe, Truck, Headphones
} from "lucide-react";

import { useEffect, lazy, Suspense } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const FloatingRobot = lazy(() =>
  import("@/components/FloatingRobot").then(m => ({ default: m.FloatingRobot }))
);

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
    description: "End-to-end custom robotics engineering — from mechanical design and embedded systems to AI integration.",
    icon: Code2,
    link: "/custom-development",
  },
];

const CATEGORIES = [
  { label: "Humanoid Robots", desc: "Bipedal platforms for research & enterprise", image: "/images/categories/humanoid.webp", link: "/products/humanoid-robots" },
  { label: "Quadruped Robots", desc: "Four-legged autonomous systems", image: "/images/categories/quadruped.webp", link: "/products/quadruped-robots" },
  { label: "Robotics Accessories", desc: "Grippers, sensors & mounting hardware", image: "/images/categories/accessories.webp", link: "/products/components" },
  { label: "Research Platforms", desc: "Lab-grade development kits", image: "/images/categories/research.webp", link: "/products/research-platforms" },
  { label: "Industrial Robotics", desc: "Production-grade automation arms", image: "/images/categories/industrial.webp", link: "/products/industrial-robotics" },
  { label: "Components", desc: "Motors, controllers & actuators", image: "/images/categories/components.webp", link: "/products/components" },
];

const APPLICATIONS = [
  { label: "Education", description: "STEM-aligned robotics for K-12 and universities.", icon: GraduationCap },
  { label: "Industrial Automation", description: "Scalable automation for manufacturing.", icon: Factory },
  { label: "AI Development", description: "Hardware platforms for robotics AI & ML.", icon: BrainCircuit },
  { label: "Inspection", description: "Autonomous inspection and monitoring.", icon: SearchIcon },
];

const STATS = [
  { value: "50+", label: "Engineering Team" },
  { value: "200+", label: "Global Clients" },
  { value: "120+", label: "R&D Projects" },
  { value: "12+", label: "Years Experience" },
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
          "name": "What types of robots does RoboMart sell?",
          "acceptedAnswer": { "@type": "Answer", "text": "RoboMart provides humanoid robots, quadruped robots, robotic arms, industrial robots, educational robotics kits, and robot parts including motors, sensors, controllers, and batteries." }
        },
        {
          "@type": "Question",
          "name": "Does RoboMart offer custom robotics development?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. RoboMart offers end-to-end custom robotics development including mechanical design, embedded systems, AI integration, and prototyping services." }
        },
        {
          "@type": "Question",
          "name": "Does RoboMart ship internationally?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. RoboMart ships globally from US-based warehouses with fast domestic delivery and international shipping to most countries." }
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
      {/* ===== HERO ===== */}
      <section className="relative min-h-[65vh] max-h-[70vh] flex items-center overflow-hidden bg-[length:200%_200%] animate-hero-gradient" style={{ backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(220 75% 25%) 25%, hsl(var(--primary)) 50%, hsl(var(--accent) / 0.4) 75%, hsl(var(--primary)) 100%)' }}>
        {/* Floating orbs */}
        <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] animate-float-orb" />
        <div className="absolute bottom-[10%] right-[15%] w-[250px] h-[250px] rounded-full bg-primary-foreground/5 blur-[60px] animate-float-orb-reverse" />
        <div className="absolute top-[50%] right-[30%] w-[200px] h-[200px] rounded-full bg-accent/[0.08] blur-[70px] animate-float-orb [animation-delay:2s]" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary-foreground)) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-16 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] text-primary-foreground mb-5">
                Professional Robotics Solutions & Advanced Robot Platforms
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-7 leading-relaxed">
                Delivering humanoid robots, quadruped systems, and intelligent robotics solutions for industry and research.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-pill px-8 font-semibold bg-accent hover:bg-accent/90 text-accent-foreground shadow-soft-lg transition-all duration-300 hover:shadow-card-hover hover:scale-105 active:scale-95" asChild>
                  <Link to="/products">Browse Products</Link>
                </Button>
                <Button size="lg" className="rounded-pill px-8 font-semibold bg-accent hover:bg-accent/90 text-accent-foreground shadow-soft-lg transition-all duration-300 hover:shadow-card-hover hover:scale-105 active:scale-95" asChild>
                  <Link to="/contact">Request Consultation</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block h-[55vh] min-h-[400px]">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-10 h-10 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" /></div>}>
                <FloatingRobot />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORE BUSINESS PILLARS ===== */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What We Do</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Three core pillars powering robotics innovation across industries.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => (
            <Link key={pillar.title} to={pillar.link} className="group">
              <div className="bg-card rounded-2xl p-8 h-full border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                  <pillar.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pillar.description}</p>
                <span className="text-sm text-accent font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>

      {/* ===== PRODUCT CATEGORIES — INDUSTRIAL IMAGE BLOCKS ===== */}
      <section style={{ background: 'linear-gradient(180deg, #14213D 0%, #0B1020 100%)' }}>
        <ScrollReveal className="max-w-7xl mx-auto px-4 py-24">
          <div className="mb-14">
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-accent mb-4 opacity-80">Product Lines</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Product Categories</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.label}
                to={cat.link}
                className={`group relative overflow-hidden rounded-xl block ${i === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 60px 10px hsl(210 100% 55% / 0.15)' }} />
                  <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-accent/30 transition-all duration-500 pointer-events-none" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-accent/70 mb-1">0{i + 1}</p>
                  <h3 className={`font-bold text-white mb-1 ${i === 0 ? 'text-2xl md:text-3xl' : 'text-lg'}`}>{cat.label}</h3>
                  <p className="text-white/40 text-sm">{cat.desc}</p>
                  <div className="mt-3 flex items-center gap-2 text-accent text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                    Explore <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-sm text-accent hover:underline font-semibold flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse border">
                <div className="aspect-square bg-secondary" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-secondary rounded-pill w-3/4" />
                  <div className="h-4 bg-secondary rounded-pill w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.map(product => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border rounded-2xl bg-secondary/30">
            <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Products coming soon</h3>
            <p className="text-muted-foreground text-sm">Our product catalog is being curated. Check back soon.</p>
          </div>
        )}
      </ScrollReveal>

      {/* ===== SERVICES PREVIEW ===== */}
      <ScrollReveal className="bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Services & Technology</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Beyond products, RoboMart provides comprehensive robotics engineering services — from initial system integration and SDK support to AI deployment and lifecycle maintenance. Our engineering team works alongside your organization to ensure seamless adoption of advanced robotics platforms.
              </p>
              <ul className="space-y-3 mb-6">
                {["System Integration", "Technical Support & Training", "AI Model Deployment", "Lifecycle Maintenance"].map(s => (
                  <li key={s} className="flex items-center gap-3 text-sm">
                    <div className="h-6 w-6 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="h-3 w-3 text-accent" />
                    </div>
                    {s}
                  </li>
                ))}
              </ul>
              <Button className="rounded-pill px-6 font-semibold" asChild>
                <Link to="/services-technology">Explore Services <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </div>
            <div className="bg-card rounded-2xl border p-8 shadow-soft">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Wrench, label: "Integration" },
                  { icon: Headphones, label: "Support" },
                  { icon: BrainCircuit, label: "AI Deploy" },
                  { icon: Shield, label: "Maintenance" },
                ].map(item => (
                  <div key={item.label} className="bg-secondary/60 rounded-xl p-5 text-center">
                    <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ===== APPLICATIONS ===== */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Applications</h2>
          <p className="text-muted-foreground">Robotics solutions tailored to your industry.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {APPLICATIONS.map(app => (
            <div key={app.label} className="bg-secondary/40 rounded-2xl p-6 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-0.5">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <app.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{app.label}</h3>
              <p className="text-sm text-muted-foreground">{app.description}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ===== TRUST STRIP ===== */}
      <ScrollReveal className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map(stat => (
              <div key={stat.label}>
                <p className="text-4xl font-extrabold mb-1">{stat.value}</p>
                <p className="text-sm opacity-70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ===== FINAL CTA ===== */}
      <ScrollReveal className="relative py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="glass rounded-2xl p-10 shadow-soft-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Integrate Advanced Robotics Into Your Project?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Whether you need a single robot or a fleet deployment, our team is ready to help you find the right solution.
            </p>
            <Button size="lg" className="rounded-pill px-10 font-semibold bg-primary hover:bg-primary/90 shadow-soft-lg transition-all duration-300 hover:shadow-card-hover" asChild>
              <Link to="/contact">Start a Consultation</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* ===== SEO CONTENT ===== */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-4">Your Trusted Robotics Solutions Partner</h2>
        <div className="max-w-4xl text-sm text-muted-foreground leading-relaxed space-y-3">
          <p>
            RoboMart is a professional robotics solutions provider and authorized distributor headquartered in the United States. We specialize in delivering advanced robot platforms — including humanoid robots, quadruped robot systems, collaborative and industrial robotic arms, and precision robotics components — to engineers, researchers, educators, and enterprise buyers worldwide.
          </p>
          <p>
            Our three-pillar approach encompasses product distribution, engineering services, and custom development, enabling organizations to go from concept to deployment with a single trusted partner. We work with leading robotics manufacturers to ensure every product is genuine, fully supported, and backed by manufacturer warranty. Our engineering team provides hands-on system integration, AI model deployment, technical training, and lifecycle maintenance.
          </p>
          <p>
            For organizations requiring bespoke solutions, our custom development division offers end-to-end robotics engineering — from mechanical design and embedded systems to AI integration and rapid prototyping. Whether you're a university research lab, an industrial automation facility, or a startup building next-generation robots, RoboMart delivers the products, expertise, and support to accelerate your robotics initiatives.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default Index;
