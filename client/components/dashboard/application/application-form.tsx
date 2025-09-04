"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, CheckCircle } from "lucide-react"

export function ApplicationForm() {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    taxId: "",
    address: "",
    phone: "",
    email: "",
    description: "",
  })

  const [uploadedDocs, setUploadedDocs] = useState({
    businessLicense: false,
    taxCertificate: false,
    identityProof: false,
    bankStatement: false,
  })

  const requiredDocuments = [
    { key: "businessLicense", label: "Business License", required: true },
    { key: "taxCertificate", label: "Tax Certificate", required: true },
    { key: "identityProof", label: "Identity Proof (ID/Passport)", required: true },
    { key: "bankStatement", label: "Bank Statement", required: false },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (docType: string) => {
    // Simulate file upload
    setUploadedDocs((prev) => ({ ...prev, [docType]: true }))
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Application submitted:", formData, uploadedDocs)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                placeholder="Enter your business name"
              />
            </div>
            <div>
              <Label htmlFor="businessType">Business Type *</Label>
              <Input
                id="businessType"
                value={formData.businessType}
                onChange={(e) => handleInputChange("businessType", e.target.value)}
                placeholder="e.g., LLC, Corporation"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="taxId">Tax ID Number *</Label>
            <Input
              id="taxId"
              value={formData.taxId}
              onChange={(e) => handleInputChange("taxId", e.target.value)}
              placeholder="Enter tax identification number"
            />
          </div>

          <div>
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
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div>
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

          <div>
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your business and products"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {requiredDocuments.map((doc) => (
            <div key={doc.key} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{doc.label}</p>
                  <p className="text-sm text-muted-foreground">{doc.required ? "Required" : "Optional"}</p>
                </div>
              </div>

              {uploadedDocs[doc.key as keyof typeof uploadedDocs] ? (
                <div className="flex items-center space-x-2 text-primary">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Uploaded</span>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => handleFileUpload(doc.key)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              )}
            </div>
          ))}

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Application Process</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Submit application with required documents</li>
              <li>• Email verification will be sent</li>
              <li>• Admin review (2-5 business days)</li>
              <li>• Approval notification and dashboard access</li>
            </ul>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!uploadedDocs.businessLicense || !uploadedDocs.taxCertificate || !uploadedDocs.identityProof}
          >
            Submit Application
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
