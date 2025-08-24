"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface VerificationFormProps {
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

export function VerificationForm({ setIsVerified }: VerificationFormProps) {
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");

  // Handle submission of email/phone
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted value:", value); // Log email/phone
    setStep("code");
  };

  // Handle verification of OTP
  const handleVerify = () => {
    console.log("OTP entered:", otp); // Log OTP
    setIsVerified(true);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white">
      {/* Header Icon */}
      <div className="flex justify-center mb-6">
        <Image
          src="/logos/ahixo-logo.webp"
          alt="AHIXO"
          width={150}
          height={50}
        />
      </div>

      {step === "email" && (
        <>
          <h1 className="text-2xl font-bold text-brand-600 text-center mb-8">
            VERIFY YOUR PHONE
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="verification-input"
                className="text-sm font-medium text-gray-900"
              >
                Enter your email
              </Label>

              <Input
                id="verification-input"
                type="email"
                placeholder="example@gmail.com"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 px-4 transition-colors rounded-none"
            >
              Verify
            </Button>
          </form>
        </>
      )}

      {step === "code" && (
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold text-brand-600 text-center mb-8">
            ENTER VERIFICATION CODE
          </h1>

          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={otp}
            onChange={setOtp}
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="w-14 h-14 text-2xl border border-gray-300 rounded-lg mx-1 text-center"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <Button
            onClick={handleVerify}
            className="mt-6 w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 px-4 transition-colors rounded-none"
          >
            Verify Code
          </Button>
        </div>
      )}

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
