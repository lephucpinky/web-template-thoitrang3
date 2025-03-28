// import Image, { StaticImageData } from "next/image"

// import { ProductFormData } from "@/types/productType"
// import { useRouter } from "next/navigation"
// import { Card } from "../ui/card"
// import ProductCard from "./ProductCard"
// import { useEffect, useState } from "react"
// import { APIGetProducts } from "@/services/product"
// interface ProductCardProps {
//   product: ProductFormData
// }
// type Product = {
//   id: number
//   name: string
//   price: string
//   image: string | StaticImageData
//   isFavorite: boolean
// }

// export default function ProductGrid() {
//   const [product, setProduct] = useState([])
//   const [filterForm, setFilterForm] = useState<any>({
//     page: 1,
//     limit: 10000,
//     priority: true,
//   })
//   const handleGetProductList = async () => {
//     try {
//       const response = await APIGetProducts(filterForm)
//       if (response?.status === 200) {
//         const data = response?.data.map((item: any, index: number) => ({
//           ...item,
//           category_name: item.category_id?.category_name,
//         }))
//         setProduct(data)
//       }
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   useEffect(() => {
//     handleGetProductList()
//   }, [])
//   return (
//     <Card className="flex-1">
//       <div className="mb-4 flex items-center justify-between">
//         <div className="text-sm text-gray-500">Có 258 sản phẩm</div>
//         <button className="flex items-center gap-1 rounded border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50">
//           Sắp xếp theo <ChevronDown size={14} />
//         </button>
//       </div>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {product.map((item: ProductFormData) => (
//           <ProductCard product={item} key={item._id} />
//         ))}
//       </div>

//       <div className="mt-8 flex justify-center gap-1">
//         <PaginationButton number={1} active />
//         <PaginationButton number={2} />
//         <PaginationButton number={3} />
//         <PaginationButton number={4} />
//         <PaginationButton number={5} />
//       </div>
//     </Card>
//   )
// }

// function PaginationButton({
//   number,
//   active = false,
// }: {
//   number: number
//   active?: boolean
// }) {
//   return (
//     <button
//       className={`flex h-8 w-8 items-center justify-center border text-sm ${
//         active
//           ? "border-red-500 text-red-500"
//           : "border-gray-300 text-gray-700 hover:border-gray-500"
//       }`}
//     >
//       {number}
//     </button>
//   )
// }

// function ChevronDown({ size = 24, className = "" }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//     >
//       <polyline points="6 9 12 15 18 9"></polyline>
//     </svg>
//   )
// }
