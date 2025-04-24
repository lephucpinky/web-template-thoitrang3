"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { useDispatch } from "react-redux"
import { useSearchParams } from "next/navigation"
import { APIDeleteProduct, APIGetProductById } from "@/services/product"
import { setProduct } from "@/store/slices/productSlice"
import { setMode } from "@/store/slices/modeSlice"
import AlertOption from "../alert/AlertOption"
import { Trash2 } from "lucide-react"
import { setIsDeleteProduct } from "@/store/slices/productSlice"
import { useState } from "react"

const ColumnsProduct: ColumnDef<{
  product_name: string
  classification?: {
    classifications: {
      classification_name: string
      classification_value: string
    }[]
    price: number
    remaining: number
    sold?: number
  }[]
  _id?: string
  priority?: boolean
  price?: number
  remaining?: number
  sold?: number
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
    accessorKey: "product_name",
    header: () => {
      return <p className="w-[200px] text-left">Tên sản phẩm</p>
    },
    cell: ({ row }) => {
      return (
        <div className="w-[200px] text-left">{row.original.product_name}</div>
      ) // Hiển thị số thứ tự
    },
  },
  {
    accessorKey: "classification_details",
    header: () => <p className="text-left">Phân loại</p>,
    cell: ({ row }) => (
      <div className="text-left">
        {row.original.classification?.map((item, index) => (
          <div key={index} className="py-2">
            {item.classifications.map((c, i) => (
              <span key={i}>
                {c.classification_name}: {c.classification_value}
                {i < item.classifications.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "classification_price",
    header: () => <p className="text-right">Giá</p>,
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.classification &&
        row.original.classification.length > 0 ? (
          row.original.classification.map((item, index) => (
            <div key={index} className="py-2">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.price)}
            </div>
          ))
        ) : (
          <div className="py-2">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(row.original.price || 0)}
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "classification_remaining",
    header: () => <p className="text-right">Còn lại</p>,
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.classification &&
        row.original.classification.length > 0 ? (
          row.original.classification.map((item, index) => (
            <div key={index} className="py-2">
              {item.remaining || row.original.remaining}
            </div>
          ))
        ) : (
          <div className="py-2">{row.original.remaining || 0}</div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "classification_sold",
    header: () => <p className="text-right">Đã bán</p>,
    cell: ({ row }) => {
      console.log("🚀 ~ row:", row)
      return (
        <div className="text-right">
          {row.original.classification &&
          row.original.classification.length > 0 ? (
            row.original.classification.map((item, index) => (
              <div key={index} className="py-2">
                {item.sold || row.original.sold || 0}
              </div>
            ))
          ) : (
            <div className="py-2">{row.original.sold || 0}</div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "priority",
    header: () => {
      return <p className="w-[150px] text-center">Ưu tiên</p>
    },
    cell: ({ row }) => {
      return (
        <div className="justify-centers flex w-[150px] items-center">
          <input
            type="checkbox"
            className="custom-checkbox flex w-full justify-center"
            checked={row.getValue("priority")}
            readOnly
          />
        </div>
      )
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
          const response = await APIGetProductById(id)
          if (response?.code === 200) {
            dispatch(setProduct(response.content))
            dispatch(setMode({ mode: "view" }))
          }
        } catch (err) {
          console.error(err)
        }
      }

      const handleDeleteProduct = async (id: string) => {
        try {
          const response = await APIDeleteProduct(id)
          if (response?.status === 200) {
            dispatch(setIsDeleteProduct(true))
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
              row.original._id && handleDeleteProduct(row.original._id)
            }
          />
        </div>
      )
    },
  },
]

export default ColumnsProduct
