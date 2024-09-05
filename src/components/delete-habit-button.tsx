import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { deleteHabit } from "@/api/habits";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeleteHabitButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  // Mutations
  // TODO: redirect to habits list
  const mutation = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  return (
    <>
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
    </>
  );
};

export default DeleteHabitButton;
