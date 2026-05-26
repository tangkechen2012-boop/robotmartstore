import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FOOTER_LINKS = [
  {
    title: "Products",
    links: [
      { label: "Humanoid Robots", to: "/products/humanoid-robots" },
      { label: "Quadruped Robots", to: "/products/quadruped-robots" },
      { label: "Robot Accessories", to: "/products/robot-accessories" },
      { label: "Toy Robots", to: "/products/toy-robots" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "System Integration", to: "/services-technology" },
      { label: "Custom Development", to: "/custom-development" },
      { label: "AI Deployment", to: "/services-technology" },
      { label: "OEM / ODM", to: "/request-quote" },
      { label: "Certifications", to: "/support" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Education", to: "/applications" },
      { label: "Industrial Automation", to: "/applications" },
      { label: "AI Research", to: "/applications" },
      { label: "Inspection & Patrol", to: "/applications" },
      { label: "Case Studies", to: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
      { label: "Request Quote", to: "/request-quote" },
      { label: "Compliance", to: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Warranty Policy", to: "/support" },
      { label: "Shipping Policy", to: "/support" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter */}
      <div className="border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="font-bold text-lg">Stay Updated</h3>
            <p className="text-sm opacity-70">Robotics news, product launches, and engineering insights.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Input placeholder="Your email" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 h-10 rounded-pill" />
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground h-10 px-6 rounded-pill font-semibold">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        {FOOTER_LINKS.map(col => (
          <div key={col.title}>
            <h4 className="font-bold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="opacity-60 hover:opacity-100 transition-opacity duration-250">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact + SEO */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-3">Contact</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@robotmart.store</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (917) 293-4778</li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> San Francisco, CA</li>
              </ul>
            </div>
            <div className="flex-[2]">
              <p className="text-sm opacity-60 leading-relaxed">
                RobotMart is a professional robotics solutions provider headquartered in the United States. We specialize in humanoid robots, quadruped robot systems, robotic arms, and intelligent automation platforms for education, research, and industry. As an authorized distributor of leading robotics brands, we deliver products, engineering services, and custom development solutions to clients across the USA and globally.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-50">
          <p>© 2026 RobotMart. All rights reserved.</p>
          <p>Professional robotics sourcing and system integration platform.</p>
        </div>
      </div>
    </footer>
  );
};
