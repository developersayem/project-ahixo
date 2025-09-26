import express from "express";
import { getAllProducts, getSingleProduct } from "../../controller/app/products.controller";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

export default router;
