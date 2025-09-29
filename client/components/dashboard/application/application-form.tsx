"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, CheckCircle, Upload } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

interface ApplicationFormProps {
  mutate?: () => void;
}

export function ApplicationForm({ mutate }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    taxId: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    identityType: "nid" as "nid" | "passport",
  });

  const [uploadedDocs, setUploadedDocs] = useState<{
    nidFront?: File | null;
    nidBack?: File | null;
    passport?: File | null;
  }>({});

  const [loading, setLoading] = useState(false);

  //  handleInputChange to handle identityType reset
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      if (field === "identityType") {
        // clear opposite docs when switching
        if (value === "nid") {
          setUploadedDocs({ nidFront: null, nidBack: null });
        } else {
          setUploadedDocs({ passport: null });
        }
      }
      return { ...prev, [field]: value };
    });
  };

  const handleFileUpload = (
    docType: "nidFront" | "nidBack" | "passport",
    file: File
  ) => {
    setUploadedDocs((prev) => ({ ...prev, [docType]: file }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "identityType") data.append(key, value);
      });
      data.append(
        "idType",
        formData.identityType === "nid" ? "national_id" : "passport"
      );

      if (formData.identityType === "nid") {
        if (uploadedDocs.nidFront)
          data.append("nidFront", uploadedDocs.nidFront);
        if (uploadedDocs.nidBack) data.append("nidBack", uploadedDocs.nidBack);
      } else if (uploadedDocs.passport) {
        data.append("passport", uploadedDocs.passport);
      }

      console.log(data);
      const response = await api.post("/api/v1/seller/application", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status === "pending")
        toast.success("Application submitted successfully");
      mutate?.();

      setFormData({
        businessName: "",
        businessType: "",
        taxId: "",
        address: "",
        phone: "",
        email: "",
        description: "",
        identityType: "nid",
      });
      setUploadedDocs({});
    } catch (error) {
      toast.error("Submission failed");
      console.error("Error submitting application:", error);
    } finally {
      setLoading(false);
    }
  };

  const isIdentityUploaded =
    (formData.identityType === "nid" &&
      uploadedDocs.nidFront &&
      uploadedDocs.nidBack) ||
    (formData.identityType === "passport" && uploadedDocs.passport);

  // Upload Box
  const UploadBox = ({
    label,
    required,
    file,
    onChange,
  }: {
    label: string;
    required?: boolean;
    file?: File | null;
    onChange: (file: File) => void;
  }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        onChange(e.target.files[0]);
        e.target.value = ""; // reset file input so it can re-upload same file
      }
    };

    const triggerFilePicker = () => {
      fileInputRef.current?.click();
    };

    return (
      <div className="flex flex-col space-y-2">
        <p className="font-medium">{label}</p>
        {required && <p className="text-xs text-muted-foreground">Required</p>}

        <div
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 flex items-center justify-between hover:border-primary transition cursor-pointer relative"
          onClick={triggerFilePicker}
        >
          {file ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" /> Uploaded
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {file.name}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="ml-4"
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // stop parent click
                  triggerFilePicker();
                }}
              >
                Replace
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Upload className="h-5 w-5" />
              <span className="text-sm">Click to upload or drag file here</span>
            </div>
          )}

          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ---------------- Business Info ---------------- */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) =>
                  handleInputChange("businessName", e.target.value)
                }
                placeholder="Enter your business name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type *</Label>
              <Input
                id="businessType"
                value={formData.businessType}
                onChange={(e) =>
                  handleInputChange("businessType", e.target.value)
                }
                placeholder="e.g., LLC, Corporation"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxId">Tax ID Number *</Label>
            <Input
              id="taxId"
              value={formData.taxId}
              onChange={(e) => handleInputChange("taxId", e.target.value)}
              placeholder="Enter tax identification number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Business Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter complete business address"
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your business and products"
              rows={4}
            />
          </div>

          {/* ---------------- Identity Proof ---------------- */}
          <div className="p-4 border border-border rounded-lg space-y-4">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Identity Proof</p>
                <p className="text-sm text-muted-foreground">
                  Upload your National ID (Front & Back) or Passport
                </p>
              </div>
            </div>

            {/* Identity type selection */}
            <div className="flex space-x-4">
              <Button
                type="button"
                variant={
                  formData.identityType === "nid" ? "default" : "outline"
                }
                onClick={() => handleInputChange("identityType", "nid")}
              >
                National ID
              </Button>
              <Button
                type="button"
                variant={
                  formData.identityType === "passport" ? "default" : "outline"
                }
                onClick={() => handleInputChange("identityType", "passport")}
              >
                Passport
              </Button>
            </div>

            {formData.identityType === "nid" && (
              <div className="grid gap-4 md:grid-cols-2">
                <UploadBox
                  label="NID Front"
                  required
                  file={uploadedDocs.nidFront || null}
                  onChange={(file) => handleFileUpload("nidFront", file)}
                />
                <UploadBox
                  label="NID Back"
                  required
                  file={uploadedDocs.nidBack || null}
                  onChange={(file) => handleFileUpload("nidBack", file)}
                />
              </div>
            )}

            {formData.identityType === "passport" && (
              <UploadBox
                label="Passport"
                required
                file={uploadedDocs.passport || null}
                onChange={(file) => handleFileUpload("passport", file)}
              />
            )}
          </div>

          {/* ---------------- Application Process ---------------- */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Application Process</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Submit application with required documents</li>
              <li>• Admin review (2-7 business days)</li>
              <li>• Approval notification email</li>
              <li>• Dashboard access</li>
            </ul>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!isIdentityUploaded || loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
