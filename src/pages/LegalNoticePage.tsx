import { Seo } from "@/components/Seo";

const LegalNoticePage = () => (
  <div className="max-w-4xl mx-auto px-4 py-10">
    <Seo
      title="Legal Notice — RobotMart"
      description="RobotMart company, contact, website ownership, and legal information."
      path="/policies/legal-notice"
    />
    <h1 className="text-3xl font-bold mb-6">Legal Notice</h1>
    <div className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground">
      <p>
        RobotMart is a robotics sourcing, e-commerce, procurement, consulting, and application engineering platform.
      </p>
      <h2>Business information</h2>
      <p>
        Trade name: RobotMart<br />
        Legal entity: KCT Ecommerce Inc<br />
        Email: hello@robotmart.store<br />
        Phone: +1 (318) 608-2420<br />
        Website: https://www.robotmart.store
      </p>
      <h2>Use of website content</h2>
      <p>
        Product names, manufacturer names, trademarks, images, and specifications are used for identification,
        product sourcing, quotation, and customer information purposes. Manufacturer trademarks remain the property
        of their respective owners.
      </p>
      <h2>Product information</h2>
      <p>
        Robotics products may require configuration, supplier confirmation, freight review, customs review, warranty
        confirmation, and application engineering review before purchase or delivery. RobotMart may update product
        information, pricing, availability, and lead time without prior notice.
      </p>
    </div>
  </div>
);

export default LegalNoticePage;
