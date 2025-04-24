"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { setMode } from "@/store/slices/modeSlice"
import { clearBanner } from "@/store/slices/bannerSlice"
import { useRouter, usePathname } from "next/navigation"

// Danh sách các trang
const pages = [
  { key: "danh-muc", label: "Danh mục" },
  { key: "san-pham", label: "Sản phẩm" },
]

export default function ConfigLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() // Lấy đường dẫn hiện tại
  const router = useRouter()
  const dispatch = useDispatch()

  // Xác định trang active dựa vào URL
  const activePage =
    pages.find((page) => pathname.includes(page.key))?.key || "danh-muc"

  const handlePageChange = (pageKey: string) => {
    dispatch(clearBanner())
    dispatch(setMode({ mode: "create" }))
    router.push(`/cau-hinh/san-pham/${pageKey}`)
  }

  return (
    <div className="bg-white w-full rounded-b-sm p-4">
      {/* Navigation Buttons */}
      <div className="mb-6 flex">
        {pages.map((page) => (
          <Button
            key={page.key}
            onClick={() => handlePageChange(page.key)}
            className={`w-32 shadow-none hover:shadow-sm ${
              activePage === page.key
                ? "bg-Charcoal font-bold text-White hover:bg-Charcoal hover:shadow-md hover:shadow-DarkJungleGreen"
                : "bg-White text-Black hover:bg-White hover:shadow-md hover:shadow-DarkJungleGreen"
            }`}
          >
            {page.label}
          </Button>
        ))}
      </div>
      <div>{children}</div>
    </div>
  )
}
