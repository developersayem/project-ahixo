"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function SellerRegisterPage() {
  const router = useRouter();
  const { registerAsSeller, verifyEmail } = useAuth();
  const [step, setStep] = useState<"register" | "verify">("register");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    shopName: "",
    shopAddress: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhoneChange = (phone: string) => {
    setFormData((prev) => ({ ...prev, phone }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await registerAsSeller(formData);
      if (res.success) {
        toast.success(
          "Registration successful! Please check your email for verification code."
        );
        setStep("verify");
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (err: unknown) {
      console.error("Registration error:", err);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await verifyEmail({
        email: formData.email,
        code: verificationCode,
      });
      if (res.success) {
        toast.success("Email verified successfully!");
        router.push("/login");
      } else {
        toast.error(res.message || "Verification failed");
      }
    } catch (err: unknown) {
      console.error("Verification error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-brand-100 to-gray-200">
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

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          {step === "register" ? (
            <>
              <div className="flex justify-center mb-4 lg:hidden">
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

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.fullName}
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
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <PhoneInput
                    country={"auto"}
                    enableSearch
                    disableDropdown={false}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    inputClass="!w-full !h-9 !pl-12 !rounded-none !border !border-gray-300 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-200"
                  />
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-7/10 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-7/10 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {/* Seller fields */}
                <div className="space-y-2">
                  <Label htmlFor="shopName">Shop Name</Label>
                  <Input
                    id="shopName"
                    type="text"
                    placeholder="My Awesome Shop"
                    required
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
              </div>
            </>
          ) : (
            <>
              {/* Verification Step */}
              <h1 className="text-2xl font-bold text-brand-600 mb-6 text-center">
                Verify Your Email
              </h1>

              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={verificationCode}
                    onChange={setVerificationCode}
                    className="w-full"
                  >
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3"
                >
                  Verify
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
