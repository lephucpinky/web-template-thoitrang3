import axiosInstance from './axiosInstance';

const CustomerId = process.env.NEXT_PUBLIC_CUSTOMER_ID;

const APICreateNewAdditionalServices = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      '/additional-services/create-additional-service',
      data
    );

    if (response.status === 201 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error('Error during create Additional Services:', err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

const APIGetAdditionalServicesById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/additional-services/${id}`);

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error('Error during get Additional Services by id:', err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

const APIGetAdditionalServices = async () => {
  try {
    const response = await axiosInstance.get(
      `/additional-services/get-all/${CustomerId}`
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
    console.error('Error during get all Additional Services:', err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

const APIUpdateAdditionalServices = async (data: any, id: string) => {
  try {
    const response = await axiosInstance.put(
      `/additional-services/update-additional-service/${id}`,
      data
    );
    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error('Error during update Additional Services:', err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

const APIDeleteAdditionalServices = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/additional-services/delete-additional-service/${id}`
    );

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error('Error during delete Additional Services:', err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};

export {
  APICreateNewAdditionalServices,
  APIDeleteAdditionalServices,
  APIGetAdditionalServicesById,
  APIGetAdditionalServices,
  APIUpdateAdditionalServices,
};
