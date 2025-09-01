import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
}

interface ProductCategory {
  id: string;
  title: string;
  bgColor: string;
  lifestyleImage: string;
  lifestyleAlt: string;
  products: Product[];
}

const productCategories: ProductCategory[] = [
  {
    id: "womens",
    title: "Women's Fashion",
    bgColor: "bg-pink-300",
    lifestyleImage:
      "https://img.freepik.com/free-photo/front-view-woman-posing-with-green-outfit_23-2150728962.jpg?semt=ais_hybrid&w=740&q=80",
    lifestyleAlt: "Woman in pink fashion",
    products: [
      {
        id: "1",
        name: "Like Dreams Large Sherpa Tote Bag, Inner Pocket...",
        price: "$72.120",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/Q5sQEK1nCCHi8bjMK0kIcS3N5PncM2XuBJBjWbC7.webp",
      },
      {
        id: "2",
        name: "Women's Plain Dress One Piece for Girls",
        price: "$49.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/Q5sQEK1nCCHi8bjMK0kIcS3N5PncM2XuBJBjWbC7.webp",
      },
      {
        id: "3",
        name: "Women's Christmas Sweatshirt Repeat...",
        price: "$45.900",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/Q5sQEK1nCCHi8bjMK0kIcS3N5PncM2XuBJBjWbC7.webp",
      },
      {
        id: "4",
        name: "Pakistani Women's Readymade Dress...",
        price: "$140.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/Q5sQEK1nCCHi8bjMK0kIcS3N5PncM2XuBJBjWbC7.webp",
      },
      {
        id: "5",
        name: "Women's Embellished Tiered Sequin Jacket...",
        price: "$150.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/Q5sQEK1nCCHi8bjMK0kIcS3N5PncM2XuBJBjWbC7.webp",
      },
    ],
  },
  {
    id: "mens",
    title: "Men's Fashion",
    bgColor: "bg-emerald-300",
    lifestyleImage:
      "https://t3.ftcdn.net/jpg/05/91/73/32/360_F_591733241_Vdw3pMXO34EhxPuGLsJCbX836O2lNFBX.jpg",
    lifestyleAlt: "Man in green fashion",
    products: [
      {
        id: "6",
        name: "Disney Men's Mickey and Friends Button...",
        price: "$600.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/wdTfkRVMNMoVGUP8HfjUCdGnSo4IecZ6xCuLCQ1s.webp",
      },
      {
        id: "7",
        name: "Mens Zip Up Hoodie Winter Fleece Lined...",
        price: "$30.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/wdTfkRVMNMoVGUP8HfjUCdGnSo4IecZ6xCuLCQ1s.webp",
      },
      {
        id: "8",
        name: "Oakley Men's Standard Locked in Bto Po...",
        price: "$50.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/wdTfkRVMNMoVGUP8HfjUCdGnSo4IecZ6xCuLCQ1s.webp",
      },
      {
        id: "9",
        name: "Legendary Whitetails Men's Huntguard...",
        price: "$50.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/wdTfkRVMNMoVGUP8HfjUCdGnSo4IecZ6xCuLCQ1s.webp",
      },
      {
        id: "10",
        name: "Ventage Apparel Men's Standard...",
        price: "$25.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/wdTfkRVMNMoVGUP8HfjUCdGnSo4IecZ6xCuLCQ1s.webp",
      },
    ],
  },
  {
    id: "kids",
    title: "Kids & Baby",
    bgColor: "bg-yellow-400",
    lifestyleImage:
      "https://img.freepik.com/premium-photo/little-girl-clutches-her-cheeks-smiles-children-with-pigtails-green-isolated-background_222185-2782.jpg?semt=ais_hybrid&w=740&q=80",
    lifestyleAlt: "Child with scooter",
    products: [
      {
        id: "11",
        name: "Simple Joys by Carter's Baby Boys'...",
        price: "$52.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/EsD8ZOYTuY4MRcUAktTABjrunMjcrsraBFBp1IQX.webp",
      },
      {
        id: "12",
        name: "Happy Bum Bum Diaper Baby Balm ...",
        price: "$28.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/EsD8ZOYTuY4MRcUAktTABjrunMjcrsraBFBp1IQX.webp",
      },
      {
        id: "13",
        name: "Himalaya Moisturizing Baby Bar, Mild and...",
        price: "$5.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/EsD8ZOYTuY4MRcUAktTABjrunMjcrsraBFBp1IQX.webp",
      },
      {
        id: "14",
        name: "Spasilk Washcloth Wipes Set for...",
        price: "$35.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/EsD8ZOYTuY4MRcUAktTABjrunMjcrsraBFBp1IQX.webp",
      },
      {
        id: "15",
        name: "The Children's Place Baby Girls' One Size...",
        price: "$12.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/EsD8ZOYTuY4MRcUAktTABjrunMjcrsraBFBp1IQX.webp",
      },
    ],
  },
  {
    id: "electronics",
    title: "Electronics & Tech",
    bgColor: "bg-cyan-400",
    lifestyleImage:
      "https://img.freepik.com/premium-photo/gadgets-accessories-layout-green-background_175682-3920.jpg",
    lifestyleAlt: "Tech accessories",
    products: [
      {
        id: "16",
        name: "SAMSUNG Galaxy S23+ Plus Cell Phone...",
        price: "$999.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/5hObtdAm7iV4AD4Fln9EM4UjiPzdqvFzayZNneLo.webp",
      },
      {
        id: "17",
        name: "TCL 30XL Unlocked Cell Phone & TCL TA...",
        price: "$699.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/5hObtdAm7iV4AD4Fln9EM4UjiPzdqvFzayZNneLo.webp",
      },
      {
        id: "18",
        name: "STREBITO Spudger Pry Tool Kit 23pcs fo...",
        price: "$899.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/5hObtdAm7iV4AD4Fln9EM4UjiPzdqvFzayZNneLo.webp",
      },
      {
        id: "19",
        name: "ESR for iPhone 15 Pro Max Case with...",
        price: "$399.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/5hObtdAm7iV4AD4Fln9EM4UjiPzdqvFzayZNneLo.webp",
      },
      {
        id: "20",
        name: "HUAWEI Mate 50 Pro Dual-SIM 256GB RO...",
        price: "$399.000",
        image:
          "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/5hObtdAm7iV4AD4Fln9EM4UjiPzdqvFzayZNneLo.webp",
      },
    ],
  },
];

