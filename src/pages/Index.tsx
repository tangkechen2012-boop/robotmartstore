import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import {
  ChevronRight, Bot, Factory, GraduationCap, Microscope,
  BrainCircuit, ArrowRight, Wrench, Code2,
  Shield, Headphones, Recycle, PackageCheck, BadgeCheck, Globe2,
} from "lucide-react";

import { useEffect } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroBackground } from "@/components/HeroBackground";
import { FAQSection } from "@/components/FAQSection";
import { Seo } from "@/components/Seo";

const WHY_US = [
  {
    icon: BadgeCheck,
    title: "Authorized Sourcing",
    description: "Direct relationships with Unitree, LinkerBot, DM-Tac and other top OEMs. Authentic units, traceable supply chain.",
  },
  {
    icon: Wrench,
    title: "Engineering Support",
    description: "On-staff robotics engineers help with platform selection, integration, ROS/Isaac stacks, and deployment planning.",
  },
  {
    icon: PackageCheck,
    title: "Inspected Pre-Owned",
    description: "Every used unit is function-tested and graded. Transparent condition reports — no surprises.",
  },
  {
    icon: Globe2,
    title: "Global Fulfillment",
    description: "Export-ready packaging, lithium-battery compliant freight, and customs documentation for international buyers.",
  },
];

const CATEGORIES = [
  {
    title: "Humanoid Robots",
    link: "/products/humanoid-robots",
    description: "Humanoid platforms for research, education, embodied AI, and advanced deployment.",
    image: "/images/categories/humanoid-1280.webp",
    srcSet: "/images/categories/humanoid-640.webp 640w, /images/categories/humanoid-1280.webp 1280w",
    width: 1280,
    height: 1280,
  },
  {
    title: "Quadruped Robots",
    link: "/products/quadruped-robots",
    description: "Quadruped robot dogs and agile legged platforms for mobility and research.",
    image: "/images/categories/quadruped-800.webp",
    srcSet: "/images/categories/quadruped-400.webp 400w, /images/categories/quadruped-800.webp 800w",
    width: 800,
    height: 800,
  },
  {
    title: "Robotic Arms",
    link: "/products/robotic-arms",
    description: "Cobots and manipulators for research, machine tending, and industrial pilots.",
    image: "/images/categories/accessories-800.webp",
    srcSet: "/images/categories/accessories-400.webp 400w, /images/categories/accessories-800.webp 800w",
    width: 800,
    height: 800,
  },
  {
    title: "Robot Accessories",
    link: "/products/robot-accessories",
    description: "Dexterous hands, tactile sensors, controllers, batteries, and add-ons.",
    image: "/images/categories/accessories-800.webp",
    srcSet: "/images/categories/accessories-400.webp 400w, /images/categories/accessories-800.webp 800w",
    width: 800,
    height: 800,
  },
];

const APPLICATIONS = [
  { icon: GraduationCap, title: "Education & Research", description: "University labs, embodied-AI curricula, manipulation benchmarks." },
  { icon: Factory, title: "Industrial Automation", description: "Inspection, material handling, factory mobility, integration projects." },
  { icon: Microscope, title: "AI & Robotics R&D", description: "Reinforcement learning, sim-to-real, multimodal perception platforms." },
  { icon: BrainCircuit, title: "Custom Development", description: "OEM/ODM engineering, custom end-effectors, sensor packs, AI stacks." },
];

const BRANDS = [
  { name: "Unitree", tag: "Humanoid · Quadruped" },
  { name: "LinkerBot", tag: "Dexterous Hands" },
  { name: "DM-Tac", tag: "Tactile Sensing" },
  { name: "UBTECH", tag: "Humanoid" },
  { name: "Fourier", tag: "Humanoid" },
  { name: "Noetix", tag: "Humanoid" },
];

const TRUST_ITEMS = [
  { icon: Shield, label: "Industry-grade Hardware" },
  { icon: Wrench, label: "System Integration Expertise" },
  { icon: Headphones, label: "Global Technical Support" },
  { icon: Code2, label: "OEM & Custom Development" },
];

