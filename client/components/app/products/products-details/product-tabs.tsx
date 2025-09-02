"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/app/data/products";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    ...(product.features && product.features.length > 0
      ? [{ id: "features", label: "Features" }]
      : []),
  ];

  return (
    <div className="mt-8">
      <div className="border-b">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium ${
                activeTab === tab.id
                  ? "border-brand-500 text-brand-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <Card className="mt-6 rounded-none">
        <CardContent className="p-6">
          {activeTab === "description" && (
            <div>
              <h3 className="font-semibold mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description ||
                  `The ${product.name} is a high-quality product from ${product.brand}.`}
              </p>
            </div>
          )}
          {activeTab === "features" && product.features && (
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 flex items-start">
                    <span className="w-2 h-2 bg-brand-500 mt-2 mr-3 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
