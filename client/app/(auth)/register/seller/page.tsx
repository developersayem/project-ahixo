"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { VerificationForm } from "@/components/shared/verification-form";

export default function SellerRegisterPage() {
  const [step, setStep] = useState("register");

  // form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    shopName: "",
    shopAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Seller Registration Data:", formData);
    // TODO: Call /auth/register-seller API
    setStep("verify");
  };

  const SellerRegisterForm = () => (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
      {/* logo */}
      <div className="flex justify-center mb-4 md:hidden">
        <Image
          src="/logos/ahixo-logo.webp"
          alt="AHIXO"
          width={150}
          height={50}
        />
      </div>
      <h1 className="text-2xl font-bold text-brand-600 mb-6 text-center">
        Become a Seller
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
            value={formData.name}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <PhoneInput
            country={"auto"}
            enableSearch={true}
            disableDropdown={false}
            value={formData.phone}
            onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
            inputClass="!w-full !h-9 !pl-12 !rounded-none !border !border-gray-300 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-200"
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
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Seller-specific fields */}
        <div className="space-y-2">
          <Label htmlFor="shopName">Shop Name</Label>
          <Input
            id="shopName"
            type="text"
            placeholder="My Awesome Shop"
            required
            className="rounded-none"
            value={formData.shopName}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shopAddress">Shop Address</Label>
          <Input
            id="shopAddress"
            type="text"
            placeholder="123 Main Street, Dhaka"
            required
            className="rounded-none"
            value={formData.shopAddress}
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3"
        >
          Register as Seller
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
          Want to shop instead?{" "}
          <Link
            href="/register"
            className="text-brand-600 hover:text-brand-700 font-medium"
          >
            Register as Customer
          </Link>
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {step === "register" ? (
        <>
          {/* Desktop Layout */}
          <div className="hidden lg:flex min-h-screen">
            <div className="flex-1 relative bg-gradient-to-br from-brand-100 to-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/logos/ahixo-logo-not-align.webp"
                  alt="AHIXO Seller Register"
                  className="max-w-md w-full h-auto object-contain"
                  width={600}
                  height={400}
                />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center p-8">
              <SellerRegisterForm />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-center min-h-screen p-4">
            <SellerRegisterForm />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen m-5">
          <VerificationForm />
        </div>
      )}
    </div>
  );
}
