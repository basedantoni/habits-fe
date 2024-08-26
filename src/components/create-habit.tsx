import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHabit } from "@/api/habits";
import { useState } from "react";

const CreateHabit = () => {
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  const [title, setTitle] = useState<string>("");

  return (
    <>
      <Input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        onClick={() => {
          mutation.mutate({
            params: { title },
          });
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default CreateHabit;
