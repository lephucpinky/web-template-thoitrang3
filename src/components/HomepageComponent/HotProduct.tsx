import { products } from "@/constants/menu"
import SectionHeader from "../Homepage/SectionHeader"

import { Button } from "../ui/button"
import ProductCard from "../product/ProductCard"
import { useEffect, useState } from "react"
import { ProductFormData } from "@/types/productType"
import { APIGetProducts } from "@/services/product"

export default function HotProduct() {
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
    <section className="mx-auto mb-12 max-w-7xl bg-[#FFFAF0] pt-16">
      <SectionHeader title="SẢN PHẨM HOT" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {product.slice(0, 10).map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </div>
      <div className="mt-6 flex justify-center pb-5">
        <Button className="bg-[#1C5B41] px-8 font-[Montserrat] text-white hover:bg-[#1C5B41]">
          Xem tất cả
        </Button>
      </div>
    </section>
  )
}
