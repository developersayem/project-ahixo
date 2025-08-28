// types/user.ts

export interface IAddress {
  street?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export interface ISellerInfo {
  shopName: string;
  shopAddress: string;
  shopDescription?: string;
  rating?: number;
  totalSales?: number;
  isVerified?: boolean;
  documents?: string[];
}

export type UserRole = "buyer" | "seller";

export interface IUser {
  _id: string;                     // MongoDB ID
  fullName: string;
  avatar: string;
  email: string;
  phone: string;
  role: UserRole;
  address?: IAddress;
  sellerInfo?: ISellerInfo;

  // Buyer-specific
  wishlist?: string[];             // product IDs
  cart?: string[];                 // product IDs
  orders?: string[];               // order IDs

  // Verification
  emailVerified?: boolean;

  createdAt?: string;              // ISO date string
  updatedAt?: string;              // ISO date string
}
