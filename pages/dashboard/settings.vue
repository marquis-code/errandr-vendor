<template>
 <div class="max-w-[1400px] mx-auto space-y-10 pb-20 animate-fade-in px-4 sm:px-8">
 <header class="pt-6">
 <h1 class="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">Merchant Settings</h1>
 <p class="text-xs text-gray-400 font-medium italic mt-1">Fine-tune your store profile, operations, and financial preferences.</p>
 </header>

 <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <div v-for="i in 3" :key="i" class="bg-gray-50 rounded-[2rem] border border-gray-100 animate-pulse h-[400px]" />
 </div>

 <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-10">
 <!-- Left Column: Profile & Operations -->
 <div class="lg:col-span-8 space-y-10">
 <!-- Store Identity -->
 <section class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
 <div class="p-8 border-b border-gray-50 flex items-center justify-between">
 <div class="flex items-center gap-4">
 <div class="p-3 bg-blue-50 text-[#065fdb] rounded-2xl group-hover:scale-110 transition-transform">
 <StoreIcon class="w-5 h-5" />
 </div>
 <h3 class="text-lg font-bold text-gray-900 tracking-tight">Store Identity</h3>
 </div>
 <button 
 @click="saveProfile" 
 :disabled="savingProfile" 
 class="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-[10px] tracking-widest hover:bg-black transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-black/5"
 >
 <Loader2 v-if="savingProfile" class="animate-spin w-3 h-3" />
 {{ savingProfile ? 'Saving...' : 'Sync Profile' }}
 </button>
 </div>
 
 <div class="p-8 space-y-8">
 <!-- Branding -->
 <div class="flex items-center gap-8">
 <div class="w-24 h-24 rounded-[2rem] bg-gray-50 overflow-hidden border border-gray-100 flex items-center justify-center shrink-0 shadow-inner group/logo relative">
 <img v-if="profile.logo" :src="profile.logo" class="w-full h-full object-cover" />
 <ImageIcon v-else class="w-8 h-8 text-gray-200" />
 <div class="absolute inset-0 bg-black/20 opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center">
 <Upload class="w-6 h-6 text-white" />
 </div>
 <input type="file" ref="logoInput" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" @change="handleLogoUpload" />
 </div>
 <div>
 <h4 class="text-sm font-bold text-gray-900 mb-1">Store Logo</h4>
 <p class="text-[10px] text-gray-400 font-medium tracking-widest leading-relaxed">
 Recommended: Square PNG/JPG<br/>Max size: 5MB
 </p>
 <p v-if="logoUploading" class="text-[9px] text-[#065fdb] font-bold mt-2 animate-pulse">UPLOADING...</p>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <AnimatedInput v-model="profile.storeName" label="Business Name" description="e.g. Gourmet Burger Central" required />
 <SelectInput v-model="profile.category" label="Kitchen Type" :options="categoryOptions" required />
 </div>
 
 <AnimatedInput v-model="profile.description" type="textarea" label="Store Bio" description="Tell students why your food is special..." />
 
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <AnimatedInput v-model="profile.address" label="Street Address" description="Specific location for pickups" />
 <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
 <div class="flex items-center gap-3">
 <div class="p-2 bg-white rounded-lg shadow-sm text-[#065fdb]">
 <Building class="w-4 h-4" />
 </div>
 <span class="text-xs font-bold text-gray-700">Inside Campus</span>
 </div>
 <input type="checkbox" v-model="profile.isInsideCampus" class="w-5 h-5 rounded-lg border-gray-200 text-[#065fdb] focus:ring-[#065fdb]" />
 </div>
 </div>
 </div>
 </section>

 <!-- Service Window -->
 <section class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
 <div class="p-8 border-b border-gray-50 flex items-center justify-between">
 <div class="flex items-center gap-4">
 <div class="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:scale-110 transition-transform">
 <Clock class="w-5 h-5" />
 </div>
 <h3 class="text-lg font-bold text-gray-900 tracking-tight">Service Window</h3>
 </div>
 <button 
 @click="saveHours" 
 :disabled="savingHours" 
 class="px-6 py-3 bg-white border border-gray-100 text-gray-500 rounded-xl font-bold text-[10px] tracking-widest hover:bg-gray-50 transition-all disabled:opacity-50 flex items-center gap-2"
 >
 <Loader2 v-if="savingHours" class="animate-spin w-3 h-3" />
 {{ savingHours ? 'Syncing...' : 'Update Schedule' }}
 </button>
 </div>
 
 <div class="p-8 space-y-8">
 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
 <AnimatedInput v-model="profile.operatingHours.open" label="Opens At" description="e.g. 08:00 AM" />
 <AnimatedInput v-model="profile.operatingHours.close" label="Closes At" description="e.g. 09:00 PM" />
 </div>
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 <AnimatedInput v-model.number="profile.preparationTime" type="number" label="Prep Window (min)" description="Avg. time to cook" />
 <AnimatedInput v-model.number="profile.baseDeliveryFee" type="number" label="Base Delivery Fee (₦)" description="Starting fee on user app" />
 <AnimatedInput v-model.number="profile.minimumOrder" type="number" label="Min. Order (₦)" description="Optional threshold" />
 <AnimatedInput v-model.number="profile.deliveryFee" type="number" label="Surcharge (₦)" description="In-store fee" />
 </div>

 <!-- Packaging Packs -->
 <div class="space-y-4 pt-4 border-t border-gray-50">
 <div class="flex items-center justify-between mb-2">
 <div>
 <h4 class="text-sm font-bold text-gray-900 tracking-widest">Packaging Options</h4>
 <p class="text-[10px] text-gray-400 font-medium italic">Create different packs for different food types</p>
 </div>
 <button 
 @click="addPack" 
 class="p-2 bg-blue-50 text-[#065fdb] rounded-lg hover:bg-blue-100 transition-all"
 >
 <Plus class="w-4 h-4" />
 </button>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div v-for="(pack, index) in profile.packs" :key="index" 
 class="p-4 rounded-2xl border border-gray-100 bg-white space-y-3 relative group/pack hover:border-blue-200 transition-all shadow-sm">
 <button 
 v-if="profile.packs.length > 1"
 @click="removePack(index)" 
 class="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-rose-500 opacity-0 group-hover/pack:opacity-100 transition-all"
 >
 <Trash2 class="w-3.5 h-3.5" />
 </button>
 
 <div class="space-y-3">
 <AnimatedInput v-model="pack.name" label="Pack Name" placeholder="e.g. Standard Plastic Pack" />
 <div class="flex items-center gap-4">
 <div class="flex-1">
 <AnimatedInput v-model.number="pack.price" type="number" label="Price (₦)" />
 </div>
 <div class="flex items-center gap-2 pt-5">
 <span class="text-[9px] font-bold text-gray-400 tracking-widest">Active</span>
 <input type="checkbox" v-model="pack.isActive" class="w-4 h-4 rounded border-gray-200 text-[#065fdb]" />
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Business Hours (Day-by-Day) -->
 <div class="space-y-4 pt-4">
 <div class="flex items-center justify-between mb-2">
 <h4 class="text-sm font-bold text-gray-900 tracking-widest">Weekly Schedule</h4>
 <p class="text-[10px] text-gray-400 font-medium italic">Configure opening hours for each day</p>
 </div>
 
 <div class="grid grid-cols-1 gap-3">
 <div v-for="bh in profile.businessHours" :key="bh.day" 
 class="p-4 rounded-2xl border border-gray-100 flex flex-wrap items-center justify-between gap-4 transition-all hover:border-gray-200"
 :class="bh.isClosed ? 'bg-gray-50/50 opacity-60' : 'bg-white'">
 <div class="flex items-center gap-4 min-w-[120px]">
 <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[10px] tracking-tighter shadow-sm"
 :class="bh.isClosed ? 'bg-gray-200 text-gray-400' : 'bg-blue-50 text-[#065fdb]'">
 {{ bh.day.slice(0, 3) }}
 </div>
 <span class="text-sm font-bold text-gray-900 capitalize">{{ bh.day }}</span>
 </div>
 
 <div class="flex items-center gap-4 flex-1 justify-end sm:justify-center">
 <div class="flex items-center gap-2" v-if="!bh.isClosed">
 <input type="time" v-model="bh.open" class="text-xs font-bold p-2 rounded-lg border-gray-100 focus:ring-[#065fdb]" />
 <span class="text-gray-300">→</span>
 <input type="time" v-model="bh.close" class="text-xs font-bold p-2 rounded-lg border-gray-100 focus:ring-[#065fdb]" />
 </div>
 <div v-else class="text-[10px] font-black text-rose-400 tracking-widest">Store Closed</div>
 </div>

 <div class="flex items-center gap-2 ml-4">
 <span class="text-[10px] font-bold text-gray-400 tracking-widest">{{ bh.isClosed ? 'Offline' : 'Online' }}</span>
 <input type="checkbox" :checked="!bh.isClosed" @change="bh.isClosed = !($event.target as HTMLInputElement).checked" class="w-5 h-5 rounded-lg border-gray-200 text-[#065fdb]" />
 </div>
 </div>
 </div>
 </div>

 <!-- Break Periods -->
 <div class="p-6 bg-amber-50/30 rounded-3xl border border-amber-100/50 space-y-6">
 <div class="flex items-center justify-between">
 <div class="flex items-center gap-3">
 <div class="p-2 bg-white rounded-xl shadow-sm text-amber-600">
 <Power class="w-4 h-4" />
 </div>
 <div>
 <h4 class="text-sm font-bold text-gray-900">Scheduled Breaks</h4>
 <p class="text-[10px] text-gray-400 font-medium">Auto-toggle offline during this window</p>
 </div>
 </div>
 <input type="checkbox" v-model="profile.breakPeriod.enabled" class="w-5 h-5 rounded-lg border-amber-200 text-amber-600 focus:ring-amber-500" />
 </div>

 <div v-if="profile.breakPeriod.enabled" class="grid grid-cols-2 gap-4 animate-fade-in">
 <div class="space-y-1.5">
 <label class="text-[9px] font-black text-amber-600 tracking-widest px-1">Break Start</label>
 <input type="time" v-model="profile.breakPeriod.start" class="w-full p-4 bg-white rounded-2xl border-gray-100 font-bold text-sm focus:ring-amber-500" />
 </div>
 <div class="space-y-1.5">
 <label class="text-[9px] font-black text-amber-600 tracking-widest px-1">Break End</label>
 <input type="time" v-model="profile.breakPeriod.end" class="w-full p-4 bg-white rounded-2xl border-gray-100 font-bold text-sm focus:ring-amber-500" />
 </div>
 </div>
 </div>
 </div>
 </section>
 </div>

 <!-- Right Column: Financials & Status -->
 <div class="lg:col-span-4 space-y-10">
 <!-- Store Availability -->
 <section class="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
 <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
 <div class="flex items-center justify-between mb-8">
 <h3 class="text-lg font-bold tracking-tight">Live Status</h3>
 <button 
 @click="toggleOnline" 
 :disabled="togglingOnline"
 class="relative w-14 h-8 rounded-full transition-all duration-500 shadow-inner"
 :class="isOnline ? 'bg-emerald-500' : 'bg-white/10'"
 >
 <span 
 class="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-500"
 :class="isOnline ? 'left-7' : 'left-1'" 
 />
 </button>
 </div>
 
 <div class="space-y-4 relative z-10">
 <div v-if="isOnline" class="flex items-center gap-3 text-emerald-400">
 <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
 <span class="text-[10px] font-black tracking-widest">Active & Visible</span>
 </div>
 <div v-else class="flex items-center gap-3 text-white/40">
 <div class="w-2 h-2 rounded-full bg-white/20" />
 <span class="text-[10px] font-black tracking-widest">Hidden / Offline</span>
 </div>
 <p class="text-[11px] text-white/50 font-medium leading-relaxed">
 When toggled ON, students can browse your menu and place new orders. Toggle OFF during breaks.
 </p>
 </div>
 </section>

 <!-- Payment Hub -->
 <section class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
 <div class="p-8 border-b border-gray-50">
 <div class="flex items-center justify-between mb-2">
 <div class="flex items-center gap-3">
 <div class="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
 <CreditCard class="w-5 h-5" />
 </div>
 <h3 class="text-lg font-bold text-gray-900 tracking-tight">Payout Methods</h3>
 </div>
 <button @click="openAddAccount" class="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-900 transition-all">
 <Plus class="w-5 h-5" />
 </button>
 </div>
 <p class="text-[9px] text-gray-400 font-bold tracking-widest px-1">Active Payout Account</p>
 </div>

 <div class="p-8 space-y-4">
 <!-- Account List -->
 <div v-if="payoutAccounts.length === 0" class="py-6 text-center space-y-3">
 <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto border border-gray-100 italic font-serif text-gray-300">₦</div>
 <p class="text-[11px] text-gray-400 font-bold tracking-widest">No bank accounts linked</p>
 <button @click="openAddAccount" class="text-[10px] font-black text-[#065fdb] tracking-widest hover:underline">Link Account</button>
 </div>

 <div v-else class="space-y-3">
 <div 
 v-for="acc in payoutAccounts" 
 :key="acc.accountNumber"
 class="p-4 rounded-2xl border transition-all cursor-pointer relative group/acc"
 :class="acc.isActive ? 'border-[#065fdb] bg-blue-50/30' : 'border-gray-50 bg-white hover:border-gray-200'"
 @click="setActiveAccount(acc)"
 >
 <div class="flex items-center justify-between">
 <div class="space-y-0.5">
 <p class="text-xs font-black text-gray-900 tracking-tight">{{ acc.bankName }}</p>
 <p class="text-[10px] text-gray-500 font-bold tracking-[0.1em]">{{ maskAccountNumber(acc.accountNumber) }}</p>
 <p class="text-[9px] text-gray-400 font-medium italic mt-1">{{ acc.accountName }}</p>
 </div>
 <div v-if="acc.isActive" class="w-6 h-6 bg-[#065fdb] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#065fdb]/20">
 <CheckCircle class="w-3.5 h-3.5" />
 </div>
 <button 
 v-else 
 @click.stop="deletePayoutAccount(acc)"
 class="opacity-0 group-hover/acc:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all"
 >
 <Trash2 class="w-3.5 h-3.5" />
 </button>
 </div>
 </div>
 </div>

 <div class="pt-4 mt-6 border-t border-gray-50 space-y-4">
 <div>
 <p class="text-[9px] text-gray-400 font-bold tracking-widest px-1 mb-3">Withdrawal Cycle</p>
 <div class="grid grid-cols-3 gap-2">
 <button 
 v-for="pref in ['instant', 'weekly', 'monthly']" 
 :key="pref"
 @click="updatePayoutPref(pref)"
 class="py-3 rounded-xl text-[10px] font-black tracking-widest transition-all border"
 :class="payoutPreference === pref ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-white text-gray-400 border-gray-50 hover:border-gray-200'"
 >
 {{ pref }}
 </button>
 </div>
 </div>
 </div>
 </div>
 </section>
 </div>
 </div>

 <!-- Add Account Drawer -->
 <SideDrawer 
 :isOpen="isAccountDrawerOpen" 
 title="Link Bank Account"
 subtitle="Enter your NUBAN details to secure your payouts."
 @close="isAccountDrawerOpen = false"
 >
 <div class="space-y-8 py-4">
 <SelectInput 
 v-model="newAccount.bankCode" 
 label="Financial Institution" 
 :options="bankOptions" 
 :disabled="banksLoading"
 info="Choose your primary bank."
 @update:model-value="onBankSelect"
 />
 
 <div class="relative">
 <AnimatedInput 
 v-model="newAccount.accountNumber" 
 label="Account Number" 
 info="Enter your 10-digit NUBAN."
 description="e.g. 0123456789"
 @update:model-value="onAccountChange"
 />
 <div v-if="resolvingAccount" class="absolute right-4 top-1/2 -translate-y-1/2">
 <Loader2 class="animate-spin w-4 h-4 text-[#065fdb]" />
 </div>
 </div>

 <div v-if="newAccount.accountName" class="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4 animate-fade-in">
 <div class="p-3 bg-white rounded-xl shadow-sm text-emerald-600">
 <CheckCircle class="w-5 h-5" />
 </div>
 <div>
 <p class="text-[9px] text-emerald-600 font-black tracking-widest mb-0.5">Verified Identity</p>
 <p class="text-sm font-bold text-gray-900">{{ newAccount.accountName }}</p>
 </div>
 </div>

 <div v-if="resolveError" class="p-4 bg-red-50 rounded-xl border border-red-100/50 flex items-center gap-3">
 <AlertCircle class="w-4 h-4 text-red-500 shrink-0" />
 <p class="text-xs font-medium text-red-600">{{ resolveError }}</p>
 </div>
 </div>

 <template #footer>
 <div class="flex items-center gap-4 w-full">
 <button @click="isAccountDrawerOpen = false" class="flex-1 py-4 bg-white border border-gray-100 text-gray-400 text-[10px] font-black tracking-widest rounded-2xl">Cancel</button>
 <button 
 @click="saveNewAccount" 
 :disabled="!isAccountVerified || savingBank" 
 class="flex-[2] py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-xl hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
 >
 <Loader2 v-if="savingBank" class="animate-spin w-3 h-3" />
 Link Account
 </button>
 </div>
 </template>
 </SideDrawer>
 </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import { 
 Store as StoreIcon, ImageIcon, Upload, Clock, 
 CreditCard, Power, Loader2, CheckCircle, 
 AlertCircle, Building, Plus, Trash2 
} from 'lucide-vue-next';
import { vendors_api } from '@/api_factory/modules/vendors';
import { payments_api } from '@/api_factory/modules/payments';
import { useWallet } from '@/composables/modules/wallets';
import { useCustomToast } from '@/composables/core/useCustomToast';
import AnimatedInput from '@/components/ui/AnimatedInput.vue';
import SelectInput from '@/components/ui/SelectInput.vue';
import SideDrawer from '@/components/ui/SideDrawer.vue';

