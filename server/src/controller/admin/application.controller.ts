// controllers/application.controller.ts
import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { Application } from "../../models/application.model";
import { User } from "../../models/user.model";



// ---------------- Admin: Get all applications ----------------
export const getAllApplications = asyncHandler(async (req: Request, res: Response) => {
  const applications = await Application.find().populate("user", "fullName email role");
  res.json(new ApiResponse(200, applications, "Applications fetched successfully"));
});

// ---------------- Admin: Review (approve/reject) ----------------
export const reviewApplication = asyncHandler(async (req: Request, res: Response) => {
  const { status, adminNotes } = req.body;
  const { id } = req.params;

  if (!["approved", "rejected"].includes(status)) {
    return new ApiError(400, "Invalid status");
  }

  const application = await Application.findById(id);
  if (!application) return new ApiError(404, "Application not found");

  application.status = status as "approved" | "rejected";
  application.adminNotes = adminNotes;

  await application.save();

  // If approved, update User role + sellerInfo.isVerified
  if (status === "approved") {
    await User.findByIdAndUpdate(application.user, {
      role: "seller",
      "sellerInfo.isVerified": true,
    });
  }

  res.json(new ApiResponse(200, application, "Application reviewed successfully"));
});
