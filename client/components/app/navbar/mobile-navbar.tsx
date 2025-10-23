"use client";

import { useState } from "react";
import { X, Menu, Search, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  // Extract current locale from URL (e.g. /en/products)
  const locale = pathname.split("/")[1] || "en";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    {
      name: "home",
      link: "/",
    },
    {
      name: "products",
      link: `/${locale}/products`,
    },
    {
      name: "flash sale",
      link: `/${locale}/flash-sale`,
    },
    {
      name: "all categories",
      link: `/${locale}/categories`,
    },
    {
      name: "brands",
      link: `/${locale}/brands`,
    },
    {
      name: "contact us",
      link: `/${locale}/contact`,
    },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        {/* Hamburger Menu Button */}
        <Button variant="ghost" size="sm" onClick={toggleMenu} className="p-2">
          <Menu className="h-6 w-6 text-gray-600" />
        </Button>

        {/* Logo */}
        <div className="text-xl font-bold">
          <Image
            src="/logos/ahixo-logo.webp"
            alt="AHIXO"
            width={150}
            height={50}
          />
        </div>

        {/* Search Button */}
        <Button variant="ghost" size="sm" className="p-2">
          <Search className="h-6 w-6 text-gray-600" />
        </Button>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="border hover:border-brand-500 text-gray-600 hover:text-brand-500 p-1 rounded-full">
                <User className="w-6 h-6 " />
              </div>
              <div className="flex gap-4">
                <button className="text-gray-700 hover:text-red-500 transition-colors">
                  Login
                </button>
                <button className="text-gray-700 hover:text-red-500 transition-colors">
                  Registration
                </button>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={closeMenu}
            className="absolute top-4 right-4 p-1"
          >
            <X className="text-red-500" />
          </Button>
        </div>
        {/* Menu Items */}
        <div className="py-4">
          {navItems.map((item, index) => (
            <Link key={index} href={item.link}>
              <button
                className="w-full text-left px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors border-b border-gray-100 last:border-b-0"
                onClick={closeMenu}
              >
                <span className="text-lg font-medium capitalize">
                  {item.name}
                </span>
              </button>
            </Link>
          ))}
        </div>
        {/* Language and Currency selector */}
        <div className="flex items-end justify-center h-7 text-sm">
          {/* Left side - Language and Currency */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-gray-600 hover:text-gray-900"
                >
                  English
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-gray-600 hover:text-gray-900"
                >
                  U.S. Dollar
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>U.S. Dollar</DropdownMenuItem>
                <DropdownMenuItem>Euro</DropdownMenuItem>
                <DropdownMenuItem>British Pound</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}
