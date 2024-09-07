import {
  createFileRoute,
  Navigate,
  redirect,
  Router,
  useNavigate,
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
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log("TOKEN", token);
    if (token) {
      // Store token in local storage
      localStorage.setItem("token", token);

      // Optionally, remove the token from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.log("SHOULD REDIRECT");
      navigate({ to: "/login" });
    }
  }, [router]);

  return <div className="flex flex-col items-center">HOME</div>;
}
