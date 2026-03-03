import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => (
  <section className="relative bg-primary text-primary-foreground" style={{ minHeight: "85vh" }}>
    <div className="max-w-7xl mx-auto px-4 flex flex-col justify-center" style={{ minHeight: "85vh" }}>
      <div className="max-w-3xl py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
          Engineering-Grade Robotics
          <br />
          <span className="font-normal text-primary-foreground/60">Built for Real-World Deployment</span>
        </h1>
        <p className="text-lg text-primary-foreground/50 max-w-xl mb-10 leading-relaxed">
          Industrial robots, humanoid systems, and AI-powered automation solutions for enterprise and research.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-[44px] px-8 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
            <Link to="/products">Explore Systems</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-[44px] px-8 rounded-md border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
            <Link to="/contact">Talk to an Engineer</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);
