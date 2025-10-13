"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { IDictionary } from "@/types/locale/dictionary.type";

export default function ContactPageContent({ dict }: { dict: IDictionary }) {
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
              {dict.contact.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {dict.contact.description}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {dict.contact.address}
                </h3>
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
                <h3 className="font-semibold text-gray-900 mb-1">
                  {dict.contact.phone}
                </h3>
                <p className="text-gray-600">124-251-524</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {dict.contact.email}
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
                {dict.contact.form.email}
              </Label>
              <Input
                id="name"
                placeholder={dict.contact.form.namePlaceholder}
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-12 border-gray-300 focus:border-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900 font-medium">
                {dict.contact.form.email}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={dict.contact.form.emailPlaceholder}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-12 border-gray-300 focus:border-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-900 font-medium">
                {dict.contact.form.phone} ({dict.contact.form.optional})
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder={dict.contact.form.phonePlaceholder}
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="h-12 border-gray-300 focus:border-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-900 font-medium">
                {dict.contact.form.message}
              </Label>
              <Textarea
                id="message"
                placeholder={dict.contact.form.messagePlaceholder}
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
              {dict.contact.form.button}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
