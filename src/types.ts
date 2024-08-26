export type Habit = {
  id: string;
  title: string;
};

// Habit HTTP Parameters
export type UpdateHabitParams = {
  title: string;
};

export type CreateHabitParams = {
  title: string;
};
