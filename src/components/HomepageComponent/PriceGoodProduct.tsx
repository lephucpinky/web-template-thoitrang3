import React, { useEffect, useState } from "react"
import SectionHeader from "../Homepage/SectionHeader"
import Image from "next/image"
import banner from "../../assets/images/Link (4).png"
import { APIGetProducts } from "@/services/product"
import { ProductFormData } from "@/types/productType"
import ProductCard from "../product/ProductCard"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product?: ProductFormData
  textColor?: string
}

export default function PriceGoodProduct({ product }: ProductCardProps) {
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
    <section className="bg-[#FFFAF0] py-6 font-[Montserrat]">
      <div className="mx-auto max-w-7xl">
        <div className="pr-4">
          <SectionHeader title=" GIÁ TỐT" />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="h-full overflow-hidden">
              <div className="relative h-full w-full">
                <Image src={banner} alt="" fill className="object-cover" />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 p-2 md:grid-cols-3">
                {products.slice(0, 6).map((item: ProductFormData) => (
                  <ProductCard product={item} key={item._id} />
                ))}
              </div>
            ) : (
              <p>Không có sản phẩm nào</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
