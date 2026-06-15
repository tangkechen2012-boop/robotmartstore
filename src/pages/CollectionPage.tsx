import { useShopifyCollection, useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ProductCard } from "@/components/ProductCard";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { BadgeCheck, Bot, ChevronRight, ClipboardCheck, Code2, GraduationCap, Recycle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";


const COLLECTION_HANDLES = [
  "humanoid-robots",
  "quadruped-robots",
  "robot-accessories",
  "toy-robots",
  "pre-owned",
];

// Handles backed by a Shopify search query (tag-based) instead of a Shopify Collection
const TAG_COLLECTION_QUERIES: Record<string, string> = {
  "pre-owned": "tag:Pre-Owned",
  "robot-accessories": "tag:Category_Accessories",
};

const COLLECTION_GUIDES: Record<string, {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  highlights: string[];
  buyerCards: { title: string; text: string; icon: typeof GraduationCap }[];
  faqs: { q: string; a: string }[];
}> = {
  "humanoid-robots": {
    eyebrow: "Humanoid robot sourcing",
    title: "Humanoid robots for education, research, and enterprise pilots",
    description:
      "Compare quote-ready humanoid platforms for embodied AI, manipulation, locomotion, HRI, and robotics lab programs. For high-ticket robots, RobotMart confirms configuration, supplier availability, freight, warranty, and purchase terms before payment.",
    ctaLabel: "Request a humanoid robot quote",
    highlights: [
      "G1, EDU, fixed-base, and enterprise configurations require different procurement checks",
      "PO, wire transfer, deposit, freight, and warranty terms can be reviewed before purchase",
      "Supplier confirmation is required before fixed delivery dates or support terms are promised",
    ],
    buyerCards: [
      {
        icon: GraduationCap,
        title: "Education and research",
        text: "Platforms for robotics courses, embodied AI labs, locomotion, perception, and manipulation experiments.",
      },
      {
        icon: Code2,
        title: "Development stack",
        text: "Prioritize SDK, ROS/ROS2, Python/C++, simulation, sensors, compute, and documentation fit.",
      },
      {
        icon: Truck,
        title: "Procurement reality",
        text: "Freight, duties, batteries, lead time, warranty, and after-sales responsibility are confirmed during quote review.",
      },
    ],
    faqs: [
      {
        q: "Why are many humanoid robots quote-only?",
        a: "Humanoid robots often require supplier confirmation for configuration, lead time, freight, warranty, and purchase terms. Quote-first prevents unrealistic checkout promises.",
      },
      {
        q: "Can schools or labs use purchase orders?",
        a: "RobotMart can prepare quote details for internal procurement review, including model, configuration, delivery notes, warranty assumptions, and payment terms.",
      },
      {
        q: "What should buyers compare before choosing a humanoid robot?",
        a: "Compare development access, SDK/ROS support, compute module, sensors, included accessories, application fit, training needs, and supplier support.",
      },
    ],
  },
  "quadruped-robots": {
    eyebrow: "Quadruped robot sourcing",
    title: "Quadruped robots for research, inspection, and field development",
    description:
      "Source quadruped platforms for education, mobility research, inspection pilots, sensor integration, and autonomous navigation projects.",
    ctaLabel: "Request a quadruped robot quote",
    highlights: [
      "Confirm payload, sensors, battery, controller, and SDK needs before quoting",
      "Inspection and field deployments may require accessories, training, and spare parts",
      "Shipping terms depend on battery configuration, package size, and destination",
    ],
    buyerCards: [
      {
        icon: GraduationCap,
        title: "Research and teaching",
        text: "Use quadrupeds for locomotion, navigation, reinforcement learning, and robotics demonstrations.",
      },
      {
        icon: Code2,
        title: "Integration projects",
        text: "Evaluate compute, sensors, ROS support, payloads, and API access before choosing a model.",
      },
      {
        icon: Truck,
        title: "Delivery planning",
        text: "Confirm battery shipping, lead time, spare parts, and warranty terms before payment.",
      },
    ],
    faqs: [
      {
        q: "Can quadruped robots be used for inspection?",
        a: "Yes, but payload, sensors, connectivity, battery runtime, terrain, and safety requirements should be confirmed before purchase.",
      },
      {
        q: "Do all quadruped robots support development?",
        a: "No. Development access varies by model and edition, so SDK, ROS, API, and compute options should be checked during quote review.",
      },
    ],
  },
  "robot-accessories": {
    eyebrow: "Robotics components and accessories",
    title: "Robot accessories, dexterous hands, sensors, and development hardware",
    description:
      "Find manipulation hardware, sensors, end effectors, batteries, chargers, and development accessories for robotics labs and integration teams.",
    ctaLabel: "Request accessory sourcing",
    highlights: [
      "Dexterous hands should be compared by DOF, drive type, interface, SDK, and robot compatibility",
      "Sensors and end effectors may require integration support and documentation review",
      "Standard accessories can move to direct sale after stock, UPC/GTIN, warranty, and fulfillment are confirmed",
    ],
    buyerCards: [
      {
        icon: ClipboardCheck,
        title: "Compatibility check",
        text: "Confirm mechanical, electrical, software, and control interface fit before purchase.",
      },
      {
        icon: Code2,
        title: "Developer readiness",
        text: "Review SDK, API, ROS, sample code, and documentation for lab or integration use.",
      },
      {
        icon: BadgeCheck,
        title: "Fulfillment readiness",
        text: "Move accessories to direct checkout only after supplier stock and warranty are confirmed.",
      },
    ],
    faqs: [
      {
        q: "Can RobotMart source dexterous robot hands?",
        a: "Yes. We request supplier confirmation for pricing, interfaces, SDK, documentation, compatibility, and lead time before quoting.",
      },
      {
        q: "Which accessories can be direct-sale?",
        a: "Standard items with confirmed stock, shipping, warranty, and return terms can become direct-sale products.",
      },
    ],
  },
  "pre-owned": {
    eyebrow: "Pre-Owned robotics inventory",
    title: "Pre-Owned & tested robots — inspected, quote-first procurement",
    description:
      "Source tested pre-owned humanoid and quadruped robots for education, research, and pilot deployments. Each used unit is unique, so pricing and terms are confirmed through RobotMart's quote-first process after we verify configuration, battery and joint health, accessories, freight method, duties, and supported warranty assumptions.",
    ctaLabel: "Request a pre-owned unit quote",
    highlights: [
      "Each used unit is sold based on actual condition, configuration, and supplier availability",
      "Quote covers exact model edition, accessories, battery and joint status, photos, and test video",
      "China-direct, DDP US delivery, and US-local stock options are evaluated per request",
    ],
    buyerCards: [
      {
        icon: ClipboardCheck,
        title: "Condition verification",
        text: "Battery health, joint condition, sensor status, controller, charger, and original accessories are confirmed before quoting.",
      },
      {
        icon: Truck,
        title: "Freight and duties",
        text: "China-direct, DDP US, or US-local stock options are reviewed against freight cost, lead time, and tariff exposure.",
      },
      {
        icon: BadgeCheck,
        title: "Support boundaries",
        text: "DOA inspection window, used-unit support limits, and warranty assumptions are documented in writing before payment.",
      },
    ],
    faqs: [
      {
        q: "Why is pre-owned inventory quote-only?",
        a: "Used robotics units differ in condition, accessories, and supplier location. Final pricing and terms are only confirmed after inspection, freight quoting, and warranty review.",
      },
      {
        q: "Can pre-owned units ship DDP to the United States?",
        a: "Yes. RobotMart can prepare DDP US delivery quotes that include freight, customs clearance, and duties on top of the unit price.",
      },
    ],
  },
};

const COLLECTION_LABELS: Record<string, string> = {
  "humanoid-robots": "Humanoid Robots",
  "quadruped-robots": "Quadruped Robots",
  "robot-accessories": "Robot Accessories",
  "toy-robots": "Toy Robots",
  "pre-owned": "Pre-Owned Inventory",
};

const AllProductsView = () => {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") || "").trim();
  const { data: products, isLoading } = useShopifyProducts(48, q || undefined);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">All Products</span>
      </nav>
      <section className="mb-8 rounded-lg border bg-secondary/30 p-5 md:p-7">
        <p className="text-sm font-semibold text-primary">
          {q ? "Search results" : "Robotics catalog"}
        </p>
        <h1 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight">
          {q ? `Results for "${q}"` : "All robotics products"}
        </h1>
        <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
          {q
            ? "Showing products that match your search across the RobotMart catalog. Refine your query or browse a category below."
            : "Browse humanoid robots, quadruped robots, robot accessories, and developer hardware. High-ticket platforms move through a quote-first review covering configuration, supplier confirmation, freight, warranty, and purchase terms."}
        </p>
      </section>

      <section className="mb-8 grid grid-cols-2 md:grid-cols-5 gap-3">
        {COLLECTION_HANDLES.map((h) => {
          const isPreOwned = h === "pre-owned";
          return (
            <Link
              key={h}
              to={`/products/${h}`}
              className={`rounded-lg border bg-card p-4 hover:border-primary hover:bg-secondary/40 transition-colors ${isPreOwned ? "border-accent/40" : ""}`}
            >
              <div className={`h-9 w-9 rounded-md flex items-center justify-center mb-3 ${isPreOwned ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                {isPreOwned ? <Recycle className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <p className="font-semibold text-sm">{COLLECTION_LABELS[h]}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {isPreOwned ? "Tested used units →" : "Browse collection →"}
              </p>
            </Link>
          );
        })}
      </section>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border rounded-md overflow-hidden animate-pulse">
              <div className="aspect-square bg-muted" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-md bg-muted/30">
          <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No products found</h3>
          <p className="text-muted-foreground text-sm">Add products in Shopify Admin to see them here.</p>
        </div>
      )}
    </div>
  );
};

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const handle = slug || "";
  const isKnownCollection = COLLECTION_HANDLES.includes(handle);
  const tagQuery = TAG_COLLECTION_QUERIES[handle];
  const isTagCollection = !!tagQuery;
  const guide = COLLECTION_GUIDES[handle];

  const { data: shopifyCollection, isLoading: collectionLoading } = useShopifyCollection(
    isKnownCollection && !isTagCollection ? handle : undefined
  );
  const { data: tagProducts, isLoading: tagLoading } = useShopifyProducts(
    50,
    isTagCollection ? tagQuery : undefined
  );

  const isLoading = isTagCollection ? tagLoading : collectionLoading;
  const TAG_COLLECTION_DESCRIPTIONS: Record<string, string> = {
    "pre-owned": "Tested pre-owned robotics inventory. Each unit is unique — quote-first procurement applies.",
    "robot-accessories": "Dexterous hands, sensors, batteries, mounts, and developer hardware for robotics labs and integrators.",
  };
  const collection = isTagCollection
    ? (tagProducts
        ? {
            title: COLLECTION_LABELS[handle],
            description: TAG_COLLECTION_DESCRIPTIONS[handle] || "",
            handle,
            products: tagProducts,
          }
        : null)
    : shopifyCollection;

  // No slug → show all products
  if (!slug) {
    return <AllProductsView />;
  }

  // Unknown slug → 404-like state
  if (!isKnownCollection) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Collection not found</h1>
        <p className="text-muted-foreground text-sm mb-6">
          The collection "{slug}" does not exist.
        </p>
        <Link to="/products" className="text-primary hover:underline text-sm">
          ← Browse all products
        </Link>
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">
          {collection?.title || handle.replace(/-/g, " ")}
        </span>
      </nav>

      {/* Header */}
      {guide ? (
        <section className="mb-8 rounded-lg border bg-secondary/30 p-5 md:p-7">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            <div>
              <p className="text-sm font-semibold text-primary">{guide.eyebrow}</p>
              <h1 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight">{guide.title}</h1>
              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
                {guide.description}
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <Link to={`/request-quote?product=${encodeURIComponent(collection?.title || guide.title)}`}>
                    {guide.ctaLabel}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/procurement">View procurement process</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <h2 className="font-bold">Buying notes</h2>
              <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                {guide.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <BadgeCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : (
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {collection?.title || handle.replace(/-/g, " ")}
          </h1>
          {collection?.description && (
            <p className="text-sm text-muted-foreground mt-1">{collection.description}</p>
          )}
        </div>
      )}

      {guide && (
        <section className="mb-8 grid md:grid-cols-3 gap-4">
          {guide.buyerCards.map((card) => (
            <article key={card.title} className="rounded-lg border bg-card p-5">
              <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                <card.icon className="h-5 w-5" />
              </div>
              <h2 className="font-bold">{card.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.text}</p>
            </article>
          ))}
        </section>
      )}

      {/* Products grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border rounded-md overflow-hidden animate-pulse">
              <div className="aspect-square bg-muted" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : collection && collection.products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {collection.products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-md bg-muted/30">
          <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No products in this collection</h3>
          <p className="text-muted-foreground text-sm">
            {collection
              ? "This collection is empty. Add products in Shopify Admin."
              : "This collection was not found in Shopify."}
          </p>
        </div>
      )}

      {guide && (
        <section className="mt-10 border-t pt-8">
          <h2 className="text-xl font-bold">Common buying questions</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {guide.faqs.map((faq) => (
              <article key={faq.q} className="rounded-lg border bg-card p-5">
                <h3 className="font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CollectionPage;
