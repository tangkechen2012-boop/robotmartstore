import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const variant = node.variants.edges[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: node.title, position: "top-center" });
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="border rounded-md overflow-hidden bg-card hover:shadow-md transition-shadow">
        <div className="aspect-square bg-muted relative overflow-hidden">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No Image
            </div>
          )}
          {node.vendor && (
            <span className="absolute top-2 left-2 bg-background/90 text-foreground text-[10px] font-medium px-1.5 py-0.5 rounded">
              {node.vendor}
            </span>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium leading-tight line-clamp-2 min-h-[2.5rem]">{node.title}</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-base font-bold text-primary">
              ${parseFloat(price.amount).toFixed(2)}
            </span>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleAddToCart}
              disabled={isLoading || !variant?.availableForSale}
            >
              {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShoppingCart className="h-3.5 w-3.5" />}
            </Button>
          </div>
          {variant && !variant.availableForSale && (
            <p className="text-xs text-destructive mt-1">Out of stock</p>
          )}
        </div>
      </div>
    </Link>
  );
};
