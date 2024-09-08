import { indexHabits } from "@/api/habits";
import CreateHabitButton from "@/components/habits/create-habit-button";
import HabitCard from "@/components/habits/habit-card";
import { isAuthenticated } from "@/lib/auth";
import { Habit } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/habits/")({
  beforeLoad: async ({ location }) => {
    // redirect unauthenticated users
    if (!isAuthenticated()) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    // set theme
    if (!localStorage.getItem("vite-ui-theme")) {
      throw redirect({
        to: "/settings",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Habits,
});

function Habits() {
  // Queries
  const query = useQuery({ queryKey: ["habits"], queryFn: indexHabits });

  return (
    <div className="flex flex-col items-center">
      <div className="w-full pt-16 pb-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {query.data?.map((habit: Habit) => (
          <HabitCard key={`habit_${habit.id}`} {...habit} />
        ))}
        <CreateHabitButton />
      </div>
    </div>
  );
}
