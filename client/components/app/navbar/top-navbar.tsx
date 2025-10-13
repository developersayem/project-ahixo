import { Button } from "@/components/ui/button";
import {} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { CurrencySelector } from "@/components/shared/currency-selector";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { IDictionary } from "@/types/locale/dictionary.type";

export function TopNavbar({ dict }: { dict: IDictionary }) {
  return (
    <div className="bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-7 text-sm">
          {/* Left side - Language and Currency */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            {/*  CurrencySelector */}
            <CurrencySelector />
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/register/seller"
              className="text-gray-600 hover:text-gray-900"
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-gray-600 hover:text-gray-900"
              >
                {dict.top_navbar.become_seller} !
              </Button>
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-gray-600 hover:text-gray-900"
              >
                {dict.top_navbar.login_as_seller}
              </Button>
            </Link>
          </div>

          {/* Right side - Seller links */}
        </div>
      </div>
    </div>
  );
}
