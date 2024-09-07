import useFlickerOpacity from "@/hooks/useFlickerOpacity";
import useScrambleText from "@/hooks/useScrambleText";
import {
  createFileRoute,
  Link,
  redirect,
  Router,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";

const indexSearchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute("/")({
  beforeLoad: async ({ location }) => {
    // set theme
    if (!localStorage.getItem("vite-ui-theme")) {
      throw redirect({
        to: "/settings",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Index,
  validateSearch: indexSearchSchema,
});

function Index() {
  const router = Router;

  const antFlicker = useFlickerOpacity({
    phrase: "ANT",
    maxFlickerTimes: 6,
    minFlickerTimes: 1,
  });

  const flicker = useFlickerOpacity({
    phrase: "0S®",
    maxFlickerTimes: 8,
    minFlickerTimes: 1,
  });

  const habitsLinkScambled = useScrambleText({
    title: "habits",
    animationDelay: 600,
    paused: false,
    once: true,
  });

  const websiteLinkScambled = useScrambleText({
    title: "Made by Anthony Mercado",
    animationDelay: 800,
    paused: false,
    once: true,
  });

  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      // Store token in local storage
      localStorage.setItem("token", token);

      // Optionally, remove the token from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [router]);

  return (
    <div className="flex-grow flex flex-col h-full justify-between">
      <div className="flex flex-col">
        {antFlicker.map(({ word, opacity }, index) => (
          <span
            className="text-6xl font-semibold"
            key={index}
            style={{ opacity }}
          >
            {word}&nbsp;
          </span>
        ))}
        {flicker.map(({ word, opacity }, index) => (
          <span
            className="text-6xl font-semibold"
            key={index}
            style={{ opacity }}
          >
            {word}&nbsp;
          </span>
        ))}
      </div>
      <Link to="/habits" className="text-sm hover:underline">
        {habitsLinkScambled}
      </Link>
      <a
        className="text-sm text-zinc-600 hover:underline"
        href="https://www.anthonymercado.xyz/"
      >
        {websiteLinkScambled}
      </a>
    </div>
  );
}
