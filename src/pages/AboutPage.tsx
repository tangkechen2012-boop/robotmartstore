import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  ClipboardCheck,
  MessageSquare,
  ArrowRight,
  Search,
  FileText,
  Truck,
  LifeBuoy,
} from "lucide-react";
import { Seo } from "@/components/Seo";

const PROCESS_STEPS = [
  {
    icon: Search,
    title: "Scope",
    body: "Tell us the platform, configuration, quantity, country, and timeline. We confirm what's possible before quoting.",
  },
  {
    icon: FileText,
    title: "Quote",
    body: "We return a written quote covering unit price, freight, duties (where applicable), warranty assumptions, and lead time.",
  },
  {
    icon: Truck,
    title: "Ship",
    body: "We coordinate hazmat documentation, customs paperwork, and insured freight. You receive tracking end-to-end.",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    body: "Onboarding, ROS 2 integration help, and post-sale escalation handled by engineers, not a generic inbox.",
  },
];

const AboutPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RobotMart",
    legalName: "KCT Ecommerce Inc",
    url: "https://www.robotmart.store",
    email: "hello@robotmart.store",
    telephone: "+1-318-608-2420",
  };

  return (
    <div className="min-h-screen">
      <Seo
        title="About RobotMart — Professional Robotics Sourcing"
        description="RobotMart is an independent robotics sourcing, e-commerce, procurement, and engineering platform for education, research, and enterprise buyers."
        path="/about"
        jsonLd={jsonLd}
      />

      <section className="bg-gradient-to-br from-primary to-accent/20 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About RobotMart</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl leading-relaxed">
            We help labs, universities, integrators, and enterprises source the right robot — without the marketing fog.
            RobotMart is operated by KCT Ecommerce Inc.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl font-bold mb-6">What we do</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            RobotMart sources humanoid robots, quadrupeds, robotic arms, and accessories from leading manufacturers and a
            curated network of suppliers. We handle the configuration choices, hazmat freight, customs paperwork, and
            post-sale escalation that buyers shouldn't have to figure out alone.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Some products are available for direct checkout. High-value robots, used units, and custom configurations go
            through a quote-first review so configuration, lead time, freight, duties, warranty, and support scope are
            confirmed before payment.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We are not the manufacturer of the third-party brands shown on this website. Brand names and images are used
            to identify products for sourcing and resale. Unless a product page states otherwise, RobotMart is not an
            exclusive authorized distributor.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: ClipboardCheck, title: "Quote-first review", text: "Configuration, freight, duties, and warranty are confirmed before complex purchases." },
            { icon: BadgeCheck, title: "Clear purchase path", text: "Direct-sale items show checkout; quote items request confirmation before payment." },
            { icon: MessageSquare, title: "Human support", text: "Reach us by email, phone, and quote form. Engineers, not bots." },
            { icon: Truck, title: "Hazmat logistics", text: "UN3481 lithium battery documentation and insured freight handled in-house." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border bg-card p-5">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <p className="font-bold mb-1">{title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/30 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl font-bold mb-3">How we work</h2>
            <p className="text-muted-foreground">
              A predictable, four-step process for every robot we ship.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.title} className="rounded-2xl bg-card border p-6">
                <div className="flex items-center gap-2 mb-3 text-primary">
                  <span className="text-xs font-mono opacity-60">0{i + 1}</span>
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="font-bold mb-1">{s.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-4">Brands & suppliers</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We source from leading robotics manufacturers including Unitree, Booster Robotics, Noetix, LinkerBot, and a
              curated network of component suppliers. Brand availability changes; the most accurate snapshot is always the{" "}
              <Link to="/brands" className="text-primary underline">Brands page</Link>.
            </p>
            <Button asChild variant="outline" className="rounded-pill">
              <Link to="/brands">See all brands <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <p className="font-bold mb-2">A note on transparency</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We don't publish fabricated customer reviews or stock photos of teams we don't have. As we collect signed
              case studies and testimonials from real deployments, they'll appear here. If you've worked with us and would
              like to be featured, please{" "}
              <Link to="/contact" className="text-primary underline">get in touch</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-20 text-center">
        <div className="glass rounded-2xl p-10 shadow-soft-lg">
          <h2 className="text-2xl font-bold mb-3">Talk to an engineer</h2>
          <p className="text-muted-foreground mb-6">
            Tell us your platform, quantity, and country. We'll come back with a written quote within one business day.
          </p>
          <div className="flex justify-center gap-3">
            <Button size="lg" variant="outline" asChild className="rounded-pill px-6">
              <Link to="/contact">Contact us</Link>
            </Button>
            <Button size="lg" asChild className="rounded-pill px-6 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/request-quote">Request a quote <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
