import BestSellingProducts from "@/components/app/home/best-selling-products";
import FeaturedCategories from "@/components/app/home/featured-categories";
import FeaturedProducts from "@/components/app/home/featured-products";
import FlashSaleSection from "@/components/app/home/flash-sale-section";
import { HeroCarousel } from "@/components/app/home/hero-carousel";
import ProductShowcase from "@/components/app/home/product-showcase";
import TopSellersCarousel from "@/components/app/home/top-sellers-carousel";

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen container flex justify-center">
      <div className="container w-full space-y-8">
        {/* Hero carousel section */}
        <div className="flex justify-end">
          <HeroCarousel />
        </div>
        <div className="px-4 md:px-0 space-y-8 ">
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
