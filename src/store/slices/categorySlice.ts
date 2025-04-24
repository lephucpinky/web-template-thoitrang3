import { createSlice } from "@reduxjs/toolkit"
import { CategoryFormData } from "@/types/categoryType"
// Giá trị mặc định của state
const initialState = {
  category: <CategoryFormData>{
    category_name: "",
    description: "",
    category_image: "",
    _id: "",
  },
  isDelete: false,
  categories: <CategoryFormData[]>[],
}

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload
    },
    clearCategory: (state) => {
      state.category = initialState.category
    },
    setIsDelete: (state, action) => {
      state.isDelete = action.payload
    },
    clearIsDelete: (state) => {
      state.isDelete = initialState.isDelete
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    clearCategories: (state) => {
      state.categories = initialState.categories
    },
  },
})

export const {
  setCategory,
  clearCategory,
  setIsDelete,
  clearIsDelete,
  setCategories,
  clearCategories,
} = categorySlice.actions

export default categorySlice.reducer
