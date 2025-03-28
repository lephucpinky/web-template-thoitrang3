import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import modeReducer from "./slices/modeSlice"; // Thêm reducer tại đây
import aboutUsReducer from "./slices/aboutUsSlice";
import bannerReducer from "./slices/bannerSlice";
import authReducer from "./slices/authSlice";
import additionalServiceReducer from "./slices/additionalServiceSlice";
import reviewReducer from "./slices/reviewSlice";
import categoryReducer from "./slices/categorySlice";
import reasonReducer from "./slices/reasonSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    mode: modeReducer,
    aboutUs: aboutUsReducer,
    banner: bannerReducer,
    auth: authReducer,
    additionalService: additionalServiceReducer,
    review: reviewReducer,
    category: categoryReducer,
    reason: reasonReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
