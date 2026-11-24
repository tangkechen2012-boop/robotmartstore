import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.robotmart.store";
const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/robotmart-social.png`;

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

export const Seo = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  jsonLd,
  noindex = false,
}: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const trimmedDesc =
    description.length > 160 ? description.slice(0, 157) + "…" : description;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={trimmedDesc} />
      {!noindex && <link rel="canonical" href={url} />}
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={trimmedDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={trimmedDesc} />
      <meta name="twitter:image" content={image} />
      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};
