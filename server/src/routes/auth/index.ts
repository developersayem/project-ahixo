import { Router } from "express";
import { refreshAccessTokenController } from "../../controller/auth/refresh.controller";


const router = Router()



router.post("/refresh", refreshAccessTokenController);



export default router