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
  const profileCookie = useCookie<any>('errandr_vendor_profile', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
  });
  
  const profile = useState<any>('vendor_profile_state', () => profileCookie.value);

  // Sync state to cookie
  watch(profile, (newVal) => {
    profileCookie.value = newVal;
  }, { deep: true });
  
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

  const isFoodVendor = computed(() => {
    const p = profile.value?.data || profile.value || {};
    const storeName = (p.storeName || '').toLowerCase();
    
    if (storeName.includes('iyabo') || storeName.includes('food') || storeName.includes('kitchen') || storeName.includes('restaurant')) {
      return true;
    }

    const vendorType = (p.vendorType || '').toLowerCase();
    if (vendorType === 'restaurant' || vendorType === 'mini-mart') return true;
    if (vendorType === 'single-category') return false;
    
    const type = (p.businessType || p.storeType || '').toLowerCase();
    const category = (p.category || '').toLowerCase();
    const foodCategories = ['restaurant', 'eatery', 'snacks', 'drinks', 'bakery', 'food', 'mini-mart'];
    return foodCategories.includes(category) || type === 'food' || type === 'restaurant' || type === 'mini-mart';
  });

  return { profile, loading, isFoodVendor, fetchProfile, setProfile, clearProfile };
};
