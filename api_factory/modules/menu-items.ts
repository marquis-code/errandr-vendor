import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const menu_items_api = {
  // Menu Items
  getProducts: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/menu/items/mine');
  },

  createProduct: (payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/menu/items', payload);
  },

  updateProduct: (id: string, payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.put(`/menu/items/${id}`, payload);
  },

  deleteProduct: (id: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/menu/items/${id}`);
  },

  toggleAvailability: (id: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.put(`/menu/items/${id}/toggle`);
  },

  // Categories
  getCategories: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/menu/categories/mine');
  },

  createCategory: (payload: { name: string; description?: string; image?: string }) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/menu/categories', payload);
  },

  updateCategory: (id: string, payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.put(`/menu/categories/${id}`, payload);
  },

  deleteCategory: (id: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/menu/categories/${id}`);
  },
};
