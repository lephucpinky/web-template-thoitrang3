import Image from "next/image"
import { CardContent, CardFooter } from "@/components/ui/card"
import { useParams, useRouter } from "next/navigation"
import { ProductFormData } from "@/types/productType"
import { useState } from "react"
import { colorConfig } from "../config/InputConfig"

interface ProductCardProps {
  product: ProductFormData
  textColor?: string
}

export default function ProductCard({
  product,
  textColor = colorConfig.primary,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false)
  const params = useParams()

  const baseUrlImage = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
  const router = useRouter()

  const handleProductClick = () => {
    window.scrollTo(0, 0)
    if (!product?._id || !product?.product_name) return
    const productName = product.product_name.toLowerCase().replace(/\s+/g, "-") // Chuyển tên sản phẩm thành slug
    router.push(`/san-pham/${productName}?id=${product._id}`)
  }
  return (
    <div className="rounded-md">
      <CardContent className="p-2">
        <div className="relative min-h-[350px] w-full overflow-hidden">
          <Image
            src={(baseUrlImage + product?.images[0]) as string}
            alt={product?.product_name}
            fill
            className="transition-transform hover:scale-105 md:object-cover"
          />
        </div>
      </CardContent>
      <CardFooter
        key={product?._id}
        onClick={handleProductClick}
        className="flex flex-col items-start gap-1 p-3 hover:cursor-pointer"
      >
        <h3 className={`line-clamp-1 text-sm font-medium ${textColor}`}>
          {product?.product_name}
        </h3>
        <div className="flex items-center gap-2">
          <span className={`text-sm text-[#282828] line-through ${textColor}`}>
            {product.price}
          </span>
          <span className="font-poppins text-lg font-medium text-[#FE9614]">
            {product?.discount_price?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </CardFooter>
    </div>
  )
}

export function ProductCardSmall({ product }: ProductCardProps) {
  const baseUrlImage = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
  return (
    <div key={product._id} className="group">
      <div className="relative mb-2 h-[400px] w-auto overflow-hidden rounded-lg">
        <Image
          src={(baseUrlImage + product?.images[0]) as string}
          alt={product.product_name}
          fill
          className="aspect-square object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="space-y-1">
        <h3 className="text-gray-700 mb-2 line-clamp-1 text-sm font-medium">
          {product.product_name}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-[#FE9614] line-through">
            {product.price}
          </span>
          <span className="font-poppins text-lg font-medium text-Black">
            {product?.discount_price?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
