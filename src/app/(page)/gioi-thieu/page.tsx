"use client"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
  const baseUrlImage = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
  const aboutUs = useSelector((state: RootState) => state.aboutUs.aboutUs)
  console.log("🚀 ~ AboutUs ~ aboutUs:", aboutUs)
  return (
    <section className="container mx-auto min-h-screen py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link href="/" className="hover:underline">
          Trang chủ
        </Link>
        <span>/</span>
        <Link href="/gioi-thieu" className="hover:underline">
          Giới thiệu
        </Link>
      </div>
      <h2 className="text-center text-2xl font-bold">Về chúng tôi</h2>

      {/* Vision Section */}
      <div className="mb-24 flex flex-col items-start justify-between gap-12 md:flex-row md:space-x-16 lg:space-x-24">
        <div className="order-2 w-full pt-8 md:order-1 md:w-1/2">
          <h2 className="mb-4 text-2xl font-bold">Tầm nhìn</h2>
          <p
            className="font-[Nubito] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: aboutUs?.vision }}
          ></p>
        </div>
        <div className="relative order-1 w-full md:order-2 md:w-1/2">
          <div className="relative flex flex-col items-center justify-between gap-20">
            <div className="relative mx-auto flex aspect-[3/4] w-full flex-col items-center justify-end rounded-t-full bg-[#FE9614] md:w-2/3">
              <div className="relative h-2/3 w-[70%]">
                <Image
                  src={
                    baseUrlImage && aboutUs?.images?.[0]
                      ? `${baseUrlImage.replace(/\/$/, "")}/${aboutUs.images[0].replace(/^\//, "")}`
                      : "/placeholder.jpg"
                  }
                  alt="Vision image"
                  fill
                  className="object-fill"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
        <div className="relative mx-auto flex aspect-[3/4] w-full flex-col items-center justify-end rounded-t-full bg-[#FE9614] md:w-[30%]">
          <div className="relative h-2/3 w-[70%]">
            <Image
              src={
                baseUrlImage && aboutUs?.images?.[1]
                  ? `${baseUrlImage.replace(/\/$/, "")}/${aboutUs.images[1].replace(/^\//, "")}`
                  : "/placeholder.jpg"
              }
              alt="Mission image"
              fill
              className="object-fill"
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <h2 className="mb-4 text-2xl font-bold">Sứ mệnh</h2>
          <p
            className="font-[Nubito] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: aboutUs?.mission }}
          ></p>
        </div>
      </div>
    </section>
  )
}
