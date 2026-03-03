import { Cpu, Globe, Headphones } from "lucide-react";

const REASONS = [
  { icon: Cpu, title: "Engineering-first approach", description: "Every recommendation is grounded in technical analysis, not sales incentives. We evaluate systems based on performance, reliability, and deployment requirements." },
  { icon: Globe, title: "Global sourcing network", description: "Direct relationships with leading robotics manufacturers worldwide, ensuring competitive pricing and reliable supply chain management." },
  { icon: Headphones, title: "Long-term technical support", description: "Ongoing engineering support, documentation, and maintenance services throughout the full lifecycle of deployed systems." },
];

export const WhyRobotmart = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold tracking-tight mb-12">Why Robotmart</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REASONS.map(({ icon: Icon, title, description }) => (
          <div key={title}>
            <Icon className="h-5 w-5 text-foreground mb-4" />
            <h3 className="font-semibold text-sm mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
