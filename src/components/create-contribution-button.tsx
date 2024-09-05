import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/time-picker-input";
import { createContribution } from "@/api/contributions";

type CreateContributionProps = {
  habitId: string;
};

const CreateContributionButton = ({ habitId }: CreateContributionProps) => {
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: createContribution,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["habits", habitId] });
    },
  });

  const handleCreateContribution = () => {
    let hourToMinutes: number = 0;
    if (hourRef.current?.value && minuteRef.current?.value) {
      hourToMinutes = parseInt(hourRef.current?.value) * 60;
      const totalMinutes = parseInt(minuteRef.current?.value) + hourToMinutes;

      // Create a contribution
      mutation.mutate({
        timeSpent: totalMinutes,
        habitId: habitId,
      });
    }
  };

  const [date, setDate] = useState<Date>();

  // Time tracking refs
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-10 h-10" variant="outline" size="icon">
            <Pencil className="h-4 w-4 stroke-zinc-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Log Time</DialogTitle>
            <DialogDescription>
              Update the time you've spent on a habit.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-end gap-2">
            <div className="grid gap-1 text-center">
              <Label htmlFor="hours" className="text-xs">
                Hours
              </Label>
              <TimePickerInput
                picker="hours"
                date={date}
                setDate={setDate}
                ref={hourRef}
                onRightFocus={() => minuteRef.current?.focus()}
              />
            </div>
            <div className="grid gap-1 text-center">
              <Label htmlFor="minutes" className="text-xs">
                Minutes
              </Label>
              <TimePickerInput
                picker="minutes"
                date={date}
                setDate={setDate}
                ref={minuteRef}
                onLeftFocus={() => hourRef.current?.focus()}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button type="submit" onClick={handleCreateContribution}>
                Save changes
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateContributionButton;
