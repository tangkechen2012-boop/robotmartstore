import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logoImg from "@/assets/logo.png";
import { Search, Menu, ChevronDown, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NAV_ITEMS = [
  {
    label: "Products",
    link: "/products",
    sections: [
      {
        title: "Robots",
        items: [
          { label: "Humanoid Robots", link: "/products/humanoid-robots" },
          { label: "Quadruped Robots", link: "/products/quadruped-robots" },
          { label: "Robotic Arms", link: "/products/robotic-arms" },
          { label: "Industrial Robotics", link: "/products/industrial-robotics" },
        ],
      },
      {
        title: "Platforms",
        items: [
          { label: "Mobile Robotics", link: "/products/mobile-robotics" },
          { label: "AI & Vision Systems", link: "/products/ai-vision" },
          { label: "Components", link: "/products/components" },
        ],
      },
    ],
  },
  { label: "Services", link: "/services-technology" },
  { label: "Solutions", link: "/applications" },
  { label: "Custom Dev", link: "/custom-development" },
  { label: "About", link: "/about" },
];

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMenuEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-border" : "bg-background border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            alt="RobotMart"
            src="/lovable-uploads/723ffb1f-5e05-4c03-8e1c-52d2a7bd8f63.png"
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.sections && handleMenuEnter(item.label)}
              onMouseLeave={handleMenuLeave}
            >
              <Link
                to={item.link}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                {item.label}
                {item.sections && <ChevronDown className="h-3 w-3" />}
              </Link>
              {item.sections && openMenu === item.label && (
                <div
                  className="absolute top-full left-0 mt-1 bg-background border border-border rounded-lg shadow-lg p-5 min-w-[420px] grid grid-cols-2 gap-6 z-50"
                  onMouseEnter={() => handleMenuEnter(item.label)}
                  onMouseLeave={handleMenuLeave}
                >
                  {item.sections.map((section) => (
                    <div key={section.title}>
                      <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        {section.title}
                      </p>
                      <ul className="space-y-1">
                        {section.items.map((sub) => (
                          <li key={sub.label}>
                            <Link
                              to={sub.link}
                              className="text-sm text-foreground/70 hover:text-foreground transition-colors block py-1"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <CartDrawer />
          <Button
            className="hidden lg:inline-flex h-[44px] px-6 text-sm font-semibold rounded-md"
            asChild
          >
            <Link to="/contact">Contact</Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetTitle className="mb-6">
                <img src={logoImg} alt="RobotMart" className="h-8 w-auto" />
              </SheetTitle>
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
                ))}
                <Link
                  to="/contact"
                  className="block py-3 px-4 rounded-md text-sm font-semibold bg-primary text-primary-foreground text-center mt-4"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

interface NavItemType {
  label: string;
  link: string;
  sections?: { title: string; items: { label: string; link: string }[] }[];
}

function MobileNavItem({ item, onClose }: { item: NavItemType; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.sections) {
    return (
      <Link
        to={item.link}
        className="block py-2.5 px-4 rounded-md text-sm font-medium hover:bg-secondary transition-colors"
        onClick={onClose}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        className="w-full flex items-center justify-between py-2.5 px-4 text-sm font-medium hover:bg-secondary rounded-md transition-colors"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {open && (
        <div className="pl-4 space-y-2 pb-2">
          {item.sections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-1">
                {section.title}
              </p>
              {section.items.map((sub) => (
                <Link
                  key={sub.label}
                  to={sub.link}
                  className="block text-sm text-foreground/70 hover:text-foreground px-4 py-1.5"
                  onClick={onClose}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
