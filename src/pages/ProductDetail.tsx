import { useParams } from "react-router-dom";
import { useShopifyProductByHandle } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShoppingCart, Loader2, Truck, Shield, RotateCcw, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useShopifyProductByHandle(handle || "");
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted rounded-md" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-6 bg-muted rounded w-1/4" />
            <div className="h-32 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button asChild><Link to="/">Back to Home</Link></Button>
      </div>
    );
  }

  const images = product.images?.edges || [];
  const variants = product.variants?.edges || [];
  const selectedVariant = variants[selectedVariantIdx]?.node;
  const price = selectedVariant?.price || product.priceRange?.minVariantPrice;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    const shopifyProduct = {
      node: {
        id: product.id,
        title: product.title,
        description: product.description,
        handle: product.handle,
        productType: product.productType || "",
        vendor: product.vendor || "",
        tags: product.tags || [],
        priceRange: product.priceRange,
        images: product.images,
        variants: product.variants,
        options: product.options,
      },
    };
    await addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title, position: "top-center" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground flex items-center gap-1">
          <ChevronLeft className="h-3 w-3" /> Home
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.title}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="aspect-square bg-muted rounded-md overflow-hidden mb-3">
            {images[selectedImage]?.node ? (
              <img
                src={images[selectedImage].node.url}
                alt={images[selectedImage].node.altText || product.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                <button
                  key={i}
                  className={`w-16 h-16 rounded border overflow-hidden flex-shrink-0 ${i === selectedImage ? 'border-primary ring-1 ring-primary' : 'border-muted'}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.vendor && (
            <Link to={`/brands#${product.vendor.toLowerCase()}`} className="text-sm text-primary hover:underline mb-1 block">
              {product.vendor}
            </Link>
          )}
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-primary">
              {price?.currencyCode} {parseFloat(price?.amount || "0").toFixed(2)}
            </span>
            {selectedVariant?.availableForSale ? (
              <Badge variant="secondary" className="bg-[hsl(var(--robot-green))]/10 text-[hsl(var(--robot-green))]">In Stock</Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          {/* Variant selector */}
          {product.options && product.options.length > 0 && product.options[0].name !== "Title" && (
            <div className="mb-4">
              {product.options.map((option: { name: string; values: string[] }) => (
                <div key={option.name} className="mb-3">
                  <label className="text-sm font-medium mb-1.5 block">{option.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value: string) => {
                      const variantIdx = variants.findIndex(
                        (v: { node: { selectedOptions: Array<{ name: string; value: string }> } }) =>
                          v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                      );
                      return (
                        <Button
                          key={value}
                          variant={variantIdx === selectedVariantIdx ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedVariantIdx(variantIdx >= 0 ? variantIdx : 0)}
                        >
                          {value}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add to cart */}
          <Button
            onClick={handleAddToCart}
            disabled={cartLoading || !selectedVariant?.availableForSale}
            size="lg"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold mb-4"
          >
            {cartLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShoppingCart className="h-4 w-4 mr-2" />}
            Add to Cart
          </Button>

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: Truck, label: "Free Shipping 99+" },
              { icon: RotateCcw, label: "30-Day Returns" },
              { icon: Shield, label: "Warranty" },
            ].map(item => (
              <div key={item.label} className="text-center">
                <item.icon className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                <span className="text-[10px] text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>

          <Separator className="mb-4" />

          {/* Description & specs */}
          <Accordion type="multiple" defaultValue={["description"]}>
            <AccordionItem value="description">
              <AccordionTrigger className="text-sm">Description</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{product.description}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-sm">Shipping & Warranty</AccordionTrigger>
              <AccordionContent>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Free shipping on orders over $99</p>
                  <p>• Standard shipping: 3-7 business days</p>
                  <p>• Express shipping available at checkout</p>
                  <p>• Manufacturer warranty included</p>
                  <p>• 30-day hassle-free returns</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
