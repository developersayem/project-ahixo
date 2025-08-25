import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  seller: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  images: string[];
  tags: string[];
  category: mongoose.Types.ObjectId;
  brand?: string;
  shippingCost?: number;
  rating?: number;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema<IProduct>({
  seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  salePrice: Number,
  stock: { type: Number, default: 0 },
  images: [String],
  tags: [String],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  brand: String,
  shippingCost: Number,
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
