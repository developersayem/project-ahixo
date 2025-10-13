/* eslint-disable @next/next/no-img-element */
"use client";

import { Search } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios"; // ✅ using your Axios instance

interface SearchSuggestion {
  _id: string;
  title: string;
  category: string;
  images?: string[];
}

export function SearchBar({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch product suggestions from backend
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const res = await api.get(
          `/api/v1/products/search?query=${encodeURIComponent(query)}&limit=6`
        );

        // Backend returns { results, products }
        const products = res.data.products || [];
        setSuggestions(products);
      } catch (err) {
        console.error("Error fetching product suggestions:", err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle form submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(
      `/${locale}/products?search=${encodeURIComponent(query.trim())}`
    );
    setShowDropdown(false);
  };

  // ✅ Handle click on suggestion
  const handleSelect = (productId: string, name: string) => {
    console.log({
      productId,
      name,
    });
    router.push(`/${locale}/products/${productId}`);
    setQuery(name);
    setShowDropdown(false);
  };

  return (
    <div className="flex-1 max-w-2xl mx-8 relative" ref={dropdownRef}>
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          placeholder={placeholder}
          className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-0.5 top-0.5 bottom-1 bg-transparent hover:bg-transparent border-none text-black px-3 shadow-none"
        >
          <Search className="w-4 h-4" />
        </Button>
      </form>

      {/* 🔽 Dropdown */}
      {showDropdown && query && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md z-50">
          {loading && (
            <div className="p-3 text-sm text-gray-500">Searching...</div>
          )}

          {!loading && suggestions.length > 0 && (
            <div className="max-h-64 overflow-y-auto">
              {suggestions.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleSelect(product._id, product.title)}
                  className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {product.images && product.images.length > 0 && (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-8 h-8 rounded object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && suggestions.length === 0 && query.trim().length > 1 && (
            <div className="p-3 text-sm text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
