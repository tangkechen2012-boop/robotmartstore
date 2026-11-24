/** Collection routes take precedence over legacy Shopify product URLs. */
export const COLLECTION_HANDLES = [
  "humanoid-robots", "quadruped-robots", "robot-accessories",
  "robotic-arms", "toy-robots", "pre-owned",
];

export function legacyProductPath(pathname: string, productHandle?: string): string | null {
  const slug = /^\/products\/([^/]+)\/?$/.exec(pathname)?.[1];
  if (!slug || COLLECTION_HANDLES.includes(slug) || slug !== productHandle) return null;
  return `/product/${productHandle}`;
}