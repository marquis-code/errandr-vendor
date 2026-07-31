import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const exam_mode_api = {
  getAvailability: (vendorId: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get(`/exam-mode/vendors/${vendorId}/availability`);
  },
  
  updateAvailability: (vendorId: string, payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.patch(`/exam-mode/vendors/${vendorId}/availability`, payload);
  },
  
  getContentPlans: (vendorId: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get(`/exam-mode/vendors/${vendorId}/content-plan`);
  },

  createContentPlan: (vendorId: string, payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.post(`/exam-mode/vendors/${vendorId}/content-plan`, payload);
  },

  updateContentPlan: (vendorId: string, id: string, payload: any) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.patch(`/exam-mode/vendors/${vendorId}/content-plan/${id}`, payload);
  },

  deleteContentPlan: (vendorId: string, id: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.delete(`/exam-mode/vendors/${vendorId}/content-plan/${id}`);
  },

  getRescheduleRequests: (vendorId: string) => {
    return GATEWAY_ENDPOINT_WITH_AUTH.get(`/exam-mode/vendors/${vendorId}/reschedule-requests`);
  }
};
