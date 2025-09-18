import mongoose, { Schema, Document } from "mongoose";

// Counter schema to track order numbers per seller
const CounterSchema = new Schema({
  seller: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  seq: { type: Number, default: 0 },
});
export const Counter = mongoose.model("Counter", CounterSchema);

// Timeline entry interface
interface ITimelineEntry {
  status: "processing" | "completed" | "on-hold" | "canceled";
  timestamp: Date;
  note?: string;
  updatedBy?: mongoose.Types.ObjectId; // User who made the change
}

// Order interface
export interface IOrder extends Document {
  orderNumber: number;
  seller: mongoose.Types.ObjectId;
  buyer: mongoose.Types.ObjectId;
  products: { product: mongoose.Types.ObjectId; quantity: number; price: number; name: string }[];
  total: number;
  status: "processing" | "delivered" | "on-hold" | "canceled";
  shippingAddress: string;
  date: Date;
  timeline: ITimelineEntry[];
  createdAt: Date;
  updatedAt: Date;
}

// Order schema
const OrderSchema: Schema = new Schema(
  {
    orderNumber: { type: Number },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        name: { type: String, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["processing", "delivered", "on-hold", "canceled"],
      default: "processing",
    },
    shippingAddress: { type: String, required: true },
    date: { type: Date, default: Date.now },
    timeline: [
      {
        status: {
          type: String,
          enum: ["processing", "delivered", "on-hold", "canceled"],
          required: true,
        },
        timestamp: { type: Date, default: Date.now },
        note: { type: String },
        updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

// Pre-save hook for order number assignment only
OrderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { seller: this.seller },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.orderNumber = counter.seq;

    // Initial timeline entry
    this.timeline = [{ status: this.status, timestamp: new Date(), note: "Order created" }];
  }
  next();
});

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
