import { configureStore } from "@reduxjs/toolkit";
import productListParams from "../features/productList/paramsSlice";

export const store = configureStore({
  reducer: {
    productListParams,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
