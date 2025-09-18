import { Router } from "express";
import { refreshAccessTokenController } from "../../controller/auth/refresh.controller";
import { loginController, verifyEmail } from "../../controller/auth/auth.common.controller";


const router = Router()


router.post("/login", loginController);

router.post("/refresh-token", refreshAccessTokenController);

//Routes for verify user
router.post("/verify-email", verifyEmail);

export default router