
export interface ICartItem {
  _id: string;
  title: string;
  name?: string;
  sellerId:string;
  price: number;
  salePrice?: number;
  stock?: number;
  colors?: string[];
  images: string[];
  warranty?: boolean;
  inHouseProduct?: boolean;
  quantity: number;
  total: number;
  shippingCost: number;
  image: string;
  sizes?: string[];
  ratings?: { user: string; rating: number }[];
  rating?: number;
  category: string;
  selectedColor?: string;
  selectedSize?: string;
  customOptions?: Record<string, string>;
}