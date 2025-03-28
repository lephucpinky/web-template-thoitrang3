"use client"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import "leaflet/dist/leaflet.css"
import "../../globals.css"
import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { APIRefreshToken } from "@/services/auth"
import { useRouter, usePathname } from "next/navigation"
import { APIGetAboutUs } from "@/services/aboutUs"
import { setAboutUs } from "@/store/slices/aboutUsSlice"
import { Provider, useDispatch, useSelector } from "react-redux"
import { setTokenDecode } from "@/store/slices/authSlice"
import { RootState, store } from "@/store/store"
import { setMode } from "@/store/slices/modeSlice"
import { AppSidebar } from "@/components/sideBar/app-sidebar"

export default function ConfigLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const dispatch = useDispatch()
  const tokenDecode = useSelector((state: RootState) => state.auth.tokenDecode)
  const mode = useSelector((state: RootState) => state.mode.modeInfo.mode)
  const pathname = usePathname()

  useEffect(() => {
    dispatch(setMode({ mode: "create" }))
  }, [pathname])

  const handleGetAboutUs = async () => {
    try {
      const response = await APIGetAboutUs(tokenDecode.id)
      if (response?.status === 200) {
        dispatch(setAboutUs(response.data))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const access_token = localStorage.getItem("access_token")
    const refresh_token = localStorage.getItem("refresh_token")
    const expires_at = localStorage.getItem("expires_at")
    const refresh_token_expires_in = localStorage.getItem(
      "refresh_token_expires_in"
    )
    if (
      access_token &&
      refresh_token &&
      refresh_token_expires_in &&
      expires_at
    ) {
      if (
        new Date().getTime() > Number(expires_at) &&
        new Date().getTime() < Number(refresh_token_expires_in)
      ) {
        const handleGetNewToken = async () => {
          const data = {
            refresh_token: refresh_token,
          }
          const newToken = await APIRefreshToken(data)
          if (newToken?.data.code === 200) {
            const data = newToken?.data?.content
            localStorage.setItem("access_token", data.access_token)
            localStorage.setItem("refresh_token", data.refresh_token)
            localStorage.setItem(
              "expires_at",
              (Date.now() + data.exp_token * 1000).toString()
            ) // Thời gian hết hạn
            localStorage.setItem(
              "refresh_token_expires_in",
              (Date.now() + data.exp_refresh_token * 1000).toString()
            ) // Thời gian hết hạn
            const decoded = jwtDecode(data.access_token as string)
            dispatch(setTokenDecode(decoded))
          }
        }
        handleGetNewToken()
      } else {
        const decoded = jwtDecode(access_token as string)
        dispatch(setTokenDecode(decoded))
        handleGetAboutUs()
      }
    }
  }, [tokenDecode.id])
  return (
    <div id="config-layout" className="bg-White">
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset className="bg-White">
          <div className="bg-White relative">
            <header className="bg-White sticky top-0 z-50 flex h-16 w-full shrink-0 items-center gap-2 ease-linear">
              <div className="flex w-full items-center gap-2 px-4">
                <SidebarTrigger className="" />

                {/* <Separator
                      orientation="vertical"
                      className="mr-2 h-4 bg-PersianRed"
                    /> */}
                <text className="bg-White text-PersianRed z-50 w-full text-center font-sans text-[16px] font-bold md:text-[18px] lg:text-[20px]">
                  CẤU HÌNH TRANG WEB
                </text>
              </div>
            </header>

            <hr />

            <div className="bg-White h-full w-full p-3">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
