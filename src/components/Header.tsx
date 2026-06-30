import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logoImg from "@/assets/logo.png";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchBar } from "@/components/SearchBar";
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
          { label: "Robot Accessories", link: "/products/robot-accessories" },
          { label: "Pre-Owned Inventory", link: "/products/pre-owned" },
        ],
      },
      {
        title: "Shop By",
        items: [
          { label: "All Products", link: "/products" },
          { label: "By Brand", link: "/brands" },
        ],
      },
    ],
  },
  { label: "Brands", link: "/brands" },
  {
    label: "Solutions",
    link: "/applications",
    sections: [
      {
        title: "Services",
        items: [
          { label: "Services & Technology", link: "/services-technology" },
          { label: "Custom Development", link: "/custom-development" },
          { label: "B2B Procurement", link: "/procurement" },
        ],
      },
      {
        title: "Applications",
        items: [
          { label: "Industry Applications", link: "/applications" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    link: "/buying-guides",
    sections: [
      {
        title: "Learn",
        items: [
          { label: "Buying Guides", link: "/buying-guides" },
          { label: "Robotics Glossary", link: "/resources/robotics-glossary" },
          { label: "Blog", link: "/blog" },
        ],
      },
      {
        title: "Help",
        items: [
          { label: "FAQ", link: "/faq" },
          { label: "Support Center", link: "/support" },
        ],
      },
    ],
  },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" },
];



export const Header = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center text-xs font-medium h-10 flex items-center justify-center gap-3">
        <span>Fast Global Shipping</span>
        <span className="opacity-40">|</span>
        <span className="hidden sm:inline">Engineering Support Available</span>
        <span className="hidden sm:inline opacity-40">|</span>
        <span className="hidden sm:inline">B2B Pricing</span>
      </div>

      {/* Navigation */}
      <header className={`sticky top-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-300 ${scrolled ? "bg-background border-b border-border/30 shadow-sm" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
          {/* Logo - outside nav pill, aligned with page content */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img
              alt="RobotMart"
              className="h-10 w-auto object-contain" src="/lovable-uploads/723ffb1f-5e05-4c03-8e1c-52d2a7bd8f63.png" />

            
          </Link>

          <nav
            className={`glass-subtle rounded-2xl px-5 flex-1 transition-all duration-300 ${scrolled ? "shadow-soft-lg" : "shadow-soft"}`}>
            
            <div className="flex items-center h-16 gap-4 whitespace-nowrap">
              {/* Mobile menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden rounded-xl" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto rounded-r-2xl">
                  <SheetTitle className="mb-4">
                    <img src={logoImg} alt="RobotMart" className="h-7 w-auto" />
                  </SheetTitle>
                  <div className="mb-4">
                    <SearchBar onNavigate={() => setMobileOpen(false)} />
                  </div>
                  <Button
                    asChild
                    className="w-full h-12 mb-4 rounded-pill font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Link to="/request-quote" onClick={() => setMobileOpen(false)}>
                      Request Quote
                    </Link>
                  </Button>
                  <nav className="space-y-1">
                    {NAV_ITEMS.map((item) =>
                    <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
                    )}
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-0.5 flex-1">
                {NAV_ITEMS.map((item) =>
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.sections && handleMenuEnter(item.label)}
                  onMouseLeave={handleMenuLeave}>
                  
                    <Link
                    to={item.link}
                    className="px-2.5 py-2 text-sm font-medium text-foreground/80 hover:text-primary flex items-center gap-1 transition-colors duration-250">
                    
                      {item.label}
                      {item.sections && <ChevronDown className="h-3 w-3" />}
                    </Link>
                    {item.sections && openMenu === item.label &&
                  <div
                    className="absolute top-full left-0 mt-1 glass rounded-2xl shadow-soft-lg p-5 min-w-[480px] grid grid-cols-2 gap-6 z-50"
                    onMouseEnter={() => handleMenuEnter(item.label)}
                    onMouseLeave={handleMenuLeave}>
                    
                        {item.sections.map((section) =>
                    <div key={section.title}>
                            <p className="font-semibold text-sm text-primary mb-2">{section.title}</p>
                            <ul className="space-y-1">
                              {section.items.map((sub) =>
                        <li key={sub.label}>
                                  <Link
                            to={sub.link}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-250 block py-1">
                            
                                    {sub.label}
                                  </Link>
                                </li>
                        )}
                            </ul>
                          </div>
                    )}
                      </div>
                  }
                  </div>
                )}
              </div>

              {/* Search */}
              <div className="hidden lg:block flex-1 lg:flex-initial lg:w-64">
                <SearchBar />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  size="sm"
                  className="hidden md:inline-flex h-11 rounded-pill px-4 font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Link to="/request-quote">Request Quote</Link>
                </Button>
                <CartDrawer />
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>);

};

interface NavItemType {
  label: string;
  link: string;
  sections?: {title: string;items: {label: string;link: string;}[];}[];
}

function MobileNavItem({ item, onClose }: {item: NavItemType;onClose: () => void;}) {
  const [open, setOpen] = useState(false);

  if (!item.sections) {
    return (
      <Link
        to={item.link}
        className="flex items-center min-h-[44px] py-2.5 px-4 rounded-xl text-base font-medium hover:bg-secondary transition-colors"
        onClick={onClose}>
        
        {item.label}
      </Link>);

  }

  return (
    <div>
      <button
        className="w-full flex items-center justify-between min-h-[44px] py-2.5 px-4 text-base font-medium hover:bg-secondary rounded-xl transition-colors"
        onClick={() => setOpen(!open)}>
        
        {item.label}
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {open &&
      <div className="pl-4 space-y-1 pb-2">
          {item.sections.map((section) =>
        <div key={section.title}>
              <p className="text-xs font-semibold text-primary px-4 py-1 uppercase tracking-wide">{section.title}</p>
              {section.items.map((sub) =>
          <Link
            key={sub.label}
            to={sub.link}
            className="flex items-center min-h-[44px] text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg px-4"
            onClick={onClose}>
            
                  {sub.label}
                </Link>
          )}
            </div>
        )}
        </div>
      }
    </div>);

}
