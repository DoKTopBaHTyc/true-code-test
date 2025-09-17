import type { RootState } from "@/app/store";

export const selectListParams = (state: RootState) => state.productListParams;
export const selectPage = (state: RootState) => state.productListParams.page;
export const selectLimit = (state: RootState) => state.productListParams.limit;
export const selectQuery = (state: RootState) => state.productListParams.q;
export const selectSortBy = (state: RootState) =>
  state.productListParams.sortBy;
export const selectOrder = (state: RootState) => state.productListParams.order;
