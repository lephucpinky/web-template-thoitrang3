"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { setMode } from "@/store/slices/modeSlice"
import { clearBanner } from "@/store/slices/bannerSlice"
import { useRouter, usePathname } from "next/navigation"

// Danh sách các trang
const pages = [
  { key: "ly-do-lua-chon", label: "Lý do lựa chọn" },
  { key: "cam-ket", label: "Cam kết" },
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
    pages.find((page) => pathname.includes(page.key))?.key || "ly-do-lua-chon"

  const handlePageChange = (pageKey: string) => {
    dispatch(clearBanner())
    dispatch(setMode({ mode: "create" }))
    router.push(`/cau-hinh/thong-tin-phu/${pageKey}`)
  }

  return (
    <div className="w-full rounded-b-sm bg-white p-4">
      {/* Navigation Buttons */}
      <div className="mb-6 flex">
        {pages.map((page) => (
          <Button
            key={page.key}
            onClick={() => handlePageChange(page.key)}
            className={`w-32 shadow-none hover:shadow-sm ${
              activePage === page.key
                ? "hover:shadow-DarkJungleGreen bg-Charcoal text-White hover:bg-Charcoal font-bold hover:shadow-md"
                : "hover:shadow-DarkJungleGreen bg-White text-Black hover:bg-White hover:shadow-md"
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
