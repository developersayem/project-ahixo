import { CategoriesSection } from "@/components/app/home/categories-section";
import { FeaturesSection } from "@/components/app/home/features-section";
import { HeroCarousel } from "@/components/app/home/hero-carousel";
import { ProductsShowcase } from "@/components/app/home/products-showcase";
import { SellerCtaSection } from "@/components/app/home/seller-cta-section";
import { TestimonialSection } from "@/components/app/home/testimonial-section";

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen container flex justify-center">
      <div className="container w-full space-y-8">
        {/* Hero carousel section */}
        <div className="flex justify-end">
          <HeroCarousel />
        </div>
        <div className="px-4 md:px-0 space-y-8 ">
          <ProductsShowcase />
          <FeaturesSection />
          <CategoriesSection />
          <SellerCtaSection />
          <TestimonialSection />
        </div>
      </div>
    </main>
  );
}
