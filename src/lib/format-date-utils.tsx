import { parseISO, format } from "date-fns";
import { formatOptions } from "@/types";

export const formatDate = (
  dateStr: string,
  formatOptions: formatOptions
): string => {
  const date = parseISO(dateStr); // parse the ISO date string into a Date object
  return format(date, formatOptions);
};
