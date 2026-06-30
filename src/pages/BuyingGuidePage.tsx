import { useParams, Link, Navigate } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import { getGuide, BUYING_GUIDES } from "@/content/buyingGuides";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const COLLECTION_LINKS = [
  { label: "Humanoid Robots", href: "/products/humanoid-robots" },
  { label: "Quadruped Robots", href: "/products/quadruped-robots" },
  { label: "Robotic Arms", href: "/products/robotic-arms" },
  { label: "Pre-Owned Robots", href: "/products/pre-owned" },
  { label: "Accessories & Parts", href: "/products/robot-accessories" },
];

const BuyingGuidePage = () => {
  const { slug = "" } = useParams();
  const guide = getGuide(slug);

  if (!guide) return <Navigate to="/buying-guides" replace />;

  const url = `https://www.robotmart.store/buying-guides/${guide.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.metaDescription,
      author: { "@type": "Organization", name: "RobotMart" },
      publisher: { "@type": "Organization", name: "RobotMart" },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Resources", item: "https://www.robotmart.store/blog" },
        { "@type": "ListItem", position: 2, name: "Buying Guides", item: "https://www.robotmart.store/buying-guides" },
        { "@type": "ListItem", position: 3, name: guide.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className="min-h-screen">
      <Seo title={guide.metaTitle} description={guide.metaDescription} path={`/buying-guides/${guide.slug}`} type="article" jsonLd={jsonLd} />

      <article className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/buying-guides" className="hover:text-foreground">Buying Guides</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{guide.category}</span>
        </nav>

        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{guide.category}</Badge>
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {guide.readingMinutes} min read
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{guide.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{guide.intro}</p>

        <div className="rounded-2xl border bg-secondary/30 p-6 mb-10">
          <p className="font-semibold mb-3">TL;DR</p>
          <ul className="space-y-1.5 text-sm">
            {guide.tldr.map((t, i) => (
              <li key={i} className="flex gap-2"><span className="text-primary">•</span><span>{t}</span></li>
            ))}
          </ul>
        </div>

        {guide.sections.map((s, i) => (
          <section key={i} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{s.heading}</h2>
            {s.body.map((p, j) => (
              <p key={j} className="text-muted-foreground leading-relaxed mb-3">{p}</p>
            ))}
            {s.bullets && (
              <ul className="mt-3 space-y-2 text-muted-foreground">
                {s.bullets.map((b, k) => (
                  <li key={k} className="flex gap-2"><span className="text-primary">•</span><span>{b}</span></li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {guide.faqs.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <div className="rounded-2xl bg-primary text-primary-foreground p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div>
            <p className="font-bold text-lg mb-1">Need help picking a model?</p>
            <p className="text-sm opacity-80">Talk to an engineer — we'll match configuration, budget, and lead time.</p>
          </div>
          <div className="flex gap-3">
            {guide.relatedCollection && (
              <Button asChild variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground/10">
                <Link to={guide.relatedCollection.href}>{guide.relatedCollection.label}</Link>
              </Button>
            )}
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/request-quote">Request a quote <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        </div>

        {/* Browse related collections */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Browse related collections</h2>
          <div className="flex flex-wrap gap-2">
            {COLLECTION_LINKS.map((c) => (
              <Link
                key={c.href}
                to={c.href}
                className="inline-flex items-center px-4 py-2 rounded-full border bg-secondary/40 text-sm font-medium hover:bg-secondary hover:text-foreground transition-colors"
              >
                {c.label} <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Link>
            ))}
          </div>
        </section>

        {/* Related guides */}
        {BUYING_GUIDES.filter((g) => g.slug !== guide.slug).length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Continue reading</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {BUYING_GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 4).map((g) => (
                <Link key={g.slug} to={`/buying-guides/${g.slug}`} className="group">
                  <Card className="h-full transition-shadow hover:shadow-soft-lg">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{g.category}</Badge>
                        <span className="text-xs text-muted-foreground">{g.readingMinutes} min read</span>
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors">{g.title}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">{g.intro}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Resource cross-links */}
        <section className="rounded-2xl border bg-secondary/30 p-6">
          <p className="font-semibold mb-3">More resources</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link to="/faq" className="text-primary hover:underline inline-flex items-center">FAQ <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
            <Link to="/glossary" className="text-primary hover:underline inline-flex items-center">Robotics Glossary <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
            <Link to="/buying-guides" className="text-primary hover:underline inline-flex items-center">All Buying Guides <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
            <Link to="/contact" className="text-primary hover:underline inline-flex items-center">Contact engineering <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
          </div>
        </section>
      </article>
    </div>
  );
};

export default BuyingGuidePage;
