import { BannerType } from "@/types/bannerType"
import { createSlice } from "@reduxjs/toolkit"

// Giá trị mặc định của state
const initialState = {
  banner: <BannerType[]>[
    {
      title: "",
      image_url: [],
      description: "",
      _id: "",
      image_delete: "",
    },
  ],
}

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setBanner: (state, action) => {
      state.banner = action.payload
    },
    clearBanner: (state) => {
      state.banner = initialState.banner
    },
  },
})

export const { setBanner, clearBanner } = bannerSlice.actions

export default bannerSlice.reducer
