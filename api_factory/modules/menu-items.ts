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

  // Add-ons
  getAddOns: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/menu/add-ons/mine');
  },
  createAddOn: (payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/menu/add-ons', payload);
  },
  updateAddOn: (id: string, payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.put(`/menu/add-ons/${id}`, payload);
  },
  deleteAddOn: (id: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/menu/add-ons/${id}`);
  },

  // Packs
  getPacks: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/menu/packs/mine');
  },
  createPack: (payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/menu/packs', payload);
  },
  updatePack: (id: string, payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.put(`/menu/packs/${id}`, payload);
  },
  deletePack: (id: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/menu/packs/${id}`);
  },

};