definePageMeta({ layout: 'vendor' });
useHead({ title: 'Settings - Errandr Vendor' });

const { showToast } = useCustomToast();
const { wallet, updatePreferences, fetchWallet } = useWallet();

const loading = ref(true);
const vendorId = ref('');
const isOnline = ref(false);
const togglingOnline = ref(false);
const savingProfile = ref(false);
const savingHours = ref(false);
const savingBank = ref(false);
const logoUploading = ref(false);
const logoInput = ref<HTMLInputElement | null>(null);

const profile = reactive({
 storeName: '',
 description: '',
 category: '',
 address: '',
 logo: '',
 isInsideCampus: false,
 operatingHours: { open: '08:00 AM', close: '08:00 PM' },
 preparationTime: 15,
 baseDeliveryFee: 600,
 minimumOrder: 0,
 deliveryFee: 0,
 packs: [
 { name: 'Standard Pack', price: 300, isActive: true }
 ],
 businessHours: [
 { day: 'monday', open: '08:00', close: '21:00', isClosed: false },
 { day: 'tuesday', open: '08:00', close: '21:00', isClosed: false },
 { day: 'wednesday', open: '08:00', close: '21:00', isClosed: false },
 { day: 'thursday', open: '08:00', close: '21:00', isClosed: false },
 { day: 'friday', open: '08:00', close: '21:00', isClosed: false },
 { day: 'saturday', open: '08:00', close: '21:00', isClosed: false },
 { day: 'sunday', open: '08:00', close: '21:00', isClosed: true },
 ],
 breakPeriod: {
 start: '14:00',
 end: '15:00',
 enabled: false
 }
});

