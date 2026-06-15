import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";

interface Props {
  usedListings: ShopifyProduct[];
}

export const UsedAvailableBanner = ({ usedListings }: Props) => {
  if (!usedListings.length) return null;
  const cheapest = [...usedListings].sort(
    (a, b) =>
      parseFloat(a.node.priceRange.minVariantPrice.amount) -
      parseFloat(b.node.priceRange.minVariantPrice.amount),
  )[0];
  const price = parseFloat(cheapest.node.priceRange.minVariantPrice.amount);
  const count = usedListings.length;

  return (
    <Link
      to={`/product/${cheapest.node.handle}`}
      className="mb-4 flex items-center justify-between gap-3 rounded-md border border-accent/30 bg-accent/5 px-4 py-3 text-sm hover:bg-accent/10 transition-colors group"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <Tag className="h-4 w-4 text-accent flex-shrink-0" />
        <div className="min-w-0">
          <span className="font-semibold text-foreground">
            Used unit{count > 1 ? "s" : ""} available
          </span>
          {price > 0 && (
            <span className="text-muted-foreground">
              {" "}
              from ${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )}
          <span className="text-muted-foreground"> · Condition graded, limited stock</span>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-accent flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
};
