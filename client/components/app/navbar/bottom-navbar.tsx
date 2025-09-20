"use client";

import { ChevronDown, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { useCart } from "@/hooks/api/useCart";
import { useAuth } from "@/contexts/auth-context";

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
    name: "all categories",
    link: "/categories",
  },
  {
    name: "brands",
    link: "/brands",
  },
  {
    name: "contact us",
    link: "/contact",
  },
];

const categories = [
  {
    name: "Women Clothing & Fashion",
    icon: "/icons/woman-cloth-icon.png",
    value: "women-clothing",
  },
  {
    name: "Men Clothing & Fashion",
    icon: "/icons/man-cloth-icon.png",
    value: "men-clothing",
  },
  {
    name: "Computer & Accessories",
    icon: "/icons/computer-icon.png",
    value: "computer-accessories",
  },
  {
    name: "Automobile & Motorcycle",
    icon: "/icons/car-icon.png",
    value: "automobile-motorcycle",
  },
  {
    name: "Kids & toy",
    icon: "/icons/kids-icon.png",
    value: "kids-toy",
  },
  {
    name: "Sports & outdoor",
    icon: "/icons/sports-icon.png",
    value: "sports-outdoor",
  },
  {
    name: "Jewelry & Watches",
    icon: "/icons/watch-icon.png",
    value: "jewelry-watches",
  },
  {
    name: "Cellphones & Tabs",
    icon: "/icons/phone-icon.png",
    value: "cellphones-tabs",
  },
  {
    name: "Beauty, Health & Hair",
    icon: "/icons/beauty-icon.png",
    value: "beauty-health-hair",
  },
  {
    name: "Home Improvement & Tools",
    icon: "/icons/tools-icon.png",
    value: "home-improvement-tools",
  },
];

export function BottomNavbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { totalCartItems, total } = useCart();

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Always open or always closed logic
  const shouldStayOpen = pathname === "/";
  const shouldStayClosed = pathname === "/products";

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

  const handleCategoryClick = (categoryValue: string) => {
    router.push(`/products?category=${categoryValue}`);
    if (!shouldStayOpen) {
      setIsOpen(false);
    }
  };

  const isNavItemActive = (link: string) => {
    return pathname === link || pathname.startsWith(link + "/");
  };

  return (
    <div className="bg-brand-500">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-12">
          {/* Navigation Menu */}
          <div className="flex items-center">
            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  if (!shouldStayOpen && !shouldStayClosed) {
                    setIsOpen(!isOpen);
                  }
                }}
                className="bg-brand-600 hover:bg-brand-700 text-white h-12 px-4 rounded-none flex items-center justify-between w-64 font-medium"
                disabled={shouldStayOpen || shouldStayClosed}
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
              {isOpen && !shouldStayClosed && (
                <div className="absolute top-full left-0 w-64 h-[490px] bg-white border border-gray-200 shadow-none z-10">
                  {categories.map((cat, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCategoryClick(cat.value)}
                      className="flex items-center space-x-3 px-2 py-3 hover:bg-brand-100 cursor-pointer border-b last:border-b-0 group"
                    >
                      <Image
                        src={cat.icon || "/placeholder.svg"}
                        alt={cat.name}
                        width={20}
                        height={20}
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
                className={clsx(
                  "h-12 capitalize rounded-none m-0 px-4 py-3 transition-all font-medium",
                  isNavItemActive(item.link)
                    ? "bg-brand-800 text-white" // Active state (darker)
                    : "bg-transparent text-white hover:bg-brand-800 hover:text-white" // Hover state (lighter)
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Shopping Cart */}
          {user?.role === "buyer" && (
            <div className="flex items-center">
              <Link href="/cart">
                <div className="bg-brand-600 flex items-center text-white hover:bg-brand-700 h-12 capitalize space-x-3 m-0 px-4 py-2 transition-all">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm font-bold">
                    ${total.toFixed(2)} ({totalCartItems})
                  </span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
