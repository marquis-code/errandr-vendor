import { vendors_api } from "@/api_factory/modules/vendors";
import { useLoader } from "@/composables/core/useLoader";

export const useVendorStats = () => {
  const loading = ref(false);
  const stats = ref<any>(null);

  const fetchStats = async () => {
    loading.value = true;
    try {
      const res = await vendors_api.getStatistics();
      stats.value = res.data;
    } finally {
      loading.value = false;
    }
  };

  return { loading, stats, fetchStats };
};

export const useVendorStatus = () => {
  const { startLoading, stopLoading } = useLoader();

  const toggleOnline = async (vendorId: string) => {
    startLoading('Updating status...');
    try {
      await vendors_api.toggleOnline(vendorId);
    } finally {
      stopLoading();
    }
  };

  return { toggleOnline };
};
