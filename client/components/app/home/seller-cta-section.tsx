import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Globe } from "lucide-react";
import Link from "next/link";

export function SellerCtaSection() {
  return (
    <section
      className={`py-20 bg-gradient-to-r from-[#0F4F2A] to-[#1a6b3a] transition-all duration-300 ease-in-out `}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <div className="w-20 h-20 bg-[#F4B400] rounded-full mx-auto mb-6 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-[#0F4F2A]" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Join thousands of African entrepreneurs building their dreams on
              AHIXO
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Users className="w-12 h-12 text-[#F4B400] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">50K+</h3>
              <p className="text-gray-200">Active Sellers</p>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 text-[#F4B400] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">54</h3>
              <p className="text-gray-200">Countries Connected</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-[#F4B400] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">$2M+</h3>
              <p className="text-gray-200">Monthly Sales</p>
            </div>
          </div>

          <Link href="/register/seller">
            <Button
              size="lg"
              className="bg-[#F4B400] hover:bg-[#e6a200] text-[#0F4F2A] font-semibold h-16 px-12 text-xl"
            >
              Become a Seller
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
