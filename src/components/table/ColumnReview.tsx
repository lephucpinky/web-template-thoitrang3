"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { useDispatch } from "react-redux"
import { useSearchParams } from "next/navigation"

import { setMode } from "@/store/slices/modeSlice"
import { APIDeleteReview, APIGetReviewById } from "@/services/review"
import { setIsDeleteReview, setReview } from "@/store/slices/reviewSlice"
import { Trash2 } from "lucide-react"
import AlertOption from "../alert/AlertOption"
import { useState } from "react"
const ColumnsReview: ColumnDef<{
  customerName: string
  _id?: string
  comment?: string
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
      const param = useSearchParams()
      const currentPage = param.get("page") ? Number(param.get("page")) - 1 : 0
      const pageSize = table.getState().pagination.pageSize
      const index = currentPage * pageSize + row.index + 1
      return <div className="w-16 text-center font-bold">{index}</div> // Hiển thị số thứ tự
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => rowA.index - rowB.index,
  },
  {
    accessorKey: "customerName",
    header: () => {
      return <p className="w-[200px] text-left">Tên </p>
    },
    cell: ({ row }) => {
      return (
        <div className="w-[200px] text-left">{row.original.customerName}</div>
      ) // Hiển thị số thứ tự
    },
  },

  {
    accessorKey: "comment",
    header: () => {
      return <p className="w-[200px] text-left">Nội dung</p>
    },
    cell: ({ row }) => {
      return <div className="w-[200px] text-left">{row.original.comment}</div> // Hiển thị số thứ tự
    },
  },

  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      const dispatch = useDispatch()
      const [isDialogOpen, setDialogOpen] = useState(false)
      const handleViewMode = async (id: string) => {
        try {
          const response = await APIGetReviewById(id)
          if (response?.status === 200) {
            dispatch(setReview(response.data))
            dispatch(setMode({ mode: "view" }))
          }
        } catch (err) {
          console.error(err)
        }
      }

      const handleDeleteReview = async (id: string) => {
        try {
          const response = await APIDeleteReview(id)
          if (response?.status === 200) {
            dispatch(setIsDeleteReview(true))
          }
        } catch (err) {
          console.error(err)
        }
      }

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
            onConfirm={() =>
              row.original._id && handleDeleteReview(row.original._id)
            }
          />
        </div>
      )
    },
  },
]

export default ColumnsReview
