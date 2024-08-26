import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { deleteHabit } from "@/api/habits";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

const HabitCard = ({ title, id }: { title: string; id: string }) => {
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <Link to="/habits/$habitId" params={{ habitId: id }}>
              {title}
            </Link>
          </CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              mutation.mutate({
                id,
              });
            }}
            variant="destructive"
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default HabitCard;
