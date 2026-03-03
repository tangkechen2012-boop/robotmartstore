import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const FinalCTA = () => (
  <section className="bg-primary text-primary-foreground py-24">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Deploy Robotics at Scale?</h2>
      <p className="text-primary-foreground/50 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
        Discuss your requirements with our engineering team.
      </p>
      <Button asChild size="lg" className="h-[44px] px-8 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
        <Link to="/contact">Start a Conversation</Link>
      </Button>
    </div>
  </section>
);
