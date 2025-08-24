import { SellerLoginForm } from "@/components/shared/login-form";
import Image from "next/image";

export default function SellerLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Split Layout for Desktop */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Side - Image */}
        <div className="flex-1 relative bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Shopping cart with package"
              className="max-w-md w-full h-auto object-contain"
              width={600}
              height={400}
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <SellerLoginForm showBackButton={true} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex items-center justify-center min-h-screen p-4">
        <SellerLoginForm showBackButton={true} />
      </div>
    </div>
  );
}