const payoutPreference = ref('weekly');
interface PayoutAccount {
 bankCode: string;
 bankName: string;
 accountNumber: string;
 accountName: string;
 isActive: boolean;
}
const payoutAccounts = ref<PayoutAccount[]>([]);

const isAccountDrawerOpen = ref(false);
const newAccount = reactive({ bankCode: '', bankName: '', accountNumber: '', accountName: '' });
const bankOptions = ref<{ label: string; value: string }[]>([]);
const banksLoading = ref(false);
const resolvingAccount = ref(false);
const isAccountVerified = ref(false);
const resolveError = ref('');

const categoryOptions = [
 { label: 'Restaurant', value: 'restaurant' },
 { label: 'Eatery / Buka', value: 'eatery' },
 { label: 'Snacks & Small Chops', value: 'snacks' },
 { label: 'Drinks & Smoothies', value: 'drinks' },
 { label: 'Groceries', value: 'groceries' },
 { label: 'Bakery & Pastries', value: 'bakery' },
 { label: 'Pharmacy', value: 'pharmacy' },
 { label: 'Stationery & Printing', value: 'stationery' },
 { label: 'Other', value: 'other' },
];

const loadInitialData = async () => {
 loading.value = true;
 try {
 const [profRes, walletRes] = await Promise.all([
 vendors_api.getProfile(),
 fetchWallet() as any
 ]);
 
 const data = profRes?.data?.data || profRes?.data || {};
 vendorId.value = data._id || data.id || '';
 profile.storeName = data.storeName || '';
 profile.description = data.description || '';
 profile.category = data.category || '';
 profile.address = data.address || '';
 profile.logo = data.logo || '';
 profile.isInsideCampus = !!data.isInsideCampus;
 profile.operatingHours = data.operatingHours || { open: '08:00 AM', close: '08:00 PM' };
 profile.preparationTime = data.preparationTime || 15;
 profile.baseDeliveryFee = data.baseDeliveryFee || 600;
 profile.minimumOrder = data.minimumOrder || 0;
 profile.deliveryFee = data.deliveryFee || 0;
 if (data.packs && data.packs.length > 0) {
 profile.packs = JSON.parse(JSON.stringify(data.packs));
 } else {
 profile.packs = [{ name: 'Standard Pack', price: data.packagingFee || 300, isActive: true }];
 }
 if (data.businessHours && data.businessHours.length > 0) {
 profile.businessHours = data.businessHours;
 }
 if (data.breakPeriod) {
 profile.breakPeriod = data.breakPeriod;
 }
 isOnline.value = !!data.isOnline;

 const wData = walletRes?.data?.data || walletRes?.data || {};
 payoutPreference.value = wData.payoutPreference || 'weekly';
 
 // Support multi-account from metadata or use existing single one as primary
 if (wData.metadata?.payoutAccounts) {
 payoutAccounts.value = wData.metadata.payoutAccounts;
 } else if (wData.bankDetails?.accountNumber) {
 payoutAccounts.value = [{ ...wData.bankDetails, isActive: true }];
 }

 // Fetch banks lookup
 banksLoading.value = true;
 const bRes = await payments_api.getBanks();
 const banks = bRes?.data?.data || bRes?.data || [];
 bankOptions.value = banks.map((b: any) => ({ label: b.name || b.bank_name, value: b.code || b.bank_code }));
 banksLoading.value = false;
 } finally {
 loading.value = false;
 }
};

