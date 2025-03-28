import { CategoryFormData } from "@/types/categoryType";
import axiosInstance from "./axiosInstance";

const CustomerId = process.env.NEXT_PUBLIC_CUSTOMER_ID || "67e35f1051499c4e7c0fe803" ;

const APICreateNewCategory = async (data: CategoryFormData) => {
  try {
    const response = await axiosInstance.post(
      `/products/create-new-product-category`,
      data
    );

    if (response.status === 201 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error("Error during create product category:", err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

const APIGetCategoryById = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/products/get-product-category/${id}`
    );

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error("Error during get category by id:", err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

const APIGetCategories = async () => {
  try {
    const response = await axiosInstance.get(
      `/products/get-all-product-categories/${CustomerId}`
    );

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content;
      return {
        data: data,
        status: response.status,
      };
    }

    return null;
  } catch (err) {
    console.error("Error during get all category:", err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

const APIUpdateCategory = async (data: any, id: string) => {
  try {
    const response = await axiosInstance.put(
      `/products/update-product-category/${id}`,
      data
    );

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error("Error during update category:", err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

const APIDeleteCategory = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/products/delete-product-category/${id}`
    );

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error("Error during delete category:", err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

export {
  APICreateNewCategory,
  APIDeleteCategory,
  APIUpdateCategory,
  APIGetCategories,
  APIGetCategoryById,
};
