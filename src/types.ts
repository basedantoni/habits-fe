export type Habit = {
  id: string;
  title: string;
  streak: number;
  updatedAt: string;
};

export type Contribution = {
  id: string;
  timeSpent: number;
  createdAt: string;
};

// Habit HTTP Parameters
export type UpdateHabitParams = {
  title?: string;
  streak?: number;
};

export type CreateHabitParams = {
  title: string;
};

// Contribution HTTP Parameters
export type createContrubutionParams = {
  timeSpent: number;
  habitId: string;
};

export type updateContrubutionParams = {
  timeSpent: number;
};

export type formatOptions = "MM/DD" | "MM/DD/YYYY" | "YYYYMMDD";
