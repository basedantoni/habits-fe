import { indexHabits } from "@/api/habits";
import { Habit } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CreateHabitButton from "./create-habit-button";
import HabitCard from "./habit-card";

const Habits = () => {
  // Queries
  const query = useQuery({ queryKey: ["habits"], queryFn: indexHabits });

  return (
    <div className="flex flex-col items-center">
      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {query.data?.map((habit: Habit) => (
          <HabitCard key={`habit_${habit.id}`} {...habit} />
        ))}
        <CreateHabitButton />
      </div>
    </div>
  );
};

export default Habits;
