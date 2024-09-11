type WindowWithClerk = Window & {
  Clerk?: {
    session?: {
      getToken(): Promise<string | null>;
    };
  };
};

export const getSessionToken = async () => {
  if (!(window as WindowWithClerk).Clerk?.session) return null;
  return (
    (await (window as WindowWithClerk)?.Clerk?.session?.getToken()) ?? null
  );
};
