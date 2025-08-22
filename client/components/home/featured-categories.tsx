/* eslint-disable @next/next/no-img-element */
import { MoveRight } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  title: string;
  image: string;
  subcategories: string[];
}

const categories: Category[] = [
  {
    id: "women-fashion",
    title: "Women Clothing & Fashion",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/nZI9U43Qh0eGER5tcaWbQ9y2yJzHhFmK2edZ4T0R.webp",
    subcategories: [
      "Hot Categories",
      "Wedding & events",
      "Bottom",
      "Tops & sets",
      "Accessories",
    ],
  },
  {
    id: "men-fashion",
    title: "Men Clothing & Fashion",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/huj0Q3hBncctLYsiLeQg5mObSIPk8s1NGi1JdsmP.webp",
    subcategories: [
      "Hot Categories",
      "Outwear & jackets",
      "Bottom",
      "Underwear & Loungewear",
      "Accessories",
    ],
  },
  {
    id: "computer-accessories",
    title: "Computer & Accessories",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/D43CcOyIu7rhylJCZYsj8XV5Y5QjXpv4KU0sEqUQ.webp",
    subcategories: [
      "Laptop & Accessories",
      "Gaming pc",
      "Official Equipment",
      "Components & Peripherals",
      "TV & Soundbox",
    ],
  },
  {
    id: "automobile-motorcycle",
    title: "Automobile & Motorcycle",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/C1PmfXyvOmZveOTwuT6PBdX4FRFxVKhLU6TcSJTF.webp",
    subcategories: ["Racing car", "Four Seater sedan", "SUV", "Motor bike"],
  },
  {
    id: "kids-toy",
    title: "Kids & toy",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/ym8I9Gxtc99vYJMrUKG32X30QDEe47AtlZjAXb63.webp",
    subcategories: [
      "Baby Clothing",
      "Boys Clothing",
      "Girls Clothing",
      "Shoes & Bag",
      "Baby & Mother",
    ],
  },
  {
    id: "jewelry-watches",
    title: "Jewelry & Watches",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/vpDNiGh3ayL5ng2UrX9p5qWvN2VWHgHqmATQnnS7.webp",
    subcategories: [
      "Wedding & Engagement",
      "Mens watch",
      "Women watch",
      "Fashion Jewelry",
    ],
  },
];

export default function FeaturedCategories() {
  return (
    <section className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Featured Categories
        </h2>

        <div className="flex gap-4 text-sm text-gray-600">
          <Link href="/all-categories">
            <button className="hover:text-brand-600 flex items-center gap-1">
              View All <MoveRight className="text-brand-500 hidden md:block" />
            </button>
          </Link>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-6 border-2 border-neutral-50 hover:border-2 hover:border-brand-500 transition-all ease-out duration-350"
          >
            <div className="flex items-start gap-4">
              {/* Category Image */}
              <div className="flex-shrink-0">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  width={150}
                  height={80}
                  className=" object-cover"
                />
              </div>

              {/* Category Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                  {category.title}
                </h3>

                {/* Subcategories */}
                <ul className="space-y-1">
                  {category.subcategories.map((subcategory, index) => (
                    <li key={index}>
                      <Link
                        href={`/categories/${category.id}/${subcategory
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-gray-600 hover:text-brand-900 hover:underline text-sm transition-colors"
                      >
                        {subcategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
