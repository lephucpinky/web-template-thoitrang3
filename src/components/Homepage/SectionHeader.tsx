"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { APIGetCategories } from "@/services/category"
import type { ProductFormData } from "@/types/productType"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import { cn } from "@/lib/utils"
import { APIGetProducts } from "@/services/product"

interface SectionHeaderProps {
  title: string
  showViewAll?: boolean
}

interface FilterForm {
  page: number
  limit: number
  category_id: string | undefined
  price: number | undefined
  original_price: number | undefined
}

export default function SectionHeader({
  title,
  showViewAll = true,
}: SectionHeaderProps) {
  const [activeCategory, setActiveCategory] = useState("1")

  const router = useRouter()
  const [categorys, setCategorys] = useState<
    { _id: string; category_name: string }[]
  >([])
  const [product, setProduct] = useState<ProductFormData[]>([])
  const searchParams = useSearchParams()
  const category_id = searchParams.get("_id")
  const pathName = usePathname()
  const [totalItems, setTotalItems] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category_id || "all"
  )
  // Main filter state that triggers API calls
  const [filterForm, setFilterForm] = useState<FilterForm>({
    page: 1,
    limit: 12,
    category_id: category_id || undefined,
    price: undefined,
    original_price: undefined,
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
    } catch (err) {
      console.error(err)
    }
  }

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id)
    setFilterForm((prev) => ({
      ...prev,
      category_id: id === "all" ? undefined : id,
    }))

    router.push(`${pathName}?category_id=${id}`, { scroll: false })
  }

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
  useEffect(() => {
    handleGetProductList()
  }, [filterForm])
  useEffect(() => {
    handleGetCategories()
    handleGetProductList()
  }, [])

  return (
    <div className="flex items-center justify-between space-x-2 pl-4 pr-4">
      <h2 className="whitespace-nowrap font-[Montserrat] text-lg font-bold text-[#1C5B41] lg:text-2xl">
        {title}
      </h2>

      <div className="relative w-[60%] lg:w-1/3">
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent>
            {categorys.slice(0, 5).map((item, index) => (
              <CarouselItem
                key={item._id}
                className="pl-1 md:basis-1/3 lg:basis-1/4"
              >
                <button
                  className={cn(
                    "w-full whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    selectedCategory === item._id
                      ? "bg-White text-Black"
                      : "bg-White text-Black hover:bg-[#e09000]"
                  )}
                  onClick={() => {
                    setActiveCategory(item._id)
                    handleSelectCategory(item._id)
                  }}
                >
                  {item.category_name}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 h-8 w-8 -translate-y-1/2 rounded-none border-none shadow-none hover:bg-[#e09000] lg:-left-[10%]" />
          <CarouselNext className="absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 rounded-none border-none shadow-none hover:bg-[#e09000] lg:-right-[10%]" />
        </Carousel>
      </div>
    </div>
  )
}
