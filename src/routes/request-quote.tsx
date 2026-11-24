import { createFileRoute } from "@tanstack/react-router";
import RequestQuotePage from "@/pages/RequestQuotePage";

export const Route = createFileRoute("/request-quote")({
  component: RequestQuotePage,
});
