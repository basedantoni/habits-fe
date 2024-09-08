import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { useNavigate } from "@tanstack/react-router";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  const handleClick = (theme: any) => {
    setTheme(theme);

    navigate({ to: "/" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="round">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration-500" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration-500" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleClick("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleClick("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleClick("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
