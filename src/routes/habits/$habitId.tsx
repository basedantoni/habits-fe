import { createFileRoute } from "@tanstack/react-router";
import { showHabit } from "@/api/habits";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/habits/$habitId")({
  loader: ({
    context,
    params,
  }: {
    context: any;
    params: { habitId: string };
  }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["habits", params.habitId],
      queryFn: () => showHabit(params.habitId),
    }),
  component: Habit,
});

function Habit() {
  const { habitId } = Route.useParams();

  const { data: habit } = useQuery({
    queryKey: ["habits", habitId],
    queryFn: () => showHabit(habitId),
  });

  return (
    <>
      <h1>{habit.title}</h1>
    </>
  );
}
