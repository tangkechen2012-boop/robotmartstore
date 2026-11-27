import { useEffect } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowRight, BadgeCheck, Building2, ClipboardCheck, GraduationCap, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";

const BUYERS = [
  {
    icon: GraduationCap,
    title: "Universities and research labs",
    text: "Humanoid robots, dexterous hands, quadruped platforms, and robotics kits for embodied AI, control, perception, and manipulation research.",
  },
  {
    icon: Building2,
    title: "Enterprise robotics teams",
    text: "Qualified sourcing for industrial pilots, internal R&D, automation demos, human-robot interaction, and robotics innovation programs.",
  },
  {
    icon: ClipboardCheck,
    title: "Procurement and purchasing departments",
    text: "Listed product prices, configuration details, freight notes, and payment information for internal approval.",
  },
];

const PROCESS = [
  {
    icon: PackageCheck,
    title: "Model and configuration review",
    text: "We confirm the robot model, accessories, software, SDK, training needs, and intended application before purchase.",
  },
  {
    icon: BadgeCheck,
    title: "Supplier availability check",
    text: "We verify current availability, lead time, North America delivery options and approved product materials.",
  },
  {
    icon: Truck,
    title: "Freight and delivery planning",
    text: "For high-ticket or oversized robots, freight, duties, packaging, battery restrictions, and delivery terms can be discussed with our team.",
  },
  {
    icon: ShieldCheck,
    title: "Procurement documentation",
    text: "We prepare purchase-ready details for PO or wire transfer workflows, including validity window and support assumptions.",
  },
];

const ProcurementPage = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "RobotMart B2B Robotics Procurement",
      provider: {
        "@type": "Organization",
        name: "RobotMart",
        url: "https://www.robotmart.store",
      },
      areaServed: ["United States", "Canada"],
      serviceType: "Robotics procurement support",
      description:
        "B2B procurement support for humanoid robots, quadruped robots, dexterous hands, robotics accessories, and research platforms.",
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="B2B Robotics Procurement — RobotMart"
        description="Robotics procurement for schools, labs, and enterprise teams. Listed product prices, direct checkout, and configuration support."
        path="/procurement"
      />
      <section className="border-b bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 py-14 lg:py-18">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-center">
            <div>
              <p className="text-sm font-semibold text-primary">B2B robotics sourcing</p>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
                Robotics procurement for schools, labs, and enterprise teams
              </h1>
              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                RobotMart helps North American buyers source advanced robotics platforms with listed prices and direct checkout.
                Contact us for configuration guidance and procurement support.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="font-semibold" asChild>
                  <Link to="/contact">
                    Contact procurement support <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="font-semibold" asChild>
                  <Link to="/products/humanoid-robots">Browse humanoid robots</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-5">
              <h2 className="text-lg font-bold">What we can prepare</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><BadgeCheck className="h-4 w-4 text-primary mt-0.5" /> Product model and configuration summary</li>
                <li className="flex gap-2"><BadgeCheck className="h-4 w-4 text-primary mt-0.5" /> Supplier availability and lead time check</li>
                <li className="flex gap-2"><BadgeCheck className="h-4 w-4 text-primary mt-0.5" /> Freight, duties, and delivery notes</li>
                <li className="flex gap-2"><BadgeCheck className="h-4 w-4 text-primary mt-0.5" /> Application support requirements</li>
                <li className="flex gap-2"><BadgeCheck className="h-4 w-4 text-primary mt-0.5" /> Product details for PO or wire transfer approval</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-5">
          {BUYERS.map((buyer) => (
            <article key={buyer.title} className="rounded-lg border bg-card p-6">
              <div className="h-11 w-11 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                <buyer.icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold">{buyer.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{buyer.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold">Procurement support for complex robotics purchases</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Products with a listed price are available for direct checkout, including high-ticket robots.
              Contact us for help comparing configurations or preparing internal procurement documentation.
            </p>
          </div>
          <div className="mt-8 grid md:grid-cols-4 gap-5">
            {PROCESS.map((step) => (
              <article key={step.title} className="rounded-lg border bg-background p-5">
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Robotics categories we can source</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                "Humanoid robots for research and education",
                "Quadruped robots for inspection and development",
                "Dexterous hands and manipulation hardware",
                "Robotics sensors, accessories, and development kits",
                "Desktop companion robots and education kits",
                "Custom robotics integration and training packages",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <BadgeCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-bold">Need procurement support?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              View listed prices and purchase on the product page. For procurement support, share the model,
              quantity, target delivery country, use case, budget range, and timeline via Contact.
            </p>
            <Button className="mt-5 w-full font-semibold" asChild>
              <Link to="/contact">Contact us</Link>
            </Button>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default ProcurementPage;
