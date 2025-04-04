import ProductCard from "../product/ProductCard"
import Image from "next/image"
import { Button } from "../ui/button"
import collection from "../../assets/images/Link (5).png"
import { useEffect, useState } from "react"
import { APIGetProducts } from "@/services/product"
import { ProductFormData } from "@/types/productType"
import ProductGrid from "../product/ProductGrid"
import { Products } from "@/constants/menu"
import { useRouter } from "next/navigation"
import { colorConfig } from "../config/InputConfig"
interface ProductCardProps {
  product: ProductFormData
  textColor?: string
}

export default function SaleProduct({ product }: ProductCardProps) {
  const baseUrlImage = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
  const router = useRouter()
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
    <section className="bg-[#1c5b27] py-6 font-[Montserrat]">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-4 text-xl font-bold text-White md:text-2xl">
          SALE ĐỒNG GIÁ - ĐỪNG LO VỀ GIÁ
        </h2>

        {/* Sale Banner */}
        <div className="mb-8">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={collection}
              alt="/"
              width={900}
              height={200}
              className="bg-yellow-400 h-auto w-full rounded-lg"
            />
          </div>
        </div>

        {/* Sale Products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-5">
            {products.slice(0, 5).map((item: ProductFormData) => (
              <ProductCard
                product={item}
                key={item._id}
                textColor="!text-White"
              />
            ))}
          </div>
        ) : (
          <p>Không có sản phẩm nào</p>
        )}
      </div>
    </section>
  )
}
