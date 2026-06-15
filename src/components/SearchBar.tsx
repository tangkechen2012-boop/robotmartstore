import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

interface SearchBarProps {
  className?: string;
  onNavigate?: () => void;
}

export const SearchBar = ({ className = "", onNavigate }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 250);
    return () => clearTimeout(t);
  }, [query]);

  const { data: products, isFetching } = useShopifyProducts(
    8,
    debounced.length >= 2 ? debounced : undefined
  );

  const showResults = open && debounced.length >= 2;
  const results = debounced.length >= 2 ? products ?? [] : [];

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    onNavigate?.();
    navigate(`/products?q=${encodeURIComponent(q)}`);
  };

  const handleSelect = (handle: string) => {
    setOpen(false);
    setQuery("");
    onNavigate?.();
    navigate(`/product/${handle}`);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search products..."
          aria-label="Search products"
          className="pl-9 pr-9 h-9 text-sm rounded-pill bg-secondary/60 border-0 focus-visible:ring-1"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setDebounced("");
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </form>

      {showResults && (
        <div className="absolute top-full right-0 mt-2 w-[360px] max-w-[90vw] glass rounded-2xl shadow-soft-lg overflow-hidden z-50">
          {isFetching && results.length === 0 ? (
            <div className="flex items-center justify-center py-6 text-sm text-muted-foreground gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No products found for "{debounced}"
            </div>
          ) : (
            <>
              <ul className="max-h-[60vh] overflow-y-auto py-1">
                {results.map(({ node }) => {
                  const img = node.images?.edges?.[0]?.node;
                  const price = node.priceRange?.minVariantPrice;
                  const priceNum = price ? parseFloat(price.amount) : 0;
                  return (
                    <li key={node.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(node.handle)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-secondary/60 text-left transition-colors"
                      >
                        <div className="h-12 w-12 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                          {img?.url && (
                            <img
                              src={img.url}
                              alt={img.altText || node.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {node.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {priceNum > 0
                              ? `$${priceNum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                              : "Request Quote"}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <Link
                to={`/products?q=${encodeURIComponent(debounced)}`}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className="block border-t border-border/40 px-4 py-2.5 text-xs font-medium text-primary hover:bg-secondary/60 text-center"
              >
                View all results for "{debounced}"
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};
