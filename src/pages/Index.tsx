import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import {
  Truck, Shield, Headphones, ChevronRight, Cpu, GraduationCap,
  Home, Factory, Bot, CheckCircle, Globe, CreditCard, Users,
  Microscope, BrainCircuit
} from "lucide-react";
import { FloatingRobot } from "@/components/FloatingRobot";
import { useEffect } from "react";

const CATEGORIES = [
  { label: "Humanoid Robots", description: "Full-body humanoid platforms for research, education, and industrial applications.", link: "/humanoid-robots", icon: Bot },
  { label: "Quadruped Robots", description: "Four-legged robotic platforms for inspection, research, and field operations.", link: "/quadruped-robots", icon: Cpu },
  { label: "Robotic Arms", description: "Collaborative, industrial, and desktop robotic arms for automation and R&D.", link: "/robotic-arms", icon: Factory },
  { label: "Industrial Robots", description: "Heavy-duty automation solutions for manufacturing and production lines.", link: "/industrial-robots", icon: Factory },
  { label: "Educational Robotics", description: "STEM robotics kits and platforms from K-12 to university level.", link: "/educational-robotics", icon: GraduationCap },
  { label: "Robot Parts", description: "Motors, sensors, controllers, batteries, and mechanical components.", link: "/robot-parts", icon: Cpu },
];

const APPLICATIONS = [
  { label: "Education", description: "STEM curriculum-aligned robotics for schools and universities.", link: "/applications/education", icon: GraduationCap },
  { label: "Research Labs", description: "Advanced platforms for academic and industrial R&D projects.", link: "/applications/research", icon: Microscope },
  { label: "Industrial Automation", description: "Scalable automation solutions for manufacturing environments.", link: "/applications/industrial-automation", icon: Factory },
  { label: "AI Development", description: "Hardware and compute platforms for robotics AI and machine learning.", link: "/applications/ai-development", icon: BrainCircuit },
];

const WHY_CHOOSE = [
  { icon: Globe, title: "Authorized Global Brands", desc: "Official distributor of leading robotics manufacturers worldwide." },
  { icon: Truck, title: "US Warehouse Fulfillment", desc: "Fast domestic shipping from our warehouses across the United States." },
  { icon: Headphones, title: "Technical Support", desc: "Pre-sale guidance and post-sale engineering support from robotics experts." },
  { icon: Users, title: "B2B Bulk Pricing", desc: "Volume discounts, net terms, and dedicated account management for institutions." },
  { icon: CreditCard, title: "Secure Checkout", desc: "PCI-compliant payment processing with multiple payment options." },
  { icon: CheckCircle, title: "Quality Guarantee", desc: "Every product backed by manufacturer warranty and our satisfaction guarantee." },
];

const BRANDS = [
  { name: "Arduino", icon: "/images/brands/arduino.webp" },
  { name: "Raspberry Pi", icon: "/images/brands/raspberry-pi.webp" },
  { name: "NVIDIA", icon: "/images/brands/nvidia.webp" },
  { name: "Boston Dynamics", icon: "/images/brands/boston-dynamics.webp" },
  { name: "DJI", icon: "/images/brands/dji.webp" },
  { name: "Universal Robots", icon: "/images/brands/universal-robots.webp" },
  { name: "ABB", icon: "/images/brands/abb.webp" },
  { name: "KUKA", icon: "/images/brands/kuka.webp" },
];

