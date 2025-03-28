"use client"
import TopNavigation from "@/components/Homepage/TopNavigation"
import HotProduct from "@/components/HomepageComponent/HotProduct"
import NewProduct from "@/components/HomepageComponent/NewProduct"
import PriceGoodProduct from "@/components/HomepageComponent/PriceGoodProduct"
import SaleProduct from "@/components/HomepageComponent/SaleProduct"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import HeroBanner from "@/components/banner/Herobanner"
export default function Home() {
  const aboutUs = useSelector((state: RootState) => state.aboutUs.aboutUs)
  console.log("🚀 ~ Home ~ aboutUs:", aboutUs)

  return (
    <>
      <main className="min-h-screen">
        <HeroBanner />
        <TopNavigation />
        <div className="w-full">
          <HotProduct />
          <NewProduct />
          <SaleProduct />
          <PriceGoodProduct />
        </div>
      </main>
    </>
  )
}
