import { Seo } from "@/components/Seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { BUYING_GUIDES } from "@/content/buyingGuides";

const POPULAR_COLLECTIONS = [
  { label: "Humanoid Robots", href: "/products/humanoid-robots" },
  { label: "Quadruped Robots", href: "/products/quadruped-robots" },
  { label: "Robotic Arms", href: "/products/robotic-arms" },
  { label: "Pre-Owned Robots", href: "/products/pre-owned" },
  { label: "Accessories & Parts", href: "/products/robot-accessories" },
];

const FAQ_GROUPS: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "Ordering & Quotes",
    items: [
      {
        q: "Can I buy directly from the website?",
        a: "Yes — accessories and most in-stock items are available for direct checkout. High-value robots and custom configurations go through a quote-first review so we can confirm stock, configuration, freight, and lead time before payment.",
      },
      {
        q: "How fast do I get a quote?",
        a: "Most quotes are returned within one business day. Complex configurations or special-order items may take 2–3 business days while we confirm with the supplier.",
      },
      {
        q: "Do you offer education or volume pricing?",
        a: "Yes. Universities, research institutions, and qualifying volume orders receive tiered pricing. Mention your institution and quantity in the quote form.",
      },
    ],
  },
  {
    group: "Shipping & Lead Time",
    items: [
      {
        q: "How long does shipping take?",
        a: "In-stock accessories typically ship within 1–2 business days and arrive in 5–10 business days. Robots are 2–6 weeks depending on configuration and customs.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes. We ship worldwide. Duties and import taxes are the buyer's responsibility unless otherwise quoted as DDP.",
      },
      {
        q: "How are lithium batteries handled?",
        a: "All robot batteries ship as UN3481 dangerous goods via certified carriers with required hazmat documentation. This adds 3–5 business days to handling.",
      },
    ],
  },
  {
    group: "Warranty & Support",
    items: [
      {
        q: "What warranty comes with new robots?",
        a: "New robots include the manufacturer's standard warranty (typically 12 months parts and labor). Extended service plans are available for most platforms.",
      },
      {
        q: "What about used / pre-owned units?",
        a: "Pre-owned robots are inspected and function-tested, and include a 30-day RobotMart functional warranty. Manufacturer warranty does not transfer.",
      },
      {
        q: "Do you offer engineering support?",
        a: "Yes — we offer paid onboarding, ROS 2 integration help, and custom development. Use the Custom Development page to scope a project.",
      },
    ],
  },
  {
    group: "Payment & Compliance",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "Credit card, ACH / wire transfer, and approved purchase orders for qualifying institutions.",
      },
      {
        q: "Can you provide W-9 / banking documents?",
        a: "Yes. Request a vendor packet at hello@robotmart.store and we'll send our W-9, ACH details, and certificate of insurance.",
      },
    ],
  },
];

const FaqPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((g) =>
      g.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    ),
  };

  return (
    <div className="min-h-screen">
      <Seo
        title="Frequently Asked Questions — RobotMart"
        description="Answers to common questions about ordering robots, shipping, lead time, warranty, payment, and engineering support."
        path="/faq"
        jsonLd={jsonLd}
      />
      <section className="bg-gradient-to-br from-primary to-accent/20 text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Frequently Asked Questions</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            The questions buyers, researchers, and integrators ask most often. Can't find your answer? <Link to="/contact" className="underline">Contact us</Link>.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-14">
        {FAQ_GROUPS.map((g) => (
          <div key={g.group} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{g.group}</h2>
            <Accordion type="single" collapsible>
              {g.items.map((i, k) => (
                <AccordionItem key={k} value={`${g.group}-${k}`}>
                  <AccordionTrigger className="text-left">{i.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{i.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        <div className="rounded-2xl border p-6 text-center">
          <p className="font-semibold mb-2">Still have questions?</p>
          <p className="text-sm text-muted-foreground mb-4">Our team typically responds within one business day.</p>
          <div className="flex justify-center gap-3">
            <Button asChild variant="outline"><Link to="/contact">Contact us</Link></Button>
            <Button asChild><Link to="/request-quote">Request a quote</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
