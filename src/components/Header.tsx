import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Search, User, Menu, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/CartDrawer";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const MEGA_MENU_DATA = [
  {
    label: "Shop",
    sections: [
      {
        title: "Robots",
        link: "/collections/all",
        items: [
          { label: "Humanoid Robots", link: "/humanoid-robots" },
          { label: "Quadruped Robots", link: "/quadruped-robots" },
          { label: "Robotic Arms", link: "/robotic-arms" },
          { label: "Industrial Robots", link: "/industrial-robots" },
          { label: "Educational Robotics", link: "/educational-robotics" },
          { label: "Drones / UGV / UUV", link: "/collections/drones" },
        ],
      },
      {
        title: "Robot Parts & Components",
        link: "/robot-parts",
        items: [
          { label: "Motors & Actuators", link: "/robot-parts/motors" },
          { label: "Controllers", link: "/robot-parts/controllers" },
          { label: "Sensors", link: "/robot-parts/sensors" },
          { label: "Batteries & Power", link: "/robot-parts/batteries" },
          { label: "Cables & Connectors", link: "/collections/cables" },
          { label: "Mechanical Parts", link: "/collections/mechanical" },
          { label: "AI Compute Modules", link: "/collections/ai-compute" },
        ],
      },
      {
        title: "Tools & Equipment",
        link: "/collections/tools",
        items: [
          { label: "3D Printing", link: "/collections/3d-printing" },
          { label: "Lab Power Supplies", link: "/collections/lab-power" },
          { label: "Measuring Tools", link: "/collections/measuring" },
          { label: "Soldering", link: "/collections/soldering" },
        ],
      },
    ],
  },
  {
    label: "Applications",
    sections: [
      {
        title: "By Use Case",
        link: "/applications",
        items: [
          { label: "Education", link: "/applications/education" },
          { label: "Research Labs", link: "/applications/research" },
          { label: "Industrial Automation", link: "/applications/industrial-automation" },
          { label: "AI Development", link: "/applications/ai-development" },
        ],
      },
    ],
  },
];

const NAV_LINKS = [
  { label: "Brands", link: "/brands" },
  { label: "B2B / RFQ", link: "/b2b" },
  { label: "Resources", link: "/resources" },
  { label: "Blog", link: "/blog" },
  { label: "Support", link: "/support" },
];

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleMenuEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-[hsl(var(--robot-navy))] text-[hsl(var(--robot-light))]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8 text-xs">
          <div className="flex gap-4">
            <span>Free shipping on US orders over $500</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Authorized robotics distributor</span>
          </div>
          <div className="flex gap-3">
            <Link to="/support" className="hover:underline">Help</Link>
            <Link to="/b2b" className="hover:underline">B2B / RFQ</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center h-14 gap-4">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetTitle className="text-lg font-bold text-primary mb-4">RoboMart</SheetTitle>
              <nav className="space-y-1">
                {MEGA_MENU_DATA.map(menu => (
                  <MobileMenuSection key={menu.label} menu={menu} onClose={() => setMobileOpen(false)} />
                ))}
                {NAV_LINKS.map(link => (
                  <Link key={link.label} to={link.link} className="block py-2 px-3 rounded hover:bg-muted text-sm font-medium" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="text-xl font-extrabold tracking-tight text-primary mr-4 flex-shrink-0">
            RoboMart
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {MEGA_MENU_DATA.map(menu => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => handleMenuEnter(menu.label)}
                onMouseLeave={handleMenuLeave}
              >
                <button className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center gap-1 transition-colors">
                  {menu.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
                {openMenu === menu.label && (
                  <div
                    className="absolute top-full left-0 bg-card border rounded-md shadow-lg p-5 min-w-[600px] grid grid-cols-2 gap-6 z-50"
                    onMouseEnter={() => handleMenuEnter(menu.label)}
                    onMouseLeave={handleMenuLeave}
                  >
                    {menu.sections.map(section => (
                      <div key={section.title}>
                        <Link to={section.link} className="font-semibold text-sm text-primary hover:underline">
                          {section.title}
                        </Link>
                        <ul className="mt-1.5 space-y-0.5">
                          {section.items.map(item => (
                            <li key={item.label}>
                              <Link to={item.link} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                {item.label}
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
            {NAV_LINKS.map(link => (
              <Link key={link.label} to={link.link} className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="flex-1 lg:flex-initial lg:w-72 relative">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search robots, parts, kits..."
                className="pl-8 h-9 text-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/account"><User className="h-5 w-5" /></Link>
            </Button>
            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
};

function MobileMenuSection({ menu, onClose }: { menu: typeof MEGA_MENU_DATA[0]; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="w-full flex items-center justify-between py-2 px-3 text-sm font-medium hover:bg-muted rounded" onClick={() => setOpen(!open)}>
        {menu.label}
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {open && (
        <div className="pl-4 space-y-2 pb-2">
          {menu.sections.map(section => (
            <div key={section.title}>
              <Link to={section.link} className="text-xs font-semibold text-primary" onClick={onClose}>{section.title}</Link>
              <div className="pl-2 space-y-0.5 mt-0.5">
                {section.items.map(item => (
                  <Link key={item.label} to={item.link} className="block text-xs text-muted-foreground hover:text-foreground" onClick={onClose}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
