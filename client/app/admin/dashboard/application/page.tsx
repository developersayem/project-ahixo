import { ApplicationForm } from "@/components/dashboard/application/application-form";
import { ApplicationStatus } from "@/components/dashboard/application/application-status";

export default function ApplicationPage() {
  // In a real app, this would come from user session/database
  const applicationStatus = "pending"; // 'none' | 'pending' | 'approved' | 'rejected'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Seller Application
        </h2>
        <p className="text-muted-foreground">
          Apply to become a verified seller on the Ahixo marketplace.
        </p>
      </div>

      {applicationStatus === "pending" ? (
        <ApplicationForm />
      ) : (
        <ApplicationStatus status={applicationStatus} />
      )}
    </div>
  );
}
