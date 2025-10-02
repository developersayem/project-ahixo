"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Edit, Trash2 } from "lucide-react";
import { ICategory } from "@/types/category.type";

interface CategoriesTableProps {
  category?: ICategory[];
  className?: string;
  onEditCategory?: (category: ICategory) => void;
  onDeleteCategory?: (categoryId: string) => void;
}

export function CategoriesTable({
  category,
  className,
  onEditCategory,
  onDeleteCategory,
}: CategoriesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter categories by search term
  const filteredCategories = category?.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(
    (filteredCategories?.length || 0) / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Edit handler
  const handleEditCategory = (category: ICategory) => {
    onEditCategory?.(category);
  };

  // Delete handler
  const handleDeleteCategory = (categoryId: string) => {
    onDeleteCategory?.(categoryId);
  };

  // Recursive rendering of subcategories
  const renderSubCategories = (subs: ICategory[] | undefined) => {
    if (!subs || subs.length === 0) return null;

    return (
      <ul className="ml-10 text-muted-foreground">
        {subs.map((sub) => (
          <li key={sub._id} className="text-xs">
            -{sub.name}
            {sub.subCategories && sub.subCategories.length > 0 && (
              <div className="ml-4 text-sm">
                {renderSubCategories(sub.subCategories)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`space-y-6 ${className || ""}`}>
      {/* 🔎 Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center md:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">NAME</TableHead>
              <TableHead className="font-semibold">DESCRIPTION</TableHead>
              <TableHead className="font-semibold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCategories?.map((cat) => (
              <TableRow key={cat._id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-md">{cat.name}</span>
                    {cat.subCategories && cat.subCategories.length > 0 && (
                      <div>{renderSubCategories(cat.subCategories)}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{cat.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEditCategory(cat)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteCategory(cat._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNum)}
                    isActive={currentPage === pageNum}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {totalPages > 5 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(totalPages)}
                    className="cursor-pointer"
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
