import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL: permanent redirect (HTTP 301 on server requests) to the canonical glossary page.
export const Route = createFileRoute("/glossary")({
  beforeLoad: () => {
    throw redirect({ to: "/resources/robotics-glossary", statusCode: 301 });
  },
});
