<template>
  <div class="space-y-8 pb-20 animate-fade-in max-w-[1400px] px-4 mx-auto sm:px-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard</h1>
        <p class="text-sm text-gray-400 mt-1 font-medium">Welcome back to your store overview</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="shareStore" class="flex items-center gap-2 bg-blue-50/50 px-4 py-2 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
          <Share2 class="w-4 h-4 text-blue-600" />
          <span class="text-blue-600 text-sm font-bold">Share Store</span>
        </button>
        <div class="flex items-center gap-2 bg-emerald-50/50 px-4 py-2 rounded-xl">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span class="text-emerald-600 text-sm font-bold">Store Online</span>
        </div>
        <NuxtLink to="/dashboard/settings" class="p-3 bg-white border border-gray-100 rounded-xl transition-all active:scale-95 group">
          <Settings class="w-5 h-5 text-gray-400 group-hover:text-[#FF5C1A] transition-colors" />
        </NuxtLink>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in computedStats" :key="stat.label" class="bg-white border border-gray-100 p-6 rounded-3xl transition-all group relative overflow-hidden">
        <div class="flex items-center justify-between mb-4 relative z-10">
          <div :class="stat.bgClass" class="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/50">
            <component :is="stat.icon" class="w-5 h-5" />
          </div>
          <span v-if="stat.trend" class="text-sm font-bold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
            Live
          </span>
        </div>
        <div class="relative z-10">
          <p class="text-sm font-bold text-gray-400 mb-1">{{ stat.label }}</p>
          <h3 class="text-2xl font-bold text-gray-900">{{ stat.value }}</h3>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Orders Table -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-[2rem] border border-gray-100 overflow-hidden flex flex-col min-h-[500px]">
          <div class="px-8 py-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="font-bold text-gray-900 text-lg">{{ isServiceProvider ? 'Recent Appointments' : 'Recent Orders' }}</h3>
              <p class="text-sm font-bold text-gray-400 mt-0.5">Real-time incoming requests</p>
            </div>
            <NuxtLink to="/dashboard/orders" class="text-sm font-bold text-[#FF5C1A] hover:bg-blue-50 px-4 py-2 bg-white rounded-lg border border-gray-100 transition-colors self-start sm:self-auto whitespace-nowrap">See All</NuxtLink>
          </div>
          
          <UiTable 
            :columns="orderColumns" 
            :items="orders.slice(0, 5)" 
            :loading="loadingOrders"
            empty-title="Welcome to your dashboard!"
            empty-subtitle="You haven't received any requests yet. If you're new, make sure to complete your profile setup."
          >
            <template #customer="{ item }">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm text-gray-500 border border-white">
                  {{ item.customer?.firstName?.[0] }}{{ item.customer?.lastName?.[0] }}
                </div>
                <div class="truncate">
                  <p class="font-bold text-gray-900 truncate">{{ item.customer?.firstName }} {{ item.customer?.lastName }}</p>
                  <p class="text-sm text-gray-400 font-medium">{{ item.customer?.phone || 'No phone' }}</p>
                </div>
              </div>
            </template>
            <template #store="{ item }">
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-100 shrink-0">
                  <img v-if="item.vendor?.logo" :src="item.vendor.logo" class="w-full h-full object-cover" />
                  <Building v-else class="w-2.5 h-2.5 text-gray-300" />
                </div>
                <span class="text-sm font-bold text-gray-600 truncate max-w-[120px]">{{ item.vendor?.storeName || 'N/A' }}</span>
              </div>
            </template>
            <template #total="{ item }">
              <span class="font-bold text-gray-900 whitespace-nowrap">₦{{ item.total?.toLocaleString() }}</span>
            </template>
            <template #status="{ item }">
              <span :class="getStatusBadge(item.status)" class="text-sm font-bold px-2 py-1 rounded-lg border whitespace-nowrap">
                {{ item.status.replace(/_/g, ' ') }}
              </span>
            </template>
            <template #actions>
              <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-300 hover:text-gray-900" @click="$router.push('/dashboard/orders')">
                <ArrowRight class="w-4 h-4" />
              </button>
            </template>
          </UiTable>
          
          <!-- Onboarding Guide if no orders -->
          <div v-if="orders.length === 0 && !loadingOrders" class="p-8 bg-blue-50/30 border-t border-blue-50/50 flex flex-col md:flex-row items-center justify-between gap-6 mt-auto">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-[#FF5C1A] text-white flex items-center justify-center shadow-lg shrink-0">
                <ShieldCheck class="w-5 h-5" />
              </div>
              <div>
                <h4 class="text-base font-bold text-gray-900">Setup your store for success</h4>
                <p class="text-sm text-gray-500 font-medium mt-1">Complete these steps to start receiving requests</p>
              </div>
            </div>
            <NuxtLink to="/dashboard/settings" class="px-6 py-3 bg-white text-gray-900 rounded-xl text-sm font-medium hover:shadow-md transition-all border border-gray-100 whitespace-nowrap text-center">
              Setup Store Profile
            </NuxtLink>
          </div>
        </div>

        <!-- Marketing / Insight Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-[2.5rem] border border-gray-100 p-8 relative overflow-hidden group">
            <div class="relative z-10">
              <div class="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-6">
                <Package v-if="!isServiceProvider" class="w-5 h-5 text-[#FF5C1A]" />
                <Calendar v-else class="w-5 h-5 text-[#FF5C1A]" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ isServiceProvider ? 'Upcoming Bookings' : 'Inventory Health' }}</h3>
              <p class="text-gray-500 text-sm mb-8 font-bold">{{ isServiceProvider ? 'Check your appointment schedule' : 'Some items running low' }}</p>
              <NuxtLink :to="isServiceProvider ? '/dashboard/appointments' : '/dashboard/inventory'" class="inline-flex px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all">
                {{ isServiceProvider ? 'View Schedule' : 'Manage Stock' }}
              </NuxtLink>
            </div>
          </div>
          
          <div class="bg-white rounded-[2.5rem] p-8 border border-gray-100 relative overflow-hidden group">
            <div class="relative z-10">
              <div class="flex items-center gap-0.5 mb-6">
                <Star v-for="i in 5" :key="i" class="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>
              <p class="text-sm text-gray-500 font-bold mb-1">Store Rating</p>
              <h3 class="text-4xl font-medium text-gray-900">{{ Number(currentStats.rating || 5).toFixed(1) }}</h3>
              <p class="text-sm text-gray-400 font-bold mt-4 flex items-center gap-2">
                <CheckCircle class="w-3 h-3 text-emerald-500" /> {{ currentStats.reviewsCount || 0 }} CUSTOMER REVIEWS
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Financial Sidebar -->
      <div class="space-y-8">
        <div class="bg-white rounded-[2.5rem] border border-gray-100 p-8 space-y-8 transition-all">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-[#FF5C1A]/5 text-[#FF5C1A] flex items-center justify-center border border-[#FF5C1A]/10 shrink-0">
              <Banknote class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900">Earnings</h3>
              <p class="text-sm font-bold text-gray-400">Today's Settlement</p>
            </div>
          </div>
          
          <div class="space-y-1">
            <p class="text-sm font-bold text-gray-400 ml-1">Current Balance</p>
            <div class="flex items-baseline gap-1">
              <span class="text-lg font-medium text-gray-400">₦</span>
              <h4 class="text-4xl font-bold text-gray-900">{{ currentStats.todaySales?.toLocaleString() || '0' }}</h4>
            </div>
          </div>

          <div class="p-5 bg-gray-50/50 rounded-2xl border border-gray-50/50 space-y-3">
            <div class="flex justify-between items-center text-sm font-bold">
              <span class="text-gray-400">Target</span>
              <span class="text-[#FF5C1A]">₦65,000</span>
            </div>
            <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-[#FF5C1A] transition-all duration-1000" :style="{ width: Math.min(((currentStats.todaySales || 0) / 65000) * 100, 100) + '%' }"></div>
            </div>
            <p class="text-sm text-gray-400 font-bold mt-2 text-center">
              {{ Math.round(((currentStats.todaySales || 0) / 65000) * 100) }}% complete
            </p>
          </div>

          <NuxtLink to="/dashboard/wallet" class="flex items-center justify-center w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all active:scale-95 group">
            Financial Hub <ArrowRight class="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>

        <div class="bg-white border border-gray-100 rounded-[2.5rem] p-8 relative overflow-hidden group">
          <h3 class="text-lg font-bold text-gray-900 flex items-center gap-3 relative z-10">
            <Megaphone class="w-5 h-5 text-[#FF5C1A]" /> Campus Insight
          </h3>
          <p class="text-gray-600 text-sm font-bold leading-relaxed mt-6 relative z-10">
            Students are searching for <span class="text-[#FF5C1A] underline decoration-[#FF5C1A]/30 decoration-2 underline-offset-4">{{ isServiceProvider ? 'Hair Styling' : 'Shawarma' }}</span> more than usual.
          </p>
          <div class="mt-8 relative z-10">
            <button class="px-6 py-2.5 bg-gray-50 border border-gray-100 text-gray-900 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all">Quick Promo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { 
  ShoppingBag, Clock, TrendingUp, Building, Inbox, 
  Settings, ArrowRight, CheckCircle, Banknote, Megaphone, Package, Star, ShieldCheck, Share2, Calendar
} from 'lucide-vue-next';

import { vendors_api } from '@/api_factory/modules/vendors';
import { useVendorOrders } from '@/composables/modules/vendor/useVendorOrders';
import UiTable from '@/components/ui/UiTable.vue';

definePageMeta({ layout: 'vendor' });
useHead({ title: 'Dashboard - Errander Vendor' });

const { orders, loading: loadingOrders, loadMyVendorOrders } = useVendorOrders();
const { showToast } = useCustomToast();
const currentStats = ref<any>({});
const vendorProfile = ref<any>(null);
const loadingStats = ref(true);

const isServiceProvider = computed(() => vendorProfile.value?.businessType === 'service_provider');

const orderColumns = [
  { key: 'customer', label: 'Customer' },
  { key: 'store', label: 'Store' },
  { key: 'total', label: 'Amount' },
  { key: 'status', label: 'Status' }
];

const computedStats = computed(() => [
  { label: isServiceProvider.value ? 'Today Appointments' : 'Today Orders', value: currentStats.value?.todayOrders?.toString() || '0', icon: isServiceProvider.value ? Calendar : ShoppingBag, bgClass: 'bg-emerald-50 text-emerald-600', trend: 0 },
  { label: isServiceProvider.value ? 'Active Appointments' : 'Active Orders', value: currentStats.value?.activeOrders?.toString() || '0', icon: Clock, bgClass: 'bg-amber-50 text-amber-600', trend: 0 },
  { label: 'Revenue', value: '₦' + (currentStats.value?.totalSales?.toLocaleString() || '0'), icon: Building, bgClass: 'bg-purple-50 text-purple-600', trend: 0 },
  { label: 'Rating', value: Number(currentStats.value?.rating || 5).toFixed(1), icon: Star, bgClass: 'bg-blue-50 text-blue-600', trend: 0 },
]);

const fetchDashboardData = async () => {
  loadingStats.value = true;
  try {
    const [statsRes, profileRes] = await Promise.all([
      vendors_api.getMyVendorStats(),
      vendors_api.getProfile(),
      loadMyVendorOrders()
    ]);
    
    currentStats.value = statsRes?.data || {};
    vendorProfile.value = (profileRes as any)?.data || null;
  } catch (e) {
    console.error('Dashboard sync failed:', e);
  } finally {
    loadingStats.value = false;
  }
};

const getStatusBadge = (s: string) => {
  if (['delivered', 'confirmed'].includes(s)) return 'bg-emerald-50 text-emerald-600 border-emerald-100/50';
  if (['pending', 'preparing', 'ready_for_pickup'].includes(s)) return 'bg-amber-50 text-amber-600 border-amber-100/50';
  return 'bg-gray-50 text-gray-400 border-gray-100/50';
};

const shareStore = () => {
  if (!vendorProfile.value || !vendorProfile.value.subdomain) {
    showToast({ title: 'Error', message: 'Store link not available', type: 'error' });
    return;
  }
  const protocol = window.location.protocol;
  let baseHost = window.location.host;
  const parts = window.location.hostname.split('.');
  if (parts.length >= 3 || (parts.length >= 2 && parts[parts.length - 1] === 'localhost')) {
    if (parts[0] !== 'www' && parts[0] !== 'student' && parts[0] !== 'vendor') {
      const port = window.location.port ? `:${window.location.port}` : '';
      baseHost = parts.slice(1).join('.') + port;
    }
  }
  const shareUrl = `${protocol}//${vendorProfile.value.subdomain}.${baseHost}/`;
  if (navigator.share) {
    navigator.share({
      title: vendorProfile.value.storeName,
      text: `Check out ${vendorProfile.value.storeName} on Errandr!`,
      url: shareUrl,
    }).catch(err => {
      console.error('Error sharing:', err);
    });
  } else {
    navigator.clipboard.writeText(shareUrl);
    showToast({ title: 'Success', message: 'Store link copied to clipboard!', type: 'success' });
  }
};

onMounted(fetchDashboardData);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
