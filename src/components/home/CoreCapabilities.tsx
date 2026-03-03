import { Settings, BrainCircuit, Code2, Wrench } from "lucide-react";

const CAPABILITIES = [
  { icon: Settings, title: "System Integration", description: "End-to-end integration of robotics hardware and software into existing enterprise workflows and infrastructure." },
  { icon: BrainCircuit, title: "AI Deployment", description: "Deployment of perception, navigation, and decision-making AI models on robotics platforms." },
  { icon: Code2, title: "Custom Robotics Development", description: "Mechanical design, embedded systems, and firmware development for specialized robotics applications." },
  { icon: Wrench, title: "On-Site Commissioning & Support", description: "Installation, calibration, training, and long-term technical support at deployment sites." },
];

export const CoreCapabilities = () => (
  <section className="py-24 bg-secondary">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold tracking-tight mb-2">Core Engineering Capabilities</h2>
      <p className="text-muted-foreground mb-12">Technical services across the full robotics lifecycle.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CAPABILITIES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="p-6 bg-background rounded-lg border border-border">
            <Icon className="h-5 w-5 text-foreground mb-4" />
            <h3 className="font-semibold text-sm mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
