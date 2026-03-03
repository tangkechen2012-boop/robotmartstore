import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What types of robotics systems does Robotmart provide?",
    a: "Robotmart offers humanoid robots, quadruped robots, industrial robotic arms, mobile robotics platforms (AMR/AGV), and AI-powered vision systems. We support both hardware sourcing and system-level integration.",
  },
  {
    q: "Do you provide system integration services?",
    a: "Yes. In addition to supplying robotics hardware, we provide engineering consultation, system integration, AI deployment, and on-site commissioning support depending on project requirements.",
  },
  {
    q: "Can systems be customized for specific applications?",
    a: "Most robotics platforms can be adapted or customized based on payload requirements, software integration, environmental constraints, and industry-specific deployment needs.",
  },
  {
    q: "Do you support enterprise and research institutions?",
    a: "Yes. Our clients include manufacturing facilities, universities, research laboratories, and automation-focused enterprises.",
  },
  {
    q: "What kind of technical support is available?",
    a: "We provide remote technical support, integration guidance, documentation, and long-term service assistance. On-site support may be arranged depending on project scope.",
  },
  {
    q: "Do you offer OEM or ODM collaboration?",
    a: "Yes. For selected products and projects, OEM and ODM collaboration is available upon request.",
  },
  {
    q: "How can I start a project discussion?",
    a: "You can submit an inquiry through the Contact page or request an engineering consultation to discuss system requirements and deployment planning.",
  },
];

export const FAQSection = () => (
  <section className="py-24 bg-secondary">
    <div className="max-w-3xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground text-sm">
          Technical, deployment, and procurement related questions.
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-2">
        {FAQS.map(({ q, a }, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-5 bg-background">
            <AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline">
              {q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
