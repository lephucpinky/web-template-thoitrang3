import axiosInstance from './axiosInstance';

const CustomerId = process.env.NEXT_PUBLIC_CUSTOMER_ID;

const APICreateNewReview = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      '/reviews/create-new-review',
      data
    );

    if (response.status === 201 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error('Error during create review:', err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

const APIGetReviewById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/reviews/${id}`);

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error('Error during get review by id:', err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

const APIGetReview = async () => {
  try {
    const response = await axiosInstance.get(
      `/reviews/get-all-reviews/${CustomerId}`
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
    console.error('Error during get all review:', err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

const APIUpdateReview = async (data: any, id: string) => {
  try {
    const response = await axiosInstance.put(`/reviews/update/${id}`, data);
    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error('Error during update review:', err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

const APIDeleteReview = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/reviews/delete/${id}`);

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error('Error during delete review:', err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

export {
  APICreateNewReview,
  APIDeleteReview,
  APIGetReviewById,
  APIGetReview,
  APIUpdateReview,
};
