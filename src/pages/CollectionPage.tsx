import { useShopifyCollection } from "@/hooks/useShopifyProducts";
import { ProductCard } from "@/components/ProductCard";
import { useParams, Link } from "react-router-dom";
import { Bot, ChevronRight } from "lucide-react";

const COLLECTION_HANDLES = [
  "humanoid-robots",
  "quadruped-robots",
  "toy-robots",
];

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const handle = slug || "";
  const isKnownCollection = COLLECTION_HANDLES.includes(handle);
  const { data: collection, isLoading } = useShopifyCollection(
    isKnownCollection ? handle : undefined
  );

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {collection?.title || handle.replace(/-/g, " ")}
        </h1>
        {collection?.description && (
          <p className="text-sm text-muted-foreground mt-1">{collection.description}</p>
        )}
      </div>

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
    </div>
  );
};

export default CollectionPage;
