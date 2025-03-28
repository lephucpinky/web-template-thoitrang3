import ProductCard from "../product/ProductCard"
import Image from "next/image"
import { Button } from "../ui/button"
import collection from "../../assets/images/Link (5).png"
import { useEffect, useState } from "react"
import { APIGetProducts } from "@/services/product"
import { ProductFormData } from "@/types/productType"

export default function SaleProduct() {
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
    <section className="bg-green-800 py-6 font-[Montserrat]">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">
          SALE ĐỒNG GIÁ - ĐỪNG LO VỀ GIÁ
        </h2>

        {/* Sale Banner */}
        <div className="mb-8">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={collection}
              alt="/"
              width={1000}
              height={200}
              className="h-auto w-full rounded-lg bg-yellow-400"
            />
          </div>
        </div>

        {/* Sale Products */}
        <div className="-mx-2 flex flex-wrap">
          {product.slice(0, 5).map((item, index) => (
            <div key={index} className="mb-6 w-full px-2 sm:w-1/2 md:w-1/5">
              <ProductCard key={item._id} product={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
