import { ModeToggle } from "@/components/mode-toggle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserButton } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_unauthenticated/settings/")({
  component: () => (
    <div className="pt-16 pb-1 flex flex-col w-full gap-6 items-center">
      <Card className="min-w-[300px] w-1/3">
        <CardHeader className="text-3xl">Settings</CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-center">
            <p>User</p>
            <UserButton />
          </div>
          <div className="flex justify-between items-center text-center">
            <p>Color Scheme</p>
            <ModeToggle />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
});
