export interface ITimelineEntry {
  status: "processing" | "delivered" | "on-hold" | "canceled";
  timestamp: string; // ISO string
  note?: string;
  updatedBy?: {
    _id: string;
    name: string;
  };
}

export interface IOrderBuyer {
  _id: string;
  name: string;
  email: string;
}

export interface IOrderProduct {
    images: string[];
  _id:string;
  quantity: number;
  name: string
  price:number
  brand:string

}

export interface IOrder {
  _id: string;
  orderNumber: number; // readable per-seller order number
  seller: string; // Just the seller ID from API response
  buyer?: IOrderBuyer; // Just the buyer ID from API response (optional since it might not be populated)
  products: IOrderProduct[];
  totalItems?:number; // total number of items in the order
  total: number;
  status: "processing" | "delivered" | "on-hold" | "canceled";
  shippingAddress: string;
  date: string; // ISO string
  timeline?: ITimelineEntry[]; // Timeline entries
  createdAt?: string; // Optional since it might not be in response
  updatedAt?: string; // Optional since it might not be in response
}