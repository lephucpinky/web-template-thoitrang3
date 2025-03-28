import { APIGetCategories } from "@/services/category"

import { ChevronDown } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { CategoryFormData } from "@/types/categoryType"

interface FilterForm {
  page: number
  limit: number
  category_id: string | undefined
  price_from: number | undefined
  price_to: number | undefined
  search: string | undefined
}

export default function FilterSidebar() {
  const router = useRouter()
  const [categorys, setCategorys] = useState<
    { _id: string; category_name: string }[]
  >([])
  const searchParams = useSearchParams()
  const searchProduct = searchParams.get("search")

  const category_id = searchParams.get("category_id")
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category_id || "all"
  )

  // Main filter state that triggers API calls
  const [filterForm, setFilterForm] = useState<FilterForm>({
    page: 1,
    limit: 12,
    category_id: category_id || undefined,
    price_from: undefined,
    price_to: undefined,
    search: searchProduct || undefined,
  })

  // Temporary filter state for UI changes
  const [tempFilter, setTempFilter] = useState<FilterForm>({
    page: 1,
    limit: 12,
    category_id: category_id || undefined,
    price_from: undefined,
    price_to: undefined,
    search: searchProduct || undefined,
  })

  const handleGetCategories = async () => {
    try {
      const response = await APIGetCategories()
      if (response?.status === 200) {
        const data = response?.data.map((item: any) => ({
          category_name: item.category_name,
          _id: item._id ? String(item._id) : "all",
        }))
        const updatedCategory = [...data]
        setCategorys(updatedCategory)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Handle confirm button click
  const handleConfirmFilter = () => {
    setFilterForm({
      ...tempFilter,
      page: 1, // Reset page về 1 khi confirm filter
    })
    // Cập nhật URL params
    const params = new URLSearchParams()
    if (tempFilter.category_id)
      params.set("category_id", tempFilter.category_id)
    if (tempFilter.search) params.set("search", tempFilter.search)
    params.set("page", "1") // Reset page trong URL
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handlePriceChange = (key: "price_from" | "price_to", value: string) => {
    const numericValue = value === "" ? undefined : Number(value)
    if (
      numericValue === undefined ||
      (!isNaN(numericValue) && numericValue >= 0)
    ) {
      setTempFilter((prev) => ({
        ...prev,
        [key]: numericValue,
        page: 1,
      }))
    }
  }

  useEffect(() => {
    if (searchProduct) {
      setFilterForm((prev) => ({ ...prev, search: searchProduct }))
      setTempFilter((prev) => ({ ...prev, search: searchProduct }))
    }
  }, [searchProduct])

  useEffect(() => {
    handleGetCategories()
  }, [])

  return (
    <div className="w-[240px] flex-shrink-0">
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between bg-[#FFF2F2] py-3">
          <h3 className="pl-4 font-medium">Danh mục</h3>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
        <div className="w-full flex-shrink-0 md:w-64">
          <div className="space-y-4">
            {/* Categories */}
            <div>
              <div className="space-y-2 pt-2">
                {categorys.map((item) => (
                  <Button
                    key={item?._id}
                    className={`flex items-center bg-pink-200 font-bold text-black ${selectedCategory === item._id ? "" : ""}`}
                  >
                    {item.category_name}
                  </Button>
                ))}
              </div>
            </div>
            <Separator />
            {/* Price Range */}
            <div>
              <div className="flex items-center justify-between bg-[#FFF2F2] py-3">
                <h3 className="pl-4 font-medium">Chọn khoảng giá</h3>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
              <div className="flex flex-col gap-6 md:flex-row md:gap-2">
                <input
                  type="number"
                  placeholder="Từ (VNĐ)"
                  className="focus:ring-Black60 mt-4 w-full rounded-md border border-gray-300 px-3 py-2 text-[14px] focus:outline-none focus:ring-2 md:w-1/2"
                  value={tempFilter.price_from || ""} // Use tempFilter instead
                  onChange={(e) =>
                    handlePriceChange("price_from", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Đến (VNĐ)"
                  className="focus:ring-Black60 mt-4 w-full rounded-md border border-gray-300 px-3 py-2 text-[14px] focus:outline-none focus:ring-2 md:w-1/2"
                  value={tempFilter.price_to || ""} // Use tempFilter instead
                  onChange={(e) =>
                    handlePriceChange("price_to", e.target.value)
                  }
                />
              </div>
            </div>
            <Separator />

            <div className="flex justify-center">
              <Button
                onClick={handleConfirmFilter}
                className="bg-White text-SoldierGreen active:text-White hover:enabled:bg-SoldierGreen hover:enabled:text-White w-40 cursor-pointer justify-center rounded-xl border-none px-4 py-2 text-lg font-bold shadow-[0_0.4rem_#dfd9d9] active:translate-y-1 active:shadow-[0_0.2rem_#dfd9d9] hover:enabled:shadow-[0_0.1rem_#bcb4b4]"
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
