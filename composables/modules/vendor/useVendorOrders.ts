import { ref } from 'vue';
import { orders_api } from "@/api_factory/modules/orders";
import { useLoader } from "@/composables/core/useLoader";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useVendorOrders = () => {
  const { startLoading, stopLoading } = useLoader();
  const { showToast } = useCustomToast();
  const orders = ref<any[]>([]);
  const loading = ref(false);
  const total = ref(0);

  const fetchOrders = async (status?: string, page = 1) => {
    loading.value = true;
    try {
      const res = await orders_api.getOrders(); // This should be updated to use /vendor/mine if we want auto-resolve
      // Actually, let's update orders_api to use the new route we just added
      orders.value = res.data.orders || res.data || [];
      total.value = res.data.total || orders.value.length;
    } catch (e) {
      console.error('Failed to fetch orders:', e);
    } finally {
      loading.value = false;
    }
  };

  const loadMyVendorOrders = async (status?: string, page = 1) => {
    loading.value = true;
    try {
      const { GATEWAY_ENDPOINT_WITH_AUTH: api } = await import('@/api_factory/axios.config');
      const res = await api.get('/orders/vendor/mine', { params: { status, page } });
      orders.value = res.data.orders || [];
      total.value = res.data.total || 0;
    } catch (e) {
      console.error('Failed to fetch vendor orders:', e);
    } finally {
      loading.value = false;
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    startLoading('Updating order status...');
    try {
      await orders_api.updateOrderStatus(orderId, status);
      showToast({
        title: "Order Updated",
        message: `Status changed to ${status.replace(/_/g, ' ')}`,
        toastType: "success",
      });
      await loadMyVendorOrders();
    } finally {
      stopLoading();
    }
  };

  return { 
    orders, 
    loading, 
    total, 
    fetchOrders, 
    loadMyVendorOrders,
    updateStatus 
  };
};
