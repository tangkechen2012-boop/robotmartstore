import { Seo } from "@/components/Seo";
import { useShopifyPolicy } from "@/hooks/useShopifyProducts";
import { ShopifyPolicyKey } from "@/lib/shopify";

const FALLBACK_DESCRIPTIONS: Record<ShopifyPolicyKey, string> = {
  privacyPolicy: "How RobotMart collects, uses, and protects customer data.",
  termsOfService: "RobotMart terms governing website use, purchases, services, and robotics procurement.",
  refundPolicy: "RobotMart return, refund, cancellation, and restocking rules for robotics products.",
  shippingPolicy: "RobotMart shipping, delivery, freight, customs, and inspection policy.",
};

const FALLBACK_TITLES: Record<ShopifyPolicyKey, string> = {
  privacyPolicy: "Privacy Policy",
  termsOfService: "Terms of Service",
  refundPolicy: "Return and Refund Policy",
  shippingPolicy: "Shipping Policy",
};

const FALLBACK_BODIES: Record<ShopifyPolicyKey, string> = {
  refundPolicy: `
    <p>RobotMart supplies robotics hardware, robot parts, accessories, and selected high-value robot systems. Because many products require configuration, supplier confirmation, battery handling, freight review, or technical support, returns must be reviewed before they are accepted.</p>
    <h2>Return window</h2>
    <p>Eligible items may be returned within 14 days after delivery. To start a return, contact hello@robotmart.store with your order number, product name, reason for return, photos of the product and packaging, and any supporting documentation.</p>
    <h2>Return shipping and restocking fee</h2>
    <p>Customers are responsible for return shipping unless the return is caused by a RobotMart error or an approved product defect. A restocking fee of up to 20% may apply after inspection.</p>
    <h2>Non-returnable items</h2>
    <p>Custom-configured robots, special-order robots, used or pre-owned robots, opened or activated robots, software licenses, digital products, custom development services, consulting services, and products that have been assembled, modified, damaged, programmed, installed, or soldered are not eligible for return unless approved by RobotMart in writing.</p>
    <h2>Cancellations</h2>
    <p>Orders may be cancelled before fulfillment if the product has not entered shipment, supplier reservation, customization, production, or procurement. Once an item is fulfilled or committed with a supplier, cancellation may be treated as a return request and may be subject to applicable fees.</p>
    <h2>Refunds</h2>
    <p>Approved refunds are issued to the original payment method after the returned item is received and inspected. Shipping charges, customs duties, payment processing fees, and special handling fees may be non-refundable unless otherwise required by law.</p>
  `,
  shippingPolicy: `
    <p>RobotMart ships robotics products, parts, accessories, and selected high-value robots to the United States and selected international destinations.</p>
    <h2>Shipping methods</h2>
    <p>Shipping options may include standard parcel, express parcel, freight forwarding, or custom logistics depending on product size, weight, battery configuration, destination, and supplier availability.</p>
    <h2>Lead times</h2>
    <p>In-stock direct-sale items usually ship after order processing. Quote-required robots, special-order robots, custom-configured systems, and pre-owned units may require supplier confirmation before final shipping timelines are provided.</p>
    <h2>Duties, taxes, and customs</h2>
    <p>Customers are responsible for applicable import duties, taxes, customs clearance charges, remote-area fees, brokerage fees, and destination charges unless a written quote states otherwise.</p>
    <h2>Battery and oversized items</h2>
    <p>Robots with lithium batteries, oversized packages, heavy systems, or special transport requirements may have shipping restrictions or require additional documentation.</p>
    <h2>Inspection on delivery</h2>
    <p>Please inspect packages promptly after delivery. If a package is damaged, photograph the outer packaging, inner packaging, shipping label, and product condition, then contact RobotMart as soon as possible.</p>
  `,
  termsOfService: `
    <p>These Terms of Service govern your use of RobotMart and your purchase of robotics products, robot parts, accessories, procurement support, consulting, and custom development services.</p>
    <h2>Robotics product use</h2>
    <p>Robotics products may involve moving parts, batteries, software, sensors, autonomous behavior, and integration risks. Customers are responsible for evaluating suitability, safety, compatibility, local regulations, and application requirements before use.</p>
    <h2>Product information and quotes</h2>
    <p>Product specifications, images, pricing, availability, lead time, warranty, and freight terms may change. High-value robots and custom systems may require written confirmation before purchase or fulfillment.</p>
    <h2>Orders and payment</h2>
    <p>An order is accepted only after payment or approved purchase terms are confirmed. RobotMart may cancel or review orders affected by pricing errors, supplier availability, compliance concerns, shipping limitations, or suspected fraud.</p>
    <h2>Consulting and custom development</h2>
    <p>Consulting, application engineering, integration support, and custom development services are scoped separately. Deliverables, timelines, acceptance criteria, fees, and intellectual property terms may require a separate written agreement.</p>
    <h2>Limitation of liability</h2>
    <p>To the maximum extent permitted by law, RobotMart is not liable for indirect, incidental, special, consequential, or punitive damages arising from product use, system integration, delays, or business interruption.</p>
  `,
  privacyPolicy: `
    <p>RobotMart collects and processes personal information to operate our website, respond to inquiries, process orders, provide customer support, improve services, and comply with legal obligations.</p>
    <h2>Information we collect</h2>
    <p>We may collect contact details, billing and shipping information, order history, inquiry details, company information, device information, analytics data, and communications with our team.</p>
    <h2>How we use information</h2>
    <p>We use personal information to process transactions, arrange shipping, answer support requests, provide quotes, improve our website, prevent fraud, and send service or marketing communications where permitted.</p>
    <h2>Service providers</h2>
    <p>We may share information with Shopify, payment processors, shipping carriers, analytics providers, marketing tools, suppliers, and service providers who help us operate RobotMart.</p>
    <h2>Your choices</h2>
    <p>You may contact hello@robotmart.store to request access, correction, deletion, or other privacy-related assistance, subject to applicable law and verification requirements.</p>
  `,
};

interface ShopifyPolicyPageProps {
  policyKey: ShopifyPolicyKey;
  path: string;
}

const ShopifyPolicyPage = ({ policyKey, path }: ShopifyPolicyPageProps) => {
  const { data: policy, isLoading, error } = useShopifyPolicy(policyKey);
  const title = policy?.title || FALLBACK_TITLES[policyKey];
  const description = FALLBACK_DESCRIPTIONS[policyKey];
  const body = policy?.body || FALLBACK_BODIES[policyKey];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Seo title={`${title} — RobotMart`} description={description} path={path} />
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      {isLoading && (
        <p className="mb-4 text-sm text-muted-foreground">Loading the latest Shopify policy...</p>
      )}

      {!isLoading && error && (
        <p className="mb-4 rounded-md border bg-secondary/40 p-3 text-sm text-muted-foreground">
          Showing RobotMart's local policy copy. Please contact hello@robotmart.store if you need confirmation before purchase.
        </p>
      )}

      <div
        className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
};

export default ShopifyPolicyPage;
