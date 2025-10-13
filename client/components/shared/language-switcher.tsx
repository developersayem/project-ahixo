"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment.length > 0);
  const currentLocale =
    pathSegments[0] && ["en", "fr"].includes(pathSegments[0])
      ? pathSegments[0]
      : "en"; // default to 'en' if no valid locale found

  const locales = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
  ];

  const switchLanguage = (lang: string) => {
    // If current path starts with a locale, replace it
    if (["en", "fr"].includes(pathSegments[0])) {
      pathSegments[0] = lang;
      router.push("/" + pathSegments.join("/"));
    } else {
      // If current path doesn't start with a locale, prepend the new locale
      router.push("/" + lang + pathname);
    }
  };

  const currentLanguage =
    locales.find((locale) => locale.code === currentLocale)?.name || "English";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-gray-600 hover:text-gray-900"
        >
          {currentLanguage}
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => switchLanguage(locale.code)}
          >
            {locale.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