const onBankSelect = (val: string | number) => {
 const b = bankOptions.value.find(x => x.value === String(val));
 if (b) newAccount.bankName = b.label;
 if (newAccount.accountNumber.length === 10) resolveAccount();
};

const onAccountChange = (val: string | number) => {
 const sVal = String(val);
 if (sVal.length === 10 && newAccount.bankCode) resolveAccount();
 else {
 newAccount.accountName = '';
 isAccountVerified.value = false;
 }
};

const resolveAccount = async () => {
 resolvingAccount.value = true;
 resolveError.value = '';
 try {
 const res = await payments_api.resolveAccount(newAccount.accountNumber, newAccount.bankCode);
 const d = res?.data?.data || res?.data || {};
 newAccount.accountName = d.account_name || d.accountName;
 isAccountVerified.value = !!newAccount.accountName;
 } catch (e: any) {
 resolveError.value = e?.response?.data?.message || 'Verification failed';
 } finally {
 resolvingAccount.value = false;
 }
};

const maskAccountNumber = (num: string) => `•••• •••• ${num.slice(-2)}`;

const openAddAccount = () => {
 Object.assign(newAccount, { bankCode: '', bankName: '', accountNumber: '', accountName: '' });
 isAccountVerified.value = false;
 isAccountDrawerOpen.value = true;
};

