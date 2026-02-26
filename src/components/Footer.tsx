import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--robot-navy))] text-[hsl(var(--robot-light))]">
      {/* Newsletter */}
      <div className="border-b border-[hsl(var(--robot-steel))]">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg">Stay in the loop</h3>
            <p className="text-sm opacity-80">Get robotics news, deals, and guides delivered to your inbox.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Input placeholder="Your email" className="bg-[hsl(var(--robot-steel))] border-0 text-[hsl(var(--robot-light))] placeholder:text-[hsl(var(--robot-light))]/50 h-10" />
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground h-10 px-6">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-sm mb-3">Shop</h4>
          <ul className="space-y-1.5 text-sm opacity-80">
            <li><Link to="/collections/parts" className="hover:opacity-100">Robot Parts</Link></li>
            <li><Link to="/collections/robots-kits" className="hover:opacity-100">Robots & Kits</Link></li>
            <li><Link to="/collections/education" className="hover:opacity-100">Education</Link></li>
            <li><Link to="/collections/consumer" className="hover:opacity-100">Consumer Robots</Link></li>
            <li><Link to="/collections/professional" className="hover:opacity-100">Professional</Link></li>
            <li><Link to="/collections/tools" className="hover:opacity-100">Tools & Equipment</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-3">Support</h4>
          <ul className="space-y-1.5 text-sm opacity-80">
            <li><Link to="/support" className="hover:opacity-100">Help Center</Link></li>
            <li><Link to="/support#shipping" className="hover:opacity-100">Shipping Policy</Link></li>
            <li><Link to="/support#returns" className="hover:opacity-100">Returns & Refunds</Link></li>
            <li><Link to="/support#warranty" className="hover:opacity-100">Warranty</Link></li>
            <li><Link to="/support#b2b" className="hover:opacity-100">B2B / RFQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-3">Company</h4>
          <ul className="space-y-1.5 text-sm opacity-80">
            <li><Link to="/about" className="hover:opacity-100">About Us</Link></li>
            <li><Link to="/blog" className="hover:opacity-100">Blog & Guides</Link></li>
            <li><Link to="/brands" className="hover:opacity-100">Brands</Link></li>
            <li><Link to="/privacy" className="hover:opacity-100">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:opacity-100">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-3">Contact</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@robomart.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (555) 123-4567</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> San Francisco, CA</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[hsl(var(--robot-steel))]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-60">
          <p>© 2026 RoboMart. All rights reserved.</p>
          <p>Robotics, Made Practical.</p>
        </div>
      </div>
    </footer>
  );
};
