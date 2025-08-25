import { Router } from "express";
import { sellerLoginController, sellerRegistrationController } from "../../controller/seller/auth.controller";
import { getSellerProfileController } from "../../controller/seller/profile.controller";
import { verifyJWT } from "../../middlewares/auth.middlewares";


const router = Router()

// Route for register seller
router.route("/register").post(
    sellerRegistrationController,
)
// Route for login seller
router.route("/login").post(
    sellerLoginController,
)
// Route For seller profile
router.route("/profile").get(verifyJWT, getSellerProfileController)
// Route For seller profile update
router.route("/profile").put( verifyJWT, getSellerProfileController)



export default router