const saveNewAccount = async () => {
 const isDup = payoutAccounts.value.some(a => a.accountNumber === newAccount.accountNumber);
 if (isDup) {
 showToast({ title: 'Already exists', message: 'This account is already linked.', toastType: 'error' });
 return;
 }

 const newAcc = { ...newAccount, isActive: payoutAccounts.value.length === 0 };
 payoutAccounts.value.push(newAcc);
 
 if (newAcc.isActive) {
 await syncPayoutPreferences();
 } else {
 // Just sync metadata
 await updatePreferences({ 
 preference: payoutPreference.value,
 metadata: { payoutAccounts: payoutAccounts.value }
 });
 }
 
 isAccountDrawerOpen.value = false;
 showToast({ title: 'Account Linked', message: 'Bank account added successfully.', toastType: 'success' });
};

const setActiveAccount = async (acc: PayoutAccount) => {
 payoutAccounts.value.forEach(a => a.isActive = a.accountNumber === acc.accountNumber);
 await syncPayoutPreferences();
 showToast({ title: 'Active Payout Changed', message: `Now paying to ${acc.bankName}`, toastType: 'success' });
};

const deletePayoutAccount = async (acc: PayoutAccount) => {
 payoutAccounts.value = payoutAccounts.value.filter(a => a.accountNumber !== acc.accountNumber);
 await updatePreferences({ 
 preference: payoutPreference.value,
 metadata: { payoutAccounts: payoutAccounts.value }
 });
};

