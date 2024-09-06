import { Button } from "@/components/ui/button";
import { createFileRoute, Router } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";

const indexSearchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: indexSearchSchema,
});

const handleGoogleLogin = () => {
  console.log(import.meta.env.VITE_API_ENDPOINT);
  window.location.href = `${import.meta.env.VITE_API_ENDPOINT}/auth/google`;
};

function Index() {
  const router = Router;

  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store token in local storage
      localStorage.setItem("token", token);

      // Optionally, remove the token from the URL
      // window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [router]);

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button onClick={handleGoogleLogin}>Google Login</Button>
    </div>
  );
}