const Index = () => {
  const { data: products, isLoading } = useShopifyProducts(8);

  useEffect(() => {
    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What types of robots does RoboMart sell?",
          "acceptedAnswer": { "@type": "Answer", "text": "RoboMart sells humanoid robots, quadruped robots, robotic arms, industrial robots, educational robotics kits, and robot parts including motors, sensors, controllers, and batteries." }
        },
        {
          "@type": "Question",
          "name": "Does RoboMart offer B2B pricing?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. RoboMart provides bulk pricing, net terms, and dedicated account management for universities, research labs, and enterprise buyers. Submit an RFQ for a custom quote." }
        },
        {
          "@type": "Question",
          "name": "Does RoboMart ship internationally?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. RoboMart ships from US warehouses domestically and offers global shipping to most countries. Free shipping is available on US orders over $500." }
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
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--robot-navy))] to-[hsl(var(--primary))] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="flex items-center gap-12">
            <div className="max-w-2xl flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Industrial &amp; Educational Robotics Store in the USA
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                Buy humanoid robots, quadruped robots, robotic arms, AI kits and robot parts from trusted global brands. Serving engineers, universities, research labs, and industrial buyers nationwide.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8" asChild>
                  <Link to="/collections/all">Shop Robotics</Link>
                </Button>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8" asChild>
                  <Link to="#categories">Browse by Category</Link>
                </Button>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8" asChild>
                  <Link to="/b2b">Request B2B Quote</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block w-[520px] h-[520px] flex-shrink-0">
              <FloatingRobot />
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="bg-[hsl(var(--robot-navy))]/50 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Curated Robotics</p>
                <p className="text-xs opacity-70">Reliable brands for education, R&amp;D &amp; industry</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">US Warehouse Fulfillment</p>
                <p className="text-xs opacity-70">Fast domestic &amp; international shipping</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Expert Support</p>
                <p className="text-xs opacity-70">Pre-sale selection + post-sale tech support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Intro Paragraph */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Welcome to RoboMart — Your Specialized Robotics Supplier</h2>
          <p className="text-muted-foreground leading-relaxed">
            RoboMart is a dedicated robotics store serving engineers, educators, researchers, and industrial buyers across the United States and worldwide. We carry a comprehensive selection of humanoid robots, quadruped robots, collaborative and industrial robotic arms, educational robotics kits, and essential robot parts — including motors, sensors, microcontrollers, batteries, and mechanical components. Unlike general electronics retailers, RoboMart focuses exclusively on robotics, ensuring deep product expertise and curated inventory from the world's most trusted robotics brands. Whether you're outfitting a university robotics lab, sourcing components for a research project, deploying automation in a manufacturing facility, or building your first STEM robot, RoboMart provides the products, technical support, and competitive pricing you need. We offer institutional purchasing programs, bulk pricing for B2B buyers, and dedicated account management for government and enterprise procurement.
          </p>
        </div>
      </section>

      {/* Shop by Category */}
      <section id="categories" className="bg-muted/50 border-y">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-2">Shop by Category</h2>
          <p className="text-muted-foreground mb-8">Browse our robotics catalog organized by product type.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map(cat => (
              <Link key={cat.label} to={cat.link} className="group">
                <div className="bg-card border rounded-lg p-6 h-full hover:border-primary/50 hover:shadow-md transition-all">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <cat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{cat.label}</h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                  <span className="text-sm text-primary font-medium mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Browse <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/collections/all" className="text-sm text-primary hover:underline flex items-center gap-1">
            Shop all <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border rounded-md overflow-hidden animate-pulse">
                <div className="aspect-square bg-muted" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map(product => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border rounded-md bg-muted/30">
            <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No products yet</h3>
            <p className="text-muted-foreground text-sm">
              Tell us what products you'd like to add — describe the product name and price in the chat!
            </p>
          </div>
        )}
      </section>

      {/* Applications */}
      <section className="bg-muted/50 border-y">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-2">Robotics by Application</h2>
          <p className="text-muted-foreground mb-8">Find the right robotic platform for your use case.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {APPLICATIONS.map(app => (
              <Link key={app.label} to={app.link} className="group">
                <div className="bg-card border rounded-lg p-6 h-full hover:border-primary/50 hover:shadow-md transition-all text-center">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <app.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{app.label}</h3>
                  <p className="text-sm text-muted-foreground">{app.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose RoboMart */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-2">Why Choose RoboMart</h2>
        <p className="text-muted-foreground mb-8">The advantages of buying from a specialized robotics supplier.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE.map(item => (
            <div key={item.title} className="flex gap-4">
              <div className="h-11 w-11 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="bg-muted/50 border-y">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Trusted Robotics Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {BRANDS.map(brand => (
              <Link key={brand.name} to={`/brands/${brand.name.toLowerCase().replace(/\s/g, '-')}`}>
                <div className="bg-card border rounded-md p-4 text-center hover:shadow-sm transition-shadow flex flex-col items-center gap-2">
                  <img src={brand.icon} alt={`${brand.name} robotics products`} className="h-10 w-10 object-contain" loading="lazy" />
                  <span className="text-xs font-medium text-muted-foreground">{brand.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Footer Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-4">Your Trusted Robotics Supplier in the USA</h2>
        <div className="max-w-4xl text-sm text-muted-foreground leading-relaxed space-y-3">
          <p>
            RoboMart is a specialized robotics supplier and robot parts distributor headquartered in the United States. We operate as an industrial robotics marketplace, connecting engineers, researchers, educators, and enterprise buyers with the world's leading robotics manufacturers. Our curated catalog includes humanoid robots, quadruped robots, collaborative and industrial robotic arms, educational STEM robotics kits, AI development platforms, and thousands of essential robot components.
          </p>
          <p>
            Whether you want to buy a robot online for a university research lab, source robotic arms for a production line, or equip a classroom with age-appropriate robotics kits, RoboMart delivers the product selection, competitive pricing, and technical expertise you need. As an authorized distributor for brands like Unitree, UFACTORY, Universal Robots, DJI, NVIDIA, Arduino, and Raspberry Pi, we ensure that every product is genuine, fully supported, and backed by manufacturer warranty.
          </p>
          <p>
            Our B2B program supports institutional purchasing with volume discounts, net payment terms, government procurement compliance, and dedicated account management. We ship from US-based warehouses for fast domestic delivery and offer international shipping to research institutions and businesses worldwide. From a single servo motor to a fleet of inspection robots, RoboMart is your end-to-end robotics supplier — providing not just products, but the guidance and support to deploy them successfully.
          </p>
        </div>
      </section>

      {/* Support strip */}
      <section className="bg-muted/50 border-t">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, label: "Free Shipping", desc: "On US orders over $500" },
            { icon: Shield, label: "Quality Guarantee", desc: "Manufacturer warranty included" },
            { icon: CreditCard, label: "Secure Payment", desc: "PCI-compliant checkout" },
            { icon: Headphones, label: "Expert Support", desc: "Robotics engineers ready to help" },
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center text-center gap-2">
              <item.icon className="h-7 w-7 text-primary" />
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
