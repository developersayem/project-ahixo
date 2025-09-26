"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { IProduct } from "@/types/product-type";

interface ProductTabsProps {
  product: IProduct;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    ...(product.features?.length
      ? [{ id: "features", label: "Features" }]
      : []),
    ...(product.ratings?.length ? [{ id: "ratings", label: "Ratings" }] : []),
  ];

  return (
    <div className="mt-8">
      {/* Tabs Header */}
      <div className="border-b">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
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

      {/* Tab Content */}
      <Card className="mt-6 rounded-none">
        <CardContent className="p-6 space-y-6">
          {activeTab === "description" && (
            <section>
              <h3 className="font-semibold mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description ||
                  `The ${product.title} is a premium-quality product from ${product.brand}.`}
              </p>
            </section>
          )}

          {activeTab === "features" && product.features && (
            <section>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 flex items-start">
                    <span className="w-2 h-2 bg-brand-500 mt-2 mr-3 flex-shrink-0 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === "ratings" && product.ratings && (
            <section>
              <h3 className="font-semibold mb-4">Customer Ratings</h3>
              {product.ratings.length > 0 ? (
                <ul className="space-y-4">
                  {product.ratings.map((rating, index) => (
                    <li
                      key={index}
                      className="border-b border-gray-200 pb-3 text-gray-700"
                    >
                      <p className="text-sm">
                        <span className="font-semibold">{rating.user}</span>
                        {" — "}
                        <span>{rating.rating} ★</span>
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No ratings yet.</p>
              )}
            </section>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
