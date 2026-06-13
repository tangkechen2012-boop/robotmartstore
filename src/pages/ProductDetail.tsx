import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useShopifyProductByHandle } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarClock, MessageSquare, ShoppingCart, Loader2, ChevronLeft, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { buildQuotePath, getSalesStrategy } from "@/lib/salesStrategy";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useShopifyProductByHandle(handle || "");
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

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
  const priceRaw = selectedVariant?.price || product.priceRange?.minVariantPrice;
  const priceAmount = parseFloat(priceRaw?.amount || "0");
  const strategy = getSalesStrategy(product);
  const isDirectSale = strategy.mode === "direct-sale";

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
      quantity,
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

      {/* Top section: Images + Purchase info */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Image gallery with side thumbnails */}
        <div className="flex gap-3">
          {/* Thumbnails column */}
          {images.length > 1 && (
            <div className="flex flex-col gap-2 flex-shrink-0">
              {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                <button
                  key={i}
                  className={`w-16 h-16 rounded border overflow-hidden bg-slate-100 ${i === selectedImage ? 'border-primary ring-1 ring-primary' : 'border-muted'}`}
                  onClick={() => setSelectedImage(i)}
                  aria-label={`View product image ${i + 1}`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
          {/* Main image */}
          <div className="flex-1 aspect-square bg-slate-100 rounded-md overflow-hidden">
            {images[selectedImage]?.node ? (
              <img
                src={images[selectedImage].node.url}
                alt={images[selectedImage].node.altText || product.title}
                className="w-full h-full object-contain p-6"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
            )}
          </div>
        </div>

        {/* Right side: Title, price, quantity, add to cart */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

          {product.vendor && (
            <Link to={`/brands#${product.vendor.toLowerCase()}`} className="text-sm text-primary hover:underline mb-4 block">
              {product.vendor}
            </Link>
          )}

          <Separator className="my-4" />

          {/* Price */}
          {!isDirectSale ? (
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-foreground">{strategy.priceLabel}</span>
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm text-muted-foreground">Price:</span>
                <span className="text-2xl font-bold text-foreground">
                  ${priceAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Price excludes Tariffs (in USA). Shipping calculated at checkout.
              </p>
            </>
          )}

          {!isDirectSale ? (
            <Badge variant="secondary" className="bg-primary/10 text-primary mb-6">{strategy.badge}</Badge>
          ) : selectedVariant?.availableForSale ? (
            <Badge variant="secondary" className="bg-[hsl(var(--robot-green))]/10 text-[hsl(var(--robot-green))] mb-6">In Stock</Badge>
          ) : (
            <Badge variant="destructive" className="mb-6">Out of Stock</Badge>
          )}

          {/* Variant selector */}
          {product.options && product.options.length > 0 && product.options[0].name !== "Title" && (
            <div className="mb-6">
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

          {/* Quantity */}
          {isDirectSale && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-none"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-none"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* On Demand notice */}
          <div className="mb-4 rounded-md border border-border bg-muted/50 p-4 text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-foreground">{strategy.noticeTitle}</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-2">
              {strategy.noticeBody}
            </p>
            {!isDirectSale && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                Purchase orders, wire transfer, education pricing, deposits, and delivery timelines can be reviewed with our team before an order is placed.
              </p>
            )}
          </div>

          {/* Add to cart + Request a Quote */}
          <div className="flex gap-3">
            {isDirectSale && (
              <Button
                onClick={handleAddToCart}
                disabled={cartLoading || !selectedVariant?.availableForSale}
                size="lg"
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                {cartLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShoppingCart className="h-4 w-4 mr-2" />}
                Add to Cart
              </Button>
            )}
            <Button
              variant={isDirectSale ? "outline" : "default"}
              size="lg"
              className="flex-1 font-semibold"
              asChild
            >
              <Link to={buildQuotePath(product, strategy.mode === "pre-order" ? "preorder" : "quote")}>
                {strategy.mode === "pre-order" ? <CalendarClock className="h-4 w-4 mr-2" /> : <MessageSquare className="h-4 w-4 mr-2" />}
                {isDirectSale ? strategy.secondaryCta : strategy.primaryCta}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Full-width sections below */}
      <div className="border-t">
        {/* Description */}
        <ProductSection title="Description" defaultOpen>
          <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
            {product.descriptionHtml ? (
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.descriptionHtml, { ALLOWED_TAGS: ['h1','h2','h3','h4','h5','h6','p','br','hr','strong','b','em','i','u','s','ul','ol','li','a','img','table','thead','tbody','tr','td','th','blockquote','code','pre','span','div'], ALLOWED_ATTR: ['href','target','rel','src','alt','title','width','height','colspan','rowspan'] }) }} className="prose prose-sm max-w-none text-muted-foreground [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-muted [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-muted [&_th]:px-3 [&_th]:py-2 [&_h2]:text-foreground [&_h3]:text-foreground [&_strong]:text-foreground" />
            ) : (
              <p>{product.description}</p>
            )}
          </div>
        </ProductSection>
      </div>
    </div>
  );
};

/* Collapsible section component matching RobotShop style */
function ProductSection({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <div className="border-b">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left font-semibold text-base hover:text-primary transition-colors"
      >
        {title}
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown />
        </span>
      </button>
      {open && <div className="pb-6">{children}</div>}
    </div>
  );
}

function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default ProductDetail;
