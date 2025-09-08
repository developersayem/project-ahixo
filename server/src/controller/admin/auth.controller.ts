import type { Request, Response } from "express";
import { cookieOptions } from "../../utils/cookieOptions";
import asyncHandler from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { User } from "../../models/user.model";
import { ApiResponse } from "../../utils/ApiResponse";
import { CODE_EXPIRES_MINUTES } from "../../constants";
import { generateVerificationCode } from "../../utils/generateVerificationCode";
import { generateAccessTokenAndRefreshToken } from "../../helper/generateAccessTokenAndRefreshToken";
import { sendVerificationEmailByGMAIL } from "../../email-templates/sendVerificationEmailByGMAIL";


// *---------------- Register Admin ----------------
export const adminRegistrationController = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, password, phone, shopName, shopAddress } = req.body;

  if ([fullName, email, password, phone, shopName, shopAddress].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!email.includes("@")) {
    throw new ApiError(400, "Invalid email address");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email");
  }

  // Generate OTP
  const verificationCode = generateVerificationCode();
  const expiresAt = new Date(Date.now() + CODE_EXPIRES_MINUTES * 60 * 1000);

  // Create admin
  const admin = await User.create({
    fullName,
    email,
    password,
    phone,
    role: "admin",
    emailVerified: false,
    emailVerificationCode: verificationCode,
    emailVerificationCodeExpires: expiresAt,
  });

  // Send verification email
  await sendVerificationEmailByGMAIL(email, verificationCode);

  return res.status(201).json(
    new ApiResponse(
      201,
      { email: admin.email },
      "Account created. Verification code sent to your email"
    )
  );
});

// *---------------- Login Admin ----------------
export const adminLoginController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) throw new ApiError(400, "Email and password are required");

  const user = await User.findOne({ email, role: "admin" });
  if (!user) throw new ApiError(404, "Admin not found");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

  if (!user.emailVerified) {
    throw new ApiError(403, "Email not verified");
  }

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id as string);

  return res.status(200)
  .cookie("accessToken", accessToken, cookieOptions)
  .cookie("refreshToken", refreshToken, cookieOptions)
  .json(
    new ApiResponse(200, user , "Login successful")
  );
});
