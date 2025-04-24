import { createSlice } from "@reduxjs/toolkit"

// Giá trị mặc định của state
const initialState = {
  product: <any>{
    product_name: "",
    images: [],
    _id: "",
    sub_title: "",
    description: "",
    image_delete: [],
  },
  setIsDeleteProduct: false,
}

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload
    },
    clearProduct: (state) => {
      state.product = initialState.product
    },
    setIsDeleteProduct: (state, action) => {
      state.setIsDeleteProduct = action.payload
    },
  },
})

export const { setProduct, clearProduct, setIsDeleteProduct } =
  productSlice.actions

export default productSlice.reducer
