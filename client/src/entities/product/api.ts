import { api } from "../../shared/lib/apiClient";
import type { Product, ProductListParams } from "./types";

export const productsApi = {
  list: (params: ProductListParams) =>
    api.get<{ items: Product[]; total: number; page: number; limit: number }>(
      "/products",
      { params }
    ),
  get: (id: string) => api.get<Product>(`/products/${id}`),
  create: (data: Omit<Product, "id">) => api.post<Product>("/products", data),
  update: (id: string, data: Partial<Omit<Product, "id">>) =>
    api.patch<Product>(`/products/${id}`, data),
  remove: (id: string) => api.delete<Product>(`/products/${id}`),
  uploadPhoto: (id: string, file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    return api.post<Product>(`/products/${id}/photo`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deletePhoto: (id: string) => api.delete<Product>(`/products/${id}/photo`),
};
