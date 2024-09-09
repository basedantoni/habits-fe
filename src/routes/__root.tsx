import { NotFound } from "@/components/not-found";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const activeProps = { style: { fontWeight: "bold" } };

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col w-full h-full min-h-dvh bg-white dark:bg-zinc-900 font-mono">
      <div className="flex-grow flex flex-col container h-full px-4 py-6 text-black dark:text-zinc-50">
        <Outlet />
        <div className="w-fit m-auto absolute right-4 top-6 sm:left-auto sm:right-4 sm:m-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg">
                <p>Menu</p>
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to="/" activeProps={activeProps}>
                <DropdownMenuItem>Home</DropdownMenuItem>
              </Link>
              <Link to="/habits" activeProps={activeProps}>
                <DropdownMenuItem>Habits</DropdownMenuItem>
              </Link>
              <Link to="/settings" activeProps={activeProps}>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {import.meta.env.VITE_NODE_ENV == "dev" && <TanStackRouterDevtools />}
      </div>
      <Toaster className="h-32" />
    </div>
  ),
  notFoundComponent: NotFound,
});
