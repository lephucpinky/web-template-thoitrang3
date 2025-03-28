import { Button } from "@/components/ui/button"
import left from "../../assets/icons/icon1.png"
import right from "../../assets/icons/icon2.png"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { APIGetCategories } from "@/services/category"
import { ProductFormData } from "@/types/productType"
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
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-[Montserrat] text-lg font-bold uppercase text-[#1C5B41] lg:text-2xl">
        {title}
      </h2>
      <div className="flex items-center gap-2">
        {showViewAll && (
          <Button variant="ghost" size="sm">
            <Image src={left} alt="" width={20} height={20} />
          </Button>
        )}
        {categorys.slice(0, 5).map((item, index) => (
          <div className="flex gap-1 font-[Nunito]">
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="rounded-full bg-[#f5a623] text-white hover:bg-[#e09000]"
              onClick={() => handleSelectCategory(item?._id)}
            >
              {item.category_name}
            </Button>
          </div>
        ))}

        {showViewAll && (
          <Button variant="ghost" size="sm">
            <Image src={right} alt="" width={20} height={20} />
          </Button>
        )}
      </div>
    </div>
  )
}
