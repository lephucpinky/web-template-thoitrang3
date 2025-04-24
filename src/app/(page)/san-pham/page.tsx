"use client"
import ProductCard from "@/components/product/ProductCard"
import { APIGetProducts } from "@/services/product"
import { ProductFormData } from "@/types/productType"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { APIGetCategories } from "@/services/category"
import PaginationComponent from "@/components/pagination/paginationProduct"
import Link from "next/link"
import Image from "next/image"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useDispatch } from "react-redux"
import { APIGetBanners } from "@/services/banner"
import { setBanner } from "@/store/slices/bannerSlice"

interface FilterForm {
  category_id: string | undefined
  page: number
  limit: number
  price_from: number | undefined
  price_to: number | undefined
  search: string | undefined
  size: string | undefined
}

export default function Page() {
  const banner = useSelector((state: RootState) => state.banner.banner)
  const baseUrlImage = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
  const [colorOpen, setColorOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(true)
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
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  // Main filter state that triggers API calls
  const [filterForm, setFilterForm] = useState<FilterForm>({
    page: 1,
    limit: 10,
    category_id: category_id || undefined,
    price_from: undefined,
    price_to: undefined,
    search: searchProduct || undefined,
    size: undefined,
  })
  // Temporary filter state for UI changes
  const [tempFilter, setTempFilter] = useState<FilterForm>({
    page: 1,
    limit: 10,
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
        const data = response?.data.map((item: any) => ({
          ...item,
          category_name: item.category_id?.category_name,
        }))
        setProduct(data)
        setTotalItems(response?.total)
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
  const handleGetBanner = async () => {
    try {
      const response = await APIGetBanners({ display_page: "home" })
      if (response?.status === 200) {
        dispatch(setBanner(response?.data))
      }
    } catch (error) {
      console.error(error)
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
    handleGetBanner()
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

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768
    setCategoryOpen(isDesktop)
    setColorOpen(isDesktop)
    setPriceOpen(isDesktop)
  }, [])
  return (
    <main className="bg-white container mx-auto min-h-screen p-4">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link href="/" className="hover:underline">
          Trang chủ
        </Link>
        <span>/</span>
        <Link href="/san-pham" className="hover:underline">
          Sản phẩm
        </Link>
      </div>
      <div className="h-[200px] overflow-hidden md:h-[400px] lg:h-[600px]">
        {banner[0]?.image_url[1] && (
          <Image
            src={baseUrlImage + banner[0]?.image_url[2]}
            alt="Model wearing gray jacket"
            width={1500}
            height={800}
            className="object-cover"
            priority
          />
        )}
      </div>
      <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row">
        <div className="w-full md:w-1/4">
          <div className="ml-4 w-full max-w-xs space-y-4 font-sans">
            {/* Category Section */}
            <div className="overflow-hidden rounded-md">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="flex w-full items-center justify-between bg-Pink p-3 font-medium text-Black"
              >
                <span>Danh mục</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${categoryOpen ? "rotate-180" : ""}`}
                />
              </button>
              {categoryOpen && (
                <div className="space-y-2 bg-White p-3">
                  {categorys.slice(0, 6).map((item, product) => (
                    <label
                      key={product}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        key={item?._id}
                        type="radio"
                        name="category"
                        className={`h-4 w-4 border-DarkSilver text-Pink ${selectedCategory === item._id ? "focus:ring-Pink" : ""} `}
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
                className="flex w-full items-center justify-between bg-Pink p-3 font-medium text-Black"
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
                      className="h-4 w-4 border-DarkSilver text-Pink focus:ring-Pink"
                    />
                    <span className="text-sm">Trắng</span>
                    <div className="ml-auto h-5 w-5 border border-DarkSilver bg-White"></div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      className="h-4 w-4 border-DarkSilver text-Pink focus:ring-Pink"
                    />
                    <span className="text-sm">Đen</span>
                    <div className="ml-auto h-5 w-5 bg-Black"></div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      className="h-4 w-4 border-DarkSilver text-Pink focus:ring-Pink"
                    />
                    <span className="text-sm">Navy</span>
                    <div className="ml-auto h-5 w-5 bg-BlueNavy"></div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      className="h-4 w-4 border-DarkSilver text-Pink focus:ring-Pink"
                    />
                    <span className="text-sm">Xanh dương</span>
                    <div className="ml-auto h-5 w-5 bg-Blue"></div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      className="h-4 w-4 border-DarkSilver text-Pink focus:ring-Pink"
                    />
                    <span className="text-sm">Xanh lá</span>
                    <div className="ml-auto h-5 w-5 bg-Green"></div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      className="h-4 w-4 border-DarkSilver text-Pink focus:ring-Pink"
                    />
                    <span className="text-sm">Be</span>
                    <div className="ml-auto h-5 w-5 bg-[#d2b48c]"></div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="color"
                      className="h-4 w-4 border-DarkSilver text-Pink focus:ring-Pink"
                    />
                    <span className="text-sm">Đỏ</span>
                    <div className="ml-auto h-5 w-5 bg-Red"></div>
                  </label>
                </div>
              )}
            </div>

            {/* Price Section */}
            <div className="overflow-hidden rounded-md">
              <button
                onClick={() => setPriceOpen(!priceOpen)}
                className="flex w-full items-center justify-between bg-Pink p-3 font-medium text-Black"
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
              )}{" "}
            </div>
          </div>{" "}
        </div>
        <div className="w-full md:w-3/4">
          {product.length > 0 ? (
            <div className="-mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              {product.map((item: ProductFormData) => (
                <ProductCard product={item} key={item._id} />
              ))}
            </div>
          ) : (
            <div className="flex w-full">
              <span className="font-dmsans w-full text-center text-[12px] font-normal text-PersianRed md:w-1/3 md:text-[16px] lg:w-1/3 lg:text-[16px]">
                Hiện chưa có sản phẩm nào!
              </span>
            </div>
          )}
          <div className="mt-8 flex items-center justify-center space-x-2">
            {totalItems > 0 && (
              <PaginationComponent
                totalItems={totalItems}
                itemsPerPage={filterForm.limit}
                handlePageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
