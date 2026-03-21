import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const products_api = {
  // Products
  getProducts: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/products/vendor/mine');
  },

  createProduct: (payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/products', payload);
  },

  updateProduct: (id: string, payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.put(`/products/${id}`, payload);
  },

  deleteProduct: (id: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/products/${id}`);
  },

  toggleAvailability: (id: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.put(`/products/${id}/toggle`);
  },

  // Categories
  getCategories: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/products/categories/mine');
  },

  createCategory: (payload: { name: string; description?: string; image?: string }) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/products/categories', payload);
  },

  updateCategory: (id: string, payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.put(`/products/categories/${id}`, payload);
  },

  deleteCategory: (id: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/products/categories/${id}`);
  },
};
