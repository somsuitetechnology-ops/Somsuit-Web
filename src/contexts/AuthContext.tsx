import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { login as apiLogin, setApiTokenProvider, type LoginResponse } from "@/lib/api";

const TOKEN_KEY = "somsuite_token";
const USER_KEY = "somsuite_user";

type User = LoginResponse["user"];

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (...roles: Array<"ADMIN" | "STAFF" | "CLIENT">) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStored(): { token: string | null; user: User | null } {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);
    const user = userJson ? (JSON.parse(userJson) as User) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const persist = useCallback((token: string | null, user: User | null) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, []);

  const logout = useCallback(() => {
    setApiTokenProvider(() => null);
    persist(null, null);
    setState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, [persist]);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await apiLogin(email, password);
      setApiTokenProvider(() => res.token);
      persist(res.token, res.user);
      setState({
        user: res.user,
        token: res.token,
        isLoading: false,
        isAuthenticated: true,
      });
    },
    [persist]
  );

  useEffect(() => {
    const { token, user } = readStored();
    if (token) {
      setApiTokenProvider(() => token);
      setState({
        user,
        token,
        isLoading: false,
        isAuthenticated: true,
      });
    } else {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, []);

  const hasRole = useCallback(
    (...roles: Array<"ADMIN" | "STAFF" | "CLIENT">) => {
      return !!state.user && roles.includes(state.user.role);
    },
    [state.user]
  );

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
