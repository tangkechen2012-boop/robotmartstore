import { createFileRoute } from "@tanstack/react-router";
import LegalNoticePage from "@/pages/LegalNoticePage";

export const Route = createFileRoute("/policies/legal-notice")({
  component: LegalNoticePage,
});
