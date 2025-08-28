import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { User } from "../../models/user.model";
import { generateVerificationCode } from "../../utils/generateVerificationCode";
import { sendVerificationEmailByGMAIL } from "../../email-templates/sendVerificationEmailByGMAIL";
import { generateAccessTokenAndRefreshToken } from "../../helper/generateAccessTokenAndRefreshToken";
import { cookieOptions } from "../../utils/cookieOptions";

// *---------------- Register Buyer ----------------
export const buyerRegistrationController = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, password, phone } = req.body;

  if ([fullName, email, phone, password].some((f) => !f?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User already exists");

  const verificationCode = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  const user = await User.create({
    fullName,
    email,
    phone,
    password,
    role: "buyer",
    emailVerified: false,
    emailVerificationCode: verificationCode,
    emailVerificationCodeExpires: expiresAt,
  });

  await sendVerificationEmailByGMAIL(email, verificationCode);

  return res.status(201).json(
    new ApiResponse(201, { email: user.email }, "Verification code sent")
  );
});

// *---------------- Login Buyer ----------------
export const buyerLoginController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password required");

  const user = await User.findOne({ email , role: "buyer" });
  if (!user) throw new ApiError(404, "User not found");

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Invalid credentials");

  if (!user.emailVerified) {
    throw new ApiError(401, "Email not verified");
  }

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id as string);

  return res.status(200)
  .cookie("accessToken", accessToken, cookieOptions)
  .cookie("refreshToken", refreshToken, cookieOptions)
  .json(
    new ApiResponse(200, user, "Login successful")
  );
});
