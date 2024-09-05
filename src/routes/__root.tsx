import { ModeToggle } from "@/components/mode-toggle";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="w-full h-full min-h-dvh bg-white dark:bg-zinc-900 font-mono">
      <div className="container px-4 py-6 text-black dark:text-zinc-50">
        <div className="flex justify-center gap-2 w-full h-12">
          <Link
            to="/habits"
            className="[&.active]:font-bold inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 rounded-full px-8"
          >
            Habits
          </Link>
          <ModeToggle />
        </div>
        <div className="py-8">
          <Outlet />
        </div>
        <TanStackRouterDevtools />
      </div>
    </div>
  ),
});