export default function ProductShowcase() {
  return (
    <div className="w-full py-8 space-y-8 bg-white">
      {productCategories.map((category) => (
        <div key={category.id} className="md:flex gap-0">
          {/* Lifestyle Image Section */}
          <div
            className={`${category.bgColor} hidden md:block flex-shrink-0 w-80 h-96 relative overflow-hidden`}
          >
            <Image
              src={category.lifestyleImage || "/placeholder.svg"}
              alt={category.lifestyleAlt}
              fill
              className="object-cover "
            />
          </div>
          <h1 className=" text-2xl font-semibold text-gray-900 md:text-3xl mb-4 md:hidden">
            {category.title}
          </h1>

          {/* Products Grid */}
          <div className="flex-1 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-5 h-full">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 grid grid-rows-3 border-2 border-y-3 hover:border-2 border-neutral-50  hover:border-brand-500 group cursor-pointer transition-all ease-out duration-350"
                >
                  {/* Product Image */}
                  <div className="relative mb-3 row-span-2">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  {/* Product Details */}
                  <div>
                    <h3 className="text-xs text-gray-800 text-center mb-2 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-brand-600 font-semibold text-center text-sm">
                      {product.price}
                    </p>
                    <div className="flex justify-center items-center mt-5 w-full">
                      <Button className="capitalize w-full rounded-none bg-brand-900 hover:bg-brand-700 transition-colors ease-in-out duration-300 ">
                        add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
