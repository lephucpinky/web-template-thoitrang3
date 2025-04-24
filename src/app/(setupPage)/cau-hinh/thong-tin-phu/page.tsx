"use client"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

const Page = () => {
  const router = useRouter()
  useEffect(() => {
    router.push(`/cau-hinh/thong-tin-phu/ly-do-lua-chon`)
  }, [])
  return <div></div>
}

export default Page
