import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Factory, BrainCircuit, Search, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect } from "react";
import { Seo } from "@/components/Seo";

const APPS = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "STEM-aligned robotics platforms for K-12, universities, and vocational training. Our education solutions include programmable robots, curriculum guides, and teacher training programs designed to inspire the next generation of engineers.",
  },
  {
    icon: Factory,
    title: "Industrial Automation",
    description: "Scalable robotic automation solutions for manufacturing, assembly, quality inspection, and logistics. We help factories deploy collaborative robots, autonomous mobile robots, and vision-guided systems.",
  },
  {
    icon: BrainCircuit,
    title: "AI Development",
    description: "Hardware platforms and compute modules for robotics AI research and development. From NVIDIA Jetson-powered dev kits to full-scale humanoid platforms, we provide the tools AI researchers need.",
  },
  {
    icon: Search,
    title: "Inspection & Monitoring",
    description: "Autonomous inspection robots for infrastructure, energy, construction, and hazardous environments. Deploy quadruped and aerial robots for routine inspections, reducing human risk and operational costs.",
  },
];

const FAQS = [
  { q: "Can RoboMart help select the right robot for my application?", a: "Yes. Our application engineers provide free consultations to help you identify the optimal robotics platform for your specific use case, environment, and budget." },
  { q: "Do you offer pilot programs?", a: "Yes. We offer pilot and proof-of-concept programs for enterprise clients looking to evaluate robotics solutions before full-scale deployment." },
  { q: "What kind of training do you provide?", a: "We offer operator training, programming workshops, maintenance certification, and custom curriculum development for educational institutions." },
];

const ApplicationsPage = () => {
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
      <section className="bg-gradient-to-br from-primary to-accent/20 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Robotics Applications by Industry</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl leading-relaxed">
            Discover how organizations across education, manufacturing, AI research, and inspection are deploying robotics solutions from RoboMart to transform their operations.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {APPS.map(app => (
            <div key={app.title} className="bg-card rounded-2xl border p-8 hover:shadow-soft transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <app.icon className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-3">{app.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{app.description}</p>
            </div>
          ))}
        </div>
      </section>

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

      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="glass rounded-2xl p-10 shadow-soft-lg">
          <h2 className="text-2xl font-bold mb-4">Find the Right Solution for Your Application</h2>
          <p className="text-muted-foreground mb-6">Talk to our application engineers about your specific requirements.</p>
          <Button size="lg" className="rounded-pill px-8 font-semibold" asChild>
            <Link to="/contact">Request Consultation <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ApplicationsPage;
