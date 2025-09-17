import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "./api";
import type { Product, ProductListParams } from "@/shared/api/types";

export const useProducts = (params?: ProductListParams) =>
  useQuery<{ items: Product[]; total: number; page: number; limit: number }>({
    queryKey: ["products", params],
    queryFn: async () => (await productsApi.list(params || {})).data,
  });

export const useProduct = (id?: string) =>
  useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => (await productsApi.get(id!)).data,
    enabled: !!id,
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Product, "id">) =>
      productsApi.create(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      productsApi.update(id, data).then((res) => res.data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productsApi.remove(id).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
