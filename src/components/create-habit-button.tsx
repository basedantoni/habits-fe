import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHabit } from "@/api/habits";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const CreateHabitButton = () => {
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      toast("Habit Created");
    },
  });

  const [title, setTitle] = useState<string>("");

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full h-52" variant="outline" size="icon">
            <PlusCircle className="h-16 w-16" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[300px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Habit</DialogTitle>
            <DialogDescription>Add a new habit to your list.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 overflow-visible">
            <div className="grid grid-cols-4 items-center gap-4 overflow-visible">
              <Input
                id="title"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button
                type="submit"
                onClick={() => {
                  mutation.mutate({
                    params: { title },
                  });
                }}
              >
                Save changes
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateHabitButton;
