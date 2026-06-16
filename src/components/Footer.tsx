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
      { label: "B2B Procurement", to: "/procurement" },
      { label: "System Integration", to: "/services-technology" },
      { label: "Custom Development", to: "/custom-development" },
      { label: "AI Deployment", to: "/services-technology" },
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
      { label: "Return & Refund Policy", to: "/policies/refund-policy" },
      { label: "Shipping Policy", to: "/policies/shipping-policy" },
      { label: "Privacy Policy", to: "/policies/privacy-policy" },
      { label: "Terms of Service", to: "/policies/terms-of-service" },
      { label: "Warranty Policy", to: "/support" },
      { label: "Legal Notice", to: "/policies/legal-notice" },
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
            <Input placeholder="Your email" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70 h-10 rounded-pill" />
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
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@robotmart.store</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (318) 608-2420</li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> San Francisco, CA</li>
              </ul>
            </div>
            <div className="flex-[2]">
              <p className="text-sm opacity-60 leading-relaxed">
                RobotMart is a professional robotics sourcing and B2B procurement platform for education, research, and enterprise buyers. We specialize in humanoid robots, quadruped robot systems, dexterous hands, robotic arms, and intelligent automation platforms. Product availability, warranty, freight, and purchase terms for high-ticket robotics platforms are confirmed during quotation.
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
