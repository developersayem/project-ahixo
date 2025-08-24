import { VerificationForm } from "@/components/shared/verification-form";

export default function VerifyPage() {
  const handleVerify = (value: string, type: "email" | "phone") => {
    console.log(`Verifying ${type}:`, value);
    // Handle verification logic here
  };

  const handleLoginClick = () => {
    console.log("Navigate to login");
    // Handle navigation to login page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <VerificationForm
        onVerify={handleVerify}
        onLoginClick={handleLoginClick}
      />
    </div>
  );
}