const Index = () => {
  const EXCLUDED_PRODUCT = "DM-Tac W - Multi-modal Tactile Perception Terminal";
  const isExcluded = (title: string) =>
    title === EXCLUDED_PRODUCT || title.toLowerCase().includes("wondernex ainex");
  const { data: rawProducts, isLoading } = useShopifyProducts(10);
  const products = rawProducts?.filter(p => !isExcluded(p.node.title));
  const { data: rawPreOwned, isLoading: preOwnedLoading } = useShopifyProducts(8, "tag:Condition_Used");
  const preOwnedProducts = rawPreOwned?.filter(p => !isExcluded(p.node.title));

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
          "name": "Where does RobotMart ship?",
          "acceptedAnswer": { "@type": "Answer", "text": "RobotMart ships robotics products to the United States and selected international destinations. Shipping method, duties, customs clearance, delivery timeline, and battery restrictions may vary by product and destination." }
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
      <Seo
        title="RobotMart — Professional Robotics Solutions"
        description="Humanoid robots, quadruped systems, dexterous hands, and AI-powered automation — sourced, supported, and deployed for research and enterprise."
        path="/"
      />

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-accent/30 text-primary-foreground py-20 md:py-24 overflow-hidden">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-[1]" />
        <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12 relative z-[2]">
          <div className="flex-1 max-w-xl md:ml-8 lg:ml-16">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent-foreground/80 mb-4">
              Robotics Procurement · Engineering · Support
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-6">
              Engineering-Grade Robots for Builders, Labs & Enterprise
            </h1>
            <p className="text-base md:text-lg opacity-85 mb-8 leading-relaxed">
              Source humanoid, quadruped, and dexterous robotics from leading OEMs — with engineering review, custom integration, and quote-first support for complex purchases.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button asChild size="lg" className="h-12 rounded-pill px-8 font-semibold bg-accent hover:bg-accent/90 text-accent-foreground hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-accent/25">
                <Link to="/products">Explore Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-pill px-8 font-semibold border-accent text-accent-foreground bg-transparent hover:bg-accent/10 hover:scale-105 transition-all duration-200">
                <Link to="/request-quote">Request a Quote</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-lg h-[340px] md:h-[440px] flex items-center justify-center">
            <picture>
              <source srcSet="/images/hero-robot-transparent.webp" type="image/webp" />
              <img
                src="/images/hero-robot-transparent.png"
                alt="Humanoid robot — RobotMart engineering-grade robotics"
                width={900}
                height={900}
                {...{ fetchpriority: "high" }}
                decoding="async"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-6 md:gap-14">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-muted-foreground">
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs font-medium tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHY CHOOSE ROBOTMART ===== */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-24">
        <ScrollReveal className="max-w-2xl mb-12">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-3">Why RobotMart</p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            A procurement partner, not just a storefront
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            We pair an engineering-grade product catalog with hands-on technical review so you ship the right platform the first time.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_US.map(({ icon: Icon, title, description }) => (
            <ScrollReveal
              key={title}
              className="rounded-2xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-11 w-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== PRODUCT CATEGORIES ===== */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0B1020 0%, #14213D 100%)' }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[260px]">
            {CATEGORIES.map(({ title, description, link, image }, i) => {
              const isHero = i === 0;
              return (
                <ScrollReveal
                  key={title}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer ${isHero ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <Link to={link} className="block relative w-full h-full">
                    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: 'inset 0 0 30px 4px hsl(var(--accent) / 0.25), 0 0 20px 2px hsl(var(--accent) / 0.15)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className={`absolute bottom-0 left-0 right-0 ${isHero ? 'p-7' : 'p-5'}`}>
                      <h3 className={`${isHero ? 'text-2xl' : 'text-lg'} font-bold text-white mb-1 group-hover:text-accent transition-colors duration-300`}>{title}</h3>
                      <p className={`text-white/85 ${isHero ? 'text-sm' : 'text-xs'} leading-relaxed line-clamp-2`}>{description}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== APPLICATIONS ===== */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-24">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-3">Applications</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">Where RobotMart Platforms Are Deployed</h2>
          </div>
          <Button asChild variant="link" className="px-0 font-semibold self-start md:self-end">
            <Link to="/applications" className="flex items-center gap-1">
              All applications <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {APPLICATIONS.map(({ icon: Icon, title, description }) => (
            <ScrollReveal
              key={title}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-11 w-11 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="border-y border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-3">Featured</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">In Stock & Ready to Quote</h2>
            </div>
            <Button asChild variant="link" className="px-0 font-semibold shrink-0">
              <Link to="/products" className="flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-muted/60 animate-pulse aspect-[3/4]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {products?.slice(0, 8).map(product => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== PRE-OWNED ===== */}
      {preOwnedProducts && preOwnedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-20 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-pill bg-accent/10 text-accent px-3 py-1 mb-3">
                <Recycle className="h-3.5 w-3.5" />
                <span className="text-xs font-semibold tracking-wide uppercase">Pre-Owned Inventory</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold">Inspected Pre-Owned Robotics</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                Function-tested humanoid and quadruped units for education, research, and pilot deployments. Each unit is unique — pricing, accessories, freight, and warranty assumptions are confirmed through a quote-first review.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-pill font-semibold">
              <Link to="/products/pre-owned" className="flex items-center gap-1">
                View pre-owned inventory <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          {preOwnedLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-muted/60 animate-pulse aspect-[3/4]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {preOwnedProducts.map(product => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ===== BRANDS ===== */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-3">Brands We Carry</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">Trusted by leading robotics OEMs</h2>
            </div>
            <Button asChild variant="link" className="px-0 font-semibold self-start md:self-end">
              <Link to="/brands" className="flex items-center gap-1">
                See all brands <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {BRANDS.map(({ name, tag }) => (
              <Link
                key={name}
                to="/brands"
                className="group flex flex-col items-center justify-center rounded-xl border border-border bg-background px-4 py-6 hover:border-accent/40 hover:shadow-md transition-all"
              >
                <span className="text-base md:text-lg font-extrabold tracking-tight text-foreground group-hover:text-accent transition-colors">
                  {name}
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground text-center">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQSection />

      {/* ===== FINAL CTA ===== */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Deploy Robotics at Scale?</h2>
          <p className="opacity-80 max-w-xl mx-auto mb-8">
            Send your requirements — we'll respond within one business day with a tailored configuration and quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-pill px-10 font-semibold bg-accent hover:bg-accent/90 text-accent-foreground hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-accent/25">
              <Link to="/request-quote">Request a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-pill px-10 font-semibold border-accent text-accent-foreground bg-transparent hover:bg-accent/10">
              <Link to="/contact">Talk to an Engineer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
