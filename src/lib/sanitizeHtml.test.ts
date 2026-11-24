import { describe, expect, it } from "vitest";
import { sanitizeProductHtml } from "./sanitizeHtml";

describe("sanitizeProductHtml", () => {
  it("removes script tags and their content", () => {
    expect(sanitizeProductHtml("<p>Spec</p><script>alert(1)</script>")).toBe("<p>Spec</p>");
  });
  it("drops inline event handlers", () => {
    expect(sanitizeProductHtml('<img src="https://cdn.shopify.com/a.png" onerror="alert(1)">')).not.toContain("onerror");
  });
  it("neutralises javascript: links", () => {
    expect(sanitizeProductHtml('<a href="javascript:alert(1)">x</a>')).not.toContain("javascript:");
  });
  it("keeps spec tables", () => {
    expect(sanitizeProductHtml('<table><tr><td colspan="2">Payload 7 kg</td></tr></table>')).toBe('<table><tr><td colspan="2">Payload 7 kg</td></tr></table>');
  });
});
