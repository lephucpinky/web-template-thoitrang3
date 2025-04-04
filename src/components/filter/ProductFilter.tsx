"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { APIGetCategories } from "@/services/category"
import { Button } from "../ui/button"

interface FilterForm {
  page: number
  limit: number
  category_id: string | undefined
  price_from: number | undefined
  price_to: number | undefined
  search: string | undefined
}

export default function ProductFilter() {
  const [colorOpen, setColorOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(true)
  const [sizeOpen, setSizeOpen] = useState(true)
  const [categoryOpen, setCategoryOpen] = useState(true)
  const router = useRouter()
  const [categorys, setCategorys] = useState<
    { _id: string; category_name: string }[]
  >([])
  const searchParams = useSearchParams()
  const searchProduct = searchParams.get("search")
  const [product, setProduct] = useState([])
  const category_id = searchParams.get("category_id")
  const pathName = usePathname()
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
        const updatedCategory = [
          { category_name: "Tất cả", _id: "all" },
          ...data,
        ]
        setCategorys(updatedCategory)
      }
    } catch (err) {
      console.error(err)
    }
  }

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
  useEffect(() => {
    if (searchProduct) {
      setFilterForm((prev) => ({ ...prev, search: searchProduct }))
      setTempFilter((prev) => ({ ...prev, search: searchProduct }))
    }
  }, [searchProduct])

  useEffect(() => {
    handleGetCategories()
  }, [])

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id)
    setFilterForm((prev) => ({
      ...prev,
      category_id: id === "all" ? undefined : id,
    }))

    router.push(`${pathName}?category_id=${id}`, { scroll: false })
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

  return (
    <div className="w-full max-w-xs space-y-4 font-sans">
      {/* Category Section */}
      <div className="overflow-hidden rounded-md">
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex w-full items-center justify-between bg-Pink/50 p-3 font-medium text-DarkSilver"
        >
          <span>Danh mục</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${categoryOpen ? "rotate-180" : ""}`}
          />
        </button>
        {categoryOpen && (
          <div className="bg-white space-y-2 p-3">
            {categorys.slice(0, 6).map((item) => (
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  key={item?._id}
                  type="radio"
                  name="category"
                  className={`border-gray-300 text-pink-500 h-4 w-4 ${selectedCategory === item._id ? "focus:ring-pink-500" : ""} `}
                  onClick={() => handleSelectCategory(item?._id)}
                />
                {item.category_name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Color Section */}
      <div className="overflow-hidden rounded-md">
        <button
          onClick={() => setColorOpen(!colorOpen)}
          className="bg-pink-50 text-gray-800 flex w-full items-center justify-between p-3 font-medium"
        >
          <span>Màu sắc</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${colorOpen ? "rotate-180" : ""}`}
          />
        </button>

        {colorOpen && (
          <div className="bg-white space-y-2 p-3">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="color"
                className="border-gray-300 text-pink-500 focus:ring-pink-500 h-4 w-4"
              />
              <span className="text-sm">Trắng</span>
              <div className="border-gray-300 bg-white ml-auto h-5 w-5 border"></div>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="color"
                className="border-gray-300 text-pink-500 focus:ring-pink-500 h-4 w-4"
              />
              <span className="text-sm">Đen</span>
              <div className="bg-black ml-auto h-5 w-5"></div>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="color"
                className="border-gray-300 text-pink-500 focus:ring-pink-500 h-4 w-4"
              />
              <span className="text-sm">Navy</span>
              <div className="bg-blue-800 ml-auto h-5 w-5"></div>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="color"
                className="border-gray-300 text-pink-500 focus:ring-pink-500 h-4 w-4"
              />
              <span className="text-sm">Xanh dương</span>
              <div className="bg-blue-500 ml-auto h-5 w-5"></div>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="color"
                className="border-gray-300 text-pink-500 focus:ring-pink-500 h-4 w-4"
              />
              <span className="text-sm">Xanh lá</span>
              <div className="bg-green-500 ml-auto h-5 w-5"></div>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="color"
                className="border-gray-300 text-pink-500 focus:ring-pink-500 h-4 w-4"
              />
              <span className="text-sm">Be</span>
              <div className="ml-auto h-5 w-5 bg-[#d2b48c]"></div>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="color"
                className="border-gray-300 text-pink-500 focus:ring-pink-500 h-4 w-4"
              />
              <span className="text-sm">Đỏ</span>
              <div className="bg-red-600 ml-auto h-5 w-5"></div>
            </label>
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="overflow-hidden rounded-md">
        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="bg-pink-50 text-gray-800 flex w-full items-center justify-between p-3 font-medium"
        >
          <span>Giá</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${priceOpen ? "rotate-180" : ""}`}
          />
        </button>

        {priceOpen && (
          <div className="bg-white space-y-4 p-3">
            <div className="flex flex-col gap-6 md:flex-row md:gap-2">
              <input
                type="number"
                placeholder="Từ (VNĐ)"
                className="border-gray-300 mt-4 w-full rounded-md border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-Black60 md:w-1/2"
                value={tempFilter.price_from || ""} // Use tempFilter instead
                onChange={(e) =>
                  handlePriceChange("price_from", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Đến (VNĐ)"
                className="border-gray-300 mt-4 w-full rounded-md border px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-Black60 md:w-1/2"
                value={tempFilter.price_to || ""} // Use tempFilter instead
                onChange={(e) => handlePriceChange("price_to", e.target.value)}
              />
            </div>
            <div className="my-5 flex justify-center">
              <Button
                onClick={handleConfirmFilter}
                className="text-SoldierGreen hover:enabled:bg-SoldierGreen w-40 cursor-pointer justify-center rounded-xl border-none bg-White px-4 py-2 text-center text-lg font-bold shadow-[0_0.4rem_#dfd9d9] active:translate-y-1 active:text-White active:shadow-[0_0.2rem_#dfd9d9] hover:enabled:text-White hover:enabled:shadow-[0_0.1rem_#bcb4b4]"
              >
                Xác nhận
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Size Section */}
      <div className="overflow-hidden rounded-md">
        <button
          onClick={() => setSizeOpen(!sizeOpen)}
          className="bg-pink-50 text-gray-800 flex w-full items-center justify-between p-3 font-medium"
        >
          <span>Size</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${sizeOpen ? "rotate-180" : ""}`}
          />
        </button>

        {sizeOpen && (
          <div className="bg-white p-3">
            <div className="mb-2">
              <span className="text-sm">Áo</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <button className="border-gray-300 hover:border-pink-500 focus:ring-pink-500 rounded border p-1 text-sm focus:outline-none focus:ring-2">
                XS
              </button>
              <button className="border-gray-300 hover:border-pink-500 focus:ring-pink-500 rounded border p-1 text-sm focus:outline-none focus:ring-2">
                S
              </button>
              <button className="border-gray-300 hover:border-pink-500 focus:ring-pink-500 rounded border p-1 text-sm focus:outline-none focus:ring-2">
                M
              </button>
              <button className="border-gray-300 hover:border-pink-500 focus:ring-pink-500 rounded border p-1 text-sm focus:outline-none focus:ring-2">
                L
              </button>
              <button className="border-gray-300 hover:border-pink-500 focus:ring-pink-500 rounded border p-1 text-sm focus:outline-none focus:ring-2">
                XL
              </button>
              <button className="border-gray-300 hover:border-pink-500 focus:ring-pink-500 rounded border p-1 text-sm focus:outline-none focus:ring-2">
                XXL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
