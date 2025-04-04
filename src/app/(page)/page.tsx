"use client"
import TopNavigation from "@/components/Homepage/TopNavigation"
import HotProduct from "@/components/HomepageComponent/HotProduct"
import NewProduct from "@/components/HomepageComponent/NewProduct"
import PriceGoodProduct from "@/components/HomepageComponent/PriceGoodProduct"
import SaleProduct from "@/components/HomepageComponent/SaleProduct"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import HeroBanner from "@/components/banner/Herobanner"
import { ProductFormData } from "@/types/productType"
export default function Home() {
  const aboutUs = useSelector((state: RootState) => state.aboutUs.aboutUs)
  console.log("🚀 ~ Home ~ aboutUs:", aboutUs)

  interface ProductCardProps {
    product: ProductFormData
  }
  return (
    <>
      <main className="min-h-screen">
        <div className="bg-[#FFFAF0]">
          <HeroBanner />
        </div>

        <TopNavigation />
        <div className="w-full">
          <div className="bg-[#FFFAF0]">
            <HotProduct />
          </div>
          <NewProduct />
          <SaleProduct />
          <PriceGoodProduct />
        </div>
      </main>
    </>
  )
}
