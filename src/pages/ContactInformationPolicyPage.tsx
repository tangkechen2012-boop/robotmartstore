import { Seo } from "@/components/Seo";

const ContactInformationPolicyPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-10">
    <Seo
      title="Contact Information — RobotMart"
      description="Official RobotMart contact information for customers, suppliers, and robotics procurement inquiries."
      path="/policies/contact-information"
    />
    <h1 className="text-3xl font-bold mb-6">Contact Information</h1>
    <div className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary">
      <p>
        Trade name: RobotMart<br />
        Legal entity: KCT Ecommerce Inc<br />
        Email: <a href="mailto:hello@robotmart.store">hello@robotmart.store</a><br />
        Phone: <a href="tel:+13186082420">+1 (318) 608-2420</a><br />
        Website: <a href="https://www.robotmart.store">https://www.robotmart.store</a>
      </p>
      <p>
        For product quotes, education procurement, enterprise purchasing, application engineering, and custom robotics
        development, please use the request quote form or email us with your product model, delivery country, use case,
        quantity, budget range, and required timeline.
      </p>
    </div>
  </div>
);

export default ContactInformationPolicyPage;
