
import axiosInstance from './axiosInstance';


const CustomerId = process.env.NEXT_PUBLIC_CUSTOMER_ID;

const APICreateNewContact = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      `/contact-us/create-contact-us/${CustomerId}`,
      data
    );
   

    if (response.status === 201 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error('Error during create contact:', err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};
const APIGetContact = async () => {
  try {
    // const filteredParams = Object.fromEntries(
    //   Object.entries(params).filter(
    //     ([_, value]) => value !== undefined && value !== null
    //   )
    // );
    const response = await axiosInstance.get('/contact-us' );
    console.log(response)
      const data = response.data;
      return data

  } catch (err) {
    console.error('Error during get all contact:', err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};
const APIGetContactById= async (id: string) => {
  try {
    const response = await axiosInstance.get(`/contact-us/${id}`);

    if (response.status === 200 && response.data.code === 200) {
      const data = response.data.content;
      return { data: data, status: response.status };
    }

    return null;
  } catch (err) {
    console.error('Error during get contact by id:', err);
    throw err; // Ném lỗi ra để xử lý ở chỗ gọi hàm
  }
};



export { APICreateNewContact,APIGetContactById, APIGetContact };
