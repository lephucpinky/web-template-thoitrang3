"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";
import AlertOption from "../alert/AlertOption";
import { useState } from "react";
import { APIDeleteProduct } from "@/services/product";
import { useDispatch } from "react-redux";
import { setCategory, setIsDelete } from "@/store/slices/categorySlice";
import { APIDeleteCategory, APIGetCategoryById } from "@/services/category";
import { setMode } from "@/store/slices/modeSlice";
const ColumnsCategory: ColumnDef<{
  category_image: string;
  category_name: string;
  description?: string;
  _id?: string;
}>[] = [
  {
    accessorKey: "index",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        STT
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row, table }) => {
      const pageSize = table.getState().pagination.pageSize;
      const pageIndex = table.getState().pagination.pageIndex;
      const index = pageIndex * pageSize + row.index + 1;
      return <div className="w-16 text-center">{index}</div>;
    },
  },
  {
    accessorKey: "category_image",
    header: () => <p className="w-[200px] text-left">Hình ảnh</p>,
    cell: ({ row }) => {
      const baseImageUrl = process.env.NEXT_PUBLIC_BASE_URL_IMAGE;
      return (
        <div className="w-[200px] text-left">
          <img
            src={(baseImageUrl + row.original.category_image) as string}
            alt="Category Image"
            className="h-20 w-20 "
          />
        </div>
      );
    },
  },
  {
    accessorKey: "category_name",
    header: () => <p className="w-[200px] text-left">Tên danh mục</p>,
    cell: ({ row }) => (
      <div className="w-[200px] text-left">{row.original.category_name}</div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <p className="text-left">Mô tả</p>,
    cell: ({ row }) => (
      <div className="text-left">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <p className="text-center">Thao tác</p>,
    cell: ({ row }) => {
      const [isDialogOpen, setDialogOpen] = useState(false);
      const dispatch = useDispatch();

      const handleViewMode = async (id: string) => {
        try {
          const response = await APIGetCategoryById(id);
          if (response?.status === 200) {
            dispatch(setCategory(response.data));
            dispatch(setMode({ mode: "view" }));
          }
        } catch (err) {
          console.error(err);
        }
      };

      const handleDelete = async (id: string) => {
        try {
          const response = await APIDeleteCategory(id);
          if (response?.status === 200) {
            dispatch(setIsDelete(true));
          }
        } catch (err) {
          console.error(err);
        }
      };
      return (
        <div className="flex w-full flex-wrap items-center justify-center gap-1 lg:w-24">
          <button
            className="bg-white flex h-7 w-7 items-center justify-center rounded-md shadow-lg hover:bg-[#e8ebf0]"
            onClick={() => row.original._id && handleViewMode(row.original._id)}
          >
            <img src={"/icons/ic_show.png"} alt="View" className="h-4 w-4" />
          </button>
          <Trash2
            className="h-4 w-4 cursor-pointer"
            onClick={() => setDialogOpen(true)}
          />
          <AlertOption
            isOpen={isDialogOpen}
            onOpenChange={setDialogOpen}
            onConfirm={() => row.original._id && handleDelete(row.original._id)}
          />
        </div>
      );
    },
  },
];

export default ColumnsCategory;
