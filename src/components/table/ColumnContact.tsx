"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { useDispatch } from "react-redux"
import { useSearchParams } from "next/navigation"

import { setMode } from "@/store/slices/modeSlice"
import { format } from "date-fns/format"
import { APIGetContactById } from "@/services/contact"
import { setContact } from "@/store/slices/contactSlice"

const ColumnsBanner: ColumnDef<{
  _id?: string
  customer_name: string
  phone_number: string
  email: string
  title: string
  description?: string
  createdAt?: string
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
      return <div className="w-16 text-center">{index}</div> // Hiển thị số thứ tự
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => rowA.index - rowB.index,
  },
  {
    accessorKey: "customer_name",
    header: () => {
      return <p className="w-[200px] text-left">Họ và tên</p>
    },
    cell: ({ row }) => {
      return (
        <div className="w-[200px] text-left">{row.original.customer_name}</div>
      ) // Hiển thị số thứ tự
    },
  },
  {
    accessorKey: "email",
    header: () => {
      return <p className="w-[200px] text-left">Email</p>
    },
    cell: ({ row }) => {
      return <div className="w-[200px] text-left">{row.original.email}</div> // Hiển thị số thứ tự
    },
  },
  {
    accessorKey: "phone_number",
    header: () => {
      return <p className="w-[200px] text-left">SĐT</p>
    },
    cell: ({ row }) => {
      return (
        <div className="w-[200px] text-left">{row.original.phone_number}</div>
      ) // Hiển thị số thứ tự
    },
  },
  {
    accessorKey: "title",
    header: () => {
      return <p className="w-[200px] text-left">nội dung</p>
    },
    cell: ({ row }) => {
      return <div className="w-[200px] text-left">{row.original.title}</div> // Hiển thị số thứ tự
    },
  },
  {
    accessorKey: "content",
    header: () => {
      return <p className="w-[200px] text-left">Mô tả ngắn</p>
    },
    cell: ({ row }) => {
      return (
        <div className="w-[200px] text-left">{row.original.description}</div>
      ) // Hiển thị số thứ tự
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ngày tạo
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <p className="w-[180px]">
          {format(new Date(row.getValue("createdAt")), "dd/MM/yyyy")}
        </p>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      const dispatch = useDispatch()
      const handleViewMode = async (id: string) => {
        try {
          const response = await APIGetContactById(id)
          if (response?.status === 200) {
            dispatch(setContact(response.data))
            dispatch(setMode({ mode: "view" }))
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
        </div>
      )
    },
  },
]

export default ColumnsBanner
