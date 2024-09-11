import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_unauthenticated")({
  component: () => (
    <>
      <SignedIn>
        <Outlet />
      </SignedIn>
      <div className="flex flex-col items-center">
        <SignedOut>
          <h1 className="text-4xl tracking-tight mb-4">
            Start Tracking Habits
          </h1>
          <Button>
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </>
  ),
});
