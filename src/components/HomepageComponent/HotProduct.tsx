import SectionHeader from "../Homepage/SectionHeader"
import { useEffect, useState } from "react"
import { ProductFormData } from "@/types/productType"
import { APIGetProducts } from "@/services/product"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ProductCard from "../product/ProductCard"

interface ProductCardProps {
  product?: ProductFormData
  textColor?: string
}

export default function HotProduct({ product }: ProductCardProps) {
  const router = useRouter()
  const baseUrlImage = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
  const [products, setProduct] = useState<ProductFormData[]>([])
  const [filterForm, setFilterForm] = useState<any>({
    page: 1,
    limit: 10000,
    priority: true,
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

  useEffect(() => {
    handleGetProductList()
  }, [])

  return (
    <section className="mx-auto mb-12 max-w-7xl pt-6">
      <SectionHeader title="SẢN PHẨM HOT" />
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-5">
          {products.slice(0, 10).map((item: ProductFormData) => (
            <ProductCard product={item} key={item._id} />
          ))}
        </div>
      ) : (
        <p>Không có sản phẩm nào</p>
      )}

      <div className="flex justify-center">
        <Link
          href="/san-pham"
          className="mb-4 rounded-md bg-[#1C5B41] px-10 py-2 font-[Montserrat] text-White hover:bg-[#1C5B41]"
        >
          Xem tất cả
        </Link>
      </div>
    </section>
  )
}
