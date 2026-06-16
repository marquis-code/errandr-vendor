import { ref } from 'vue';
import { services_api } from "@/api_factory/modules/services";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useLoader } from "@/composables/core/useLoader";

export const useVendorServices = () => {
  const { showToast } = useCustomToast();
  const { startLoading, stopLoading } = useLoader();
  const servicesList = ref<any[]>([]);
  const loading = ref(false);

  const fetchServices = async () => {
    loading.value = true;
    try {
      const res = await services_api.getServices() as any;
      servicesList.value = res.data?.data || res.data || [];
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const createService = async (payload: any) => {
    startLoading('Adding your service... ✨');
    try {
      const res = await services_api.createService(payload);
      if (res.data) {
        showToast({
          title: "Service Added! 🎉",
          message: `${payload.name} is now available for booking!`,
          toastType: "success",
        });
        await fetchServices();
        return res.data;
      }
    } finally {
      stopLoading();
    }
  };

  const updateService = async (id: string, payload: any) => {
    startLoading('Saving changes... ✍️');
    try {
      await services_api.updateService(id, payload);
      showToast({
        title: "Service Updated",
        message: "Your service changes have been saved successfully.",
        toastType: "success",
      });
      await fetchServices();
      return true;
    } finally {
      stopLoading();
    }
  };

  const deleteService = async (id: string) => {
    startLoading('Removing service... 🗑️');
    try {
      await services_api.deleteService(id);
      showToast({
        title: "Service Deleted",
        message: "The service has been removed.",
        toastType: "success",
      });
      await fetchServices();
      return true;
    } finally {
      stopLoading();
    }
  };

  const toggleAvailability = async (id: string) => {
    try {
      await services_api.toggleAvailability(id);
      await fetchServices();
      return true;
    } catch (e) {
      return false;
    }
  };

  return { servicesList, loading, fetchServices, createService, updateService, deleteService, toggleAvailability };
};
