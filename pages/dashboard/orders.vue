<template>
 <div class="space-y-6 animate-fade-in max-w-[1400px] mx-auto pb-20 px-4 sm:px-8">
 <!-- Header with Search & Stats -->
 <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-6">
 <div class="space-y-1">
 <h1 class="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">Live Pipeline</h1>
 <p class="text-xs text-gray-400 font-medium italic flex items-center gap-2">
 Monitor and fulfill your active campus orders. 
 <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-bold bg-amber-50 text-amber-600 ">
 {{ orders.length }} Pending
 </span>
 </p>
 </div>
 
 <div class="flex items-center gap-3">
 <div class="relative w-full sm:w-80">
 <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
 <input 
 v-model="searchQuery"
 type="text" 
 placeholder="Find order or customer..." 
 class="w-full pl-11 pr-4 py-3 bg-white border border-gray-50 rounded-xl text-sm font-medium placeholder:text-gray-300 focus:ring-4 focus:ring-[#065fdb]/5 focus:border-[#065fdb]/30 outline-none transition-all shadow-sm"
 />
 </div>
 </div>
 </div>

 <!-- Filters Row -->
 <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
 <button
 v-for="filter in statusFilters"
 :key="filter.key"
 @click="activeFilter = filter.key"
 class="shrink-0 px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest transition-all border"
 :class="activeFilter === filter.key ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-400 hover:text-gray-600 shadow-sm'"
 >
 {{ filter.label }}
 </button>
 </div>

 <!-- Orders Table -->
 <div class="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden min-h-[500px]">
 <UiTable 
 :columns="orderColumns" 
 :items="filteredOrders" 
 :loading="loading"
 empty-title="No orders found"
 empty-subtitle="Orders will appear here once students place them."
 >
 <template #orderId="{ item }">
 <div class="flex items-center gap-3">
 <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[10px] shrink-0 shadow-inner">
 {{ (item as any).status === 'pending' ? '🔔' : statusEmoji((item as any).status) }}
 </div>
 <span class="font-bold text-gray-900 text-sm italic tracking-tight">#{{ (item as any).orderNumber }}</span>
 </div>
 </template>

 <template #customer="{ item }">
 <div>
 <p class="font-bold text-gray-900 text-sm">{{ (item as any).customer?.firstName }} {{ (item as any).customer?.lastName }}</p>
 <p class="text-[9px] text-gray-400 font-bold tracking-widest">{{ (item as any).items?.length || 0 }} Items</p>
 </div>
 </template>

 <template #total="{ item }">
 <span class="font-bold text-gray-900">₦{{ (item as any).total?.toLocaleString() }}</span>
 </template>

 <template #status="{ item }">
 <span :class="getStatusBadge((item as any).status)" class="text-[8px] font-bold tracking-widest px-2.5 py-1 rounded-lg inline-block">
 {{ formatStatus((item as any).status) }}
 </span>
 </template>

 <template #time="{ item }">
 <span class="text-[9px] font-bold text-gray-400 tracking-widest">{{ timeAgo((item as any).createdAt) }}</span>
 </template>

 <template #actions="{ item }">
 <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-300 hover:text-gray-900" @click.stop="selectedOrder = item">
 <ChevronRight class="w-4 h-4" />
 </button>
 </template>
 </UiTable>
 </div>

 <!-- Order Detail Drawer -->
 <SideDrawer 
 :isOpen="!!selectedOrder" 
 :title="'Order Details'"
 :subtitle="selectedOrder ? `#${selectedOrder.orderNumber}` : ''"
 @close="selectedOrder = null"
 >
 <template v-if="selectedOrder">
 <div class="space-y-10 py-2">
 <!-- Status Overview -->
 <div class="flex flex-col items-center py-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-50/50">
 <div class="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-4">
 {{ statusEmoji(selectedOrder.status) }}
 </div>
 <p class="text-[10px] text-gray-400 font-bold tracking-widest mb-1">Current Status</p>
 <span :class="getStatusBadge(selectedOrder.status)" class="text-[11px] font-bold tracking-[0.15em] px-4 py-1.5 rounded-xl border bg-white shadow-sm">
 {{ formatStatus(selectedOrder.status) }}
 </span>
 </div>

 <!-- Items List -->
 <div class="space-y-4">
 <h4 class="text-[10px] font-black text-gray-400 tracking-widest px-1">Order Items</h4>
 <div class="space-y-3">
 <div v-for="item in selectedOrder.items" :key="item._id" class="p-4 bg-white border border-gray-50 rounded-2xl flex items-center justify-between group hover:shadow-md transition-all">
 <div class="flex items-center gap-4">
 <span class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-[10px] font-black text-gray-900">{{ item.quantity }}x</span>
 <div>
 <p class="text-sm font-bold text-gray-900">{{ item.name }}</p>
 <p class="text-[9px] text-gray-400 font-medium italic">Unit Price: ₦{{ item.price?.toLocaleString() }}</p>
 </div>
 </div>
 <span class="text-sm font-bold text-gray-900">₦{{ item.subtotal?.toLocaleString() }}</span>
 </div>
 </div>
 </div>

 <!-- Total Summary -->
 <div class="p-6 bg-gray-900 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
 <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-[#065fdb]/20 rounded-full blur-3xl" />
 <div class="relative z-10 flex justify-between items-end">
 <div>
 <p class="text-[9px] font-bold text-white/40 tracking-widest mb-1">Total Payout</p>
 <h3 class="text-3xl font-bold tracking-tight">₦{{ selectedOrder.total?.toLocaleString() }}</h3>
 </div>
 <div class="text-right">
 <p class="text-[9px] font-bold text-white/40 tracking-widest mb-1">Earnings</p>
 <p class="text-lg font-bold">₦{{ (selectedOrder.total * 0.9).toLocaleString() }}</p>
 </div>
 </div>
 </div>

 <div class="p-6 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-50/50 flex flex-col gap-4">
 <div class="flex items-center gap-4">
 <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold text-[#065fdb] shadow-inner">
 {{ selectedOrder.customer?.firstName?.[0] }}{{ selectedOrder.customer?.lastName?.[0] }}
 </div>
 <div class="flex-1">
 <p class="text-sm font-bold text-gray-900">{{ selectedOrder.customer?.firstName }} {{ selectedOrder.customer?.lastName }}</p>
 <p class="text-[10px] text-gray-500 font-medium italic">Ordered {{ timeAgo(selectedOrder.createdAt) }}</p>
 </div>
 <button 
 @click="openChat(selectedOrder.customer?._id, selectedOrder.customer?.firstName + ' ' + selectedOrder.customer?.lastName, selectedOrder.customer?.avatar)"
 class="p-3 bg-[#065fdb]/5 text-[#065fdb] rounded-xl hover:bg-[#065fdb] hover:text-white transition-all shadow-sm border border-[#065fdb]/10"
 >
 <MessageSquare class="w-4 h-4" />
 </button>
 </div>

 <div v-if="selectedOrder.errander" class="pt-4 border-t border-gray-50 flex items-center gap-4">
 <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600">
 {{ selectedOrder.errander?.firstName?.[0] }}
 </div>
 <div class="flex-1">
 <p class="text-xs font-bold text-gray-900">{{ selectedOrder.errander?.firstName }} (Rider)</p>
 <p class="text-[9px] text-gray-400 font-medium tracking-widest">Assigned Delivery Agent</p>
 </div>
 <button 
 @click="openChat(selectedOrder.errander?._id, selectedOrder.errander?.firstName + ' (Rider)', selectedOrder.errander?.avatar)"
 class="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100"
 >
 <MessageSquare class="w-3.5 h-3.5" />
 </button>
 </div>
 </div>
 </div>
 </template>

 <template #footer>
 <div v-if="selectedOrder" class="flex flex-col gap-3 w-full">
 <button 
 v-if="['pending', 'confirmed'].includes(selectedOrder.status)" 
 @click="updateStatus(selectedOrder._id, 'preparing')" 
 :disabled="updatingOrderId === selectedOrder._id"
 class="w-full py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black tracking-widest hover:bg-black active:scale-95 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
 >
 <component :is="updatingOrderId === selectedOrder._id ? 'Loader2' : 'Clock'" :class="[updatingOrderId === selectedOrder._id ? 'animate-spin' : '', 'w-4 h-4']" />
 {{ updatingOrderId === selectedOrder._id ? 'UPDATING...' : 'START PREPARING' }}
 </button>
 <button 
 v-if="selectedOrder.status === 'preparing'" 
 @click="updateStatus(selectedOrder._id, 'ready_for_pickup')" 
 :disabled="updatingOrderId === selectedOrder._id"
 class="w-full py-4 bg-[#065fdb] text-white rounded-2xl text-[10px] font-black tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#065fdb]/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
 >
 <component :is="updatingOrderId === selectedOrder._id ? 'Loader2' : 'Package'" :class="[updatingOrderId === selectedOrder._id ? 'animate-spin' : '', 'w-4 h-4']" />
 {{ updatingOrderId === selectedOrder._id ? 'UPDATING...' : 'READY FOR PICKUP' }}
 </button>
 
 <button @click="selectedOrder = null" class="w-full py-4 bg-white border border-gray-100 text-gray-400 text-[10px] font-black tracking-widest rounded-2xl hover:bg-gray-50 transition-all">
 Close Details
 </button>
 </div>
 </template>
 </SideDrawer>

 <!-- Order Chat Component -->
 <OrderChat
 v-if="selectedOrder"
 :key="'chat-' + selectedOrder._id"
 :is-open="isChatOpen"
 :order-id="selectedOrder._id"
 :current-user-id="(cachedBusiness as any)?._id || user?._id || ''"
 :receiver-id="chatReceiverId"
 :receiver-name="chatReceiverName"
 :receiver-avatar="chatReceiverAvatar"
 @close="isChatOpen = false"
 />
 </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search, ChevronRight, Clock, Package, Star, ArrowRight, MessageSquare, Loader2 } from 'lucide-vue-next';
import { GATEWAY_ENDPOINT_WITH_AUTH as api } from '@/api_factory/axios.config';
import SideDrawer from '@/components/ui/SideDrawer.vue';
import UiTable from '@/components/ui/UiTable.vue';
import OrderChat from '@/components/core/OrderChat.vue';
import { useUser } from '@/composables/modules/auth/user';
import { useSocket } from "@/composables/useSocket";
import { useGetBusiness } from '@/composables/modules/business/useGetBusiness';

const { user } = useUser();
const { cachedBusiness } = useGetBusiness();

definePageMeta({ layout: 'vendor' });
useHead({ title: 'Orders - Errandr Vendor' });

const loading = ref(true);
const orders = ref<any[]>([]);
const activeFilter = ref('all');
const searchQuery = ref('');
const selectedOrder = ref<any>(null);
const isChatOpen = ref(false);
const chatReceiverId = ref('');
const chatReceiverName = ref('');
const chatReceiverAvatar = ref('');
const updatingOrderId = ref<string | null>(null);

const openChat = (receiverId: string | undefined, name: string, avatar?: string) => {
 if (!receiverId) return;
 chatReceiverId.value = receiverId;
 chatReceiverName.value = name;
 chatReceiverAvatar.value = avatar || '';
 isChatOpen.value = true;
};

const orderColumns = [
 { key: 'orderId', label: 'Reference' },
 { key: 'customer', label: 'Customer' },
 { key: 'total', label: 'Total' },
 { key: 'status', label: 'Status' },
 { key: 'time', label: 'Ordered' },
 { key: 'actions', label: '' }
];

const statusFilters = [
 { key: 'all', label: 'Pipeline' },
 { key: 'pending', label: 'Incoming' },
 { key: 'preparing', label: 'In Kitchen' },
 { key: 'ready_for_pickup', label: 'Ready' },
 { key: 'delivered', label: 'Delivered' },
];

const filteredOrders = computed(() => {
 let list = orders.value;
 if (activeFilter.value !== 'all') {
 list = list.filter((o) => o.status === activeFilter.value);
 }
 if (searchQuery.value) {
 const q = searchQuery.value.toLowerCase();
 list = list.filter(o => 
 o.orderNumber?.toLowerCase().includes(q) ||
 o.customer?.firstName?.toLowerCase().includes(q) ||
 o.customer?.lastName?.toLowerCase().includes(q)
 );
 }
 return list;
});

const formatStatus = (s: string) => s?.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

const statusEmoji = (status: string) => {
 const map: Record<string, string> = {
 pending: '🔔', confirmed: '✅', preparing: '👨‍🍳', ready_for_pickup: '📦',
 picked_up: '🏃', in_transit: '🚀', delivered: '🎉', cancelled: '❌',
 };
 return map[status] || '📋';
};

const getStatusBadge = (s: string) => {
 if (['delivered', 'confirmed'].includes(s)) return 'bg-emerald-50 text-emerald-600';
 if (['in_transit', 'picked_up'].includes(s)) return 'bg-blue-50 text-blue-600';
 if (['pending', 'preparing', 'ready_for_pickup'].includes(s)) return 'bg-amber-50 text-amber-600';
 return 'bg-gray-50 text-gray-400';
}

const timeAgo = (date: string) => {
 const diff = Date.now() - new Date(date).getTime();
 const mins = Math.floor(diff / 60000);
 if (mins < 60) return `${mins}m ago`;
 const hrs = Math.floor(mins / 60);
 if (hrs < 24) return `${hrs}h ago`;
 return `${Math.floor(hrs / 24)}d ago`;
};

const updateStatus = async (orderId: string, status: string) => {
 try {
 updatingOrderId.value = orderId;
 await api.put(`/orders/${orderId}/status`, { status });
 await loadOrders();
 if (selectedOrder.value?._id === orderId) {
 selectedOrder.value = null;
 }
 } catch (e) { console.error('Status sync failed:', e); }
 finally { updatingOrderId.value = null; }
};

const loadOrders = async () => {
 try {
 const res = await api.get<any>('/orders/vendor/mine');
 orders.value = res.data.orders || [];
 } catch (e) { console.error('Order sync failed:', e); }
 finally { loading.value = false; }
};

const { connect, on } = useSocket('notifications');
onMounted(async () => {
 await loadOrders();
 connect();
 on('notification', (payload: any) => {
 if (['NEW_ORDER', 'ORDER_STATUS_UPDATE'].includes(payload.type)) {
 loadOrders();
 }
 });
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>

