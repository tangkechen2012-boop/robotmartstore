import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cog, Cpu, BrainCircuit, Boxes, TestTube2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect } from "react";

const PROCESS_STEPS = [
  { icon: TestTube2, title: "Discovery & Requirements", description: "We analyze your use case, operational environment, and performance criteria to define a clear development roadmap." },
  { icon: Cog, title: "Mechanical Design", description: "Custom mechanical engineering including CAD modeling, material selection, structural analysis, and DFM optimization." },
  { icon: Cpu, title: "Embedded Systems", description: "Custom PCB design, firmware development, sensor integration, motor control systems, and communication protocols." },
  { icon: BrainCircuit, title: "AI Integration", description: "Computer vision, SLAM navigation, manipulation planning, reinforcement learning, and edge AI deployment." },
  { icon: Boxes, title: "Prototyping & Testing", description: "Rapid prototyping, functional testing, environmental validation, and iterative refinement until production-ready." },
];

const FAQS = [
  { q: "What is the minimum project size for custom development?", a: "We work on projects ranging from single-prototype builds to fleet-scale production. Contact us to discuss your specific requirements and budget." },
  { q: "Do you provide IP ownership to clients?", a: "Yes. All custom development work is performed under clear IP agreements. Clients typically retain full ownership of custom designs and software." },
  { q: "What technologies do you use for embedded systems?", a: "We work with ARM Cortex, ESP32, STM32, NVIDIA Jetson, and custom FPGA solutions depending on project requirements." },
  { q: "How long does a typical custom robotics project take?", a: "Timelines range from 8-24 weeks depending on complexity. We provide detailed milestone-based schedules during the discovery phase." },
];

const CustomDevelopmentPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Custom Robotics Development & Engineering</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl leading-relaxed mb-8">
            End-to-end custom robotics engineering — from concept and mechanical design through embedded systems, AI integration, and production-ready prototyping. RobotMart's development team turns your vision into a working robotic system.
          </p>
          <Button size="lg" className="rounded-pill px-8 font-semibold bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <Link to="/contact">Start Your Project <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Development Process</h2>
        <div className="space-y-6">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-6 items-start">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                {i < PROCESS_STEPS.length - 1 && <div className="w-0.5 h-8 bg-border mt-2" />}
              </div>
              <div className="bg-card rounded-2xl border p-6 flex-1 hover:shadow-soft transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-pill">Step {i + 1}</span>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
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
          <h2 className="text-2xl font-bold mb-4">Have a Custom Robotics Project in Mind?</h2>
          <p className="text-muted-foreground mb-6">Let's discuss your requirements and build something extraordinary.</p>
          <Button size="lg" className="rounded-pill px-8 font-semibold" asChild>
            <Link to="/contact">Schedule a Call</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CustomDevelopmentPage;
