"use client";

import { ChevronDown, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface INav {
  name: string;
  link: string;
}

const navItems: INav[] = [
  {
    name: "home",
    link: "/",
  },
  {
    name: "products",
    link: "/products",
  },
  {
    name: "flash sale",
    link: "/flash-sale",
  },
  {
    name: "brands",
    link: "/brands",
  },
  {
    name: "all categories",
    link: "/all-categories",
  },
  {
    name: "contact us",
    link: "/contact-us",
  },
  {
    name: "about",
    link: "/about",
  },
];

const categories = [
  {
    name: "Women Clothing & Fashion",
    icon: "/icons/woman-cloth-icon.png",
  },
  {
    name: "Men Clothing & Fashion",
    icon: "/icons/man-cloth-icon.png",
  },
  {
    name: "Computer & Accessories",
    icon: "/icons/computer-icon.png",
  },
  {
    name: "Automobile & Motorcycle",
    icon: "/icons/car-icon.png",
  },
  {
    name: "Kids & toy",
    icon: "/icons/kids-icon.png",
  },
  {
    name: "Sports & outdoor",
    icon: "/icons/sports-icon.png",
  },
  {
    name: "Jewelry & Watches",
    icon: "/icons/watch-icon.png",
  },
  {
    name: "Cellphones & Tabs",
    icon: "/icons/phone-icon.png",
  },
  {
    name: "Beauty, Health & Hair",
    icon: "/icons/beauty-icon.png",
  },
  {
    name: "Home Improvement & Tools",
    icon: "/icons/tools-icon.png",
  },
];

export function BottomNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Always open on certain routes
  const shouldStayOpen = pathname === "/";

  useEffect(() => {
    if (shouldStayOpen) setIsOpen(true);
    else setIsOpen(false);
  }, [shouldStayOpen, pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !shouldStayOpen
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shouldStayOpen]);
  return (
    <div className="bg-brand-500">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-12">
          {/* Navigation Menu */}
          <div className="flex items-center">
            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => !shouldStayOpen && setIsOpen(!isOpen)}
                className="bg-brand-600 hover:bg-brand-700 text-white h-12 px-4 rounded-none flex items-center justify-between w-64 font-medium"
                disabled={shouldStayOpen}
              >
                <div className="flex items-center space-x-2">
                  <span>Categories</span>
                  <span className="text-sm opacity-90">(See All)</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Content */}
              {isOpen && (
                <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-none z-10">
                  {categories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-brand-100 cursor-pointer border-b last:border-b-0 group"
                    >
                      <Image
                        src={cat.icon}
                        alt={cat.name}
                        width={24}
                        height={24}
                      />
                      <span className="text-neutral-700 font-medium text-sm transition-transform group-hover:translate-x-2">
                        {cat.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="bg-transparent text-white hover:bg-brand-700 h-12 capitalize rounded-none m-0 px-4 py-3 transition-all font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Shopping Cart */}

          <div className="flex items-center">
            <div className="bg-brand-600 flex items-center text-white hover:bg-brand-700 h-12 capitalize space-x-3 m-0 px-4 py-2 transition-all">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-bold">$0.00 (0 Items)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
