"use client";

import { ShieldCheck, Star, ShoppingBag } from "lucide-react";
import { IUser } from "@/types/user-type";
import { Card } from "@/components/ui/card";

interface INavBarProps {
  user: IUser | null;
  logout: () => void;
}

const demoUser: IUser = {
  _id: "1",
  role: "seller",
  phone: "1234567890",
  fullName: "admin",
  email: "admin@example.com",
  avatar: "/default-avatar.png",
  sellerInfo: {
    shopName: "Demo Store",
    shopAddress: "Dhaka",
    isVerified: false,
    rating: 0,
    totalSales: 0,
  },
};

export function StoreCard({ user }: INavBarProps) {
  const currentUser = user ?? demoUser;

  return (
    <Card>
      {/* Shop Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Shop Name
            </p>
            <p className="text-sm font-medium capitalize truncate">
              {currentUser.sellerInfo?.shopName || "No Shop Name"}
            </p>
          </div>

          {/* Verification Status */}
          <div className="flex items-center gap-1 text-xs font-medium ml-2">
            {currentUser.sellerInfo?.isVerified ? (
              <>
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span className="text-green-600">Verified</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4 text-red-600" />
                <span className="text-red-600">Not Verified</span>
              </>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">
            Address
          </p>
          <p className="text-sm capitalize">
            {currentUser.sellerInfo?.shopAddress || "No Address"}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-2 border-t border-sidebar-border">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">
            {currentUser.sellerInfo?.rating ?? 0} ★
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <ShoppingBag className="h-4 w-4 text-blue-500" />
          <span className="font-medium">
            {currentUser.sellerInfo?.totalSales ?? 0} Sales
          </span>
        </div>
      </div>
    </Card>
  );
}
