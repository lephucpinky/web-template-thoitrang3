import Image, { StaticImageData } from "next/image"
import { CardContent, CardFooter } from "@/components/ui/card"
import { useParams, useRouter } from "next/navigation"
import { ProductFormData } from "@/types/productType"
import { useState } from "react"
import { Heart } from "lucide-react"

interface ProductCardProps {
  product: ProductFormData
}

type Product = {
  id: number
  name: string
  price: string
  image: string | StaticImageData
  isFavorite: boolean
}
export default function ProductCard({ product }: ProductCardProps) {
  const [liked, setLiked] = useState(false)
  const params = useParams()
  console.log("🚀 ~ ProductCard ~ product:", product)
  const baseUrlImage = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
  const router = useRouter()

  const handleProductClick = () => {
    window.scrollTo(0, 0)
    if (!product?._id || !product?.product_name) return
    const productName = product.product_name.toLowerCase().replace(/\s+/g, "-") // Chuyển tên sản phẩm thành slug
    router.push(`/san-pham/${productName}?id=${product._id}`)
  }
  return (
    <div className="overflow-hidden rounded-md">
      <CardContent className="p-2">
        <div className="relative aspect-[90%] overflow-hidden">
          <Image
            src={(baseUrlImage + product?.images[0]) as string}
            alt={product?.product_name}
            width={206}
            height={264}
            className="object-cover transition-transform hover:scale-105"
          />
          <button
            className="absolute -right-1 bottom-2 rounded-full p-2 backdrop-blur-sm lg:right-0"
            onClick={() => setLiked(!liked)}
          >
            <Heart
              className={`h-5 w-5 transition-all duration-300 ${liked ? "scale-110 fill-red-500 text-red-500" : "text-gray-500"}`}
            />
          </button>
        </div>
      </CardContent>
      <CardFooter
        key={product?._id}
        onClick={handleProductClick}
        className="flex flex-col items-start gap-1 p-3 hover:cursor-pointer"
      >
        <h3 className="line-clamp-2 text-sm font-medium text-black">
          {product?.product_name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="font-poppins text-lg font-medium text-[#B4282B]">
            {product?.price?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
      </CardFooter>
    </div>
  )
}

export function ProductCardSmall({ product }: ProductCardProps) {
  const baseUrlImage = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
  return (
    <div className="group">
      <div className="relative mb-1 aspect-square overflow-hidden rounded-md">
        <Image
          src={(baseUrlImage + product?.images[0]) as string}
          alt={product.product_name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="truncate text-xs font-medium text-gray-800">
        {product.product_name}
      </h3>
      <p className="text-xs font-medium text-orange-500">{product.price}</p>
    </div>
  )
}
