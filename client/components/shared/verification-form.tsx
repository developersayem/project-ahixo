"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

interface VerificationFormProps {
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

export function VerificationForm({ setIsVerified }: VerificationFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerified(true);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white">
      {/* Header Icon */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center">
          <div className="text-xl font-bold">
            <Image
              src="/logos/ahixo-logo.webp"
              alt="AHIXO"
              width={150}
              height={50}
            />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-brand-600 text-center mb-8">
        VERIFY YOUR PHONE
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="verification-input"
            className="text-sm font-medium text-gray-900"
          >
            Phone
          </Label>

          <Input
            id="verification-input"
            type="tel"
            placeholder="Phone Number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            required
          />
        </div>

        {/* Verify Button */}
        <Button
          type="submit"
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 px-4 transition-colors rounded-none"
        >
          Verify
        </Button>
      </form>

      {/* Login Link */}
      <div className="text-center mt-6">
        <span className="text-gray-500 text-sm">Already have an account? </span>
        <Link
          href="/login"
          className="text-brand-600 hover:text-brand-700 font-medium text-sm"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
