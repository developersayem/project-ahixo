"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Shirt,
  User,
  Monitor,
  Car,
  Baby,
  Dumbbell,
  Watch,
  Smartphone,
  Sparkles,
  Wrench,
  Home,
  Gamepad2,
  Code,
} from "lucide-react";

// Category data structure with expanded items
const categoriesData = [
  {
    id: "women-clothing",
    name: "Women Clothing & Fashion",
    icon: Shirt,
    subcategories: [
      {
        title: "Hot Categories",
        items: [
          "Party Dress",
          "Beauty & Health",
          "Jewelry & Watches",
          "Sleeping Dress",
          "Casual Dress",
        ],
        expandedItems: [
          "Winter Wear",
          "Summer Collection",
          "Formal Wear",
          "Ethnic Wear",
          "Lingerie",
          "Maternity Wear",
        ],
      },
      {
        title: "Wedding & events",
        items: [
          "Wedding Dresses",
          "Evening Dresses",
          "Prom Dresses",
          "Bridesmaid Dresses",
        ],
        expandedItems: [
          "Cocktail Dresses",
          "Ball Gowns",
          "Wedding Accessories",
          "Bridal Shoes",
          "Wedding Jewelry",
        ],
      },
      {
        title: "Bottoms",
        items: ["Jeans", "Leggings", "Shorts", "Pants & capris", "Skirts"],
        expandedItems: [
          "Palazzo",
          "Culottes",
          "Trousers",
          "Joggers",
          "Wide Leg Pants",
        ],
      },
      {
        title: "Tops & sets",
        items: ["Tank tops", "Suit & Sets", "Hoodies", "T-shirts"],
        expandedItems: [
          "Blouses",
          "Crop Tops",
          "Tunics",
          "Cardigans",
          "Blazers",
        ],
      },
      {
        title: "Accessories",
        items: [
          "Eyewear & Accessories",
          "Hats & Caps",
          "Belts",
          "Wallets",
          "Scarves",
        ],
        expandedItems: [
          "Handbags",
          "Jewelry",
          "Hair Accessories",
          "Gloves",
          "Socks",
        ],
      },
    ],
  },
  {
    id: "men-clothing",
    name: "Men Clothing & Fashion",
    icon: User,
    subcategories: [
      {
        title: "Hot Categories",
        items: ["Casual Shirts", "T-shirts", "Jeans", "Suits"],
        expandedItems: [
          "Polo Shirts",
          "Dress Shirts",
          "Henley Shirts",
          "Tank Tops",
          "Graphic Tees",
        ],
      },
      {
        title: "Outerwear & Jackets",
        items: [
          "Leather Jackets",
          "Suits & Blazer",
          "Hoodies",
          "Wool & Blends",
        ],
        expandedItems: [
          "Bomber Jackets",
          "Denim Jackets",
          "Windbreakers",
          "Parkas",
          "Vests",
        ],
      },
      {
        title: "Bottoms",
        items: ["Jeans", "Shorts", "Pants", "Swimwear & Lounge"],
        expandedItems: [
          "Chinos",
          "Cargo Pants",
          "Track Pants",
          "Board Shorts",
          "Swim Trunks",
        ],
      },
      {
        title: "Underwear & Loungewear",
        items: ["Boxers", "Briefs", "Pajamas"],
        expandedItems: [
          "Boxer Briefs",
          "Thermal Wear",
          "Robes",
          "Sleep Shorts",
          "Lounge Pants",
        ],
      },
      {
        title: "Accessories",
        items: ["Watches", "Belts", "Wallets", "Sunglasses"],
        expandedItems: [
          "Ties",
          "Cufflinks",
          "Hats",
          "Backpacks",
          "Phone Cases",
        ],
      },
    ],
  },
  {
    id: "computer-accessories",
    name: "Computer & Accessories",
    icon: Monitor,
    subcategories: [
      {
        title: "Laptop & Accessories",
        items: [
          "Laptops",
          "Notebook",
          "Laptop Battery",
          "Laptop Motherboard",
          "Laptop Bag",
        ],
        expandedItems: [
          "Laptop Stands",
          "Cooling Pads",
          "External Keyboards",
          "Wireless Mouse",
          "USB Hubs",
        ],
      },
      {
        title: "Gaming pc",
        items: [
          "Desktop PC",
          "Brand PC",
          "Gaming Motherboard",
          "GPU",
          "Computer cooling system",
        ],
        expandedItems: [
          "Gaming Keyboards",
          "Gaming Mouse",
          "Gaming Headsets",
          "RGB Lighting",
          "Cable Management",
        ],
      },
      {
        title: "Official Equipment",
        items: [
          "Laser printer",
          "3D printer",
          "Scanners",
          "Projectors machine",
        ],
        expandedItems: [
          "Ink Cartridges",
          "Paper Shredders",
          "Label Makers",
          "Laminators",
          "Binding Machines",
        ],
      },
      {
        title: "Components & Peripherals",
        items: [
          "Motherboard",
          "RAM",
          "Graphics card",
          "Power Supply",
          "Cooling fan",
        ],
        expandedItems: [
          "SSD Storage",
          "Hard Drives",
          "Network Cards",
          "Sound Cards",
          "Optical Drives",
        ],
      },
      {
        title: "TV & Soundbar",
        items: ["Smart TV", "Soundbar", "TV Mount"],
        expandedItems: [
          "Streaming Devices",
          "TV Stands",
          "Remote Controls",
          "HDMI Cables",
          "TV Antennas",
        ],
      },
    ],
  },
  {
    id: "automobile-motorcycle",
    name: "Automobile & Motorcycle",
    icon: Car,
    subcategories: [
      {
        title: "Racing car",
        items: [
          "Formula Racing",
          "Sports car racing",
          "Street car racing",
          "Rallying",
        ],
        expandedItems: [
          "Go-Karts",
          "Drag Racing",
          "Circuit Racing",
          "Time Attack",
          "Drift Cars",
        ],
      },
      {
        title: "Four Seater models",
        items: ["Luxury car", "Hatchback", "SUV car", "Sedan car"],
        expandedItems: [
          "Convertibles",
          "Coupes",
          "Station Wagons",
          "Crossovers",
          "Minivans",
        ],
      },
      {
        title: "SUV",
        items: ["Luxury SUV", "Off-road SUV", "Midsize SUV", "Full-size SUV"],
        expandedItems: [
          "Compact SUV",
          "Electric SUV",
          "Hybrid SUV",
          "7-Seater SUV",
          "Sports SUV",
        ],
      },
      {
        title: "Motor bike",
        items: [
          "Racing Bike",
          "Adventure Touring Bikes",
          "Cruiser",
          "Power Cruisers",
        ],
        expandedItems: [
          "Sport Bikes",
          "Naked Bikes",
          "Scooters",
          "Electric Bikes",
          "Dirt Bikes",
        ],
      },
    ],
  },
  {
    id: "kids-toy",
    name: "Kids & toy",
    icon: Baby,
    subcategories: [
      {
        title: "Baby Clothing",
        items: ["Baby Dresses", "Baby rompers", "Baby pants", "Baby T-shirts"],
        expandedItems: [
          "Baby Onesies",
          "Baby Sleepwear",
          "Baby Socks",
          "Baby Hats",
          "Baby Bibs",
        ],
      },
      {
        title: "Girls Clothing",
        items: ["Clothing sets", "T-Shirts", "Hoodies"],
        expandedItems: ["Dresses", "Skirts", "Leggings", "Jackets", "Swimwear"],
      },
      {
        title: "Girls Clothing",
        items: ["Dresses", "Clothing set", "Toys", "Educational toys"],
        expandedItems: [
          "Dolls",
          "Puzzles",
          "Art Supplies",
          "Board Games",
          "Musical Toys",
        ],
      },
      {
        title: "Shoes & Bags",
        items: [
          "Sandals Toe sandals",
          "Sandals Shoes",
          "School Wear",
          "School bags",
          "Safety helmet",
        ],
        expandedItems: [
          "Sneakers",
          "Boots",
          "Lunch Boxes",
          "Water Bottles",
          "Backpacks",
        ],
      },
      {
        title: "Bags & Bottles",
        items: [
          "Happy Changing",
          "Baby Care",
          "Backpacks & Carriers",
          "Swimwear",
        ],
        expandedItems: [
          "Diaper Bags",
          "Strollers",
          "Car Seats",
          "High Chairs",
          "Baby Monitors",
        ],
      },
    ],
  },
  {
    id: "sports-outdoor",
    name: "Sports & outdoor",
    icon: Dumbbell,
    subcategories: [
      {
        title: "Cycling",
        items: [
          "Bike set",
          "Bike spare parts",
          "Two wheel parts",
          "Mens swimwear",
          "Camping equipment",
        ],
        expandedItems: [
          "Bike Helmets",
          "Bike Lights",
          "Bike Locks",
          "Bike Pumps",
          "Bike Repair Kits",
        ],
      },
      {
        title: "Activities",
        items: [
          "Bicycles",
          "Bicycle Frames",
          "Bicycle lights",
          "Bicycle helmets",
          "Bicycle Accessories",
        ],
        expandedItems: [
          "Mountain Bikes",
          "Road Bikes",
          "Electric Bikes",
          "BMX Bikes",
          "Folding Bikes",
        ],
      },
      {
        title: "Hunting",
        items: [
          "Running Shoes",
          "Hiking Shoes",
          "Soccer Shoes",
          "Basketball Shoes",
        ],
        expandedItems: [
          "Tennis Shoes",
          "Golf Shoes",
          "Cleats",
          "Cross Training",
          "Walking Shoes",
        ],
      },
      {
        title: "Apparel",
        items: ["Hiking Hats", "Hiking Laces", "Hiking Laces", "Hiking boots"],
        expandedItems: [
          "Sports Jerseys",
          "Athletic Shorts",
          "Compression Wear",
          "Sports Bras",
          "Track Suits",
        ],
      },
    ],
  },
  {
    id: "jewelry-watches",
    name: "Jewelry & Watches",
    icon: Watch,
    subcategories: [
      {
        title: "Wedding & Engagement",
        items: ["Bridal Jewelry Sets", "Engagement Rings", "Wedding Rings"],
        expandedItems: [
          "Anniversary Rings",
          "Promise Rings",
          "Wedding Bands",
          "Bridal Tiaras",
          "Wedding Earrings",
        ],
      },
      {
        title: "Mens watch",
        items: [
          "Smart watch",
          "Mechanical watch",
          "Digital watch",
          "Sports watch",
        ],
        expandedItems: [
          "Luxury Watches",
          "Casual Watches",
          "Dress Watches",
          "Diving Watches",
          "Pilot Watches",
        ],
      },
      {
        title: "Women watch",
        items: ["Sports Watches", "Women's Bracelet Watches", "Dress Watches"],
        expandedItems: [
          "Fashion Watches",
          "Smartwatches",
          "Vintage Watches",
          "Designer Watches",
          "Fitness Trackers",
        ],
      },
      {
        title: "Fashion Jewelry",
        items: [
          "necklaces & Pendants",
          "Ear Rings",
          "Bracelets",
          "Bracelets & Bangles",
        ],
        expandedItems: [
          "Rings",
          "Anklets",
          "Brooches",
          "Hair Jewelry",
          "Body Jewelry",
        ],
      },
    ],
  },
  {
    id: "cellphones-tabs",
    name: "Cellphones & Tabs",
    icon: Smartphone,
    subcategories: [
      {
        title: "Mobile Phones",
        items: ["Basic phone", "Android phone", "iOS phone", "Windows Phone"],
        expandedItems: [
          "Gaming Phones",
          "Camera Phones",
          "Rugged Phones",
          "Foldable Phones",
          "5G Phones",
        ],
      },
      {
        title: "Mobile Phone Parts",
        items: [
          "Mobile Phone LCDs",
          "Mobile Phone Batteries",
          "Mobile Phone Housings & Card & Tools",
        ],
        expandedItems: [
          "Phone Cameras",
          "Phone Speakers",
          "Phone Chargers",
          "Phone Buttons",
          "Phone Flex Cables",
        ],
      },
      {
        title: "Mobile Phone Accessories",
        items: [
          "Power Bank",
          "Screen Protectors",
          "Tablets Phone Cables",
          "Holders & Stands",
        ],
        expandedItems: [
          "Phone Cases",
          "Wireless Chargers",
          "Car Mounts",
          "Selfie Sticks",
          "Phone Grips",
        ],
      },
      {
        title: "Tablets & accessories",
        items: [
          "iOS Tablet",
          "Android Tablet",
          "Tablet Keyboards",
          "Tablet accessories",
        ],
        expandedItems: [
          "Tablet Cases",
          "Tablet Stands",
          "Stylus Pens",
          "Tablet Screen Protectors",
          "Tablet Chargers",
        ],
      },
    ],
  },
  {
    id: "beauty-health-hair",
    name: "Beauty, Health & Hair",
    icon: Sparkles,
    subcategories: [
      {
        title: "Personal",
        items: ["Hair", "Skin", "Makeup Tools"],
        expandedItems: [
          "Perfumes",
          "Deodorants",
          "Body Lotions",
          "Hand Creams",
          "Lip Care",
        ],
      },
      {
        title: "Skin Care",
        items: ["Face", "Eyes", "Body", "Anti-Care Tools"],
        expandedItems: [
          "Cleansers",
          "Moisturizers",
          "Serums",
          "Sunscreens",
          "Face Masks",
        ],
      },
      {
        title: "Hair Care & Tools",
        items: ["Nail Art", "Nail Gel", "Nail Dryer", "Nail Other"],
        expandedItems: [
          "Hair Dryers",
          "Straighteners",
          "Curling Irons",
          "Hair Brushes",
          "Hair Accessories",
        ],
      },
    ],
  },
  {
    id: "home-improvement-tools",
    name: "Home Improvement & Tools",
    icon: Wrench,
    subcategories: [
      {
        title: "Garden Lighting",
        items: ["Garden Lights", "Solar Lights", "Night Lights"],
        expandedItems: [
          "Pathway Lights",
          "Flood Lights",
          "String Lights",
          "Landscape Lighting",
          "Security Lights",
        ],
      },
      {
        title: "Hardware",
        items: [
          "Plumbing & Water",
          "Electrical & Wiring",
          "Door Hardware",
          "Under-water Lights",
        ],
        expandedItems: [
          "Screws & Bolts",
          "Hinges",
          "Locks",
          "Handles",
          "Fasteners",
        ],
      },
      {
        title: "LED Lighting",
        items: [
          "LED Strip",
          "LED Bulbs",
          "LED Spotlights",
          "LED Panel Lights",
          "LED Floodlights",
          "LED Bar Lights",
        ],
        expandedItems: [
          "LED Ceiling Lights",
          "LED Wall Lights",
          "LED Desk Lamps",
          "LED Floor Lamps",
          "LED Chandeliers",
        ],
      },
      {
        title: "Tools",
        items: ["Hand Tools", "Power Tools", "Measuring Tools"],
        expandedItems: [
          "Drill Sets",
          "Screwdriver Sets",
          "Hammer Sets",
          "Wrench Sets",
          "Tool Boxes",
        ],
      },
    ],
  },
  {
    id: "home-decoration-appliance",
    name: "Home decoration & Appliance",
    icon: Home,
    subcategories: [
      {
        title: "Home Decor",
        items: ["Painting & Calligraphy", "Wall Stickers", "Wall Clock"],
        expandedItems: [
          "Photo Frames",
          "Mirrors",
          "Vases",
          "Candles",
          "Artificial Plants",
        ],
      },
      {
        title: "Home Textiles",
        items: ["Curtains", "Bedding Set", "Beach Towels"],
        expandedItems: [
          "Pillows",
          "Blankets",
          "Rugs",
          "Table Cloths",
          "Cushion Covers",
        ],
      },
      {
        title: "Furniture",
        items: [
          "Home Furniture",
          "Office Furniture",
          "Outdoor Furniture",
          "Bar Furniture stands",
        ],
        expandedItems: [
          "Sofas",
          "Dining Tables",
          "Beds",
          "Wardrobes",
          "Bookshelves",
        ],
      },
    ],
  },
  {
    id: "toy",
    name: "Toy",
    icon: Gamepad2,
    subcategories: [
      {
        title: "Baby Toy",
        items: ["Educational Toys", "Building Toys", "Action Figures"],
        expandedItems: [
          "Remote Control Toys",
          "Stuffed Animals",
          "Toy Cars",
          "Puzzles",
          "Board Games",
        ],
      },
    ],
  },
  {
    id: "software",
    name: "Software",
    icon: Code,
    subcategories: [
      {
        title: "Development Tools",
        items: ["IDEs", "Code Editors", "Version Control"],
        expandedItems: [
          "Database Tools",
          "Testing Tools",
          "Design Software",
          "Project Management",
          "Security Tools",
        ],
      },
    ],
  },
];

