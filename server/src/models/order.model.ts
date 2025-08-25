import mongoose, { Schema, Document } from "mongoose";

export interface IOrderProduct {
  product: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  buyer: mongoose.Types.ObjectId;
  products: IOrderProduct[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "canceled" | "refunded";
  createdAt: Date;
}

const OrderProductSchema: Schema = new Schema<IOrderProduct>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema<IOrder>({
  buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [OrderProductSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "canceled", "refunded"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
