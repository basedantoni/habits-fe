import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const loginSearchSchema = z.object({
  redirect: z.string(),
});

export const Route = createFileRoute("/login/")({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({ to: "/habits" });
    }
  },
  component: Login,
  validateSearch: loginSearchSchema,
});

function Login() {
  const { redirect } = Route.useSearch();

  const handleGoogleLogin = () => {
    const encodedRedirect = encodeURIComponent(redirect || "/");
    window.location.href = `${import.meta.env.VITE_API_ENDPOINT}/auth/google?redirect=${encodedRedirect}`;
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 pt-16">
      <h1 className="text-4xl font-bold">Login to Track Habits</h1>
      <Button
        className="flex justify-center gap-2 px-16"
        onClick={() => handleGoogleLogin()}
      >
        <img src="/google.svg" alt="google_icon" />
        <span>Login</span>
      </Button>
    </div>
  );
}
