"use client";
import api from "@/lib/axios";
import { IUser } from "@/types/user-type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "sonner";

interface ApiErrorResponse {
  message: string;
}

interface Tokens {
  accessToken?: string;
  refreshToken?: string;
}

interface AuthState {
  user: IUser | null;
  tokens: Tokens | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: IUser; tokens: Tokens | null } }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<IUser> };

const initialState: AuthState = {
  user: null,
  tokens: null,
  isLoading: true,
  isAuthenticated: false,
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<IUser>) => void;
  manualLogin: (user: IUser) => void;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isLoading: false,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        tokens: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return { ...initialState, isLoading: false };
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, initialState);

  // On app start → check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        try {
          const parsedUser = JSON.parse(localUser);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: parsedUser, tokens: null },
          });
        } catch {
          localStorage.removeItem("user");
        }
      }

      try {
        const res = await api.get("/api/v1/users/me");
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: res.data.data.user, tokens: null },
        });
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
      } catch {
        dispatch({ type: "LOGIN_FAILURE" });
      }
    };

    checkAuth();
  }, []);

  const manualLogin = (user: IUser) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "LOGIN_SUCCESS", payload: { user, tokens: null } });
  };

  const updateUser = (data: Partial<IUser>) => {
    const updatedUser = { ...state.user, ...data } as IUser;
    localStorage.setItem("user", JSON.stringify(updatedUser));
    dispatch({ type: "UPDATE_USER", payload: data });
  };

  // register buyer
  const register = async (data: RegisterData) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await api.post("/api/v1/buyer/register", data);
      if (res.status === 201) {
        toast.success("Registration successful!");
        router.push("/login");
      }
    } catch (e) {
      const error = e as AxiosError<ApiErrorResponse>;
      toast.error(error.response?.data?.message || "Registration failed");
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await api.post("/api/v1/auth/login", { email, password });

      const user = res.data.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN_SUCCESS", payload: { user, tokens: null } });

      toast.success("Login successful!");
      router.push("/");
    } catch (e) {
      const error = e as AxiosError<ApiErrorResponse>;
      toast.error(error.response?.data?.message || "Login failed");
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/v1/auth/logout");
    } catch (e) {
      const error = e as AxiosError<ApiErrorResponse>;
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message
      );
    } finally {
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateUser,
        manualLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
