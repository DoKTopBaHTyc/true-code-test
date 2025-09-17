import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ListParams = {
  page: number;
  limit: number;
  q: string;
  sortBy: "title" | "price" | "discountedPrice" | "sku";
  order: "asc" | "desc";
};

const initialState: ListParams = {
  page: 1,
  limit: 10,
  q: "",
  sortBy: "title",
  order: "asc",
};

const paramsSlice = createSlice({
  name: "productListParams",
  initialState,
  reducers: {
    setParams(state, action: PayloadAction<Partial<ListParams>>) {
      Object.assign(state, action.payload);
    },
    resetParams() {
      return initialState;
    },
  },
});

export const { setParams, resetParams } = paramsSlice.actions;
export default paramsSlice.reducer;
