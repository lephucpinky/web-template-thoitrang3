import { ProductFormData } from "@/types/productType"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

interface ProductCardProps {
  product: ProductFormData
}

export default function ProductGrid({ product }: ProductCardProps) {
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
    <div>
      <div className="min-h-screen bg-[#FFFAF0]">
        <div className="px-4 py-8">
          {/* Product grid */}
          <div>
            {/*item*/}
            <div className="h-[210px] w-[264px] rounded-lg shadow-sm">
              <div className="relative h-[210px] w-[264px]">
                <Image
                  src={(baseUrlImage + product?.images[0]) as string}
                  alt={product?.product_name}
                  fill
                  className="object-cover"
                />

                <button
                  key={product?._id}
                  onClick={handleProductClick}
                  className="absolute bottom-0 p-4"
                >
                  <h3 className="text-gray-700 mb-2 text-xl font-medium">
                    {product?.product_name}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-amber-500 text-xl font-bold">
                      {product?.discount_price}
                    </span>
                    <span className="text-gray-500 ml-2 line-through">
                      {product?.price?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
