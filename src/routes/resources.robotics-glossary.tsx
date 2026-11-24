import { createFileRoute } from "@tanstack/react-router";
import GlossaryPage from "@/pages/GlossaryPage";

export const Route = createFileRoute("/resources/robotics-glossary")({
  component: GlossaryPage,
});
