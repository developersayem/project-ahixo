import express from "express";
import { getAllProducts, getFlashSaleProducts, getSingleProduct } from "../../controller/app/products.controller";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/flash-sale", getFlashSaleProducts);
router.get("/:id", getSingleProduct);


export default router;
