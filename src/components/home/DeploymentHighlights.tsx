const DEPLOYMENTS = [
  {
    title: "Factory Automation Integration",
    description: "Multi-axis robotic arm deployment for a precision manufacturing facility, including vision-guided pick-and-place and conveyor integration.",
    image: "/images/categories/industrial.webp",
  },
  {
    title: "University Robotics Lab Setup",
    description: "Full laboratory buildout with humanoid and quadruped platforms for a graduate-level robotics research program.",
    image: "/images/categories/research.webp",
  },
  {
    title: "AI Inspection System",
    description: "Autonomous quadruped deployment with onboard AI for infrastructure inspection in energy and utilities.",
    image: "/images/categories/quadruped.webp",
  },
];

export const DeploymentHighlights = () => (
  <section className="py-24 bg-secondary">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold tracking-tight mb-2">Deployment Highlights</h2>
      <p className="text-muted-foreground mb-12">Selected project references.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEPLOYMENTS.map(({ title, description, image }) => (
          <div key={title} className="overflow-hidden rounded-lg border border-border bg-background">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-sm mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
