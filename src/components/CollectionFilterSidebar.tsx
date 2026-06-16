import { useMemo, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface FilterState {
  applications: string[];
  categories: string[];
  brands: string[];
  conditions: string[]; // "new" | "used"
  minPrice: string;
  maxPrice: string;
}

export const EMPTY_FILTERS: FilterState = {
  applications: [],
  categories: [],
  brands: [],
  conditions: [],
  minPrice: "",
  maxPrice: "",
};

const TAG_PREFIX_LABELS: Record<string, (v: string) => string> = {
  Application_: (v) => v.replace(/^Application_/, "").replace(/_/g, " "),
  Category_: (v) => v.replace(/^Category_/, "").replace(/_/g, " "),
};

function getProductCondition(p: ShopifyProduct): "new" | "used" {
  return p.node.tags?.some((t) => t.toLowerCase() === "condition_used") ? "used" : "new";
}

function getProductPrice(p: ShopifyProduct): number {
  return parseFloat(p.node.priceRange.minVariantPrice.amount || "0");
}

export function applyFilters(products: ShopifyProduct[], f: FilterState): ShopifyProduct[] {
  const min = f.minPrice ? parseFloat(f.minPrice) : null;
  const max = f.maxPrice ? parseFloat(f.maxPrice) : null;
  return products.filter((p) => {
    const tags = p.node.tags || [];
    if (f.applications.length && !f.applications.some((a) => tags.includes(a))) return false;
    if (f.categories.length && !f.categories.some((c) => tags.includes(c))) return false;
    if (f.brands.length && !f.brands.includes(p.node.vendor)) return false;
    if (f.conditions.length && !f.conditions.includes(getProductCondition(p))) return false;
    const price = getProductPrice(p);
    if (min !== null && price < min) return false;
    if (max !== null && price > max) return false;
    return true;
  });
}

function countBy<T extends string>(items: T[]): Map<T, number> {
  const m = new Map<T, number>();
  for (const k of items) m.set(k, (m.get(k) || 0) + 1);
  return m;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Section = ({ title, children, defaultOpen = true }: SectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 px-4 text-left"
      >
        <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

interface CheckListProps {
  options: { value: string; label: string; count: number }[];
  selected: string[];
  onChange: (next: string[]) => void;
  emptyText?: string;
}

const CheckList = ({ options, selected, onChange, emptyText }: CheckListProps) => {
  if (!options.length) {
    return <p className="text-xs text-muted-foreground">{emptyText || "No options"}</p>;
  }
  const toggle = (val: string) => {
    onChange(selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val]);
  };
  return (
    <ul className="space-y-2 max-h-64 overflow-y-auto">
      {options.map((opt) => (
        <li key={opt.value} className="flex items-center justify-between gap-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer min-w-0 flex-1">
            <Checkbox
              checked={selected.includes(opt.value)}
              onCheckedChange={() => toggle(opt.value)}
            />
            <span className="truncate capitalize">{opt.label}</span>
          </label>
          <span className="text-[10px] text-muted-foreground border rounded-full px-2 py-0.5 flex-shrink-0">
            {opt.count}
          </span>
        </li>
      ))}
    </ul>
  );
};

interface SidebarProps {
  products: ShopifyProduct[];
  filters: FilterState;
  onChange: (next: FilterState) => void;
}

export const CollectionFilterSidebar = ({ products, filters, onChange }: SidebarProps) => {
  const facets = useMemo(() => {
    const apps: string[] = [];
    const cats: string[] = [];
    const brands: string[] = [];
    const conditions: ("new" | "used")[] = [];
    for (const p of products) {
      for (const t of p.node.tags || []) {
        if (t.startsWith("Application_")) apps.push(t);
        else if (t.startsWith("Category_")) cats.push(t);
      }
      if (p.node.vendor) brands.push(p.node.vendor);
      conditions.push(getProductCondition(p));
    }
    const appCounts = countBy(apps);
    const catCounts = countBy(cats);
    const brandCounts = countBy(brands);
    const condCounts = countBy(conditions);
    return {
      applications: [...appCounts.entries()]
        .map(([v, c]) => ({ value: v, label: TAG_PREFIX_LABELS.Application_(v), count: c }))
        .sort((a, b) => b.count - a.count),
      categories: [...catCounts.entries()]
        .map(([v, c]) => ({ value: v, label: TAG_PREFIX_LABELS.Category_(v), count: c }))
        .sort((a, b) => b.count - a.count),
      brands: [...brandCounts.entries()]
        .map(([v, c]) => ({ value: v, label: v, count: c }))
        .sort((a, b) => b.count - a.count),
      conditions: (["new", "used"] as const)
        .map((v) => ({ value: v, label: v === "new" ? "New" : "Used", count: condCounts.get(v) || 0 }))
        .filter((o) => o.count > 0),
    };
  }, [products]);

  const activeCount =
    filters.applications.length +
    filters.categories.length +
    filters.brands.length +
    filters.conditions.length +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0);

  return (
    <aside className="border rounded-lg bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-secondary/30">
        <h2 className="text-sm font-bold">Filters</h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTERS)}
            className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Clear ({activeCount})
          </button>
        )}
      </div>
      {facets.applications.length > 0 && (
        <Section title="Application">
          <CheckList
            options={facets.applications}
            selected={filters.applications}
            onChange={(v) => onChange({ ...filters, applications: v })}
          />
        </Section>
      )}
      {facets.categories.length > 0 && (
        <Section title="Category">
          <CheckList
            options={facets.categories}
            selected={filters.categories}
            onChange={(v) => onChange({ ...filters, categories: v })}
          />
        </Section>
      )}
      {facets.brands.length > 0 && (
        <Section title="Brand">
          <CheckList
            options={facets.brands}
            selected={filters.brands}
            onChange={(v) => onChange({ ...filters, brands: v })}
          />
        </Section>
      )}
      {facets.conditions.length > 1 && (
        <Section title="Condition">
          <CheckList
            options={facets.conditions}
            selected={filters.conditions}
            onChange={(v) => onChange({ ...filters, conditions: v })}
          />
        </Section>
      )}
      <Section title="Price (USD)">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="decimal"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
            className="h-9"
          />
          <span className="text-muted-foreground">–</span>
          <Input
            type="number"
            inputMode="decimal"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
            className="h-9"
          />
        </div>
        {(filters.minPrice || filters.maxPrice) && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 h-7 text-xs"
            onClick={() => onChange({ ...filters, minPrice: "", maxPrice: "" })}
          >
            Reset price
          </Button>
        )}
      </Section>
    </aside>
  );
};
