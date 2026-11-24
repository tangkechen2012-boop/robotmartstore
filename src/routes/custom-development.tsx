import { createFileRoute } from "@tanstack/react-router";
import CustomDevelopmentPage from "@/pages/CustomDevelopmentPage";

export const Route = createFileRoute("/custom-development")({
  component: CustomDevelopmentPage,
});
