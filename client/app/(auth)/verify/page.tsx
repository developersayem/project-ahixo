/* eslint-disable @next/next/no-img-element */
"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API request (replace with real verification API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    router.push("/checkout");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Illustration */}
            <div className="lg:w-1/2 bg-gradient-to-br from-slate-100 to-slate-200 p-8 lg:p-12 hidden lg:flex items-center justify-center">
              <img
                src="/verification.png"
                alt="Login Illustration"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Right side - Email Verification form */}
            <div className="lg:w-1/2 p-6 lg:p-12">
              <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-6 h-6 lg:w-8 lg:h-8 text-brand-600" />
                  </div>
                  <h1 className="text-xl lg:text-2xl font-bold text-brand-600 mb-2">
                    VERIFY YOUR EMAIL
                  </h1>
                  <p className="text-sm lg:text-base text-slate-600">
                    We&apos;ll send you a verification code to confirm your
                    email address
                  </p>
                </div>

                {/* Verification form */}
                <form onSubmit={handleVerify} className="space-y-6">
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm lg:text-base font-medium text-slate-700"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 text-sm lg:text-base"
                      required
                    />
                  </div>

                  {/* Verify button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 lg:py-4 text-sm lg:text-base font-medium rounded-lg"
                  >
                    {isLoading ? "Sending..." : "Verify"}
                  </Button>

                  {/* Login link */}
                  <div className="text-center text-sm lg:text-base text-slate-600">
                    Already have an account?{" "}
                    <Link
                      href="/admin/login"
                      className="text-brand-600 hover:text-brand-700 font-medium"
                    >
                      Log In
                    </Link>
                  </div>

                  {/* Back link */}
                  <div className="text-center pt-4">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 text-sm lg:text-base text-slate-600 hover:text-slate-800"
                    >
                      Back to Home Page
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
