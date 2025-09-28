// types/user.interface.ts

// ---------- Shared Address ----------
export interface IAddress {
  street?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

// ---------- Seller Info ----------
export interface ISellerInfo {
  shopName: string;
  shopAddress: string;
  shopDescription?: string;
  rating?: number;
  totalSales?: number;
  isVerified?: boolean;
  documents?: string[];
}

// ---------- Base User ----------
export interface IBaseUser {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: IAddress;
  role: "buyer" | "seller" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

// ---------- Seller Interface ----------
export interface ISeller extends IBaseUser {
  role: "seller";
  sellerInfo?: ISellerInfo;
  refreshToken?: string;

  [key: string]: unknown; // <-- this fixes the Record<string, unknown> constraint
}

// ---------- Buyer Interface ----------
export interface IBuyer extends IBaseUser {
  role: "buyer";
}
