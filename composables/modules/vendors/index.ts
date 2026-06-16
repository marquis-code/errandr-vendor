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

export const useVendorProfile = () => {
  const profile = useCookie<any>('errandr_vendor_profile', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
  });
  
  const loading = ref(false);

  const fetchProfile = async () => {
    loading.value = true;
    try {
      const res = await vendors_api.getProfile();
      profile.value = res.data;
    } catch (error) {
      console.error('Failed to fetch vendor profile', error);
    } finally {
      loading.value = false;
    }
  };

  const setProfile = (data: any) => {
    profile.value = data;
  };

  const clearProfile = () => {
    profile.value = null;
  };

  return { profile, loading, fetchProfile, setProfile, clearProfile };
};
