import type{ Request, Response } from "express";
import { Product } from "../../models/product.model";

// ---------------- Get All Brands with Icon (Free) ----------------
export const getAllBrands = async (req: Request, res: Response) => {
  try {
    // Step 1: Get unique brands from DB
    const brands = await Product.aggregate([
      {
        $match: { brand: { $exists: true, $ne: null } },
      },
      {
        $group: {
          _id: "$brand",
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
        },
      },
      { $sort: { name: 1 } },
    ]);

    // Step 2: Generate free logo URL using Clearbit
    const brandsWithIcons = brands.map((b) => {
  const domain = `${b.name.replace(/\s+/g, "").toLowerCase()}.com`;
  const clearbitLogo = `https://logo.clearbit.com/${domain}`;
  const fallbackLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    b.name
  )}&background=random&size=128`;

  return {
    name: b.name,
    logo: clearbitLogo, // first try Clearbit
    fallbackLogo,        // keep for frontend fallback
    domain,
  };
});


    res.status(200).json(brandsWithIcons);
  } catch (error) {
    console.error("Error fetching brands with icons:", error);
    res.status(500).json({ message: "Server error" });
  }
};

