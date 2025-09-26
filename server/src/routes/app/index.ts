import { Router } from "express";
import productsRoutes from "./product.routes";




const router = Router()

// mount Product routes
router.use("/products",productsRoutes )



export default router