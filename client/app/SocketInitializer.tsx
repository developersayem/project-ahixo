// app/SocketInitializer.tsx
"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { initSocket, setupUserRooms } from "@/utils/socket";

export default function SocketInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user?._id) return;

    initSocket(); // initialize the socket
    setupUserRooms(user._id); // join all conversation rooms
  }, [user?._id]);

  return <>{children}</>;
}
