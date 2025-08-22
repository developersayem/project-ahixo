import { TopNavbar } from "./top-navbar";
import { MiddleNavbar } from "./middle-navbar";
import { BottomNavbar } from "./bottom-navbar";

export function MainHeader() {
  return (
    <header className="w-full hidden md:block">
      <TopNavbar />
      <MiddleNavbar />
      <BottomNavbar />
    </header>
  );
}
