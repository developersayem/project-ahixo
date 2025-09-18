export interface ICartItem {
  _id: string; // product _id
  name: string;
  price: number;
  salePrice?: number;
  stock?: number;
  colors?: string[];
  warranty?: boolean;
  inHouseProduct?: boolean;
  quantity: number;
  total: number;
  ShoppingCost: number;
  image: string;
  category: string;

  // --- New Fields ---
  selectedColor?: string; // chosen color
  selectedSize?: string;  // chosen size/variant
  customOptions?: Record<string, string>; // e.g. { RAM: "16GB", Storage: "512GB" }
}
