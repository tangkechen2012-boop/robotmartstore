import { createFileRoute } from "@tanstack/react-router";
import CollectionPage from "@/pages/CollectionPage";
import { loadCollection } from "@/lib/collectionRouteData";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ context, params, location }) => loadCollection(context.queryClient, params.slug, location),
  component: CollectionPage,
  notFoundComponent: CollectionPage,
});
