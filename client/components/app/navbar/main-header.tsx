// components/app/navbar/main-header.tsx
"use client"; // this is a client component

import { TopNavbar } from "./top-navbar";
import { MiddleNavbar } from "./middle-navbar";
import { BottomNavbar } from "./bottom-navbar";
import { IDictionary } from "@/types/locale/dictionary.type";

interface MainHeaderProps {
  dict: IDictionary; // or create a proper type for your dictionary
}

export function MainHeader({ dict }: MainHeaderProps) {
  return (
    <header className="w-full hidden md:block">
      <TopNavbar dict={dict} />
      <MiddleNavbar dict={dict} />
      <BottomNavbar dict={dict} />
    </header>
  );
}
