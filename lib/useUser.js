import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data: user, mutate: mutateUser } = useSWR("/api/auth/user");
  useEffect(() => {
    if (!user) return;
  }, [user]);
  return { user, mutateUser };
}
