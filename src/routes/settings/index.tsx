import { ModeToggle } from "@/components/mode-toggle";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/")({
  component: () => (
    <div className="py-1 flex flex-col w-full gap-6 items-center">
      <h1 className="text-3xl">Choose theme</h1>
      <ModeToggle />
    </div>
  ),
});
