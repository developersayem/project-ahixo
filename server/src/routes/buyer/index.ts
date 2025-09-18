import {buyerRegistrationController } from "../../controller/buyer/auth.controller";
import { getSellerProfileController } from "../../controller/seller/profile.controller";
import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middlewares";
import orderRoutes from "../../routes/buyer/order.route";
import wishlistRoutes from "../../routes/buyer/wishlist.route";





const router = Router()

// Route for register buyer
router.route("/register").post(
    buyerRegistrationController,
)
// Route For seller profile update
router.route("/profile").put( verifyJWT, getSellerProfileController)

// mount order routes
router.use("/orders",verifyJWT,orderRoutes )
// mount wishlist routes
router.use("/wishlist",verifyJWT, wishlistRoutes)



export default router