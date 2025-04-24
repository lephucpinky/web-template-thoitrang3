import { reviewType } from "@/types/reviewType"
import { createSlice } from "@reduxjs/toolkit"

// Giá trị mặc định của state
const initialState = {
  review: <reviewType>{
    _id: "",
    customerName: "",
    comment: "",
    rating: "",
    avatar: "",
  },
  isDeleteReview: false,
  reviews: <reviewType[]>[],
}

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReview: (state, action) => {
      state.review = action.payload
    },
    clearReview: (state) => {
      state.review = initialState.review
    },
    setIsDeleteReview: (state, action) => {
      state.isDeleteReview = action.payload
    },
    setReviews: (state, action) => {
      state.reviews = action.payload
    },
  },
})

export const { setReview, clearReview, setIsDeleteReview, setReviews } =
  reviewSlice.actions

export default reviewSlice.reducer
