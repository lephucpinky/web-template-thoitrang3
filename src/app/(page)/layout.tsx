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
      <div className="container mx-auto hidden items-center justify-between px-4 py-3 lg:flex">
        <div className="flex-1"></div>

        {/* Search Bar */}
        <div className="relative max-w-xl flex-1">
          <div className="flex overflow-hidden rounded-3xl border">
            <div className="border-r-gray-300 bg-white px-3 py-2 text-sm">
              <span>Tất cả</span>
              <span className="ml-1 text-gray-500">▼</span>
            </div>
            <input
              type="text"
              placeholder="Tìm sản phẩm bạn mong muốn"
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button className="bg-orange-500 px-4 py-2 text-white">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Hotline */}
        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center text-green-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="font-medium">{aboutUs.phone}</span>
          </div>
        </div>
      </div>
      {children}
      <Footer />
    </main>
  )
}
