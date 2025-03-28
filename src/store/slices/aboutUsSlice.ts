import { AboutUsType } from "@/types/aboutUsType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Giá trị mặc định của state
const initialState = {
  aboutUs: <AboutUsType>{
    _id: "",
    company_name: "",
    logo: "",
    description: "",
    // history: '',
    open_time: "",
    vision: "",
    mission: "",
    address: "",
    phone: "",
    email: "",
    facebook_link: "",
    twitter_link: "",
    instagram_link: "",
    linkedin_link: "",
    map: "",
    images: [],
  },
};

export const aboutUsSlice = createSlice({
  name: "aboutUs",
  initialState,
  reducers: {
    setAboutUs: (state, action) => {
      state.aboutUs = action.payload;
    },
    clearAboutUs: (state) => {
      state.aboutUs = initialState.aboutUs;
    },
  },
});

export const { setAboutUs, clearAboutUs } = aboutUsSlice.actions;

export default aboutUsSlice.reducer;
