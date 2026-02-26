import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Truck, RotateCcw, Shield, Clock, Mail, Building2 } from "lucide-react";

const SupportPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Support Center</h1>
      <p className="text-muted-foreground mb-8">Find answers, get help, and explore our policies.</p>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { icon: Truck, label: "Shipping", id: "shipping" },
          { icon: RotateCcw, label: "Returns", id: "returns" },
          { icon: Shield, label: "Warranty", id: "warranty" },
          { icon: Building2, label: "B2B / RFQ", id: "b2b" },
        ].map(item => (
          <a key={item.id} href={`#${item.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <item.icon className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">{item.label}</span>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <Accordion type="multiple">
          <AccordionItem value="order">
            <AccordionTrigger>How do I track my order?</AccordionTrigger>
            <AccordionContent>
              Once your order ships, you'll receive a tracking email with a link to monitor your delivery status in real-time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="international">
            <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
            <AccordionContent>
              Yes! We ship to most countries. International shipping rates and delivery times vary by destination. Customs duties may apply.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="return-process">
            <AccordionTrigger>What is your refund policy?</AccordionTrigger>
            <AccordionContent>
              All sales are final. No returns or refunds will be accepted for non-quality issues. If you receive a product with a genuine quality defect, contact us within 30 days with documentation and we'll arrange a resolution.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="warranty-claim">
            <AccordionTrigger>How do I make a warranty claim?</AccordionTrigger>
            <AccordionContent>
              Contact us with your order number and description of the issue. We'll coordinate with the manufacturer to resolve it.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="bulk">
            <AccordionTrigger>Do you offer bulk/education discounts?</AccordionTrigger>
            <AccordionContent>
              Absolutely! Fill out our B2B/RFQ form below or contact us directly for volume pricing and education partnerships.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Shipping Policy */}
      <section id="shipping" className="mb-10 scroll-mt-20">
        <h2 className="text-xl font-bold mb-3">Shipping Policy</h2>
        <Card>
          <CardContent className="p-5 text-sm text-muted-foreground space-y-2">
            <p>• <strong>Free standard shipping</strong> on orders over $99 (US domestic)</p>
            <p>• Standard shipping: 3-7 business days</p>
            <p>• Express shipping: 1-3 business days (additional charge)</p>
            <p>• International shipping: 7-21 business days depending on destination</p>
            <p>• All orders include tracking information</p>
            <p>• Hazardous materials (LiPo batteries) may have shipping restrictions</p>
          </CardContent>
        </Card>
      </section>

      {/* Returns */}
      <section id="returns" className="mb-10 scroll-mt-20">
        <h2 className="text-xl font-bold mb-3">Returns & Refunds</h2>
        <Card>
          <CardContent className="p-5 text-sm text-muted-foreground space-y-2">
            <p>• <strong className="text-foreground">All sales are final</strong></p>
            <p>• No returns or refunds will be accepted for non-quality issues</p>
            <p>• Quality defects must be reported within 30 days of delivery with documentation</p>
            <p>• Defective items may be repaired, replaced, or refunded at our discretion</p>
            <p>• Please verify specifications and compatibility before ordering</p>
          </CardContent>
        </Card>
      </section>

      {/* Warranty */}
      <section id="warranty" className="mb-10 scroll-mt-20">
        <h2 className="text-xl font-bold mb-3">Warranty</h2>
        <Card>
          <CardContent className="p-5 text-sm text-muted-foreground space-y-2">
            <p>• All products include manufacturer warranty</p>
            <p>• Warranty periods vary by manufacturer and product category</p>
            <p>• We facilitate warranty claims on your behalf</p>
            <p>• Keep your order confirmation as proof of purchase</p>
          </CardContent>
        </Card>
      </section>

      {/* B2B */}
      <section id="b2b" className="mb-10 scroll-mt-20">
        <h2 className="text-xl font-bold mb-3">B2B / Enterprise / RFQ</h2>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground mb-4">
              Need bulk pricing, custom configurations, or enterprise support? Fill out our inquiry form and our team will respond within 1 business day.
            </p>
            <form className="space-y-3" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input placeholder="Company Name" />
                <Input placeholder="Contact Name" />
                <Input placeholder="Email" type="email" />
                <Input placeholder="Phone (optional)" />
              </div>
              <Textarea placeholder="Tell us about your project, required products, and quantities..." className="min-h-[100px]" />
              <Button className="bg-primary text-primary-foreground">Submit Inquiry</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Contact */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@robomart.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Business Hours</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm PST</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <h3 className="font-medium text-sm mb-3">Send us a message</h3>
              <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                <Input placeholder="Your email" type="email" />
                <Input placeholder="Subject" />
                <Textarea placeholder="Your message..." className="min-h-[80px]" />
                <Button size="sm">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
