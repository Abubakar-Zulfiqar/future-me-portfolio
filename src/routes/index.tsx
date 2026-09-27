import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/portfolio/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
});
