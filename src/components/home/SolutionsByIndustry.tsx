import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const INDUSTRIES = [
  { title: "Education", description: "Robotics platforms and curriculum support for universities and training institutions." },
  { title: "Manufacturing", description: "Industrial automation systems for production lines and quality control." },
  { title: "Logistics", description: "Autonomous mobile robots for warehousing, sorting, and last-mile delivery." },
  { title: "Research & Labs", description: "Open-architecture platforms for R&D, AI training, and experimental deployment." },
  { title: "Healthcare", description: "Assistive and inspection robotics for clinical and laboratory environments." },
];

export const SolutionsByIndustry = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold tracking-tight mb-2">Solutions by Industry</h2>
      <p className="text-muted-foreground mb-12">Robotics deployments tailored to sector-specific requirements.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INDUSTRIES.map(({ title, description }) => (
          <div key={title} className="p-6 border border-border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
            <Link
              to="/applications"
              className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-accent transition-colors"
            >
              Learn More <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);
