<template>
  <div class="space-y-8 pb-20 animate-fade-in max-w-[1400px] mx-auto px-4 sm:px-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">Dashboard</h1>
        <p class="text-sm text-gray-400 mt-1 font-medium italic">Welcome back to your store overview</p>
      </div>
      <div class="flex items-center gap-3">
         <div class="flex items-center gap-2 bg-emerald-50/50 px-4 py-2 rounded-xl border border-emerald-100/50">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span class="text-emerald-600 text-[9px] font-bold uppercase tracking-widest">Store Online</span>
         </div>
         <NuxtLink to="/dashboard/settings" class="p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:bg-gray-50 transition-all active:scale-95 group">
            <Settings class="w-5 h-5 text-gray-400 group-hover:text-[#065fdb] transition-colors" />
         </NuxtLink>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in performanceStats" :key="stat.label" class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-[#065fdb]/30 transition-all group relative overflow-hidden">
        <div class="flex items-center justify-between mb-4 relative z-10">
          <div :class="stat.bgClass" class="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/50">
            <component :is="stat.icon" class="w-5 h-5" />
          </div>
          <span v-if="stat.trend" class="text-[9px] font-bold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 tracking-widest uppercase">
            Live
          </span>
        </div>
        <div class="relative z-10">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{{ stat.label }}</p>
          <h3 class="text-2xl font-bold text-gray-900 tracking-tight">{{ stat.value }}</h3>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Orders Table -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          <div class="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
            <div>
              <h3 class="font-bold text-gray-900 text-lg tracking-tight">Recent Orders</h3>
              <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Real-time incoming requests</p>
            </div>
            <NuxtLink to="/dashboard/orders" class="text-[9px] font-bold text-[#065fdb] uppercase tracking-widest hover:bg-blue-50 px-4 py-2 bg-white rounded-lg border border-gray-100 transition-colors">See All</NuxtLink>
          </div>
          
          <UiTable 
            :columns="orderColumns" 
            :items="orders.slice(0, 5)" 
            :loading="loadingOrders"
            empty-title="No active orders"
            empty-subtitle="Orders will appear here once students start ordering."
          >
            <template #customer="{ item }">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500 border border-white">
                  {{ item.customer?.firstName?.[0] }}{{ item.customer?.lastName?.[0] }}
                </div>
                <div class="truncate">
                  <p class="font-bold text-gray-900 truncate">{{ item.customer?.firstName }} {{ item.customer?.lastName }}</p>
                  <p class="text-[9px] text-gray-400 font-medium uppercase">{{ item.customer?.phone || 'No phone' }}</p>
                </div>
              </div>
            </template>
            <template #total="{ item }">
              <span class="font-bold text-gray-900">₦{{ item.total?.toLocaleString() }}</span>
            </template>
            <template #status="{ item }">
              <span :class="getStatusBadge(item.status)" class="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg border">
                {{ item.status.replace(/_/g, ' ') }}
              </span>
            </template>
            <template #actions>
              <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-300 hover:text-gray-900" @click="$router.push('/dashboard/orders')">
                <ArrowRight class="w-4 h-4" />
              </button>
            </template>
          </UiTable>
        </div>

        <!-- Marketing / Insight Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div class="bg-gray-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
              <div class="absolute -right-10 -top-10 w-40 h-40 bg-[#065fdb]/30 rounded-full blur-3xl" />
              <div class="relative z-10">
                <div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                  <Package class="w-5 h-5 text-[#065fdb]" />
                </div>
                <h3 class="text-xl font-bold tracking-tight mb-2">Inventory Health</h3>
                <p class="text-white/40 text-[9px] mb-8 font-bold uppercase tracking-widest">Some items running low</p>
                <NuxtLink to="/dashboard/inventory" class="inline-flex px-6 py-3 bg-white text-gray-900 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-black/20">Manage Stock</NuxtLink>
              </div>
           </div>
           
           <div class="bg-amber-50/50 rounded-[2rem] p-8 border border-amber-100 shadow-sm relative overflow-hidden group">
              <div class="relative z-10">
                <div class="flex items-center gap-0.5 mb-6">
                   <Star v-for="i in 5" :key="i" class="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <p class="text-[9px] text-amber-900/40 font-bold uppercase tracking-widest mb-1">Store Rating</p>
                <h3 class="text-4xl font-black text-amber-950 tracking-tighter">{{ currentStats.rating || '5.0' }}</h3>
                <p class="text-[9px] text-amber-700/60 font-bold uppercase tracking-widest mt-4 flex items-center gap-2">
                  <CheckCircle class="w-3 h-3" /> {{ currentStats.reviewsCount || 0 }} CUSTOMER REVIEWS
                </p>
              </div>
           </div>
        </div>
      </div>

      <!-- Financial Sidebar -->
      <div class="space-y-8">
        <div class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 space-y-8 transition-all hover:border-[#065fdb]/20">
           <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-[#065fdb]/5 text-[#065fdb] flex items-center justify-center border border-[#065fdb]/10">
                <Banknote class="w-5 h-5" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 tracking-tight">Earnings</h3>
                <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Today's Settlement</p>
              </div>
           </div>
           
           <div class="space-y-1">
              <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Current Balance</p>
              <div class="flex items-baseline gap-1">
                <span class="text-lg font-black text-gray-200">₦</span>
                <h4 class="text-4xl font-bold text-gray-900 tracking-tight">{{ currentStats.todaySales?.toLocaleString() || '0' }}</h4>
              </div>
           </div>

           <div class="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
              <div class="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                <span class="text-gray-400">Target</span>
                <span class="text-[#065fdb]">₦65,000</span>
              </div>
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-[#065fdb] transition-all duration-1000" :style="{ width: Math.min((currentStats.todaySales / 65000) * 100, 100) + '%' }" />
              </div>
              <p class="text-[8px] text-gray-400 font-bold italic text-center">
                {{ Math.round((currentStats.todaySales / 65000) * 100) }}% complete
              </p>
           </div>

           <NuxtLink to="/dashboard/wallet" class="flex items-center justify-center w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-[9px] uppercase tracking-widest hover:bg-black transition-all active:scale-95 group shadow-xl shadow-black/10">
             Financial Hub <ArrowRight class="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
           </NuxtLink>
        </div>

        <div class="bg-[#065fdb] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
           <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl opacity-50" />
           <h3 class="text-lg font-bold flex items-center gap-3 relative z-10 tracking-tight">
              <Megaphone class="w-5 h-5" /> Campus Insight
           </h3>
           <p class="text-white/60 text-[10px] font-bold leading-relaxed mt-6 relative z-10 uppercase tracking-wide">
              Students are searching for <span class="text-white underline decoration-white/30 decoration-2 underline-offset-4">Shawarma</span> more than usual.
           </p>
           <div class="mt-8 relative z-10">
             <button class="px-6 py-2.5 bg-white/10 border border-white/20 rounded-xl text-[8px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all">Quick Promo</button>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  ShoppingBag, Clock, TrendingUp, Building, Inbox, 
  Settings, ArrowRight, CheckCircle, Banknote, Megaphone, Package, Star
} from 'lucide-vue-next';
import { vendors_api } from '@/api_factory/modules/vendors';
import { useVendorOrders } from '@/composables/modules/vendor/useVendorOrders';
import UiTable from '@/components/ui/UiTable.vue';

definePageMeta({ layout: 'vendor' });
useHead({ title: 'Dashboard - Errandr Vendor' });

const { orders, loading: loadingOrders, loadMyVendorOrders } = useVendorOrders();
const currentStats = ref<any>({});
const loadingStats = ref(true);

const orderColumns = [
  { key: 'customer', label: 'Customer' },
  { key: 'total', label: 'Amount' },
  { key: 'status', label: 'Status' }
];

const performanceStats = ref([
  { label: 'Today Orders', value: '0', icon: ShoppingBag, bgClass: 'bg-emerald-50 text-emerald-600', trend: 0 },
  { label: 'Active Orders', value: '0', icon: Clock, bgClass: 'bg-amber-50 text-amber-600', trend: 0 },
  { label: 'Revenue', value: '₦0', icon: Building, bgClass: 'bg-purple-50 text-purple-600', trend: 0 },
  { label: 'Rating', value: '5.0', icon: Star, bgClass: 'bg-blue-50 text-blue-600', trend: 0 },
]);

const fetchDashboardData = async () => {
  loadingStats.value = true;
  try {
    const [statsRes] = await Promise.all([
      vendors_api.getMyVendorStats(),
      loadMyVendorOrders()
    ]);
    
    const s = statsRes?.data || {};
    currentStats.value = s;
    
    performanceStats.value[0].value = s.todayOrders?.toString() || '0';
    performanceStats.value[1].value = s.activeOrders?.toString() || '0';
    performanceStats.value[2].value = '₦' + (s.totalSales?.toLocaleString() || '0');
    performanceStats.value[3].value = s.rating || '5.0';
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

onMounted(fetchDashboardData);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>

