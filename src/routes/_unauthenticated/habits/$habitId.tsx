import { createFileRoute, Link } from "@tanstack/react-router";
import { showHabit } from "@/api/habits";
import { useQuery } from "@tanstack/react-query";
import { indexContributions } from "@/api/contributions";
import { Contribution } from "@/types";
import ActivityCalendar, {
  Activity,
  ThemeInput,
} from "react-activity-calendar";
import { Tooltip as MuiTooltip } from "@mui/material";
import { formatRFC3339, getYear, subYears } from "date-fns";
import { useWindowSize } from "@uidotdev/usehooks";
import { z } from "zod";
import { useTheme } from "@/components/theme-provider";
import DeleteHabitButton from "@/components/habits/delete-habit-button";
import CreateContributionButton from "@/components/contributions/create-contribution-button";
import { NotFound } from "@/components/not-found";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const contributionSearchSchema = z.object({
  year: z
    .number()
    .min(1970)
    .max(new Date().getFullYear())
    .catch(new Date().getFullYear()),
});

// type ContributionSearch = z.infer<typeof contributionSearchSchema>;

export const Route = createFileRoute("/_unauthenticated/habits/$habitId")({
  validateSearch: contributionSearchSchema,
  loader: ({
    context,
    params,
  }: {
    context: any;
    params: { habitId: string };
  }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["habits", params.habitId],
      queryFn: () => showHabit(params.habitId),
    }),
  component: Habit,
  notFoundComponent: NotFound,
});

function Habit() {
  const { habitId } = Route.useParams();
  const { year } = Route.useSearch();

  const startDate = formatRFC3339(subYears(new Date(), 1)).split("T")[0];
  const currentDate = formatRFC3339(new Date()).split("T")[0];

  const size = useWindowSize();
  const { theme } = useTheme();

  const { data: habit } = useQuery({
    queryKey: ["habits", habitId],
    queryFn: () => showHabit(habitId),
  });

  const { data: contributions, isLoading } = useQuery({
    queryKey: ["contributions", habitId, year],
    queryFn: () => indexContributions(habitId, { year }),
  });

  // Check if contributions is undefined before further processing
  if (!contributions) {
    return <p>Loading...</p>;
  }

  // Create a copy of contributions for processing without mutating the original data
  const contributionMap = new Map<string, Activity>();

  contributions.forEach((c: Contribution) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(c.createdAt).toLocaleDateString("en-CA", {
      timeZone,
    }); // Convert to local date in ISO format (YYYY-MM-DD)
    const activity = contributionMap.get(date);
    if (activity) {
      activity.count += c.timeSpent;
      activity.level = Math.min(Math.floor(activity.count / 60), 3);
    } else {
      contributionMap.set(date, {
        date,
        count: c.timeSpent,
        level: Math.min(Math.floor(c.timeSpent / 60), 3),
      });
    }
  });

  const contributionData = [
    contributionMap.get(startDate) ?? {
      date: startDate,
      count: 0,
      level: 0,
    },
    ...contributionMap.values(),
    contributionMap.get(currentDate) ?? {
      date: currentDate,
      count: 0,
      level: 0,
    },
  ];

  const explicitTheme: ThemeInput = {
    light: ["#F0F0F0", "#ffecc6", "#ffc766", "#ffa420"],
    dark: ["#4D4D4D", "#ea8f53", "#e46d2b", "#d55421"],
  };

  const initYearArray = (startYear: number) => {
    const currentYear = new Date().getFullYear();
    const yearArray = [];

    for (let year = currentYear; year >= startYear; year--) {
      yearArray.push(year);
    }

    return yearArray;
  };

  return (
    <div className="flex flex-col sm:items-center gap-6">
      <div className="flex flex-col gap-4">
        <HoverCard>
          <HoverCardTrigger>
            <h1 className="max-w-64 text-2xl font-bold text-nowrap text-ellipsis overflow-hidden">
              {habit.title}
            </h1>
          </HoverCardTrigger>
          <HoverCardContent align="start">{habit.title}</HoverCardContent>
        </HoverCard>
        <div className="flex gap-2">
          <CreateContributionButton habitId={habitId} />
          <DeleteHabitButton id={habitId} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <ActivityCalendar
          data={contributionData}
          theme={explicitTheme}
          colorScheme={theme === "system" ? undefined : theme}
          hideTotalCount
          hideMonthLabels={false}
          showWeekdayLabels
          blockSize={size.width ? (size.width > 950 ? 12 : 9) : 12}
          blockMargin={size.width ? (size.width > 950 ? 4 : 2.5) : 4}
          maxLevel={3}
          loading={isLoading}
          renderBlock={(block, activity) => (
            <MuiTooltip title={`${activity.count} minutes on ${activity.date}`}>
              {block}
            </MuiTooltip>
          )}
        />
        <div className="flex flex-col gap-2">
          {initYearArray(getYear(habit.createdAt)).map((year) => (
            <Link key={year} from={Route.fullPath} search={{ year }}>
              {year}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
