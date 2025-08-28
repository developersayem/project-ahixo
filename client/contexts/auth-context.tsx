"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { IUser } from "@/types/user-type";
import type { ApiResponse, ApiError } from "@/types/api-response.type";

// ---------------- Types ----------------
interface AuthState {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: IUser }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<IUser> };

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  registerAsBuyer: (data: RegisterData) => Promise<ApiResponse<IUser>>;
  verifyEmail: (payload: {
    email: string;
    code: string;
  }) => Promise<ApiResponse<{ success: boolean }>>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<IUser>) => void;
  manualLogin: (user: IUser) => void;
}

// ---------------- Reducer ----------------
const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
      return { ...state, user: null, isLoading: false, isAuthenticated: false };
    case "LOGOUT":
      return { ...initialState };
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

// ---------------- Context ----------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check existing session
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsedUser = JSON.parse(localUser) as IUser;
      dispatch({ type: "LOGIN_SUCCESS", payload: parsedUser });
    }
  }, []);

  const manualLogin = (user: IUser) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  };

  const updateUser = (data: Partial<IUser>) => {
    if (!state.user) return;
    const updatedUser = { ...state.user, ...data };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    dispatch({ type: "UPDATE_USER", payload: data });
  };

  // ---------------- Actions ----------------
  const registerAsBuyer = async (data: RegisterData) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await api.post<ApiResponse<IUser>>(
        "/api/v1/buyer/register",
        data
      );
      return res.data; // return typed response
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      toast.error(error.response?.data?.message || "Registration failed");
      dispatch({ type: "LOGIN_FAILURE" });
      throw error.response?.data;
    }
  };

  const verifyEmail = async (payload: { email: string; code: string }) => {
    try {
      const res = await api.post<ApiResponse<{ success: boolean }>>(
        "/api/v1/auth/verify-email",
        payload
      );
      return res.data;
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      toast.error(error.response?.data?.message || "Email verification failed");
      throw error.response?.data;
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await api.post<ApiResponse<IUser>>("/api/v1/auth/login", {
        email,
        password,
      });
      const user = res.data.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      toast.error(error.response?.data?.message || "Login failed");
      dispatch({ type: "LOGIN_FAILURE" });
      throw error.response?.data;
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/v1/auth/logout");
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      console.error(error.response?.data?.message || error.message);
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
        registerAsBuyer,
        verifyEmail,
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
