import { Shield, Settings, Headphones, Wrench } from "lucide-react";

const ITEMS = [
  { icon: Shield, label: "Industry-grade Hardware" },
  { icon: Settings, label: "System Integration Expertise" },
  { icon: Headphones, label: "Global Technical Support" },
  { icon: Wrench, label: "OEM & Custom Development" },
];

export const TrustBar = () => (
  <section className="border-b border-border">
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-8 md:gap-16">
      {ITEMS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-muted-foreground">
          <Icon className="h-4 w-4" />
          <span className="text-xs font-medium tracking-wide">{label}</span>
        </div>
      ))}
    </div>
  </section>
);
