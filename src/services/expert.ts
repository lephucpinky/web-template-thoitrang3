import axiosInstance from "./axiosInstance"

const CustomerId = process.env.NEXT_PUBLIC_CUSTOMER_ID

const APICreateNewExpert = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      "/experts/create-new-expert",
      data
    )

    if (response.status === 201 && response.data.code === 200) {
      const data = response.data.content
      return { data: data, status: response.status }
    }

    return null
  } catch (err) {
    console.error("Error during create expert:", err)
    throw err // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
}

const APIGetExpertById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/experts/${id}`)

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content
      return { data: data, status: response.status }
    }

    return null
  } catch (err) {
    console.error("Error during get expert by id:", err)
    throw err // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
}

const APIGetExpert = async () => {
  try {
    const response = await axiosInstance.get(
      `/experts/get-all-experts/${CustomerId}`
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
    console.error("Error during get all expert:", err)
    throw err // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
}

const APIUpdateExpert = async (data: any, id: string) => {
  try {
    const response = await axiosInstance.put(`/experts/update/${id}`, data)
    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content
      return { data: data, status: response.status }
    }

    return null
  } catch (err) {
    console.error("Error during update expert:", err)
    throw err // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
}

const APIDeleteExpert = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/experts/delete/${id}`)

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content
      return { data: data, status: response.status }
    }

    return null
  } catch (err) {
    console.error("Error during delete expert:", err)
    throw err // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
}

export {
  APICreateNewExpert,
  APIDeleteExpert,
  APIGetExpertById,
  APIGetExpert,
  APIUpdateExpert,
}
