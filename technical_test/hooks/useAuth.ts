import { useEffect, useState } from "react";
import { getAccessToken } from "@/storage/authToken";

type AuthStatus = "loading" | "loggedIn" | "loggedOut";

/**
 * 
 * @returns 
 */
export function useAuth() {
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let active = true;

    const checkAuth = async () => {
      try {
        const token = await getAccessToken();
        if (!active) return;
        setStatus(token ? "loggedIn" : "loggedOut");
      } catch {
        if (!active) return;
        setStatus("loggedOut");
      }
    };

    void checkAuth();

    return () => {
      active = false;
    };
  }, []);

  return {
    status,
  };
}