export default function CategoriesPage() {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleExpanded = (categoryId: string, subcategoryIndex: number) => {
    const key = `${categoryId}-${subcategoryIndex}`;
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Categories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-foreground mb-8">
          All Categories
        </h1>

        {/* Categories Grid */}
        <div className="space-y-8">
          {categoriesData.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="border border-border rounded-none"
              >
                <CardContent className="p-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-brand-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {category.name}
                    </h2>
                  </div>

                  {/* Subcategories Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {category.subcategories.map((subcategory, index) => {
                      const isExpanded =
                        expandedSections[`${category.id}-${index}`];
                      const allItems = [
                        ...subcategory.items,
                        ...(subcategory.expandedItems || []),
                      ];
                      const displayItems = isExpanded
                        ? allItems
                        : subcategory.items;

                      return (
                        <div key={index} className="space-y-3">
                          <h3 className="font-medium text-foreground text-sm">
                            {subcategory.title}
                          </h3>
                          <ul className="space-y-2">
                            {displayItems.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <Link
                                  href={`/?category=${
                                    category.id
                                  }&subcategory=${item
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")
                                    .replace(/\./g, "")}`}
                                  className="text-sm text-muted-foreground hover:text-brand-500 hover:underline transition-colors duration-200"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                            {subcategory.expandedItems &&
                              subcategory.expandedItems.length > 0 && (
                                <li>
                                  <button
                                    onClick={() =>
                                      toggleExpanded(category.id, index)
                                    }
                                    className="text-sm text-brand-500 hover:text-brand-600 hover:underline transition-colors"
                                  >
                                    {isExpanded ? "Less..." : "More..."}
                                  </button>
                                </li>
                              )}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
