import { redirect } from "@tanstack/react-router";

export const isAuthenticated = () => {
  // redirect unauthenticated users
  return localStorage.getItem("token") !== null;
};

export const signOut = () => {
  localStorage.removeItem("token");
};

export const redirectUnauthenticatedUser = async ({
  location,
}: {
  location: Location; // this not the actual type I need to get it from @tanstack/react-router
}) => {
  // redirect unauthenticated users
  if (!(await isAuthenticated())) {
    throw redirect({
      to: "/login",
      search: {
        redirect: location.href,
      },
    });
  }
};
