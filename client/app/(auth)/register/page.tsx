"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function RegisterPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call /auth/register API
  };

  const RegisterForm = () => (
    // logo
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
      <div className="flex justify-center mb-4 md:hidden">
        <div className="flex items-center">
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
      </div>
      <h1 className="text-2xl font-bold text-brand-600 mb-6 text-center">
        Create Your Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            className="rounded-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            className="rounded-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <PhoneInput
            country={"auto"}
            value={""}
            onChange={(phone) => console.log(phone)}
            inputClass="w-full rounded-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            required
            className="rounded-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="********"
            required
            className="rounded-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3"
        >
          Register
        </Button>
      </form>

      {/* Links */}
      <div className="text-center mt-6 space-y-2">
        <p className="text-gray-500 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-brand-600 hover:text-brand-700 font-medium"
          >
            Log In
          </Link>
        </p>
        <p className="text-gray-500 text-sm">
          Want to sell on AHIXO?{" "}
          <Link
            href="/register/seller"
            className="text-brand-600 hover:text-brand-700 font-medium"
          >
            Become a Seller
          </Link>
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Side - Logo/Image */}
        <div className="flex-1 relative bg-gradient-to-br from-brand-100 to-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logos/ahixo-logo-not-align.webp"
              alt="AHIXO Register"
              className="max-w-md w-full h-auto object-contain"
              width={600}
              height={400}
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <RegisterForm />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex items-center justify-center min-h-screen p-4">
        <RegisterForm />
      </div>
    </div>
  );
}
