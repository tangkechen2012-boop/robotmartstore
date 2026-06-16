import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const product = searchParams.get("product") || "";
  const requestType = searchParams.get("type") || "inquiry";
  const subject = product
    ? `${requestType === "preorder" ? "Pre-order terms" : "Quote request"}: ${product}`
    : "";
  const message = product
    ? `I am interested in ${product}. Please share pricing, availability, lead time, shipping options, warranty, and purchase terms.`
    : "";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = [form.get("firstName"), form.get("lastName")].filter(Boolean).join(" ");
    const lines = [
      `Name: ${name || "Not specified"}`,
      `Email: ${form.get("email") || "Not specified"}`,
      `Company: ${form.get("company") || "Not specified"}`,
      "",
      "Message:",
      `${form.get("message") || "Not specified"}`,
    ];
    const mailto = new URL("mailto:hello@robotmart.store");
    mailto.searchParams.set("subject", String(form.get("subject") || "RobotMart inquiry"));
    mailto.searchParams.set("body", lines.join("\n"));
    window.location.href = mailto.toString();
  };

  return (
    <div className="min-h-screen">
      <Seo
        title="Contact RobotMart — Robotics Sales & Support"
        description="Contact RobotMart for product inquiries, quotes, service consultations, and custom robotics development projects."
        path="/contact"
      />
      <section className="bg-gradient-to-br from-primary to-accent/20 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Contact RobotMart</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl leading-relaxed">
            Get in touch with our team for product inquiries, service consultations, or custom development projects.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <Input name="firstName" placeholder="First Name" className="rounded-xl h-11" />
                <Input name="lastName" placeholder="Last Name" className="rounded-xl h-11" />
              </div>
              <Input name="email" placeholder="Email Address" type="email" className="rounded-xl h-11" required />
              <Input name="company" placeholder="Company (optional)" className="rounded-xl h-11" />
              <Input name="subject" placeholder="Subject" defaultValue={subject} className="rounded-xl h-11" />
              <Textarea name="message" placeholder="Tell us about your project or inquiry..." defaultValue={message} className="rounded-xl min-h-[120px]" />
              <Button size="lg" className="rounded-pill px-8 font-semibold w-full sm:w-auto">Send Message</Button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-muted-foreground">hello@robotmart.store</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl border p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (318) 608-2420</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl border p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Office</p>
                    <p className="text-sm text-muted-foreground">San Francisco, CA, United States</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
