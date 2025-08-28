import { Router } from "express";
import { refreshAccessTokenController } from "../../controller/auth/refresh.controller";
import { verifyEmail } from "../../controller/auth/auth.common.controller";


const router = Router()



router.post("/refresh", refreshAccessTokenController);

//Routes for verify user
router.post("/verify-email", verifyEmail);

export default router