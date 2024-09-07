import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

const handleGoogleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_ENDPOINT}/auth/google`;
};

export const Route = createFileRoute("/login/")({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({ to: "/habits" });
    }
  },
  component: () => (
    <div className="flex flex-col items-center justify-center text-center gap-8">
      <h1 className="text-4xl font-bold">Welcome to Better Habits</h1>
      <Button
        className="flex justify-center gap-2 px-16"
        onClick={handleGoogleLogin}
      >
        <img src="/google.svg" alt="google_icon" />
        <span>Login</span>
      </Button>
    </div>
  ),
});
