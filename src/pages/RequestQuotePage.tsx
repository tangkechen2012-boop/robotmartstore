import { FormEvent, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Building2, CalendarClock, CheckCircle2, Mail, MessageSquare, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Seo } from "@/components/Seo";

const SUPPORT_EMAIL = "hello@robotmart.store";

const BUYER_TYPES = [
  "Education / university",
  "Research lab",
  "Enterprise / industrial team",
  "Systems integrator",
  "Distributor / reseller",
  "Individual buyer",
];

const QUOTE_STEPS = [
  {
    icon: MessageSquare,
    title: "Tell us what you need",
    text: "Share the robot model, use case, budget range, delivery country, and target timeline.",
  },
  {
    icon: ShieldCheck,
    title: "Supplier and delivery check",
    text: "We confirm configuration, availability, freight, duties, warranty, and support responsibilities.",
  },
  {
    icon: Truck,
    title: "Formal quote and purchase path",
    text: "We send a quote with payment terms, PO support, deposit options, and expected lead time.",
  },
];

const RequestQuotePage = () => {
  const [searchParams] = useSearchParams();
  const product = searchParams.get("product") || "";
  const requestType = searchParams.get("type") || "quote";

  const initialSubject = useMemo(() => {
    if (!product) return "RobotMart quote request";
    return `${requestType === "preorder" ? "Pre-order terms" : "Quote request"}: ${product}`;
  }, [product, requestType]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lines = [
      `Product: ${form.get("product") || product || "Not specified"}`,
      `Buyer type: ${form.get("buyerType") || "Not specified"}`,
      `Name: ${form.get("name") || "Not specified"}`,
      `Company: ${form.get("company") || "Not specified"}`,
      `Email: ${form.get("email") || "Not specified"}`,
      `Phone: ${form.get("phone") || "Not specified"}`,
      `Delivery country: ${form.get("deliveryCountry") || "Not specified"}`,
      `Timeline: ${form.get("timeline") || "Not specified"}`,
      `Budget: ${form.get("budget") || "Not specified"}`,
      "",
      "Use case / requirements:",
      `${form.get("requirements") || "Not specified"}`,
    ];
    const mailto = new URL(`mailto:${SUPPORT_EMAIL}`);
    mailto.searchParams.set("subject", String(form.get("subject") || initialSubject));
    mailto.searchParams.set("body", lines.join("\n"));
    window.location.href = mailto.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Request a Robotics Quote — RobotMart"
        description="Get pricing, lead time, freight, warranty, and purchase terms for humanoid robots, quadruped systems, and robotics accessories."
        path="/request-quote"
      />
      <section className="border-b bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-3xl">
            <Link to="/products" className="text-sm font-medium text-primary hover:underline">
              Browse robots
            </Link>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">
              Request a robotics quote
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              Get pricing, availability, lead time, shipping, warranty, and purchase terms for humanoid robots,
              quadruped systems, dexterous hands, and robotics accessories.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border bg-card p-5 md:p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-medium">Product</span>
                <Input name="product" defaultValue={product} placeholder="Robot or accessory model" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Buyer type</span>
                <select
                  name="buyerType"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  defaultValue=""
                >
                  <option value="" disabled>Select buyer type</option>
                  {BUYER_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-medium">Name</span>
                <Input name="name" placeholder="Your name" required />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Company</span>
                <Input name="company" placeholder="Company or organization" />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-medium">Email</span>
                <Input name="email" type="email" placeholder="you@example.com" required />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Phone</span>
                <Input name="phone" placeholder="+1 ..." />
              </label>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-medium">Delivery country</span>
                <Input name="deliveryCountry" defaultValue="United States" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Timeline</span>
                <Input name="timeline" placeholder="ASAP, 30 days, Q3..." />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Budget</span>
                <Input name="budget" placeholder="$5k, $50k, PO..." />
              </label>
            </div>

            <label className="space-y-2 block">
              <span className="text-sm font-medium">Subject</span>
              <Input name="subject" defaultValue={initialSubject} />
            </label>

            <label className="space-y-2 block">
              <span className="text-sm font-medium">Use case and requirements</span>
              <Textarea
                name="requirements"
                className="min-h-[160px]"
                defaultValue={
                  product
                    ? `I am interested in ${product}. Please share pricing, availability, lead time, shipping options, warranty, and purchase terms.`
                    : ""
                }
                placeholder="Tell us how you plan to use the robot, required configuration, accessories, delivery location, and purchase process."
              />
            </label>

            <Button size="lg" className="w-full md:w-auto px-8 font-semibold">
              <Mail className="h-4 w-4 mr-2" />
              Send quote request
            </Button>
          </form>

          <aside className="space-y-4">
            <div className="rounded-lg border bg-card p-5">
              <h2 className="text-lg font-bold">What we confirm before quoting</h2>
              <div className="mt-4 space-y-4">
                {QUOTE_STEPS.map((step) => (
                  <div key={step.title} className="flex gap-3">
                    <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <step.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{step.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border bg-card p-5">
              <h2 className="text-lg font-bold">Purchase options</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> Purchase orders for schools, labs, and companies</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> Wire transfer and deposit terms for high-ticket robots</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> Education, research, and reseller pricing review</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> Freight, duties, warranty, and delivery coordination</li>
              </ul>
            </div>

            <div className="rounded-lg border bg-secondary/40 p-5">
              <div className="flex items-center gap-2 font-semibold">
                <CalendarClock className="h-4 w-4 text-primary" />
                Typical response window
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Standard products can usually be reviewed within 1 business day. Complex humanoid or industrial robot
                quotes may require supplier confirmation before final pricing.
              </p>
            </div>

            <div className="rounded-lg border bg-secondary/40 p-5">
              <div className="flex items-center gap-2 font-semibold">
                <Building2 className="h-4 w-4 text-primary" />
                Need a formal procurement packet?
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                We can prepare quote details for internal purchasing teams, including model, configuration, lead time,
                freight notes, warranty, and payment terms.
              </p>
              <Button variant="link" className="mt-2 h-auto p-0 font-semibold" asChild>
                <Link to="/procurement">View B2B procurement process</Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default RequestQuotePage;
