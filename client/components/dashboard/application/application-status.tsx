import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle, Mail, FileText } from "lucide-react";

interface ApplicationStatusProps {
  status: "pending" | "approved" | "rejected";
}

export function ApplicationStatus({ status }: ApplicationStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          color: "bg-yellow-100 text-yellow-800",
          title: "Application Under Review",
          description: "Your application is being reviewed by our team.",
        };
      case "approved":
        return {
          icon: CheckCircle,
          color: "bg-green-100 text-green-800",
          title: "Application Approved",
          description:
            "Congratulations! Your seller application has been approved.",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "bg-red-100 text-red-800",
          title: "Application Rejected",
          description:
            "Your application needs revision. Please check the feedback below.",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <config.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{config.title}</CardTitle>
              <p className="text-muted-foreground">{config.description}</p>
            </div>
            <Badge className={config.color}>{status.toUpperCase()}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-3">Application Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Application Submitted</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    Jan 15, 2025
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Email Verified</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    Jan 15, 2025
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {status === "pending" ? (
                    <Clock className="h-4 w-4 text-yellow-600" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  )}
                  <span className="text-sm">Admin Review</span>
                  {status !== "pending" && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      Jan 17, 2025
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Submitted Documents</h4>
              <div className="space-y-2">
                {[
                  "Business License",
                  "Tax Certificate",
                  "Identity Proof",
                  "Bank Statement",
                ].map((doc) => (
                  <div key={doc} className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{doc}</span>
                    <CheckCircle className="h-4 w-4 text-primary ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {status === "pending" && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-medium">Next Steps</span>
              </div>
              <p className="text-sm text-muted-foreground">
                We&apos;ll send you an email notification once the review is
                complete. This typically takes 2-5 business days.
              </p>
            </div>
          )}

          {status === "rejected" && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h4 className="font-medium text-destructive mb-2">Feedback</h4>
                <p className="text-sm text-muted-foreground">
                  Please provide clearer images of your business license and
                  update your business address to match the registered address
                  on file.
                </p>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Resubmit Application
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
