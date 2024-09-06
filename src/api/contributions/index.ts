import { api } from "@/api";
import { createContrubutionParams } from "@/types";

export const indexContributionsByHabit = async (id: string) => {
  const response = await api.get(`/v1/habits/${id}/contributions`);
  return response.data;
};

export const indexContributions = async (
  id: string,
  params?: Record<string, any>
) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(
    `/v1/habits/${id}/contributions?${queryString}`
  );
  return response.data;
};

export const createContribution = async (params: createContrubutionParams) => {
  const response = await api.post(`/v1/contributions`, params);
  return response.data;
};
