import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  {
    title: "Products",
    links: [
      { label: "Humanoid Robots", to: "/products/humanoid-robots" },
      { label: "Quadruped Robots", to: "/products/quadruped-robots" },
      { label: "Robotic Arms", to: "/products/robotic-arms" },
      { label: "Industrial Robotics", to: "/products/industrial-robotics" },
      { label: "Components", to: "/products/components" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "System Integration", to: "/services-technology" },
      { label: "AI Deployment", to: "/services-technology" },
      { label: "Custom Development", to: "/custom-development" },
      { label: "Technical Support", to: "/support" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Education", to: "/applications" },
      { label: "Manufacturing", to: "/applications" },
      { label: "Logistics", to: "/applications" },
      { label: "Research & Labs", to: "/applications" },
      { label: "Healthcare", to: "/applications" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
      { label: "Case Studies", to: "/blog" },
      { label: "Certifications", to: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Warranty Policy", to: "/support" },
      { label: "Compliance", to: "/support" },
      { label: "OEM / ODM", to: "/contact" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
        {FOOTER_LINKS.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-4 text-primary-foreground/70">
              {col.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-primary-foreground/40 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/40">
          <p>© 2026 RobotMart. All rights reserved.</p>
          <p>Professional robotics sourcing and system integration platform.</p>
        </div>
      </div>
    </footer>
  );
};
