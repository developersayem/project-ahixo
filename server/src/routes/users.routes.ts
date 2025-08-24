import { Router } from "express";
import { userRegistrationController, loginUserController, logoutUser, userController, updateProfileController, verifyUserController, resendVerificationCodeController, changePasswordController, verifyOTPController, resetPasswordController, verifyTwoFactorCodeController, send2FACodeController, getMeController } from "../controller/users.controller";
import {  avatarUpload } from "../middlewares/multer.middlewares";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { sendCodeLimiter } from "../middlewares/ratelimit.middlewares";


const router = Router()

// Route for get users
router.get("/", verifyJWT, userController);
// Route for get current user
router.get("/me", verifyJWT, getMeController);
// Route for register
router.route("/register").post(
    userRegistrationController
)
// Route for verify user
router.post("/verify", verifyUserController);
// Route for resend verification code
router.post("/resend", sendCodeLimiter, resendVerificationCodeController);
// Route for verify OTP
router.post("/verify-otp", sendCodeLimiter, verifyOTPController);
// Route for change password
router.post("/change-password", changePasswordController);
// Route for reset password
router.post("/reset-password", resetPasswordController);
// Route for login
router.post("/login",loginUserController);
// Route for logout
router.post("/logout",verifyJWT, logoutUser);
// Route for send 2FA code
router.post("/send-2fa", sendCodeLimiter, verifyJWT, send2FACodeController);
// Route for verify 2FA code
router.post("/verify-2fa", sendCodeLimiter, verifyTwoFactorCodeController);
// Route for update profile
router.put(
  "/profile",
  verifyJWT,
  avatarUpload.fields([{ name: "avatar", maxCount: 1 }]),
  updateProfileController
);



export default router