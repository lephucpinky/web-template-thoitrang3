"use client"
import AlertError from "@/components/alert/AlertError"
import AlertSuccess from "@/components/alert/AlertSuccess"
import Loading from "@/components/loading/loading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { APILoginAdmin, APIRefreshToken } from "@/services/auth"
import { APIGetAboutUs } from "@/services/aboutUs"
import { useDispatch, useSelector } from "react-redux"
import { setAboutUs } from "@/store/slices/aboutUsSlice"
import { setTokenDecode } from "@/store/slices/authSlice"
import { RootState } from "@/store/store"

const page = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  const [showAlertError, setShowAlertError] = useState(false)
  const [alertDescription, setAlertDescription] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const tokenDecode = useSelector((state: RootState) => state.auth.tokenDecode)

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
            router.push("/cau-hinh/thong-tin-cua-hang")
          }
        }
        handleGetNewToken()
      } else {
        const decoded = jwtDecode(access_token as string)
        dispatch(setTokenDecode(decoded))
        handleGetAboutUs()
      }
    } else {
      // router.push('/');
    }
  }, [])

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

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true)
    const response = await APILoginAdmin(username, password)
    if (response?.code === 200) {
      localStorage.setItem("access_token", response?.content?.access_token)
      localStorage.setItem("refresh_token", response?.content?.refresh_token)
      localStorage.setItem(
        "expires_at",
        (Date.now() + response?.content?.exp_token * 1000).toString()
      ) // Thời gian hết hạn
      localStorage.setItem(
        "refresh_token_expires_in",
        (Date.now() + response?.content?.exp_refresh_token * 1000).toString()
      ) // Thời gian hết hạn
      setAlertDescription("Đăng nhập thành công")
      setShowAlertSuccess(true)

      setTimeout(() => {
        setShowAlertSuccess(false)
      }, 3000)
      setIsLoading(false)
      router.push("/cau-hinh/thong-tin-cua-hang")
    } else {
      setAlertDescription(response?.message)
      setShowAlertError(true)
      setIsLoading(false)
      setTimeout(() => {
        setShowAlertError(false)
      }, 3000)
    }
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[url(/images/bg_login.png)] bg-cover bg-center bg-no-repeat font-sans sm:items-center md:items-center lg:items-end lg:px-8">
      <div className="flex h-2/3 w-5/6 items-center sm:w-5/6 sm:items-center md:w-1/2 md:items-center lg:ml-auto lg:w-1/3">
        {/* Form nằm bên phải */}
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-l-lg bg-White bg-opacity-90 p-8 shadow-lg">
          <div className="flex w-full flex-row justify-center gap-4">
            <img src="/images/logo_minvoice.png" alt="Logo" className="h-20" />
            {/* <text className="text-[24px] font-bold text-black ">M-invoice</text> */}
          </div>
          <div>
            <p className="text-[24px] font-bold text-Charcoal">
              Hệ thống quản lý
            </p>
          </div>
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex w-full flex-row gap-3">
              <text className="text-[20px] font-semibold text-Black">
                Xin chào
              </text>
              {/* <img src="/icons/ic_hi.png" className="h-5 w-5" /> */}
            </div>
            <text className="text-[10px] font-light italic text-Black opacity-30">
              Vui lòng đăng nhập tại đây!
            </text>
          </div>
          <div className="w-full space-y-4">
            <Input
              name="username"
              type="text"
              placeholder="Tên đăng nhập"
              className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-Charcoal"
              onChange={handleInputChange}
            />
            <div className="relative w-full">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-Charcoal"
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800 absolute inset-y-0 right-3 flex w-5 items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <img src="/icons/ic_show.png" />
                ) : (
                  <img src="/icons/ic_hide.png" />
                )}
              </button>
            </div>
            <Button
              className="w-full rounded-md bg-Charcoal p-2 font-sans font-bold text-White hover:bg-Charcoal hover:shadow-md hover:shadow-DarkSilver"
              onClick={() => handleLogin(formData.username, formData.password)}
            >
              {isLoading ? <Loading /> : "Đăng nhập"}
            </Button>
          </div>
        </div>
      </div>
      {showAlertSuccess && <AlertSuccess description={alertDescription} />}
      {showAlertError && <AlertError description={alertDescription} />}{" "}
    </div>
  )
}

export default page
