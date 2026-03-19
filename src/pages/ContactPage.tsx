import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
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
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" className="rounded-xl h-11" />
                <Input placeholder="Last Name" className="rounded-xl h-11" />
              </div>
              <Input placeholder="Email Address" type="email" className="rounded-xl h-11" />
              <Input placeholder="Company (optional)" className="rounded-xl h-11" />
              <Input placeholder="Subject" className="rounded-xl h-11" />
              <Textarea placeholder="Tell us about your project or inquiry..." className="rounded-xl min-h-[120px]" />
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
                    <p className="text-sm text-muted-foreground">support@robotmart.store</p>
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
                    <p className="text-sm text-muted-foreground"><p className="text-sm text-muted-foreground">+1 (917) 293-4778</p></p>
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
