import { useParams } from "react-router-dom";
import { useShopifyProductByHandle } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Loader2, ChevronLeft, Minus, Plus } from "lucide-react";
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
                  className={`w-16 h-16 rounded border overflow-hidden ${i === selectedImage ? 'border-primary ring-1 ring-primary' : 'border-muted'}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          {/* Main image */}
          <div className="flex-1 aspect-square bg-muted rounded-md overflow-hidden">
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
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm text-muted-foreground">Price:</span>
            <span className="text-2xl font-bold text-foreground">
              ${priceAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Price excludes Tariffs (in USA). Shipping calculated at checkout.
          </p>

          {selectedVariant?.availableForSale ? (
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
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-sm font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* On Demand notice */}
          <div className="mb-4 rounded-md border border-border bg-muted/50 p-4 text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-foreground">On Demand</span>
              <a href="#" className="text-primary hover:underline text-xs">See due date</a>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-2">
              This is an On Demand item and is not normally stocked. We will order it for you along with our next purchase from the supplier.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              * Delays depend on the order frequency from each supplier and the approximate arrival date is indicated in the due date. Returns are not accepted on On Demand and Clearance Items except when they are found defective, in which case the product may be repaired or replaced at RobotShop's discretion.
            </p>
          </div>

          {/* Add to cart + Request a Quote */}
          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={cartLoading || !selectedVariant?.availableForSale}
              size="lg"
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              {cartLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShoppingCart className="h-4 w-4 mr-2" />}
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 font-semibold"
              onClick={() => toast.info("Quote request feature coming soon", { position: "top-center" })}
            >
              Request a Quote
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
              <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} className="prose prose-sm max-w-none text-muted-foreground" />
            ) : (
              <p>{product.description}</p>
            )}
          </div>
        </ProductSection>

        {/* Specifications */}
        <ProductSection title="Specifications">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {[
              ["Total Degrees of Freedom", "23"],
              ["Single Leg DoF", "6"],
              ["Waist DoF", "1"],
              ["Single Arm DoF", "5"],
              ["Max Knee Joint Torque", "120 N·m"],
              ["Arm Max Load", "3 kg"],
              ["Calf + Thigh Length", "0.6 m"],
              ["Arm Span", "0.45 m"],
              ["Joint Encoder", "Dual encoder"],
              ["Cooling System", "Local air cooling"],
              ["Computing Power", "100 Tops (8-core CPU)"],
              ["Sensing", "Depth Camera + 3D LiDAR"],
              ["Microphone Array", "4-mic array"],
              ["Speaker", "5W"],
              ["Connectivity", "WiFi 6, Bluetooth 5.2"],
              ["Battery", "9000 mAh (Quick Release)"],
              ["Charger", "54V 5A"],
              ["Battery Life", "~2 hours"],
              ["Weight (with battery)", "35 kg"],
              ["Height (Standing)", "1320 mm"],
              ["Dimensions (Folded)", "690 × 450 × 300 mm"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-1.5 border-b border-muted">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </ProductSection>

        {/* What's Included */}
        <ProductSection title="What's Included">
          <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
            <li>1× Unitree G1 EDU Standard (U1) Humanoid Robot</li>
            <li>1× Remote Control</li>
            <li>1× Gantry</li>
            <li className="text-destructive font-medium">Note: Hands are NOT included</li>
          </ul>
        </ProductSection>

        {/* Links & Resources */}
        <ProductSection title="Links & Resources">
          <ul className="text-sm space-y-1.5">
            {[
              ["User Manual", "https://marketing.unitree.com/article/en/G1/User_Manual.html"],
              ["Remote Control Guide", "https://marketing.unitree.com/article/en/G1/Remote_Control.html"],
              ["Battery & Charger", "https://marketing.unitree.com/article/en/G1/Battery_Charger.html"],
              ["GitHub", "https://github.com/unitreerobotics"],
              ["Developer Docs", "https://support.unitree.com/home/en/G1_developer"],
            ].map(([label, url]) => (
              <li key={label}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {label} →
                </a>
              </li>
            ))}
          </ul>
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
