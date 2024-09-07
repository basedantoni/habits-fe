import { Link } from "@tanstack/react-router";
import BackspaceSVG from "./svg/backspace";

export function NotFound() {
  return (
    <div className="flex flex-col items-center gap-40">
      <h1 className="text-5xl font-bold">Not Found</h1>
      <Link
        to="/"
        className="flex flex-col gap-8 justify-center items-center underline"
      >
        <BackspaceSVG />
        <span>Go Home</span>
      </Link>
    </div>
  );
}
