import axiosInstance from "./axiosInstance"

const CustomerId = process.env.NEXT_PUBLIC_CUSTOMER_ID

const APICreateNewProduct = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      "/products/create-new-product",
      data
    )

    if (response.status === 201 && response.data.code === 200) {
      const data = response.data.content
      return { data: data, status: response.status }
    }

    return null
  } catch (err) {
    console.error("Error during create product:", err)
    throw err // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
}

const APIGetProductById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/products/get-product/${id}`)

    const data = response.data

    return data
  } catch (err) {
    console.error("Error during get product by id:", err)
    throw err // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
}

const APIGetProducts = async (params: {
  page?: number
  limit?: number
  category_id?: string
  priority?: boolean
  price_from?: number
  price_to?: number
  search?: string
}) => {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([value]) => value !== undefined && value !== null
      )
    )

    const response = await axiosInstance.get(
      `/products/get-all-products/${CustomerId}`,
      {
        params: filteredParams, // Chỉ gửi các tham số hợp lệ
      }
    )

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content
      return {
        data: data,
        status: response.status,
        total: response.data.pagination.total,
      }
    }

    return null
  } catch (err) {
    console.error("Error during get all product:", err)
    throw err // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
}

const APIUpdateProduct = async (data: any, id: string) => {
  try {
    const response = await axiosInstance.put(
      `/products/update-product/${id}`,
      data
    )

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content
      return { data: data, status: response.status }
    }

    return null
  } catch (err) {
    console.error("Error during update product:", err)
    throw err // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
}

const APIDeleteProduct = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/products/delete-product/${id}`
    )

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content
      return { data: data, status: response.status }
    }

    return null
  } catch (err) {
    console.error("Error during delete product:", err)
    throw err // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
}

export {
  APICreateNewProduct,
  APIGetProductById,
  APIGetProducts,
  APIUpdateProduct,
  APIDeleteProduct,
}
