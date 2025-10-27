/* eslint-disable @next/next/no-img-element */
"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

interface SellerLoginFormProps {
  isAdmin?: boolean;
  formDescription?: string;
  showBackButton?: boolean;
}

export function LoginForm({
  isAdmin,
  formDescription = "Login to your account",
  showBackButton = false,
}: SellerLoginFormProps) {
  const { login, adminLogin } = useAuth(); // useAuth from context
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isAdmin) {
        await adminLogin(email, password);
      } else {
        await login(email, password);
      }
      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error("Login failed! Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4 md:hidden">
          <img
            src="/logos/ahixo-logo.webp"
            alt="AHIXO"
            width={150}
            height={50}
          />
        </div>
        <h1 className="text-2xl font-bold text-brand-500 mb-2">
          WELCOME BACK!
        </h1>
        <p className="text-neutral-600 text-sm capitalize">{formDescription}</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label
            htmlFor="email"
            className="text-sm font-medium text-neutral-900"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 h-12 text-neutral-500 rounded-none"
            required
          />
        </div>

        <div>
          <Label
            htmlFor="password"
            className="text-sm font-medium text-neutral-900"
          >
            Password
          </Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-12 pr-10 rounded-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label
              htmlFor="remember"
              className="text-sm text-gray-600 rounded-none"
            >
              Remember Me
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-none"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Register Link */}
        <div className="text-center">
          <span className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
          </span>
          <Link
            href="/register"
            className="text-sm text-brand-500 hover:text-brand-600 font-medium"
          >
            Register Now
          </Link>
        </div>

        {/* Back Button */}
        {showBackButton && (
          <div className="text-center pt-4">
            <Link
              href="/"
              className="text-sm text-brand-500 hover:text-brand-600 inline-flex items-center"
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}
