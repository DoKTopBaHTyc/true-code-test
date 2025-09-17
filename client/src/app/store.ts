import { configureStore } from "@reduxjs/toolkit";
import productListParams from "../features/productList/paramsSlice";

export const store = configureStore({
  reducer: {
    productListParams,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
