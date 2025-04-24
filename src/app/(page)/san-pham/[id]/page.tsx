"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { ProductDetailType, ProductFormData } from "@/types/productType"
import { useEffect, useState } from "react"
import { APIGetProductById, APIGetProducts } from "@/services/product"
import { reviewType } from "@/types/reviewType"
import { APIGetReview } from "@/services/review"
import { useDispatch } from "react-redux"
import { setReviews } from "@/store/slices/reviewSlice"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { ProductCardSmall } from "@/components/product/ProductCard"

interface GroupedClassifications {
  [key: string]: string[]
}

const getGroupedClassifications = (classifications: any[]) => {
  const grouped: GroupedClassifications = {}

  classifications.forEach((item) => {
    item.classifications.forEach((classification: any) => {
      const { classification_name, classification_value } = classification

      if (!grouped[classification_name]) {
        grouped[classification_name] = []
      }

      if (!grouped[classification_name].includes(classification_value)) {
        grouped[classification_name].push(classification_value)
      }
    })
  })

  return grouped
}

export default function ProductPage() {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const [product, setProduct] = useState<ProductDetailType>()
  console.log("🚀 ~ ProductDetail ~ product:", product)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
  const [imageSelected, setImageSelected] = useState<string>("")
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string
  }>({})
  const [selectedClassification, setSelectedClassification] =
    useState<any>(null)
  const [filterForm, setFilterForm] = useState({
    page: 1,
    limit: 10000,
    priority: true,
  })
  const preview = useSelector((state: RootState) => state.review.reviews)
  const baseUrlImage = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
  const [productList, setProductList] = useState<ProductFormData[]>([])

  const handleGetProductDetail = async (id: string) => {
    const response = await APIGetProductById(id as string)
    if (response?.code === 200) {
      setProduct(response.content)
      setImageSelected(response.content.images[0])
    }
  }

  useEffect(() => {
    if (id) {
      handleGetProductDetail(id)
    }
  }, [id])
  useEffect(() => {
    if (product?.classification && Object.keys(selectedOptions).length > 0) {
      const selected = product.classification.find((item) =>
        item.classifications.every(
          (c) =>
            selectedOptions[c.classification_name] === c.classification_value
        )
      )
      setSelectedClassification(selected)
    }
  }, [selectedOptions, product])
  console.log("🚀 ~ ProductDetail ~ selectedOptions:", selectedOptions)
  const handleClassificationChange = (name: string, value: string) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [name]: value,
    }
    setSelectedOptions(newSelectedOptions)

    if (product?.classification) {
      const matchedClassification = product.classification.find((item) =>
        item.classifications.every(
          (c) =>
            newSelectedOptions[c.classification_name] === c.classification_value
        )
      )

      if (matchedClassification) {
        console.log("Matched classification:", matchedClassification)
        setSelectedClassification(matchedClassification)
        if (matchedClassification.images) {
          setImageSelected(matchedClassification.images)
        }
      }
    }
  }
  const renderClassifications = () => {
    if (!product?.classification) return null

    const groupedClassifications = getGroupedClassifications(
      product.classification
    )

    return Object.entries(groupedClassifications).map(([name, values]) => {
      console.log("🚀 ~ returnObject.entries ~ name:", name)
      console.log("🚀 ~ returnObject.entries ~ values:", values)
      console.log(
        "🚀 ~ returnObject.entries ~ values:",
        selectedOptions[name] === values[0]
      )
      return (
        <div key={name} className="my-4 flex items-center justify-start gap-3">
          <h3 className="flex items-center font-medium">{name}:</h3>
          <div className="flex flex-wrap gap-2">
            {values.map((value) => (
              <button
                key={value}
                onClick={() => handleClassificationChange(name, value)}
                className={`rounded border px-4 py-2 text-xs transition-all ${
                  selectedOptions[name] === value
                    ? "bg-Charcoal text-White"
                    : "border-DarkSilver/20 hover:border-primary"
                } `}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )
    })
  }
  const renderSelectedInfo = () => {
    if (!selectedClassification) {
      return (
        <div className="text-2xl font-medium">
          {product?.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>
      )
    }

    return (
      <div>
        <div className="text-2xl font-medium">
          {selectedClassification.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </div>
        <div className="mt-2 space-y-1">
          <div className="text-sm text-muted-foreground">
            Còn lại: {selectedClassification.remaining} sản phẩm
          </div>
          {selectedClassification.sold > 0 && (
            <div className="text-sm text-muted-foreground">
              Đã bán: {selectedClassification.sold}
            </div>
          )}
        </div>
        <div className="mt-3 text-sm">
          Phân loại đã chọn:{" "}
          {selectedClassification.classifications.map((c: any) => (
            <span
              key={c.classification_name}
              className="text-primary hover:bg-DarkSilver/50"
            >
              {c.classification_name}: {c.classification_value}{" "}
            </span>
          ))}
        </div>
      </div>
    )
  }
  const handleGetProductList = async () => {
    try {
      const newFilterForm = {
        ...filterForm,
        category_id: product?.category_id?._id,
      }
      const response = await APIGetProducts(newFilterForm)
      if (response?.status === 200) {
        setProductList(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleGetPreviewList = async () => {
    try {
      const response = await APIGetReview()
      if (response?.status === 200) {
        dispatch(setReviews(response?.data))
      }
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    handleGetProductList()
  }, [filterForm])
  useEffect(() => {
    handleGetProductList()
    handleGetPreviewList()
  }, [])

  return (
    <div className="container mx-auto bg-White px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link href="/" className="hover:underline">
          Trang chủ
        </Link>
        <span>/</span>
        <Link href="/san-pham" className="hover:underline">
          Sản phẩm
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {baseUrl && product?.images && product?.images.length > 0 && (
          <div className="relative">
            {/* Thumbnails */}
            <div className="absolute left-0 top-0 flex w-20 flex-col gap-2">
              {product?.images.map((item, i) => (
                <button
                  key={i}
                  className={`${imageSelected === item ? "cursor-pointer border hover:border-JasperOrange" : ""}`}
                  onClick={() => setImageSelected(item)}
                >
                  <Image
                    src={baseUrl + item}
                    alt={`Thumbnail ${i + 1}`}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative ml-24 h-[500px] w-auto">
              <button className="absolute left-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-White/80 p-2 shadow-md">
                <span className="sr-only">Previous</span>
                &lt;
              </button>
              <Image
                src={baseUrl + imageSelected}
                alt="Product main image"
                fill
                className="object-contain"
              />
              <button className="absolute right-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-White/80 p-2 shadow-md">
                <span className="sr-only">Next</span>
                &gt;
              </button>
            </div>
          </div>
        )}

        {/* Product Details */}
        <div>
          <h1 className="mb-8 text-2xl font-medium">{product?.product_name}</h1>
          {renderSelectedInfo()}
          <div className="mb-4">{renderClassifications()}</div>

          <div className="mb-6 flex items-center gap-4">
            <div className="my-6 flex border">
              <button className="border-r px-3 py-2">
                <Minus size={16} />
              </button>
              <input
                type="text"
                value="1"
                className="w-12 text-center"
                readOnly
              />
              <button className="border-l px-3 py-2">
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="mb-6 flex gap-4">
            <Button className="rounded bg-[#FE9614] px-8 py-2 text-White hover:bg-[#FE9614]/60">
              MUA NGAY
            </Button>
          </div>
        </div>
      </div>

      {/* Service Highlights */}
      <div className="mt-8 rounded-lg bg-[#F9F9F9] p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {preview?.map((item: reviewType, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="relative h-[40px] w-[40px] p-3">
                <Image
                  src={`${baseUrlImage}${item.avatar}`}
                  alt={item.customerName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold">{item.customerName}</h3>
                <p className="text-xs">{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-8">
        <div className="border-b">
          <div className="flex">
            <button className="border-b-2 border-Black px-6 py-3 font-medium">
              MÔ TẢ SẢN PHẨM
            </button>
          </div>
        </div>
        <div className="py-6 text-sm">
          <ul className="list-disc space-y-2 pl-5">
            <p
              className="ql-content"
              dangerouslySetInnerHTML={{
                __html: product?.description || "",
              }}
            ></p>
          </ul>
        </div>

        <div className="mt-6 flex justify-center pb-5">
          <Button className="bg-[#1C5B41] px-8 font-[Montserrat] text-White hover:bg-[#1C5B41]">
            Xem thêm
          </Button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-playfair mb-8 text-center text-2xl font-semibold">
          Gợi ý cho bạn
        </h2>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productList.slice(0, 4).map((product) => (
            <ProductCardSmall key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
