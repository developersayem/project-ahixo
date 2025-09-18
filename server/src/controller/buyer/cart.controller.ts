import { Request, Response } from "express";
import { Cart } from "../../models/cart.model";
import asyncHandler from "../../utils/asyncHandler";
import mongoose from "mongoose";

// ---------------- Add or update item in cart ----------------
export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const buyerId = (req as any).user?._id;
  const { productId, quantity, selectedColor, selectedSize, warranty, customOptions } = req.body;

  if (!productId) throw new Error("ProductId is required");

  const qty = quantity && quantity > 0 ? quantity : 1;

  let cart = await Cart.findOne({ buyer: buyerId });

  if (!cart) {
    cart = await Cart.create({
      buyer: buyerId,
      items: [
        { product: productId, quantity: qty, selectedColor, selectedSize, warranty, customOptions },
      ],
    });
  } else {
    // Check if same product with same options already exists
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize &&
        item.warranty === warranty
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += qty;
    } else {
      cart.items.push({ product: productId, quantity: qty, selectedColor, selectedSize, warranty, customOptions });
    }
    await cart.save();
  }

  // Return updated cart with populated product info
  const updatedCart = await getPopulatedCart(buyerId);
  res.status(200).json({ success: true, data: updatedCart });
});

// ---------------- Remove item from cart ----------------
export const removeFromCart = asyncHandler(async (req: Request, res: Response) => {
  const buyerId = (req as any).user?._id;
  const { itemId } = req.params;

  const cart = await Cart.findOne({ buyer: buyerId });
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter((item) => item.product.toString() !== itemId);
  await cart.save();

  const updatedCart = await getPopulatedCart(buyerId);
  res.status(200).json({ success: true, data: updatedCart });
});

// ---------------- Update quantity of an item in cart ----------------
export const updateCartQuantity = asyncHandler(async (req: Request, res: Response) => {
  const buyerId = (req as any).user?._id;
  const { itemId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
  }

  const cart = await Cart.findOne({ buyer: buyerId });
  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  const itemIndex = cart.items.findIndex((item) => item.product.toString() === itemId);
  if (itemIndex === -1) return res.status(404).json({ success: false, message: "Item not found in cart" });

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  const updatedCart = await getPopulatedCart(buyerId);
  res.status(200).json({ success: true, data: updatedCart });
});

// ---------------- Get buyer's cart ----------------
export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const buyerId = (req as any).user?._id;
  const cartData = await getPopulatedCart(buyerId);
  res.status(200).json({ success: true, data: cartData });
});

// ---------------- Helper function to populate cart items ----------------
const getPopulatedCart = async (buyerId: string) => {
  const cartData = await Cart.aggregate([
    { $match: { buyer: new mongoose.Types.ObjectId(buyerId) } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $project: {
        _id: "$productDetails._id",
        name: "$productDetails.title",
        price: "$productDetails.price",
        salePrice: "$productDetails.salePrice",
        stock: "$productDetails.stock",
        colors: "$productDetails.colors",
        warranty: "$productDetails.warranty",
        inHouseProduct: "$productDetails.inHouseProduct",
        quantity: "$items.quantity",
        selectedColor: "$items.selectedColor",
        selectedSize: "$items.selectedSize",
        customOptions: "$items.customOptions",
        total: { $multiply: ["$productDetails.price", "$items.quantity"] },
        ShoppingCost: "$productDetails.shippingCost",
        image: { $arrayElemAt: ["$productDetails.images", 0] },
        category: "$productDetails.category",
      },
    },
  ]);

  return cartData;
};
