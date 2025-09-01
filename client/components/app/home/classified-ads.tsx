/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const classifiedProducts = [
  {
    id: 1,
    title: "Canon EOS 1500D/Rebel T7 DSLR Camera with EF-S 18-55 mm f/3.5-",
    seller: "Paul K. Jensen",
    price: "$52,000",
    condition: "Used",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 2,
    title: "Sony Bravia 108 cm (43 inches) Full HD Smart LED TV KDL",
    seller: "Paul K. Jensen",
    price: "$320,000",
    condition: "Used",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 3,
    title:
      "The Children's Place Girls Medium Weight Puffer Jacket, Wind-resistant,",
    seller: "Paul K. Jensen",
    price: "$43,250",
    condition: "new",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 4,
    title: "SAMSUNG Galaxy A23 5G A Series Cell Phone, Factory Unlocked",
    seller: "Paul K. Jensen",
    price: "$25,260",
    condition: "Used",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 5,
    title: "Carhartt Girls' Zip Front Canvas Insulated Hooded Active Jac",
    seller: "Paul K. Jensen",
    price: "$69,990",
    condition: "new",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 6,
    title: "2021 Toyota RAV4",
    seller: "Paul K. Jensen",
    price: "$34,670",
    condition: "Used",
    image: "/placeholder.svg?height=120&width=120",
  },
];

export default function ClassifiedAds() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Classified Ads</h2>
          <Link
            href="/classified"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            View All Products
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-teal-400 to-teal-500 rounded-lg mb-8 overflow-hidden">
          <div className="relative z-10 flex items-center justify-center py-16 px-8">
            {/* Left person */}
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
              <img
                src="/placeholder.svg?height=200&width=150"
                alt="Woman with shopping bags"
                className="w-32 h-40 object-cover"
              />
            </div>

            {/* Center content */}
            <div className="text-center text-white max-w-2xl mx-auto">
              <div className="text-4xl font-bold mb-4">
                <span className="text-white/70">WHAT YOU NEED</span>
                <br />
                <span className="text-white">BUY OR SELL</span>
                <br />
                <span className="text-white/70">WHAT YOU NEED</span>
              </div>

              {/* Arrows */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-8 h-0.5 bg-white/70"></div>
                <div className="flex gap-2">
                  <div className="w-0 h-0 border-l-[8px] border-l-white/70 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                  <div className="w-0 h-0 border-r-[8px] border-r-white/70 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                </div>
                <div className="w-8 h-0.5 bg-white/70"></div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 inline-block">
                <p className="text-white font-medium">
                  Buy or Sell Your Used Products in Active eCommerce CMS
                </p>
              </div>
            </div>

            {/* Right person */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
              <img
                src="/placeholder.svg?height=200&width=150"
                alt="Man jumping"
                className="w-32 h-40 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classifiedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{product.seller}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-red-600">
                      {product.price}
                    </span>
                    <Badge
                      variant={
                        product.condition === "new" ? "default" : "secondary"
                      }
                      className={
                        product.condition === "new"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-pink-100 text-pink-800"
                      }
                    >
                      {product.condition}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
