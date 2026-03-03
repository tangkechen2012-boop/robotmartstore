import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, Headphones, BrainCircuit, Code2, Shield, ArrowRight, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect } from "react";

const SERVICES = [
  {
    icon: Wrench,
    title: "System Integration",
    description: "We integrate robotic platforms into your existing infrastructure — from mechanical mounting and sensor calibration to network configuration and software deployment. Our integration engineers ensure seamless interoperability between robots, control systems, and your operational environment.",
  },
  {
    icon: Headphones,
    title: "Technical Support & Training",
    description: "Comprehensive support packages including remote diagnostics, on-site troubleshooting, operator training, and programming workshops. Our support team includes robotics engineers with deep platform expertise across all major manufacturers.",
  },
  {
    icon: BrainCircuit,
    title: "AI Model Deployment",
    description: "Deploy perception, navigation, and manipulation AI models on your robotics platforms. We handle model optimization, edge inference setup, sensor fusion pipelines, and continuous learning infrastructure for production robotics applications.",
  },
  {
    icon: Code2,
    title: "SDK & API Support",
    description: "Custom SDK integration, API development, and middleware solutions for robotics platforms. We help your development team interface with robot control APIs, sensor data streams, and cloud analytics dashboards.",
  },
  {
    icon: Shield,
    title: "Lifecycle Maintenance",
    description: "Preventive maintenance programs, firmware updates, component replacement, and performance monitoring for deployed robotics systems. Extend the operational life and maximize ROI of your robotics investments.",
  },
];

const FAQS = [
  { q: "What industries do your robotics services support?", a: "We serve education, manufacturing, logistics, healthcare, defense, and research sectors with tailored robotics engineering services." },
  { q: "Do you offer on-site support?", a: "Yes. We provide on-site system integration, training, and maintenance services across the United States. International on-site support is available for enterprise contracts." },
  { q: "Can you integrate third-party AI models?", a: "Absolutely. Our AI deployment team works with custom and open-source models including ROS2-based stacks, NVIDIA Isaac, and proprietary perception pipelines." },
  { q: "What is your typical project timeline?", a: "Integration projects typically range from 2-8 weeks depending on complexity. We provide detailed timelines during the consultation phase." },
];

const ServicesPage = () => {
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-accent/20 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Robotics Engineering Services & Technology Solutions</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl leading-relaxed mb-8">
            From system integration and AI deployment to lifecycle maintenance, RobotMart's engineering team provides comprehensive services to help organizations adopt, operate, and scale advanced robotics platforms.
          </p>
          <Button size="lg" className="rounded-pill px-8 font-semibold bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <Link to="/contact">Request a Consultation <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid gap-8">
          {SERVICES.map((service, i) => (
            <div key={service.title} className="bg-card rounded-2xl border p-8 hover:shadow-soft transition-all duration-300 flex gap-6 items-start">
              <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <service.icon className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">{service.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/50 py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-2xl border px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="glass rounded-2xl p-10 shadow-soft-lg">
          <h2 className="text-2xl font-bold mb-4">Need Robotics Engineering Support?</h2>
          <p className="text-muted-foreground mb-6">Our engineering team is ready to discuss your project requirements.</p>
          <Button size="lg" className="rounded-pill px-8 font-semibold" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
