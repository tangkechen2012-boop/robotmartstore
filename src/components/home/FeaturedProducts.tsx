import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ArrowRight } from "lucide-react";

export const FeaturedProducts = () => {
  const { data: products, isLoading } = useShopifyProducts(8);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
          <Button asChild variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            <Link to="/products" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
