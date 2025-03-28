import React, { useEffect, useState } from "react"
import SectionHeader from "../Homepage/SectionHeader"
import Image from "next/image"
import banner from "../../assets/images/bannern.png"
import { APIGetProducts } from "@/services/product"
import { ProductFormData } from "@/types/productType"
import ProductCard from "../product/ProductCard"

export default function NewProduct() {
  const [product, setProduct] = useState<ProductFormData[]>([])
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
  })
  return (
    <section className="bg-white pt-16 font-[Montserrat]">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title="HÀNG MỚI VỀ" />
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="h-full overflow-hidden">
              <div className="relative min-h-[600px] min-w-[450px]">
                <Image
                  src={banner}
                  alt=""
                  width={450}
                  height={600}
                  className="absolute object-contain"
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex flex-wrap">
              {product.slice(0, 6).map((item, index) => (
                <div key={index} className="w-full p-2 sm:w-1/2 md:w-1/3">
                  <ProductCard key={item._id} product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
