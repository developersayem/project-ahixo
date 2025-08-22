"use client";

import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function MiddleNavbar() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center ml-10">
              <div className="text-xl font-bold">
                <Image
                  src="/logos/ahixo-logo.webp"
                  alt="AHIXO"
                  width={150}
                  height={50}
                />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="I am shopping for..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
              <Button
                size="sm"
                className="absolute right-0.5 top-0.5 bottom-1 bg-brand-500 hover:bg-brand-600 text-white px-3"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* User Account */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="border hover:border-brand-500 text-gray-600 hover:text-brand-500 p-1 rounded-full">
                <User className="w-6 h-6 " />
              </div>
              <div className="flex text-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-gray-600 hover:text-red-500"
                >
                  Login
                </Button>
                <span className="w-0.5 bg-neutral-100 mx-1"></span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-gray-600 hover:text-red-500"
                >
                  Registration
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
