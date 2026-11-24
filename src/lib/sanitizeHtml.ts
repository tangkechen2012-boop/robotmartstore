import { FilterXSS } from "xss";

/*
 * Allow-list sanitizer for Shopify product description HTML. Pure JS, so it runs the same
 * on the server and in the browser (DOMPurify needs a DOM and cannot run during SSR).
 */
const ATTRS = ["title"];
const tags = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "table", "thead", "tbody", "tr", "blockquote", "code", "pre", "span", "div"];
const whiteList: Record<string, string[]> = Object.fromEntries(tags.map((t) => [t, ATTRS]));
whiteList["a"] = ["href", "target", "rel", "title"];
whiteList["img"] = ["src", "alt", "title", "width", "height"];
whiteList["td"] = ["colspan", "rowspan", "title"];
whiteList["th"] = ["colspan", "rowspan", "title"];

const filter = new FilterXSS({
  whiteList,
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style", "iframe", "object", "embed", "noscript"],
});

export function sanitizeProductHtml(html: string | null | undefined): string {
  return html ? filter.process(html) : "";
}
