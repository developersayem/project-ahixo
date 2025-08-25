import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { User } from "../../models/user.model";

// *------------------------------ GET PROFILE ------------------------------
export const getBuyerProfileController = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?._id;
  if (!userId) throw new ApiError(401, "Unauthorized");

  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) throw new ApiError(404, "User not found");

  return res.status(200).json(new ApiResponse(200, user, "Profile fetched successfully"));
});

// *------------------------------ UPDATE PROFILE ------------------------------
export const updateBuyerProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?._id;
  if (!userId) throw new ApiError(401, "Unauthorized");

  const user = await User.findById(userId);
  if (!user || user.role !== "buyer") throw new ApiError(404, "User not found");

  const { fullName, phone, address = {} } = req.body;

  if (fullName) user.fullName = fullName;
  if (phone) user.phone = phone;

  user.address = {
    street: address.street || user.address?.street || "",
    city: address.city || user.address?.city || "",
    country: address.country || user.address?.country || "",
    postalCode: address.postalCode || user.address?.postalCode || "",
  };

  await user.save();

  const updatedUser = await User.findById(userId).select("-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});
