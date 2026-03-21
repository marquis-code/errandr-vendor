import { ref } from 'vue';
import { vendors_api } from '@/api_factory/modules/vendors';
import { orders_api } from '@/api_factory/modules/orders';
import { useUser } from '../auth/user';

export const useVendorDashboard = () => {
  const { user } = useUser();
  const loading = ref(true);
  const stats = ref([
    { label: 'Total Orders', value: '0' },
    { label: 'Rating', value: 'New' },
    { label: 'Active Items', value: '0' },
    { label: 'Status', value: 'Offline' },
  ]);
  const recentOrders = ref<any[]>([]);

  const fetchDashboardData = async () => {
    loading.value = true;
    try {
      const vendorRes = await vendors_api.getProfile();
      const vendor = vendorRes.data;

      stats.value = [
        { label: 'Total Orders', value: vendor.totalOrders?.toString() || '0' },
        { label: 'Rating', value: `⭐ ${vendor.rating?.toFixed(1) || 'New'}` },
        { label: 'Active Items', value: vendor.productsCount?.toString() || '0' },
        { label: 'Status', value: vendor.isOnline ? '🟢 Online' : '🔴 Offline' },
      ];

      // Assuming orders_api has getVendorOrders
      const ordersRes = await orders_api.getOrders(); // Need to ensure it supports vendor filtering or use specific endpoint
      recentOrders.value = ordersRes.data.slice(0, 5);
    } catch (e) {
      console.error('Dashboard data fetch failed', e);
    } finally {
      loading.value = false;
    }
  };

  return { loading, stats, recentOrders, fetchDashboardData };
};
