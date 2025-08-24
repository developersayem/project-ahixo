"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag } from "lucide-react";

interface VerificationFormProps {
  onVerify?: (value: string, type: "email" | "phone") => void;
  onLoginClick?: () => void;
}

export function VerificationForm({
  onVerify,
  onLoginClick,
}: VerificationFormProps) {
  const [verificationType, setVerificationType] = useState<"email" | "phone">(
    "email"
  );
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onVerify?.(value, verificationType);
    }
  };

  const toggleVerificationType = () => {
    setVerificationType((prev) => (prev === "email" ? "phone" : "email"));
    setValue("");
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white">
      {/* Header Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center">
          <ShoppingBag className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-red-600 text-center mb-8">
        VERIFY YOUR EMAIL/PHONE
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="verification-input"
            className="text-sm font-medium text-gray-900"
          >
            {verificationType === "email" ? "Email" : "Phone"}
          </Label>
          <Input
            id="verification-input"
            type={verificationType === "email" ? "email" : "tel"}
            placeholder={
              verificationType === "email" ? "Email" : "Phone Number"
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        {/* Toggle Link */}
        <div className="text-center">
          <button
            type="button"
            onClick={toggleVerificationType}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            *Use {verificationType === "email" ? "Phone Number" : "Email"}{" "}
            Instead
          </button>
        </div>

        {/* Verify Button */}
        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
        >
          Verify
        </Button>
      </form>

      {/* Login Link */}
      <div className="text-center mt-6">
        <span className="text-gray-500 text-sm">Already have an account? </span>
        <button
          onClick={onLoginClick}
          className="text-red-600 hover:text-red-700 font-medium text-sm"
        >
          Log In
        </button>
      </div>
    </div>
  );
}
