import {buyerRegistrationController } from "../../controller/buyer/auth.controller";
import { getBuyerProfileController } from "../../controller/buyer/profile.controller";
import { getSellerProfileController } from "../../controller/seller/profile.controller";
import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middlewares";


const router = Router()

// Route for register buyer
router.route("/register").post(
    buyerRegistrationController,
)
// Route For seller buyer
router.route("/profile").get(verifyJWT,getBuyerProfileController)
// Route For seller profile update
router.route("/profile").put( verifyJWT, getSellerProfileController)



export default router