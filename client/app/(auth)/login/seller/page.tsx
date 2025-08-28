import { LoginForm } from "@/components/shared/login-form";
import Image from "next/image";

export default function SellerLoginPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Split Layout for Desktop */}
      <div className="flex justify-center min-h-screen">
        {/* Left Side - Image */}
        <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-brand-100 to-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logos/ahixo-logo-not-align.webp"
              alt="Shopping cart with package"
              className="max-w-md w-full h-auto object-contain"
              width={600}
              height={400}
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <LoginForm
            role="seller"
            showBackButton={true}
            formDescription="Login to your seller account"
          />
        </div>
      </div>
    </div>
  );
}
