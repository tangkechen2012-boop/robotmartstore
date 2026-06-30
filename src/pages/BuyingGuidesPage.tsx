import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight } from "lucide-react";
import { BUYING_GUIDES } from "@/content/buyingGuides";

const BuyingGuidesPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Robotics Buying Guides",
    description: "Practical buying guides for humanoid, quadruped, and robotic arm purchases.",
    hasPart: BUYING_GUIDES.map((g) => ({
      "@type": "Article",
      headline: g.title,
      url: `https://www.robotmart.store/buying-guides/${g.slug}`,
    })),
  };

  return (
    <div className="min-h-screen">
      <Seo
        title="Robotics Buying Guides — RobotMart"
        description="Vendor-neutral buying guides for humanoid robots, quadrupeds, and robotic arms. Specs, total cost of ownership, and procurement checklists."
        path="/buying-guides"
        jsonLd={jsonLd}
      />

      <section className="bg-gradient-to-br from-primary to-accent/20 text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm opacity-80 mb-3">
            <BookOpen className="h-4 w-4" /> Resources / Buying Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Robotics Buying Guides</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Vendor-neutral, engineering-grade guidance for teams sourcing humanoid robots, quadrupeds,
            and robotic arms. Built for researchers, integrators, and procurement leads.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {BUYING_GUIDES.map((g) => (
            <Link key={g.slug} to={`/buying-guides/${g.slug}`} className="group">
              <Card className="h-full transition-shadow hover:shadow-soft-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{g.category}</Badge>
                    <span className="text-xs text-muted-foreground">{g.readingMinutes} min read</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{g.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{g.intro}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center text-sm font-semibold text-primary">
                    Read the guide <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BuyingGuidesPage;
