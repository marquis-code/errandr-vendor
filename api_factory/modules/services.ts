import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const services_api = {
  getServices: () => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/services/mine');
  },
  createService: (payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/services', payload);
  },
  updateService: (id: string, payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.put(`/services/${id}`, payload);
  },
  deleteService: (id: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/services/${id}`);
  },
  toggleAvailability: (id: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.put(`/services/${id}/toggle`);
  }
};
