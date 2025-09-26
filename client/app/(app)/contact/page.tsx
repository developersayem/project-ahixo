"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Left Column - Contact Information */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact us
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              We&apos;re here to help! Whether you have a question about your
              order, need assistance with a product, or just want to share
              feedback, our team is ready to assist you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                <p className="text-gray-600">
                  13th Street, 47 W 13th St, New York, NY 10011, USA
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                <p className="text-gray-600">124-251-524</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Email Address
                </h3>
                <p className="text-gray-600">contact@ahixo.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-900 font-medium">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-12 border-gray-300 focus:border-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-12 border-gray-300 focus:border-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-900 font-medium">
                Phone no. (optional)
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter Phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="h-12 border-gray-300 focus:border-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-900 font-medium">
                Tell us about your query
              </Label>
              <Textarea
                id="message"
                placeholder="Type here..."
                rows={6}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="border-gray-300 focus:border-gray-400 resize-none min-h-[100px]"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-brand-600 hover:bg-brand-700 text-white font-medium"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
