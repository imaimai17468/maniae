import { createFileRoute } from "@tanstack/react-router";
import { LastTrainPage } from "@/components/features/last-train/LastTrainPage";

export const Route = createFileRoute("/")({
  component: LastTrainPage,
});
