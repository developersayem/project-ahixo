export interface ISellerOrderProduct {
  _id: string; // product ID
  title: string;
  price: number; // price per unit
  quantity: number;
  totalPrice: number; // price * quantity
  colors?: string[];
  warranty?: boolean;
  features?: string[];
}

export interface ISellerOrder {
  _id: string; // MongoDB order ID
  orderNumber: number; // readable sequential number per seller
  buyer: {
    _id: string;
    name: string;
    email: string;
    shippingAddress: string;
  };
  seller: {
    _id: string;
    name: string;
    email: string;
  };
  products: ISellerOrderProduct[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "processing" | "completed" | "on-hold" | "canceled" | "refunded";
  createdAt: string;
  updatedAt: string;
}
