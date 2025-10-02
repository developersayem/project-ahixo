import type { Request, Response } from "express";
import { Category } from "../../models/category.model";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";



// Get All Categories (with parent + subcategories populated)
export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "parentCategory",
          foreignField: "_id",
          as: "parentCategory",
        },
      },
      { $unwind: { path: "$parentCategory", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "categories",
          localField: "subCategories",
          foreignField: "_id",
          as: "subCategories",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    res.status(200).json(
        new ApiResponse(200, categories, "Categories fetched successfully")
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json(
        new ApiError(500, "Server Error")
    );
  }
});
