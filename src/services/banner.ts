import axiosInstance from "./axiosInstance"
import { BannerType } from "@/types/bannerType"

const CustomerId = process.env.NEXT_PUBLIC_CUSTOMER_ID

const APICreateNewBanner = async (data: BannerType) => {
  try {
    const response = await axiosInstance.post(
      "/banners/create-new-banner",
      data
    )

    if (response.status === 201 && response.data.code === 200) {
      const data = response.data.content
      return { data: data, status: response.status }
    }

    return null
  } catch (err) {
    console.error("Error during create banner:", err)
    throw err // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
}
const APIGetBanners = async (params: { display_page?: string }) => {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    )

    const response = await axiosInstance.get(
      `/banners/get-all-banner/${CustomerId}`,
      {
        params: filteredParams, // Chỉ gửi các tham số hợp lệ
      }
    )

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content
      return {
        data: data,
        status: response.status,
      }
    }

    return null
  } catch (err) {
    console.error("Error during get all banner:", err)
    throw err // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
}

const APIUpdateBanner = async (data: any, id: string) => {
  try {
    const response = await axiosInstance.put(
      `/banners/update-banner/${id}`,
      data
    )

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content
      return { data: data, status: response.status }
    }

    return null
  } catch (err) {
    console.error("Error during update banner:", err)
    throw err // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
}

export { APICreateNewBanner, APIGetBanners, APIUpdateBanner }
