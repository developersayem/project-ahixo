/* eslint-disable @next/next/no-img-element */
"use client";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { UserNav } from "@/components/shared/user-nav";
import { IDictionary } from "@/types/locale/dictionary.type";
import { SearchBar } from "../shared/search-bar";

export function MiddleNavbar({ dict }: { dict: IDictionary }) {
  const { user } = useAuth();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <div className="flex items-center ml-10">
                <div className="text-xl font-bold">
                  <img
                    src="/logos/ahixo-logo.webp"
                    alt="AHIXO"
                    width={150}
                    height={50}
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            {/* Search Bar */}
            <SearchBar placeholder={dict.middle_navbar.search_placeholder} />
          </div>

          {/* User Account */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-2">
                <Link href={"/login"} className="group">
                  <div className="flex gap-1  items-center">
                    <div className="border group-hover:border-brand-500 text-gray-600 group-hover:text-brand-500 p-1 rounded-full">
                      <User className="w-6 h-6" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-gray-600 group-hover:text-brand-500 hover:bg-transparent"
                    >
                      {dict.middle_navbar.login}
                    </Button>
                  </div>
                </Link>
                <span className="text-gray-600">|</span>
                <div className="flex text-sm">
                  <Link href={"/register"}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-gray-600 hover:text-brand-500 hover:bg-transparent"
                    >
                      {dict.middle_navbar.register}
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 mr-5">
                <UserNav dict={dict} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
