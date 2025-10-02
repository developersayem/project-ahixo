"use client";

import { CategoriesTable } from "@/components/dashboard/categories/categories-table";
import { ICategory } from "@/types/category.type";
import { CategoryFormModal } from "@/components/dashboard/categories/category-form-modal";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";

const CategoriesPages = () => {
  const { data: categoriesRes, mutate } = useSWR(
    "/api/v1/admin/categories",
    fetcher
  );

  const categories: ICategory[] = categoriesRes?.data || [];

  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null
  );

  // Handle add/edit submit
  const handleSubmitCategory = async (formData: FormData, isEdit: boolean) => {
    if (!formData) {
      toast.error("Please fill all the fields");
      return null;
    }

    try {
      if (isEdit && editingCategory?._id) {
        // Convert FormData → plain object (backend expects JSON)
        const payload = Object.fromEntries(formData.entries());

        const res = await api.patch(
          `/api/v1/admin/categories/${editingCategory._id}`,
          payload
        );

        if (res.data.success) {
          toast.success("Category updated successfully");
          mutate();
        }
      } else {
        // Create new category (can stay FormData if you support file uploads)
        const payload = Object.fromEntries(formData.entries());
        const res = await api.post(`/api/v1/admin/categories`, payload);
        if (res.data.success) {
          toast.success("Category created successfully");
          mutate();
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setEditingCategory(null); // reset edit state
    }
  };

  // Handle delete
  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const res = await api.delete(`/api/v1/admin/categories/${categoryId}`);
      if (res.data.success) {
        toast.success("Category deleted successfully");
        mutate();
      }
    } catch (error) {
      toast.error("Delete failed");
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <CategoryFormModal
          categories={categories}
          onSubmit={handleSubmitCategory}
        />
      </div>

      {/* Categories Table */}
      <CategoriesTable
        category={categories}
        onEditCategory={(category) => setEditingCategory(category)}
        onDeleteCategory={handleDeleteCategory}
      />

      {/* Edit Modal */}
      {editingCategory && (
        <CategoryFormModal
          categories={categories}
          editingCategory={editingCategory}
          onSubmit={handleSubmitCategory}
        />
      )}
    </div>
  );
};

export default CategoriesPages;
