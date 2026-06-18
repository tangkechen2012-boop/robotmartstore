import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BadgeCheck, ClipboardCheck, MessageSquare, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="About RobotMart — Professional Robotics Solutions"
        description="RobotMart is an independent robotics sourcing, e-commerce, procurement, consulting, and application engineering platform."
        path="/about"
      />
      <section className="bg-gradient-to-br from-primary to-accent/20 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About RobotMart</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl leading-relaxed">
            RobotMart is an independent robotics sourcing, e-commerce, procurement, consulting, and application engineering platform operated by KCT Ecommerce Inc.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">What RobotMart Does</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            RobotMart helps education, research, and enterprise buyers source robotics hardware, compare configurations, request quotes, and review practical deployment requirements before purchase.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Some products are available for direct checkout. Complex robots, used units, custom configurations, and high-value systems are reviewed through a quote-first process covering supplier availability, configuration, lead time, freight, duties, warranty assumptions, and support scope.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            RobotMart is not the manufacturer of the third-party brands shown on this website. Brand names, product names, images, and specifications are used to identify products for sourcing, resale, quotation, and customer information. Unless a product page states otherwise, RobotMart should not be interpreted as an official manufacturer-operated store or exclusive authorized distributor.
          </p>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ClipboardCheck, title: "Quote-first review", text: "Configuration, availability, freight, duties, warranty, and support are confirmed before complex robot purchases." },
            { icon: BadgeCheck, title: "Clear purchase path", text: "Direct-sale products show checkout availability; quote-required products request confirmation before payment." },
            { icon: MessageSquare, title: "Human support", text: "Customers can contact RobotMart by email, phone, quote form, and published policy pages before ordering." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold mb-1">{title}</p>
                <p className="text-sm opacity-70 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="glass rounded-2xl p-10 shadow-soft-lg">
          <h2 className="text-2xl font-bold mb-4">Partner With Us</h2>
          <p className="text-muted-foreground mb-6">Interested in working with RobotMart? We'd love to hear from you.</p>
          <Button size="lg" className="rounded-pill px-8 font-semibold" asChild>
            <Link to="/contact">Get in Touch <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
