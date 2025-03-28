"use client"
import HeroBanner from "@/components/banner/Herobanner"
import PaginationComponent from "@/components/pagination/paginationProduct"
import ProductCard from "@/components/product/ProductCard"
import FilterSidebar from "@/components/sideBar/FillerSidebar"
import { APIGetCategories } from "@/services/category"
import { APIGetProducts } from "@/services/product"
import { ProductFormData } from "@/types/productType"
import { ChevronDown, Heart, HeartOff } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface FilterForm {
  page: number
  limit: number
  category_id: string | undefined
  price_from: number | undefined
  price_to: number | undefined
  search: string | undefined
}

export default function page() {
  const router = useRouter()
  const [categorys, setCategorys] = useState<
    { _id: string; category_name: string }[]
  >([])
  const searchParams = useSearchParams()
  const searchProduct = searchParams.get("search")
  const [product, setProduct] = useState([])
  const [liked, setLiked] = useState(false)
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
  const formattedPrice = (price: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }
  const handlePageChange = (page: number) => {
    setFilterForm((prev) => ({ ...prev, page }))
    setTempFilter((prev) => ({ ...prev, page }))
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id)
    setFilterForm((prev) => ({
      ...prev,
      category_id: id === "all" ? undefined : id,
    }))

    router.push(`${pathName}?category_id=${id}`, { scroll: false })
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
  return (
    <main className="container min-h-screen bg-white">
      <HeroBanner />
      <div className="px-4 py-6">
        <div className="relative flex gap-6">
          <FilterSidebar />
          {product.map((item: ProductFormData) => (
            <ProductCard product={item} key={item._id} />
          ))}
        </div>
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
    </main>
  )
}
