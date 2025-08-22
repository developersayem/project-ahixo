/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { MoveRight, Zap } from "lucide-react";
import { IFlashSaleProduct } from "@/app/types/flash-sale-product.type";
import Link from "next/link";

// Import Swiper + Grid
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";

const flashSaleProducts: IFlashSaleProduct[] = [
  {
    id: 1,
    name: "Makeup Kit",
    price: "$60.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/mG4K0TiQAXxg1sOILVVyoNdECruuN5IvMufG9yWF.webp",
  },
  {
    id: 2,
    name: "Coffee Jar",
    price: "$10.390",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/vlH5gK4oe3IGl3BmfyCmrWew8w9FICzc7157BFiC.png",
  },
  {
    id: 3,
    name: "IPhone",
    price: "$579.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/B1hum7tEVbTF5SOV0eQdwB6NgyLUPO1wif5QtaO8.webp",
  },
  {
    id: 4,
    name: "Android",
    price: "$999.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/cJLH3YGg5OBTzgiDvMVE4Bw6d4jDM6l4gbTSCq4R.webp",
  },
  {
    id: 5,
    name: "Sweatshirt",
    price: "$50.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/jvVnqs9VFBp3LJy8iNxwYPFN6XZYnI3MlKogPkWv.webp",
  },
  {
    id: 6,
    name: "Pink Dress",
    price: "$49.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/mdNKoKdJXd2FZ38TgpgVI0OpWetrezEQSD6qNdKN.webp",
  },
  {
    id: 7,
    name: "Tablet",
    price: "$100.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/cJLH3YGg5OBTzgiDvMVE4Bw6d4jDM6l4gbTSCq4R.webp",
  },
  {
    id: 8,
    name: "Gaming Console",
    price: "$399.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/gC0Q2JfK6lG7CHedYEGcYJoutbDE4sWmHpBxmIqd.webp",
  },
  {
    id: 9,
    name: "Hawaiian Shirt",
    price: "$600.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/70TVd2OrhelP4B9bqY9SIK3TnUpCtXkSLntYP5O4.webp",
  },
  {
    id: 10,
    name: "Tablet Pro",
    price: "$699.000",
    image:
      "https://demo.activeitzone.com/ecommerce_repo/public/uploads/all/yLwzQu7Cn0zfjXWmtFaIBGiEFB5d4lh0jF41LKZP.webp",
  },
];

export default function FlashSaleSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 100,
    hours: 22,
    minutes: 6,
    seconds: 20,
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Flash Sale Section */}
      <div className="bg-white mb-5">
        <div className="flex items-center justify-between mb-2 ">
          <h2 className="text-2xl md:text-xl font-bold text-gray-800 flex items-center gap-2">
            Flash Sale <Zap className="w-5 h-5 md:w-6 md:h-6 text-brand-500" />
          </h2>
          <div className="flex gap-4 text-sm text-gray-600">
            <Link href="/flash-sale">
              <button className="hover:text-brand-600 flex items-center gap-1">
                View All
                <MoveRight className="text-brand-500 hidden md:block" />
              </button>
            </Link>
          </div>
        </div>

        {/* Countdown Timer for mobile devices */}
        <div className="bg-brand-100 text-red-500 p-5 mb-5 md:hidden">
          <div className="grid grid-cols-4 gap-1 md:gap-2 text-center">
            <div>
              <div className="text-lg md:text-2xl font-bold">
                {timeLeft.days}
              </div>
              <div className="text-xs">DAYS</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold">
                {timeLeft.hours}
              </div>
              <div className="text-xs">HRS</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold">
                {timeLeft.minutes}
              </div>
              <div className="text-xs">MIN</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold">
                {timeLeft.seconds}
              </div>
              <div className="text-xs">SEC</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 ">
          {/* Left side - Countdown and Image */}
          <div className="bg-[#2c8d26] text-white relative overflow-hidden order-2 lg:order-1  hidden md:block">
            {/* Countdown Timer */}
            <div className="bg-white text-red-500 p-3 md:p-4 mb-2 md:mb-4 m-2 md:m-4">
              <div className="grid grid-cols-4 gap-1 md:gap-2 text-center">
                <div>
                  <div className="text-lg md:text-2xl font-bold">
                    {timeLeft.days}
                  </div>
                  <div className="text-xs">DAYS</div>
                </div>
                <div>
                  <div className="text-lg md:text-2xl font-bold">
                    {timeLeft.hours}
                  </div>
                  <div className="text-xs">HRS</div>
                </div>
                <div>
                  <div className="text-lg md:text-2xl font-bold">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-xs">MIN</div>
                </div>
                <div>
                  <div className="text-lg md:text-2xl font-bold">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-xs">SEC</div>
                </div>
              </div>
            </div>

            {/* Image section */}
            <div className="relative z-10 mt-4 md:mt-8">
              <img
                src="https://img.freepik.com/premium-photo/womans-hand-holding-shopping-bag-green-background_113876-2901.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Woman with shopping bags"
                className="w-full object-cover mx-auto"
              />
              <p className="text-center mt-1 md:mt-2 text-xs md:text-sm px-2">
                For limited time in Flash Sale
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-4 lg:grid-cols-5 h-full gap-0.5 p-0.5 pr-[1.5px]">
              {flashSaleProducts.slice(0, 10).map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-2 md:p-3 grid grid-rows-5 justify-items-center border-2 border-neutral-50 hover:border-2 hover:border-brand-500 transition-all ease-out duration-350"
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full object-cover mb-1 md:mb-2 row-span-4"
                  />
                  <p className="text-brand-600 font-semibold text-xs md:text-sm">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile Carousel (2-line layout) */}
            <div className="md:hidden">
              <Swiper
                spaceBetween={10}
                slidesPerView={2.2}
                grid={{ rows: 2, fill: "row" }}
                modules={[Grid]}
              >
                {flashSaleProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="bg-white p-2 flex flex-col items-center border-2 border-neutral-50 hover:border-2 hover:border-brand-500 transition-all ease-out duration-350">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-20 object-cover mb-1"
                      />
                      <p className="text-brand-600 font-semibold text-xs text-center">
                        {product.price}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
