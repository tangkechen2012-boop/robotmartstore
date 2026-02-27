import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Truck, Shield, Headphones, ChevronRight, Cpu, Cog, GraduationCap, Home, Factory, Bot, Wrench, Zap, Camera, Puzzle, Box, Rocket } from "lucide-react";
import { FloatingRobot } from "@/components/FloatingRobot";

const USE_CASES = [
  { label: "Education", description: "K-12 to university robotics programs", icon: GraduationCap, link: "/collections/education" },
  { label: "Research", description: "Platforms for cutting-edge R&D", icon: Cpu, link: "/collections/research" },
  { label: "Industrial", description: "Automation & manufacturing solutions", icon: Factory, link: "/collections/industrial" },
  { label: "Home", description: "Personal robots & smart devices", icon: Home, link: "/collections/consumer" },
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

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero */}
       <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--robot-navy))] to-[hsl(var(--primary))] text-[hsl(var(--robot-light)]">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="flex items-center gap-12">
            <div className="max-w-2xl flex-1">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                Robotics, Made Practical.
              </h1>
              <p className="text-xl opacity-90 mb-10 leading-relaxed">
                Your one-stop shop for robot parts, kits, education tools, and professional-grade platforms. Curated from the world's best brands.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold" asChild>
                  <Link to="/collections/all">Shop All Products</Link>
                </Button>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold" asChild>
                  <Link to="/support#b2b">Get a Quote (B2B)</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block w-[420px] h-[420px] flex-shrink-0">
              <FloatingRobot />
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="bg-[hsl(var(--robot-navy))]/50 backdrop-blur-sm border-t border-[hsl(var(--robot-light))]/10">
          <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Curated Robotics</p>
                <p className="text-xs opacity-70">Reliable brands for education, R&D & industry</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Fast Fulfillment</p>
                <p className="text-xs opacity-70">Multi-warehouse shipping + tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
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



      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/collections/all" className="text-sm text-primary hover:underline flex items-center gap-1">
            Shop all <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
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

      {/* Shop by Use Case */}
      <section className="bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Shop by Use Case</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {USE_CASES.map(uc => (
              <Link key={uc.label} to={uc.link}>
                <div className="text-center p-6 rounded-lg hover:bg-muted/60 transition-colors h-full">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <uc.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{uc.label}</h3>
                  <p className="text-sm text-muted-foreground">{uc.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Top Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {BRANDS.map(brand => (
            <Link key={brand.name} to={`/brands#${brand.name.toLowerCase().replace(/\s/g, '-')}`}>
              <div className="border rounded-md p-4 text-center hover:shadow-sm transition-shadow bg-card flex flex-col items-center gap-2">
                <img src={brand.icon} alt={brand.name} className="h-10 w-10 object-contain" />
                <span className="text-xs font-medium text-muted-foreground">{brand.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Support strip */}
      <section className="bg-muted/50 border-t">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, label: "Free Shipping", desc: "On orders over $500" },
            { icon: Shield, label: "Quality Guarantee", desc: "Warranty on all products" },
            { icon: Shield, label: "Warranty", desc: "Manufacturer warranty included" },
            { icon: Headphones, label: "Expert Support", desc: "Tech team ready to help" },
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
