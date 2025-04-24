import { additionalServiceType } from "@/types/additionalServiceType"
import { createSlice } from "@reduxjs/toolkit"

// Giá trị mặc định của state
const initialState = {
  additionalService: <additionalServiceType>{
    service_name: "",
    _id: "",
    description: "",
    image: "",
  },
  isDeleteAdditionalService: false,
}

export const additionalServiceSlice = createSlice({
  name: "additionalService",
  initialState,
  reducers: {
    setAdditionalService: (state, action) => {
      state.additionalService = action.payload
    },
    clearAdditionalService: (state) => {
      state.additionalService = initialState.additionalService
    },
    setIsDeleteAdditionalService: (state, action) => {
      state.isDeleteAdditionalService = action.payload
    },
  },
})

export const {
  setAdditionalService,
  clearAdditionalService,
  setIsDeleteAdditionalService,
} = additionalServiceSlice.actions

export default additionalServiceSlice.reducer
