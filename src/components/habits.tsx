import { indexHabits } from "@/api/habits";
import { Habit } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CreateHabit from "./create-habit";
import HabitCard from "./habit-card";

const Habits = () => {
  // Queries
  const query = useQuery({ queryKey: ["habits"], queryFn: indexHabits });

  return (
    <div className="container flex flex-col items-center">
      <CreateHabit />
      <div className="w-full flex flex-wrap gap-4">
        {query.data?.map((habit: Habit) => (
          <HabitCard
            key={`habit_${habit.id}`}
            title={habit.title}
            id={habit.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Habits;