const syncPayoutPreferences = async () => {
 const active = payoutAccounts.value.find(a => a.isActive);
 await updatePreferences({
 preference: payoutPreference.value,
 bankDetails: active ? { bankCode: active.bankCode, bankName: active.bankName, accountNumber: active.accountNumber, accountName: active.accountName } : null,
 metadata: { payoutAccounts: payoutAccounts.value }
 });
};

const updatePayoutPref = async (pref: string) => {
 payoutPreference.value = pref;
 await syncPayoutPreferences();
};

const saveProfile = async () => {
 savingProfile.value = true;
 try {
 const { GATEWAY_ENDPOINT_WITH_AUTH: api } = await import('@/api_factory/axios.config');
 await api.put(`/vendors/${vendorId.value}`, { ...profile });
 showToast({ title: 'Profile Synced', message: 'Your store data has been updated.', toastType: 'success' });
 } finally { savingProfile.value = false; }
};

const saveHours = async () => {
 savingHours.value = true;
 try {
 const { GATEWAY_ENDPOINT_WITH_AUTH: api } = await import('@/api_factory/axios.config');
 await api.put(`/vendors/${vendorId.value}`, {
 businessHours: profile.businessHours,
 breakPeriod: profile.breakPeriod,
 preparationTime: profile.preparationTime,
 baseDeliveryFee: profile.baseDeliveryFee,
 packs: profile.packs,
 minimumOrder: profile.minimumOrder,
 deliveryFee: profile.deliveryFee,
 });
 showToast({ title: 'Schedule Updated', message: 'Service window adjusted successfully.', toastType: 'success' });
 } finally { savingHours.value = false; }
};

const handleLogoUpload = async (e: Event) => {
 const file = (e.target as HTMLInputElement).files?.[0];
 if (!file) return;
 logoUploading.value = true;
 try {
 const res = await vendors_api.uploadImage(file);
 profile.logo = res?.data?.url || res?.data?.imageUrl || res?.data?.data?.url || '';
 } finally { logoUploading.value = false; }
};

const addPack = () => {
 profile.packs.push({ name: '', price: 300, isActive: true });
};

const removePack = (index: number) => {
 profile.packs.splice(index, 1);
};

const toggleOnline = async () => {
 togglingOnline.value = true;
 try {
 await vendors_api.toggleOnline(vendorId.value);
 isOnline.value = !isOnline.value;
 } finally { togglingOnline.value = false; }
};

onMounted(loadInitialData);
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
