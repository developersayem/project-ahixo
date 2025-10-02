"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ParentCategorySelect } from "./parent-category-selector";
import { ICategory } from "@/types/category.type";

interface ICategoryFormModalProps {
  categories: ICategory[];
  editingCategory?: ICategory | null;
  onSubmit?: (data: FormData, isEdit: boolean) => void;
}

export function CategoryFormModal({
  categories,
  editingCategory,
  onSubmit,
}: ICategoryFormModalProps) {
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    parent: "",
  });

  // ✅ Prefill when editing
  React.useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        description: editingCategory.description || "",
        parent:
          typeof editingCategory.parentCategory === "object" &&
          editingCategory.parentCategory !== null &&
          "_id" in editingCategory.parentCategory
            ? (editingCategory.parentCategory as ICategory)._id
            : "",
      });
      setOpen(true); // open modal when editing
    }
  }, [editingCategory]);

  const handleChange = (
    key: keyof typeof formData,
    value: string | boolean | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value as string }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.parent) data.append("parent", formData.parent);

    onSubmit?.(data, !!editingCategory);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!editingCategory && (
        <DialogTrigger asChild>
          <Button>Add Category</Button>
        </DialogTrigger>
      )}

      <DialogContent
        className="sm:max-w-lg bg-accent"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Category Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Short description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Parent Category */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <ParentCategorySelect
              options={categories.map((cat) => ({
                _id: cat._id,
                name: cat.name,
              }))}
              value={formData.parent}
              onChange={(val) => handleChange("parent", val)}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit">
              {editingCategory ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
