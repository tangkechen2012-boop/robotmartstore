import { createFileRoute } from "@tanstack/react-router";
import ContactInformationPolicyPage from "@/pages/ContactInformationPolicyPage";

export const Route = createFileRoute("/policies/contact-information")({
  component: ContactInformationPolicyPage,
});
