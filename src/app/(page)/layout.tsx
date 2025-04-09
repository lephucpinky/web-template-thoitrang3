"use client"
import { RootState } from "@/store/store"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useDispatch } from "react-redux"
import { usePathname, useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { APIGetBanners } from "@/services/banner"
import { setBanner } from "@/store/slices/bannerSlice"
import { useEffect } from "react"
import { APIGetAboutUs } from "@/services/aboutUs"
import { setAboutUs } from "@/store/slices/aboutUsSlice"
import { Search } from "lucide-react"
import phone from "../../assets/icons/SVG.png"
import Image from "next/image"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const dispatch = useDispatch()
  const customerId = process.env.NEXT_PUBLIC_CUSTOMER_ID
  const router = useRouter()
  const pathname = usePathname()
  const aboutUs = useSelector((state: RootState) => state.aboutUs.aboutUs)
  console.log("🚀 ~ aboutUs:", aboutUs)
  const handleGetAboutUs = async () => {
    try {
      const response = await APIGetAboutUs(customerId as string)
      if (response?.status === 200) {
        dispatch(setAboutUs(response.data))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleGetBanner = async () => {
    try {
      const response = await APIGetBanners({ display_page: "home" })
      if (response?.status === 200) {
        dispatch(setBanner(response?.data))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (customerId && !aboutUs._id) {
      handleGetAboutUs()
      handleGetBanner()
    }
  }, [customerId, pathname, aboutUs])
  return (
    <main>
      <Header />
      <div className="mx-auto hidden items-center justify-between bg-[#F7EDD9] px-4 py-3 lg:flex">
        <div className="flex-1"></div>

        {/* Search Bar */}
        <div className="relative max-w-xl flex-1">
          <div className="flex overflow-hidden rounded-3xl border">
            <div className="border-r-DarkSilver/ bg-White px-3 py-2 text-sm">
              <span>Tất cả</span>
              <span className="ml-1 text-DarkSilver/50">▼</span>
            </div>
            <input
              type="text"
              placeholder="Tìm sản phẩm bạn mong muốn"
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button className="bg-[#FE9614] px-4 py-2 text-Black">
              <Search size={18} color="White" fontWeight={700} />
            </button>
          </div>
        </div>

        {/* Hotline */}
        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center gap-2 border-l-2 border-l-[#1C5B41] pl-6">
            <Image src={phone} alt="#" width={20} height={20} />

            <span className="font-medium text-[#1C5B41]">
              Hotline: {aboutUs.phone}
            </span>
          </div>
        </div>
      </div>
      {children}
      <Footer />
    </main>
  )
}
