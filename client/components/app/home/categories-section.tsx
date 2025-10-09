import { Card, CardContent } from "@/components/ui/card";
import { Shirt, Sparkles, Smartphone, Home, Palette, Gift } from "lucide-react";
import Link from "next/link";

const categories = [
  { icon: Shirt, name: "Fashion", color: "from-purple-500 to-pink-500" },
  { icon: Sparkles, name: "Beauty", color: "from-pink-500 to-rose-500" },
  { icon: Smartphone, name: "Electronics", color: "from-blue-500 to-cyan-500" },
  { icon: Home, name: "Home & Living", color: "from-green-500 to-emerald-500" },
  {
    icon: Palette,
    name: "Handmade African Goods",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Gift,
    name: "Gifts & Crafts",
    color: "from-indigo-500 to-purple-500",
  },
];

export function CategoriesSection() {
  return (
    <section className={`transition-all duration-300 ease-in-out`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0F4F2A] mb-4">
            Explore Categories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover authentic African products and connect with sellers across
            the continent
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link href={`/categories`} key={index}>
              <Card className="border-2 border-[#F4B400]/20 hover:border-[#F4B400] transition-colors cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#0F4F2A] text-sm leading-tight">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
