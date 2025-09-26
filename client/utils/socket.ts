// frontend socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001", {
      transports: ["websocket"], // optional but more stable
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
  }

  return socket;
};

/**
 * Emit this after the user logs in or the app mounts,
 * to join all conversation rooms automatically
 */
export const setupUserRooms = (userId: string) => {
  if (!socket) return;
  socket.emit("setupUser", { userId });
};

/**
 * Get the socket instance
 */
export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket() first.");
  }
  return socket;
};
