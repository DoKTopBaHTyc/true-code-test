import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from './api';

export const useProducts = (params: any) => useQuery(['products', params], () => productsApi.list(params).then(r => r.data));
export const useProduct = (id: string | undefined) => useQuery(['product', id], () => productsApi.get(id!).then(r => r.data), { enabled: !!id });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation((data: any) => productsApi.create(data).then(r => r.data), { onSuccess: () => qc.invalidateQueries(['products']) });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation(({id, data}: any) => productsApi.update(id, data).then(r => r.data), { onSuccess: () => qc.invalidateQueries(['products']) });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation((id: string) => productsApi.remove(id), { onSuccess: () => qc.invalidateQueries(['products']) });
};
