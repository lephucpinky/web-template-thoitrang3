"use client"
import HeroBanner from "@/components/banner/Herobanner"

import ProductCard from "@/components/product/ProductCard"
import { APIGetProducts } from "@/services/product"
import { ProductFormData } from "@/types/productType"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-separator"
import { ChevronDown } from "lucide-react"
import { APIGetCategories } from "@/services/category"
import PaginationComponent from "@/components/pagination/paginationProduct"
import ProductFilter from "@/components/filter/ProductFilter"
interface FilterForm {
  category_id: string | undefined
  page: number
  limit: number
  price_from: number | undefined
  price_to: number | undefined
  search: string | undefined
  size: string | undefined
}

export default function page() {
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
  const [totalItems, setTotalItems] = useState(0)
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
    size: undefined,
  })
  // Temporary filter state for UI changes
  const [tempFilter, setTempFilter] = useState<FilterForm>({
    page: 1,
    limit: 12,
    category_id: category_id || undefined,
    price_from: undefined,
    price_to: undefined,
    search: searchProduct || undefined,
    size: undefined,
  })
  const handleGetProductList = async () => {
    try {
      const response = await APIGetProducts(filterForm)
      if (response?.status === 200) {
        const data = response?.data.map((item: any, index: number) => ({
          ...item,
          category_name: item.category_id?.category_name,
        }))
        setProduct(data)
      }
    } catch (error) {
      console.error(error)
    }
  }
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
    handleGetProductList()
  }, [filterForm])

  useEffect(() => {
    handleGetCategories()
    handleGetProductList()
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

  const handlePageChange = (page: number) => {
    setFilterForm((prev) => ({ ...prev, page }))
    setTempFilter((prev) => ({ ...prev, page }))
    console.log(setFilterForm)
    const params = new URLSearchParams(searchParams.toString())

    params.set("page", page.toString())
    router.push(`?${params.toString()}`, { scroll: false })
  }
  // Handle confirm button click

  useEffect(() => {
    if (searchProduct) {
      setFilterForm((prev) => ({
        ...prev,
        search: searchProduct,
        page: 1, // Reset page khi search thay đổi
      }))
      setTempFilter((prev) => ({
        ...prev,
        search: searchProduct,
        page: 1, // Reset page khi search thay đổi
      }))
    }
  }, [searchProduct])

  return (
    <main className="bg-white mx-auto p-4">
      <HeroBanner />
      <div className="mt-10 flex flex-col justify-around gap-6 md:flex-row">
        <div className="w-full md:w-64">
          <div className="ml-4 w-full max-w-xs space-y-4 font-sans">
            {/* Category Section */}
            <div className="overflow-hidden rounded-md">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="bg-Pink flex w-full items-center justify-between p-3 font-medium text-DarkSilver"
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
                        className={`text-Pink h-4 w-4 border-DarkSilver ${selectedCategory === item._id ? "focus:ring-Pink" : ""} `}
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
                className="bg-Pink flex w-full items-center justify-between p-3 font-medium text-DarkSilver"
              >
                <span>Màu sắc</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${colorOpen ? "rotate-180" : ""}`}
                />
              </button>

              {colorOpen && (
                <div className="space-y-2 bg-White p-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      className="text-Pink focus:ring-Pink h-4 w-4 border-DarkSilver"
                    />
                    <span className="text-sm">Trắng</span>
                    <div className="ml-auto h-5 w-5 border border-DarkSilver bg-White"></div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      className="text-Pink focus:ring-Pink h-4 w-4 border-DarkSilver"
                    />
                    <span className="text-sm">Đen</span>
                    <div className="ml-auto h-5 w-5 bg-Black"></div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      className="text-Pink focus:ring-Pink h-4 w-4 border-DarkSilver"
                    />
                    <span className="text-sm">Navy</span>
                    <div className="bg-BlueNavy ml-auto h-5 w-5"></div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      className="text-Pink focus:ring-Pink h-4 w-4 border-DarkSilver"
                    />
                    <span className="text-sm">Xanh dương</span>
                    <div className="bg-Blue ml-auto h-5 w-5"></div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      className="text-Pink focus:ring-Pink h-4 w-4 border-DarkSilver"
                    />
                    <span className="text-sm">Xanh lá</span>
                    <div className="bg-Green ml-auto h-5 w-5"></div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      className="text-Pink focus:ring-Pink h-4 w-4 border-DarkSilver"
                    />
                    <span className="text-sm">Be</span>
                    <div className="ml-auto h-5 w-5 bg-[#d2b48c]"></div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      className="text-Pink focus:ring-Pink h-4 w-4 border-DarkSilver"
                    />
                    <span className="text-sm">Đỏ</span>
                    <div className="bg-Red ml-auto h-5 w-5"></div>
                  </label>
                </div>
              )}
            </div>

            {/* Price Section */}
            <div className="overflow-hidden rounded-md">
              <button
                onClick={() => setPriceOpen(!priceOpen)}
                className="bg-Pink flex w-full items-center justify-between p-3 font-medium text-DarkSilver"
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
                      className="mt-4 w-full rounded-md border border-DarkSilver px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-Black60 md:w-1/2"
                      value={tempFilter.price_from || ""} // Use tempFilter instead
                      onChange={(e) =>
                        handlePriceChange("price_from", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder="Đến (VNĐ)"
                      className="mt-4 w-full rounded-md border border-DarkSilver px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-Black60 md:w-1/2"
                      value={tempFilter.price_to || ""} // Use tempFilter instead
                      onChange={(e) =>
                        handlePriceChange("price_to", e.target.value)
                      }
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
                className="bg-Pink flex w-full items-center justify-between p-3 font-medium text-DarkSilver"
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
                    <button className="hover:border-Pink focus:ring-Pink rounded border border-DarkSilver p-1 text-sm focus:outline-none focus:ring-2">
                      XS
                    </button>
                    <button className="hover:border-Pink focus:ring-Pink rounded border border-DarkSilver p-1 text-sm focus:outline-none focus:ring-2">
                      S
                    </button>
                    <button className="hover:border-Pink focus:ring-Pink rounded border border-DarkSilver p-1 text-sm focus:outline-none focus:ring-2">
                      M
                    </button>
                    <button className="hover:border-Pink focus:ring-Pink rounded border border-DarkSilver p-1 text-sm focus:outline-none focus:ring-2">
                      L
                    </button>
                    <button className="hover:border-Pink focus:ring-Pink rounded border border-DarkSilver p-1 text-sm focus:outline-none focus:ring-2">
                      XL
                    </button>
                    <button className="hover:border-Pink focus:ring-Pink rounded border border-DarkSilver p-1 text-sm focus:outline-none focus:ring-2">
                      XXL
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {product.length > 0 ? (
          <div className="-mt-2 grid max-h-[350px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.map((item: ProductFormData) => (
              <ProductCard product={item} key={item._id} />
            ))}
          </div>
        ) : (
          <div className="flex w-full">
            <text className="font-dmsans w-full text-center text-[12px] font-normal text-PersianRed md:w-1/3 md:text-[16px] lg:w-1/3 lg:text-[16px]">
              Hiện chưa có sản phẩm nào!
            </text>
          </div>
        )}
      </div>
      <div className="mt-8 flex items-center justify-center space-x-2">
        <PaginationComponent
          totalItems={totalItems}
          itemsPerPage={filterForm.limit}
          handlePageChange={handlePageChange}
        />
      </div>
    </main>
  )
}
