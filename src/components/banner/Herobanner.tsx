import Image from "next/image"
import { APIGetBanners } from "@/services/banner"
import { useDispatch } from "react-redux"
import { setBanner } from "@/store/slices/bannerSlice"
import { useEffect } from "react"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
export default function HeroBanner() {
  const banner = useSelector((state: RootState) => state.banner.banner)
  const baseUrlImage = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
  const dispatch = useDispatch()
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
    handleGetBanner()
  }, [])

  return (
    <section className="px-4">
      <div className="h-[200px] overflow-hidden md:h-[400px] lg:h-[600px]">
        {banner[0]?.image_url[0] && (
          <Image
            src={baseUrlImage + banner[0]?.image_url[0]}
            alt="Model wearing gray jacket"
            width={1500}
            height={800}
            className="object-cover"
            priority
          />
        )}
      </div>
    </section>
  )
}
