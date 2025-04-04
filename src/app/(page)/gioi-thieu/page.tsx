"use client"

import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

export default function page() {
  const baseUrlImage = process.env.NEXT_PUBLIC_BASE_URL_IMAGE
  const aboutUs = useSelector((state: RootState) => state.aboutUs.aboutUs)
  console.log("🚀 ~ AboutUs ~ aboutUs:", aboutUs)
  return (
    <section className="container mx-auto min-h-screen">
      <h2 className="text-center text-2xl font-bold">Về chúng tôi</h2>
      <div className="flex items-center">
        <div className="col-span-4">
          <h1 className="mb-4 text-2xl font-bold">Tầm nhìn</h1>
          <span
            className="text-center font-[Nubito]"
            dangerouslySetInnerHTML={{ __html: aboutUs?.description }}
          ></span>
        </div>
      </div>
    </section>
  )
}
