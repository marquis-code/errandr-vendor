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
              class="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-black/5"
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
                <p class="text-[10px] text-gray-400 font-medium uppercase tracking-widest leading-relaxed">
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
              class="px-6 py-3 bg-white border border-gray-100 text-gray-500 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all disabled:opacity-50 flex items-center gap-2"
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
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatedInput v-model.number="profile.preparationTime" type="number" label="Prep Window (min)" description="Avg. time to cook" />
              <AnimatedInput v-model.number="profile.minimumOrder" type="number" label="Min. Order (₦)" description="Optional threshold" />
              <AnimatedInput v-model.number="profile.deliveryFee" type="number" label="Surcharge (₦)" description="In-store fee" />
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
              <span class="text-[10px] font-black uppercase tracking-widest">Active & Visible</span>
            </div>
            <div v-else class="flex items-center gap-3 text-white/40">
              <div class="w-2 h-2 rounded-full bg-white/20" />
              <span class="text-[10px] font-black uppercase tracking-widest">Hidden / Offline</span>
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
            <p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest px-1">Active Payout Account</p>
          </div>

          <div class="p-8 space-y-4">
            <!-- Account List -->
            <div v-if="payoutAccounts.length === 0" class="py-6 text-center space-y-3">
              <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto border border-gray-100 italic font-serif text-gray-300">₦</div>
              <p class="text-[11px] text-gray-400 font-bold uppercase tracking-widest">No bank accounts linked</p>
              <button @click="openAddAccount" class="text-[10px] font-black text-[#065fdb] uppercase tracking-widest hover:underline">Link Account</button>
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
                    <p class="text-xs font-black text-gray-900 uppercase tracking-tight">{{ acc.bankName }}</p>
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
                  <p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest px-1 mb-3">Withdrawal Cycle</p>
                  <div class="grid grid-cols-2 gap-2">
                    <button 
                      v-for="pref in ['daily', 'weekly']" 
                      :key="pref"
                      @click="updatePayoutPref(pref)"
                      class="py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border"
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
             <p class="text-[9px] text-emerald-600 font-black uppercase tracking-widest mb-0.5">Verified Identity</p>
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
          <button @click="isAccountDrawerOpen = false" class="flex-1 py-4 bg-white border border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-2xl">Cancel</button>
          <button 
            @click="saveNewAccount" 
            :disabled="!isAccountVerified || savingBank" 
            class="flex-[2] py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
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
  minimumOrder: 0,
  deliveryFee: 0,
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
    profile.minimumOrder = data.minimumOrder || 0;
    profile.deliveryFee = data.deliveryFee || 0;
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
    await vendors_api.updateBusinessHours(vendorId.value, {
      operatingHours: profile.operatingHours,
      preparationTime: profile.preparationTime,
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
