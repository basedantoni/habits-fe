import { NotFound } from "@/components/not-found";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <div className="w-full h-full min-h-dvh bg-white dark:bg-zinc-900 font-mono">
      <div className="container px-4 py-6 text-black dark:text-zinc-50">
        <div className="py-8">
          <Outlet />
        </div>
        {import.meta.env.VITE_NODE_ENV == "dev" && <TanStackRouterDevtools />}
      </div>
      <Toaster className="h-32" />
    </div>
  ),
  notFoundComponent: NotFound,
});
