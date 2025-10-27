/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useCurrency } from "@/contexts/currency-context";
import { fetcher } from "@/lib/fetcher";

interface ProductFormProps {
  productId?: string;
}

export function ProductForm({ productId }: ProductFormProps) {
  const { currency, setCurrency, symbolMap } = useCurrency();
  const { user } = useAuth();
  const isEditing = !!productId;
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const { data: existingProduct } = useSWR(
    isEditing ? `/api/v1/${user?.role}/products/${productId}` : null,
    (url: string) => api.get(url).then((res) => res.data.data)
  );

  const { data: CategoriesRes } = useSWR(`/api/v1/categories`, fetcher);
  const categoriesData = useMemo(
    () => CategoriesRes?.data || [],
    [CategoriesRes]
  );
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    if (categoriesData.length) {
      const flattenedCategories = categoriesData.flatMap(
        (cat: { subCategories: { name: string }[] }) =>
          cat.subCategories.map((subCat) =>
            subCat.name.toLowerCase().replace(/\s+/g, "-")
          )
      );
      setCategories(flattenedCategories);
    }
  }, [categoriesData]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    stock: "",
    tags: [] as string[],
    features: [] as string[],
    colors: [] as string[],
    warranty: "",
    shippingCost: "",
    rating: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newColor, setNewColor] = useState("");

  const warranties = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  // Pre-fill form if editing
  useEffect(() => {
    if (existingProduct) {
      setFormData({
        title: existingProduct.title || "",
        description: existingProduct.description || "",
        category: existingProduct.category || "",
        brand: existingProduct.brand || "",
        price: existingProduct.price?.toString() || "",
        salePrice: existingProduct.salePrice?.toString() || "",
        stock: existingProduct.stock?.toString() || "",
        tags: existingProduct.tags || [],
        features: existingProduct.features || [],
        colors: existingProduct.colors || [],
        warranty: existingProduct.warranty || "",
        shippingCost: existingProduct.shippingCost?.toString() || "",
        rating: existingProduct.rating?.toString() || "",
      });
      setPreviewImages(existingProduct.images || []);
      if (existingProduct.currency) setCurrency(existingProduct.currency);
    }
  }, [existingProduct, setCurrency]);

  // Handlers
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...selectedFiles]);
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const removed = previewImages[index];
    if (!images[index]) setDeletedImages((prev) => [...prev, removed]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Tags
  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag("");
    }
  };
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };
  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  // Features
  const addFeature = () => {
    if (newFeature && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };
  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFeature();
    }
  };
  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  // Colors
  const addColor = () => {
    if (newColor && !formData.colors.includes(newColor.trim())) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor.trim()],
      }));
      setNewColor("");
    }
  };
  const handleColorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addColor();
    }
  };
  const removeColor = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== color),
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      salePrice: "",
      stock: "",
      shippingCost: "",
      tags: [],
      features: [],
      colors: [],
      warranty: "",
      rating: "",
    });
    setImages([]);
    setPreviewImages([]);
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      const numericFields = [
        "price",
        "salePrice",
        "stock",
        "shippingCost",
        "rating",
      ];

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => data.append(key, v));
        } else if (numericFields.includes(key) && value !== "") {
          data.append(key, value.toString());
        } else if (value) {
          data.append(key, value.toString());
        }
      });

      data.append("currency", currency);

      images.forEach((file) => data.append("images", file));
      deletedImages.forEach((img) => data.append("removeImages[]", img));

      if (isEditing && productId) {
        await api.put(`/api/v1/${user?.role}/products/${productId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post(`/api/v1/${user?.role}/products`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      mutate(`/api/v1/${user?.role}/products`);
      toast.success(isEditing ? "Product updated!" : "Product created!");
      resetForm();
      router.push(`/dashboard/products`);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error(
        "Product save error:",
        axiosError.response?.data || axiosError.message
      );
      toast.error("Failed to save product. Check required fields.");
    }
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left form */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-none rounded-none border-gray-200">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                className="rounded-none"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter product title"
              />
            </div>
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="rounded-none min-h-46"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe about your product"
                rows={4}
              />
            </div>
            {/* Category / Currency / Warranty / Brand */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="space-y-1">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger className="rounded-none h-10">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="currency">Currency *</Label>
                <Select
                  value={currency}
                  onValueChange={(value) => setCurrency(value)}
                >
                  <SelectTrigger className="rounded-none h-10 text-muted-foreground">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {Object.keys(symbolMap).map((cur) => (
                      <SelectItem key={cur} value={cur}>
                        {cur} ({symbolMap[cur]})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="warranty">Warranty</Label>
                <Select
                  value={formData.warranty}
                  onValueChange={(value) =>
                    handleInputChange("warranty", value)
                  }
                >
                  <SelectTrigger className="rounded-none h-10">
                    <SelectValue placeholder="Select warranty" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {warranties.map((w) => (
                      <SelectItem key={w.value} value={w.value}>
                        {w.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  className="rounded-none h-10"
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  placeholder="Enter brand name"
                />
              </div>
            </div>
            {/* Price / Sale Price / Stock */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price</Label>
                <Input
                  id="salePrice"
                  type="number"
                  value={formData.salePrice}
                  onChange={(e) =>
                    handleInputChange("salePrice", e.target.value)
                  }
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Shipping Cost */}
            <div className="space-y-2">
              <Label htmlFor="shippingCost">Shipping Cost</Label>
              <Input
                id="shippingCost"
                type="number"
                value={formData.shippingCost}
                onChange={(e) =>
                  handleInputChange("shippingCost", e.target.value)
                }
                placeholder="0.00"
              />
            </div>

            {/* Colors */}
            <div className="space-y-2">
              <Label htmlFor="colors">Colors</Label>
              <div className="flex items-center m-0">
                <Input
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  onKeyDown={handleColorKeyDown}
                  placeholder="Add color and press Enter"
                  className="rounded-none"
                />
                <Button
                  type="button"
                  onClick={addColor}
                  size="sm"
                  className="rounded-none py-4.5"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.colors.map((color) => (
                  <div
                    key={color}
                    className="flex items-center space-x-1 bg-secondary px-2 py-1 rounded"
                  >
                    <span className="text-sm">{color}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeColor(color)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex items-center m-0">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add tag and press Enter"
                  className="rounded-none"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  size="sm"
                  className="rounded-none py-4.5"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center space-x-1 bg-secondary px-2 py-1 rounded"
                  >
                    <span className="text-sm">{tag}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <Label htmlFor="features">Features</Label>
              <div className="flex items-center m-0">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyDown={handleFeatureKeyDown}
                  placeholder="Add feature and press Enter"
                  className="rounded-none"
                />
                <Button
                  type="button"
                  onClick={addFeature}
                  size="sm"
                  className="rounded-none py-4.5"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center space-x-1 bg-secondary px-2 py-1 rounded"
                  >
                    <span className="text-sm">{feature}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(feature)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Images & Submit */}
      <div className="space-y-6">
        <Card className="shadow-none rounded-none">
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 p-4 cursor-pointer hover:border-gray-500 transition-colors">
              <label className="flex flex-col items-center justify-center gap-2 text-gray-500 cursor-pointer">
                <Plus className="h-6 w-6" />
                <span>Click or drag images here to upload</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2">
              {previewImages.map((img, i) => (
                <div key={i} className="relative w-full aspect-square">
                  <img
                    src={img}
                    alt={`preview-${i}`}
                    className="object-cover rounded"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-1 right-1 p-1 rounded-full"
                    onClick={() => removeImage(i)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button type="button" onClick={handleSubmit} className="w-full">
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </div>
  );
}
