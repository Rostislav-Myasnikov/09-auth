"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type Prop = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Prop) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearIsAuthenticated);

  useEffect(() => {
    const fethUser = async () => {
      const isAuth = await checkSession();
      if (isAuth) {
        const user = await getMe()
        if (user) setUser(user)
      } else {
        clearAuth();
      }
    };
    fethUser();
  }, [setUser, clearAuth]);
  return children;
}
