import { api } from '../../shared/lib/apiClient';

export const productsApi = {
  list: (params: any) => api.get('/products', { params }),
  get: (id: string) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.patch(`/products/${id}`, data),
  remove: (id: string) => api.delete(`/products/${id}`),
  uploadPhoto: (id: string, file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return api.post(`/products/${id}/photo`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  deletePhoto: (id: string) => api.delete(`/products/${id}/photo`),
};
