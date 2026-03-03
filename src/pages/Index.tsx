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
  { title: "Humanoid Robots", link: "/products/humanoid-robots", description: "Advanced bipedal platforms for research and industry", image: "/images/categories/humanoid.webp" },
  { title: "Quadruped Robots", link: "/products/quadruped-robots", description: "All-terrain legged systems for inspection and patrol", image: "/images/categories/quadruped.webp" },
  { title: "Robotic Arms", link: "/products/robotic-arms", description: "Precision manipulation for automation and research", image: "/images/categories/accessories.webp" },
  { title: "Research Platforms", link: "/products/research-platforms", description: "Open-architecture systems for R&D and education", image: "/images/categories/research.webp" },
  { title: "Industrial Robotics", link: "/products/industrial-robotics", description: "Production-grade automation systems", image: "/images/categories/industrial.webp" },
  { title: "Components", link: "/products/components", description: "Motors, sensors, controllers, and compute modules", image: "/images/categories/components.webp" },
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
      <section className="relative bg-gradient-to-br from-primary to-accent/20 text-primary-foreground py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 max-w-xl">
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Professional Robotics Solutions & Advanced Robot Platforms
            </h1>
            <p className="text-lg opacity-80 mb-8">
              RobotMart delivers humanoid robots, quadruped systems, robotic arms, and intelligent automation platforms for education, research, and industry.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="rounded-pill px-8 font-semibold">
                <Link to="/products">Shop Products</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-pill px-8 font-semibold">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-lg h-[400px]">
            <Suspense fallback={null}>
              <FloatingRobot />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {PILLARS.map(({ title, description, icon: Icon, link }) => (
            <ScrollReveal key={title} className="flex flex-col gap-4">
              <Icon className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
              <Button asChild variant="link" className="mt-auto px-0 font-semibold">
                <Link to={link} className="flex items-center gap-1">
                  Learn More <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-12 text-center">Explore Our Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {CATEGORIES.map(({ title, description, link, image }) => (
              <ScrollReveal key={title} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer">
                <Link to={link} className="block">
                  <img src={image} alt={title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="p-6 bg-white dark:bg-gray-900">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-muted-foreground text-sm">{description}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
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

      {/* Call to Action Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-extrabold mb-6">Ready to get started?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Whether you're looking for the latest robotics platforms or custom engineering services, RobotMart is your trusted partner.
        </p>
        <Button asChild size="lg" className="rounded-pill px-10 font-semibold">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
