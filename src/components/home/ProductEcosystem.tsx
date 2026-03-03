import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  { title: "Humanoid Robotics", description: "Advanced bipedal platforms for research and enterprise deployment", link: "/products/humanoid-robots", image: "/images/categories/humanoid.webp" },
  { title: "Quadruped Robotics", description: "All-terrain legged systems for inspection and patrol", link: "/products/quadruped-robots", image: "/images/categories/quadruped.webp" },
  { title: "Industrial Robotic Arms", description: "Precision manipulation for manufacturing and automation", link: "/products/robotic-arms", image: "/images/categories/accessories.webp" },
  { title: "Mobile Robotics (AMR/AGV)", description: "Autonomous mobile platforms for logistics and warehousing", link: "/products/industrial-robotics", image: "/images/categories/industrial.webp" },
  { title: "AI & Vision Systems", description: "Intelligent perception and compute modules", link: "/products/components", image: "/images/categories/components.webp" },
];

export const ProductEcosystem = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold tracking-tight mb-2">Robotics Platform Portfolio</h2>
      <p className="text-muted-foreground mb-12">Explore our range of engineering-grade robotics systems.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map(({ title, description, link, image }) => (
          <Link
            key={title}
            to={link}
            className="group relative overflow-hidden rounded-lg bg-muted aspect-[4/3] block"
          >
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
              <p className="text-white/50 text-sm mb-2">{description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-white/70 group-hover:text-white transition-colors">
                Explore <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
