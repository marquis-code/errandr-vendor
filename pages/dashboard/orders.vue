<template>
  <div class="inv-page">
    <!-- Header -->
    <header class="inv-header">
      <div class="inv-header__left">
        <h1 class="inv-header__title">Active Orders</h1>
        <p class="inv-header__sub flex items-center gap-2">
          Monitor and fulfill your active campus orders. 
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-sm font-bold bg-amber-50 text-amber-600 whitespace-nowrap shrink-0">
            {{ orders.length }} Pending
          </span>
        </p>
      </div>
    </header>
 
    <!-- Toolbar -->
    <div class="inv-toolbar">
      <div class="inv-search w-full sm:w-80">
        <Search class="inv-search__icon" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Find order or customer..." 
          class="inv-search__input"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="inv-search__clear">
          <X class="w-3.5 h-3.5" />
        </button>
      </div>

      <div class="inv-category-pills">
        <button
          v-for="filter in statusFilters"
          :key="filter.key"
          @click="activeFilter = filter.key"
          class="inv-pill"
          :class="{ 'inv-pill--active': activeFilter === filter.key }"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

 <!-- Orders Table -->
 <div class="bg-white rounded-md overflow-hidden min-h-[500px]">
 <UiTable  
 :columns="orderColumns" 
 :items="filteredOrders" 
 :loading="loading"
 empty-title="No orders found"
 empty-subtitle="Orders will appear here once students place them."
 :has-actions="true"
 @row-click="selectedOrder = $event">
 <template #orderId="{ item }">
 <div class="flex items-center gap-3">
 <div class="w-8 h-8 rounded-md bg-gray-50 flex items-center justify-center text-sm shrink-0">
 {{ (item as any).status === 'pending' ? '🔔' : statusEmoji((item as any).status) }}
 </div>
 <span class="font-bold text-gray-900 text-sm tracking-tight">#{{ (item as any).orderNumber }}</span>
 </div>
 </template>

 <template #customer="{ item }">
 <div>
 <p class="font-bold text-gray-900 text-sm">{{ (item as any).customer?.firstName }} {{ (item as any).customer?.lastName }}</p>
 <p class="text-sm text-gray-400 font-bold">{{ (item as any).items?.length || 0 }} Items</p>
 </div>
 </template>

 <template #total="{ item }">
 <span class="font-bold text-gray-900">₦{{ getVendorEarnings(item as any).toLocaleString() }}</span>
 </template>

 <template #status="{ item }">
 <span :class="getStatusBadge((item as any).status)" class="text-xs font-bold px-2.5 py-1 rounded-lg inline-block">
 {{ formatStatus((item as any).status) }}
 </span>
 </template>

 <template #time="{ item }">
 <span class="text-sm font-bold text-gray-400">{{ timeAgo((item as any).createdAt) }}</span>
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
 <div class="space-y-6 py-2">
 <!-- Status Overview -->
 <div class="flex flex-col items-center py-6 bg-gray-50 rounded-2xl border border-transparent">
 <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
 {{ statusEmoji(selectedOrder.status) }}
 </div>
 <p class="text-sm text-gray-500 font-medium mb-1">Current Status</p>
 <span :class="getStatusBadge(selectedOrder.status)" class="text-sm font-bold px-4 py-1.5 rounded-xl bg-white shadow-sm">
 {{ formatStatus(selectedOrder.status) }}
 </span>
 </div>

  <!-- Items List -->
  <div class="space-y-4">
    <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 px-1">Order Items</h4>
    <div class="space-y-3">
      <div v-for="item in selectedOrder.items" :key="item._id" class="p-4 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] space-y-3">
        <!-- Item Header -->
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <span class="w-9 h-9 bg-orange-100 text-[#FF5C1A] rounded-lg flex items-center justify-center font-bold text-sm shrink-0">
              {{ item.quantity }}x
            </span>
            <div>
              <p class="text-base font-bold text-gray-900">{{ item.name }}</p>
              <p class="text-xs text-gray-500 font-medium mt-0.5">Base Price: ₦{{ getOriginalPrice(item.price, selectedOrder)?.toLocaleString() }}</p>
            </div>
          </div>
          <span class="text-base font-extrabold text-gray-900">
            ₦{{ getOriginalPrice(item.subtotal || (item.price * item.quantity), selectedOrder).toLocaleString() }}
          </span>
        </div>

        <!-- Customizations / Extras Section -->
        <div v-if="item.customizations?.length" class="p-3 bg-orange-50/50 rounded-lg border border-orange-100/50 space-y-2">
          <p class="text-[10px] font-bold tracking-wider text-[#FF5C1A] uppercase flex items-center gap-1">
            <Sparkles class="w-3.5 h-3.5 animate-pulse" /> REQUIRED ADD-ONS / CUSTOMIZATIONS
          </p>
          <div class="grid grid-cols-1 gap-1.5">
            <div v-for="(c, cIdx) in getGroupedCustomizations(item.customizations)" :key="cIdx" class="flex items-center justify-between text-sm bg-white px-3 py-2 rounded-md border border-orange-100 shadow-2xs">
              <span class="font-extrabold text-gray-800 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-[#FF5C1A]"></span>
                {{ c.quantity > 1 ? c.quantity + 'x ' : '' }}{{ getCustomizationLabel(c) }}
              </span>
              <span v-if="c.price > 0" class="text-xs font-bold text-[#FF5C1A]">
                +₦{{ getOriginalPrice(c.price, selectedOrder).toLocaleString() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

 <!-- Vendor Note -->
 <div v-if="selectedOrder.vendorNote" class="p-4 bg-amber-50/50 border border-amber-100 rounded-md">
 <div class="flex gap-2">
 <MessageSquare class="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
 <div>
 <p class="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Customer Instruction</p>
 <p class="text-sm font-medium text-amber-900 leading-relaxed">{{ selectedOrder.vendorNote }}</p>
 </div>
 </div>
 </div>

 <!-- Total Summary -->
 <div class="p-5 bg-gray-900 rounded-2xl text-white relative overflow-hidden group shadow-lg">
 <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-[#FF5C1A]/20 rounded-2xl blur-3xl" />
 <div class="relative z-10 flex justify-between items-end">
 <div>
 <p class="text-sm font-bold text-white/40 mb-1">Total Payout</p>
 <h3 class="text-2xl font-bold tracking-tight">₦{{ getVendorEarnings(selectedOrder).toLocaleString() }}</h3>
 </div>
 </div>
 </div>

 <div class="p-5 bg-gray-50 rounded-2xl border border-transparent flex flex-col gap-4">
 <div class="flex items-center gap-4">
 <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-bold text-[#FF5C1A] shadow-sm">
 {{ selectedOrder.customer?.firstName?.[0] }}{{ selectedOrder.customer?.lastName?.[0] }}
 </div>
 <div class="flex-1">
 <p class="text-sm font-bold text-gray-900">{{ selectedOrder.customer?.firstName }} {{ selectedOrder.customer?.lastName }}</p>
 <p class="text-sm text-gray-500 font-medium">Ordered {{ timeAgo(selectedOrder.createdAt) }}</p>
 </div>
 <button 
 @click="openChat(selectedOrder.customer?._id, selectedOrder.customer?.firstName + ' ' + selectedOrder.customer?.lastName, selectedOrder.customer?.avatar)"
 class="p-3 bg-[#FF5C1A]/10 text-[#FF5C1A] rounded-xl hover:bg-[#FF5C1A] hover:text-white transition-all border border-[#FF5C1A]/20 shadow-sm"
 >
 <MessageSquare class="w-4 h-4" />
 </button>
 </div>

 <div v-if="selectedOrder.errander" class="pt-4 border-t border-gray-50 flex items-center gap-4">
 <div class="w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center text-sm font-bold text-indigo-600">
 {{ selectedOrder.errander?.firstName?.[0] }}
 </div>
 <div class="flex-1">
 <p class="text-sm font-bold text-gray-900">{{ selectedOrder.errander?.firstName }} (Rider)</p>
 <p class="text-sm text-gray-400 font-medium">Assigned Delivery Agent</p>
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
 class="w-full py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
 >
 <component :is="updatingOrderId === selectedOrder._id ? 'Loader2' : 'Clock'" :class="[updatingOrderId === selectedOrder._id ? 'animate-spin' : '', 'w-4 h-4']" />
 {{ updatingOrderId === selectedOrder._id ? 'UPDATING...' : 'START PREPARING' }}
 </button>
 <button 
 v-if="selectedOrder.status === 'preparing'" 
 @click="updateStatus(selectedOrder._id, 'ready_for_pickup')" 
 :disabled="updatingOrderId === selectedOrder._id"
 class="w-full py-2 bg-[#FF5C1A] text-white rounded-md text-sm font-medium hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
 >
 <component :is="updatingOrderId === selectedOrder._id ? 'Loader2' : 'Package'" :class="[updatingOrderId === selectedOrder._id ? 'animate-spin' : '', 'w-4 h-4']" />
 {{ updatingOrderId === selectedOrder._id ? 'UPDATING...' : 'READY FOR PICKUP' }}
 </button>
 
 <button @click="selectedOrder = null" class="w-full py-2 bg-white border border-gray-100 text-gray-400 text-sm font-medium rounded-md hover:bg-gray-50 transition-all">
 Close Details
 </button>
 </div>
 </template>
 </SideDrawer>
  <!-- Order Chat Side Drawer -->
  <OrderChat
    :is-open="chatState.isOpen"
    :order-id="chatState.orderId"
    :current-user-id="chatState.currentUserId"
    :receiver-id="chatState.receiverId"
    :receiver-name="chatState.receiverName"
    :receiver-avatar="chatState.receiverAvatar"
    :initial-message="chatState.initialMessage"
    @close="chatState.isOpen = false"
  />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search, ChevronRight, Clock, Package, Star, ArrowRight, MessageSquare, Loader2, Sparkles, X } from 'lucide-vue-next';
import { GATEWAY_ENDPOINT_WITH_AUTH as api } from '@/api_factory/axios.config';
import SideDrawer from '@/components/ui/SideDrawer.vue';
import UiTable from '@/components/ui/UiTable.vue';
import OrderChat from '@/components/core/OrderChat.vue';
import { useUser } from '@/composables/modules/auth/user';
import { useSocket } from "@/composables/useSocket";
import { useGetBusiness } from '@/composables/modules/business/useGetBusiness';
import { useRouter } from 'vue-router';

const { user } = useUser();
const { cachedBusiness } = useGetBusiness();
const router = useRouter();

definePageMeta({ layout: 'vendor' });
useHead({ title: 'Orders - Errander Vendor' });

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

const getOriginalPrice = (price: number, orderItem?: any) => {
  const pct = orderItem?.foodMarkupPercentage ?? 5;
  const factor = 1 + (pct / 100);
  return Math.round((price || 0) / factor);
};

const getVendorEarnings = (orderItem: any) => {
  if (!orderItem || orderItem.type === 'custom_errand') return 0;
  // Use proper null check — vendorShare of 0 should NOT trigger fallback
  if (orderItem.vendorShare != null && orderItem.vendorShare > 0) {
    return orderItem.vendorShare;
  }
  const pct = orderItem.foodMarkupPercentage ?? 5;
  const factor = 1 + (pct / 100);
  const vendorSubtotal = Math.round((orderItem.subtotal || 0) / factor);
  const vendorPackaging = orderItem.packagingFee || 0; // Packaging fee has no markup
  return vendorSubtotal + vendorPackaging;
};

const getGroupedCustomizations = (customizations: any[]) => {
  if (!customizations) return [];
  const grouped: Record<string, any> = {};
  customizations.forEach(c => {
    if (grouped[c.name]) {
      grouped[c.name].quantity += 1;
      grouped[c.name].price += c.price;
    } else {
      grouped[c.name] = { ...c, quantity: 1 };
    }
  });
  return Object.values(grouped);
};

const getCustomizationLabel = (c: any) => {
  if (c.selected && c.selected !== c.name && !['add-on', 'add-ons', 'extra', 'extras', 'customization', 'customizations'].includes(c.selected.toLowerCase())) {
    return `${c.selected}: ${c.name}`;
  }
  return c.name;
};

const chatState = ref({
  isOpen: false,
  receiverId: '',
  receiverName: '',
  receiverAvatar: '',
  orderId: '',
  currentUserId: '',
  initialMessage: ''
});

const openChat = (receiverId: string | undefined, name: string, avatar?: string) => {
  if (!receiverId || !selectedOrder.value) return;
  chatState.value = {
    isOpen: true,
    receiverId,
    receiverName: name,
    receiverAvatar: avatar || '',
    orderId: selectedOrder.value._id,
    currentUserId: (selectedOrder.value.vendor?._id || selectedOrder.value.vendor || '') + ',' + ((user as any)?.id || (user as any)?._id),
    initialMessage: `Hello ${name.split(' ')[0]}! Thanks for your order #${selectedOrder.value.orderNumber}. We're currently processing it. Let us know if you need any adjustments!`
  };
  selectedOrder.value = null; // Close Order Details Drawer
};

const orderColumns = [
 { key: 'orderId', label: 'Reference' },
 { key: 'customer', label: 'Customer' },
 { key: 'total', label: 'Total' },
 { key: 'status', label: 'Status' },
 { key: 'time', label: 'Ordered' }
];

const statusFilters = [
 { key: 'all', label: 'All Orders' },
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

const { connect, on, emit } = useSocket('realtime');
onMounted(async () => {
  await loadOrders();
  const sock = connect();
  // Explicitly register user with the realtime gateway for targeted notifications
  if (user.value?._id) {
    emit('register', { userId: user.value._id });
  }
  on('notification:new', (payload: any) => {
    if (['NEW_ORDER', 'ORDER_STATUS_UPDATE'].includes(payload.type)) {
      loadOrders();
      // Play alert sound for new orders
      if (payload.type === 'NEW_ORDER') {
        try {
          const audio = new Audio('/sounds/order-alert.mp3');
          audio.play().catch(() => {});
        } catch (_) {}
      }
    }
  });
  on('notification:order-status-update', () => {
    loadOrders();
  });
  on('notification:new-order', () => {
    loadOrders();
  });
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>

