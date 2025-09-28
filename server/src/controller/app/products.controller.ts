import type{ Request, Response } from "express";
import { Product } from "../../models/product.model";
import mongoose from "mongoose";
import axios from "axios";

// ---------------- Get All Products ----------------
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;

    const filters: any = {};

    if (category) filters.category = category;
    if (search) filters.title = { $regex: search as string, $options: "i" };

    const products = await Product.aggregate([
      { $match: filters },
      {
        $addFields: {
          averageRating: { $avg: "$ratings.rating" },
          totalRatings: { $size: "$ratings" },
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) },
      {
        $lookup: {
          from: "users", // assumes seller is User
          localField: "seller",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: "$seller" },
      {
        $project: {
          title: 1,
          price: 1,
          salePrice: 1,
          stock: 1,
          category: 1,
          brand: 1,
          images: 1,
          tags: 1,
          features: 1,
          colors: 1,
          shippingCost: 1,
          createdAt: 1,
          updatedAt: 1,
          averageRating: 1,
          totalRatings: 1,
          "seller._id": 1,
          "seller.fullName": 1,
          "seller.email": 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Get Single Product ----------------
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $addFields: {
          averageRating: { $avg: "$ratings.rating" },
          totalRatings: { $size: "$ratings" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "seller",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: "$seller" },
      {
        $project: {
          title: 1,
          description: 1,
          price: 1,
          salePrice: 1,
          stock: 1,
          category: 1,
          brand: 1,
          images: 1,
          tags: 1,
          features: 1,
          colors: 1,
          shippingCost: 1,
          warranty: 1,
          inHouseProduct: 1,
          createdAt: 1,
          updatedAt: 1,
          averageRating: 1,
          totalRatings: 1,
          ratings: 1,
          "seller._id": 1,
          "seller.fullName": 1,
          "seller.email": 1,
        },
      },
    ]);

    if (!product.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Get All Flash Sale Products ----------------
export const getFlashSaleProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;

    const filters: any = { isFlashSale: true };

    if (category) filters.category = category;
    if (search) filters.title = { $regex: search as string, $options: "i" };

    const products = await Product.aggregate([
      { $match: filters },
      {
        $addFields: {
          averageRating: { $avg: "$ratings.rating" },
          totalRatings: { $size: "$ratings" },
        },
      },
      { $sort: { createdAt: -1 } }, // latest first
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) },
      {
        $lookup: {
          from: "users",
          localField: "seller",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: "$seller" },
      {
        $project: {
          title: 1,
          description: 1,
          price: 1,
          salePrice: 1,
          stock: 1,
          category: 1,
          brand: 1,
          images: 1,
          tags: 1,
          features: 1,
          colors: 1,
          shippingCost: 1,
          warranty: 1,
          inHouseProduct: 1,
          createdAt: 1,
          updatedAt: 1,
          averageRating: 1,
          totalRatings: 1,
          ratings: 1,
          "seller._id": 1,
          "seller.fullName": 1,
          "seller.email": 1,
        },
      },
    ]);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching flash sale products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const CLEARBIT_LOGO_BASE = "https://logo.clearbit.com";

// ---------------- Get All Brands with Icon (Free) ----------------
export const getAllBrands = async (req: Request, res: Response) => {
  try {
    // Step 1: Get unique brands from DB
    const brands = await Product.aggregate([
      {
        $match: { brand: { $exists: true, $ne: null } },
      },
      {
        $group: {
          _id: "$brand",
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
        },
      },
      { $sort: { name: 1 } },
    ]);

    // Step 2: Generate free logo URL using Clearbit
    const brandsWithIcons = brands.map((b) => {
  const domain = `${b.name.replace(/\s+/g, "").toLowerCase()}.com`;
  const clearbitLogo = `https://logo.clearbit.com/${domain}`;
  const fallbackLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    b.name
  )}&background=random&size=128`;

  return {
    name: b.name,
    logo: clearbitLogo, // first try Clearbit
    fallbackLogo,        // keep for frontend fallback
    domain,
  };
});


    res.status(200).json(brandsWithIcons);
  } catch (error) {
    console.error("Error fetching brands with icons:", error);
    res.status(500).json({ message: "Server error" });
  }
};

