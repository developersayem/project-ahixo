/* eslint-disable @next/next/no-img-element */
"use client";

import { ChevronDown, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useCart } from "@/hooks/api/useCart";
import { useAuth } from "@/contexts/auth-context";
import { useCurrency } from "@/contexts/currency-context";
import { IDictionary } from "@/types/locale/dictionary.type";

interface INav {
  name: string;
  link: string;
}

export function BottomNavbar({ dict }: { dict: IDictionary }) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current locale from URL (e.g. /en/products)
  const locale = pathname.split("/")[1] || "en";

  const navItems: INav[] = [
    { name: dict.bottom_navbar.pages.home, link: `/` },
    { name: dict.bottom_navbar.pages.products, link: `/${locale}/products` },
    {
      name: dict.bottom_navbar.pages.flash_sale,
      link: `/${locale}/flash-sale`,
    },
    {
      name: dict.bottom_navbar.pages.categories,
      link: `/${locale}/categories`,
    },
    { name: dict.bottom_navbar.pages.brands, link: `/${locale}/brands` },
    { name: dict.bottom_navbar.pages.contact, link: `/${locale}/contact` },
  ];

  const categories = [
    {
      name: dict.bottom_navbar.categories.women,
      icon: "/icons/woman-cloth-icon.png",
      value: "women-clothing",
    },
    {
      name: dict.bottom_navbar.categories.men,
      icon: "/icons/man-cloth-icon.png",
      value: "men-clothing",
    },
    {
      name: dict.bottom_navbar.categories.computer,
      icon: "/icons/computer-icon.png",
      value: "computer-accessories",
    },
    {
      name: dict.bottom_navbar.categories.automobile,
      icon: "/icons/car-icon.png",
      value: "automobile-motorcycle",
    },
    {
      name: dict.bottom_navbar.categories.kids,
      icon: "/icons/kids-icon.png",
      value: "kids-toy",
    },
    {
      name: dict.bottom_navbar.categories.sports,
      icon: "/icons/sports-icon.png",
      value: "sports-outdoor",
    },
    {
      name: dict.bottom_navbar.categories.jewelry,
      icon: "/icons/watch-icon.png",
      value: "jewelry-watches",
    },
    {
      name: dict.bottom_navbar.categories.cellphones,
      icon: "/icons/phone-icon.png",
      value: "cellphones-tabs",
    },
    {
      name: dict.bottom_navbar.categories.beauty,
      icon: "/icons/beauty-icon.png",
      value: "beauty-health-hair",
    },
    {
      name: dict.bottom_navbar.categories.home,
      icon: "/icons/tools-icon.png",
      value: "home-improvement-tools",
    },
    {
      name: dict.bottom_navbar.categories.all,
      icon: "/icons/all-category.png",
      value: "all-categories",
      link: `/${locale}/categories`,
    },
  ];

  const { user } = useAuth();
  const { totalCartItems, total } = useCart();
  const { symbolMap, currency } = useCurrency();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine dropdown behavior
  const shouldStayOpen =
    pathname === `/${locale}` || pathname === `/${locale}/`;
  const shouldStayClosed = pathname === `/${locale}/products`;

  useEffect(() => {
    setIsOpen(shouldStayOpen);
  }, [shouldStayOpen]);

  // Close dropdown when clicking outside
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

  const handleCategoryClick = (categoryValue: string, link?: string) => {
    if (link) {
      router.push(link);
    } else {
      router.push(`/${locale}/products?category=${categoryValue}`);
      if (!shouldStayOpen) setIsOpen(false);
    }
  };

  // ✅ FIXED active nav detection
  const isNavItemActive = (link: string) => {
    const isHome = link === `/${locale}` || link === `/${locale}/`;
    if (isHome) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === link || pathname.startsWith(link + "/");
  };

  return (
    <div className="bg-brand-500">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-12">
          {/* Left Navigation */}
          <div className="flex items-center">
            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  if (!shouldStayOpen && !shouldStayClosed) setIsOpen(!isOpen);
                }}
                className="bg-brand-600 hover:bg-brand-700 text-white h-12 px-4 flex items-center justify-between w-64 font-medium"
                disabled={shouldStayOpen || shouldStayClosed}
              >
                <div className="flex items-center space-x-2">
                  <span>{dict.bottom_navbar.categories.title}</span>
                  <span className="text-sm opacity-90">
                    ({dict.bottom_navbar.categories.see_all})
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Content */}
              {isOpen && !shouldStayClosed && (
                <div className="absolute top-full left-0 w-64 h-[490px] overflow-y-auto bg-white border border-gray-200 z-10">
                  {categories.map((cat, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCategoryClick(cat.value, cat.link)}
                      className="flex items-center space-x-3 px-3 py-[10.5px] hover:bg-brand-100 cursor-pointer border-b last:border-b-0 group"
                    >
                      <img
                        src={cat.icon}
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

            {/* Main Navigation Links */}
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={clsx(
                  "h-12 capitalize px-4 py-3 transition-all font-medium",
                  isNavItemActive(item.link)
                    ? "bg-white text-brand-700 shadow-inner" // ✅ Active style
                    : "text-white hover:bg-brand-700 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart Section */}
          {user?.role === "buyer" && (
            <div className="flex items-center">
              <Link href={`/${locale}/cart`}>
                <div className="bg-brand-600 flex items-center text-white hover:bg-brand-700 h-12 capitalize space-x-3 m-0 px-4 py-2 transition-all">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm font-bold">
                    {symbolMap[currency]}
                    {total.toFixed(2)} ({totalCartItems})
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
