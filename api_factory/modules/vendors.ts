import { GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITH_AUTH, GATEWAY_ENDPOINT_WITH_AUTH_FORM_DATA } from '../axios.config';

export const vendors_api = {
  createVendor: (payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/vendors', payload);
  },

  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return GATEWAY_ENDPOINT_WITH_AUTH_FORM_DATA.post('/upload/image', formData);
  },

  getOnline: () => {
    return GATEWAY_ENDPOINT.get('/vendors/online');
  },

  getStatistics: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/vendors/statistics');
  },

  getMyVendorStats: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/vendors/mine/stats');
  },

  getProfile: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/vendors/mine');
  },

  toggleOnline: (id: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.put(`/vendors/${id}/toggle-online`);
  },

  updateBusinessHours: (id: string, hours: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.put(`/vendors/${id}/business-hours`, { hours });
  },
};
