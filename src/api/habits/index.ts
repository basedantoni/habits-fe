import { client } from "@/api";
import { CreateHabitParams, UpdateHabitParams } from "@/types";

export const indexHabits = async () => {
  const response = await client.get("/v1/habits");
  return response.data;
};

export const showHabit = async (id: string) => {
  const response = await client.get(`/v1/habits/${id}`);
  return response.data;
};

export const createHabit = async ({
  params,
}: {
  params: CreateHabitParams;
}) => {
  const response = await client.post("/v1/habits", params);
  return response.data;
};

export const updateHabit = async ({
  id,
  params,
}: {
  id: string;
  params: UpdateHabitParams;
}) => {
  const response = await client.put(`/v1/habits/${id}`, { params });
  return response.data;
};

export const deleteHabit = async ({ id }: { id: string }) => {
  const response = await client.delete(`/v1/habits/${id}`);
  return response.data;
};
