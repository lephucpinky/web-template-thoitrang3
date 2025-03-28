import { createSlice } from "@reduxjs/toolkit";
import { additionalServiceType } from "@/types/additionalServiceType";

interface ReasonState {
  reasons: additionalServiceType[];
}

const initialState: ReasonState = {
  reasons: [],
};

const reasonSlice = createSlice({
  name: "reason",
  initialState,
  reducers: {
    setReasons: (state, action) => {
      state.reasons = action.payload;
    },
  },
});

export const { setReasons } = reasonSlice.actions;
export default reasonSlice.reducer;
