import Habits from "@/components/habits";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/habits/")({
  component: () => (
    <>
      <Habits />
    </>
  ),
});
