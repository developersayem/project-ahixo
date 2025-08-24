import BestSellingProducts from "@/components/home/best-selling-products";
import FeaturedCategories from "@/components/home/featured-categories";
import FeaturedProducts from "@/components/home/featured-products";
import FlashSaleSection from "@/components/home/flash-sale-section";
import { HeroCarousel } from "@/components/home/hero-carousel";
import ProductShowcase from "@/components/home/product-showcase";
import TopSellersCarousel from "@/components/home/top-sellers-carousel";

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen container flex justify-center">
      <div className="container w-full space-y-8">
        {/* Hero carousel section */}
        <div className="flex justify-end">
          <HeroCarousel />
        </div>
        <div className="px-4 md:px-0 ">
          {/* Fash sale sections */}
          <FlashSaleSection />
          {/* Featured categories section */}
          <FeaturedCategories />
          {/* Featured products section */}
          <FeaturedProducts />
          {/* Best selling products section */}
          <BestSellingProducts />
          {/* product show  section */}
          <ProductShowcase />
          {/* Top sellers carousel section */}
          <TopSellersCarousel />
        </div>
      </div>
    </main>
  );
}
