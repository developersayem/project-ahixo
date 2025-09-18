export interface Rating {
  user: string; // user._id from backend
  rating: number;
}

export interface IProduct {
  _id: string;
  seller: string; // seller._id
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  warranty?: string;
  colors?: string[];
  stock: number;
  isInHouseProduct?: boolean;
  inHouseProduct?: boolean;
  images: string[];
  tags: string[];
  features?: string[];
  category: string;
  brand?: string;
  shippingCost?: number;
  ratings?: Rating[];
  rating?: number; // average rating
  createdAt: string; // ISO date string from backend
  updatedAt: string; // ISO date string from backend
}
