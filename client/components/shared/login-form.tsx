"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface SellerLoginFormProps {
  showBackButton?: boolean;
}

export function SellerLoginForm({
  showBackButton = false,
}: SellerLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Login attempt:", { email, rememberMe });
  };

  const handleCopyCredentials = () => {
    setEmail("seller@example.com");
    setPassword("password123");
    console.log("[v0] Credentials copied");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-red-500 mb-2">WELCOME BACK !</h1>
        <p className="text-gray-600">Login To Your Seller Account</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-900">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 h-12 text-gray-500"
            required
          />
        </div>

        <div>
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-900"
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
              className="h-12 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
            <Label htmlFor="remember" className="text-sm text-gray-600">
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
          className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-medium"
        >
          Login
        </Button>

        {/* Copy Credentials */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">
            Seller Account
          </span>
          <Button
            type="button"
            onClick={handleCopyCredentials}
            className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 text-sm"
          >
            Copy credentials
          </Button>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <span className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
          </span>
          <Link
            href="/seller/register"
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Register Now
          </Link>
        </div>

        {/* Back Button */}
        {showBackButton && (
          <div className="text-center pt-4">
            <Link
              href="/"
              className="text-sm text-red-500 hover:text-red-600 inline-flex items-center"
            >
              ← Back to Previous Page
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}
