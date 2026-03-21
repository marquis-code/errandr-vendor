<template>
  <div class="max-w-[1400px] mx-auto space-y-10 pb-32 px-4 sm:px-8 animate-fade-in">
    <!-- Header Section -->
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-6">
      <div class="space-y-1">
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">Financial Hub</h1>
        <p class="text-xs text-gray-400 font-medium italic">Monitor your revenue, analyze payouts, and manage settlement accounts.</p>
      </div>
      
      <div class="flex items-center gap-4">
        <button 
          v-if="balance > 0" 
          @click="showWithdrawModal = true" 
          class="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-black active:scale-95 transition-all flex items-center gap-2"
        >
          <CreditCard class="w-3.5 h-3.5" />
          Request Payout
        </button>
      </div>
    </header>

    <div v-if="loadingWallet" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 3" :key="i" class="bg-gray-50 rounded-[2.5rem] p-10 h-64 animate-pulse border border-gray-100" />
    </div>

    <div v-else class="space-y-12">
      <!-- Balance Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <!-- Main Wallet Card -->
        <div class="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden group">
          <div class="absolute -right-20 -top-20 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
          
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div class="space-y-6">
              <div class="flex items-center gap-3 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full w-fit border border-emerald-100/50">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span class="text-[9px] font-black uppercase tracking-widest">Available for Withdrawal</span>
              </div>
              <div class="flex items-baseline gap-3">
                <span class="text-3xl font-black text-gray-300">₦</span>
                <h2 class="text-7xl font-black text-gray-900 tracking-tighter">{{ balance?.toLocaleString() || '0' }}</h2>
              </div>
              <p class="text-xs text-gray-400 font-medium max-w-sm leading-relaxed">
                This is your current balance after commission deductions. Payouts are typically processed within 24-48 hours.
              </p>
            </div>
            
            <div class="h-px md:w-px md:h-24 bg-gray-100"></div>
            
            <div class="space-y-8">
               <div class="space-y-1">
                 <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Earned</p>
                 <p class="text-2xl font-black text-gray-900">₦{{ wallet?.totalEarned?.toLocaleString() || '0' }}</p>
               </div>
               <div class="space-y-1">
                 <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Monthly Growth</p>
                 <div class="flex items-center gap-2 text-emerald-500">
                    <TrendingUp class="w-4 h-4" />
                    <span class="text-sm font-bold">+12.5%</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats / Active Account -->
        <div class="lg:col-span-4 bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
           <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
           
           <div class="space-y-6 relative z-10">
             <div class="flex items-center justify-between">
               <p class="text-[9px] font-black text-white/40 uppercase tracking-widest">Active Settlement</p>
               <SettingsIcon class="w-4 h-4 text-white/20 hover:text-white cursor-pointer transition-colors" @click="$router.push('/dashboard/settings')" />
             </div>
             
             <div v-if="wallet?.bankDetails?.accountNumber" class="space-y-2">
                <p class="text-sm font-bold text-white uppercase tracking-tight">{{ wallet.bankDetails.bankName }}</p>
                <p class="text-xl font-mono text-white/60 tracking-[0.2em]">{{ maskAccountNumber(wallet.bankDetails.accountNumber) }}</p>
                <p class="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pt-2 flex items-center gap-2">
                   <ShieldCheck class="w-3 h-3" />
                   Verified Identity
                </p>
             </div>
             <div v-else class="py-4 text-center border-2 border-dashed border-white/10 rounded-2xl">
                <p class="text-[10px] text-white/40 font-bold uppercase tracking-widest">No Bank Linked</p>
                <NuxtLink to="/dashboard/settings" class="text-[9px] text-blue-400 font-black uppercase tracking-widest mt-2 block hover:underline">Configure Now</NuxtLink>
             </div>
           </div>

           <div class="mt-10 pt-8 border-t border-white/5 space-y-4 relative z-10">
              <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                <span>Cycle</span>
                <span class="text-white">{{ wallet?.payoutPreference || 'Weekly' }}</span>
              </div>
           </div>
        </div>
      </div>

      <!-- Financial Timeline -->
      <section class="space-y-8">
        <div class="flex items-center justify-between px-2">
          <div class="space-y-1">
            <h3 class="text-xl font-black text-gray-900 tracking-tight">Financial Timeline</h3>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deep dive into your recent credits and debits.</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex bg-gray-50 rounded-xl p-1 border border-gray-100">
               <button class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-white text-gray-900 shadow-sm border border-gray-100">All</button>
               <button class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors">Credits</button>
               <button class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors">Payouts</button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <UiTable
            :columns="[
              { key: 'activity', label: 'Activity' },
              { key: 'type', label: 'Flow' },
              { key: 'amount', label: 'Amount' },
              { key: 'date', label: 'Timestamp' }
            ]"
            :items="transactions"
            :loading="loadingTransactions"
          >
            <template #activity="{ item }">
              <div class="flex items-center gap-4 py-2">
                <div 
                  class="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors shadow-sm"
                  :class="(item as any).type === 'credit' ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' : 'bg-rose-50 text-rose-600 border-rose-100/50'"
                >
                  <ArrowUpRight v-if="(item as any).type === 'credit'" class="w-5 h-5" />
                  <ArrowDownLeft v-else class="w-5 h-5" />
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-900 leading-none mb-1">{{ (item as any).description }}</p>
                  <p v-if="(item as any).order" class="text-[9px] text-[#065fdb] font-black uppercase tracking-widest">
                    REF: SEC-{{ (item as any)._id?.slice(-8).toUpperCase() }}
                  </p>
                </div>
              </div>
            </template>

            <template #type="{ item }">
              <span 
                class="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border"
                :class="(item as any).type === 'credit' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'"
              >
                {{ (item as any).type }}
              </span>
            </template>

            <template #amount="{ item }">
              <p 
                class="text-lg font-black tracking-tight"
                :class="(item as any).type === 'credit' ? 'text-emerald-500' : 'text-rose-500'"
              >
                {{ (item as any).type === 'credit' ? '+' : '-' }}₦{{ (item as any).amount.toLocaleString() }}
              </p>
            </template>

            <template #date="{ item }">
              <div class="text-right">
                <p class="text-xs font-bold text-gray-900 uppercase">{{ formatDate((item as any).createdAt) }}</p>
                <p class="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{{ formatTime((item as any).createdAt) }}</p>
              </div>
            </template>
          </UiTable>
        </div>
      </section>
    </div>

    <!-- Payout Request Modal -->
    <SideDrawer 
      :isOpen="showWithdrawModal" 
      title="Request Payout"
      subtitle="Transfer your earnings to your verified active account."
      @close="showWithdrawModal = false"
    >
      <div class="space-y-10 py-6">
        <div class="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 text-center space-y-6 shadow-inner relative overflow-hidden group">
           <div class="absolute inset-0 bg-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div class="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm text-[#065fdb] relative z-10 border border-gray-100">
             <Banknote class="w-10 h-10" />
           </div>
           <div class="relative z-10">
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Current Balance</p>
              <p class="text-4xl font-black text-gray-900 tracking-tighter">₦{{ balance?.toLocaleString() }}</p>
           </div>
        </div>

        <div class="space-y-6">
           <AnimatedInput 
             v-model.number="withdrawAmount" 
             type="number" 
             label="Withdrawal Amount (₦)" 
             description="Enter how much you want to transfer."
             :max="balance"
           />
           
           <div class="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
              <AlertCircle class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p class="text-[11px] text-amber-700 font-semibold leading-relaxed">
                Notice: Payouts are made only to your active settlement account. Ensure your bank details are correct to avoid delays.
              </p>
           </div>
        </div>
      </div>

      <template #footer>
        <div class="flex items-center gap-4 w-full">
          <button @click="showWithdrawModal = false" class="flex-1 py-4 bg-white border border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-2xl">Cancel</button>
          <button 
            @click="handleWithdraw" 
            :disabled="withdrawAmount <= 0 || withdrawAmount > (balance || 0)" 
            class="flex-[2] py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            Authorize Payout
          </button>
        </div>
      </template>
    </SideDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  CreditCard, TrendingUp, Settings as SettingsIcon, Store, 
  ShieldCheck, ArrowUpRight, ArrowDownLeft, Banknote, 
  AlertCircle, Loader2 
} from 'lucide-vue-next';
import { useWallet } from '@/composables/modules/wallets';
import { useCustomToast } from '@/composables/core/useCustomToast';
import UiTable from '@/components/ui/UiTable.vue';
import AnimatedInput from '@/components/ui/AnimatedInput.vue';
import SideDrawer from '@/components/ui/SideDrawer.vue';

definePageMeta({ layout: 'vendor' });
useHead({ title: 'Financial Hub - Errandr Vendor' });

const { balance, wallet, transactions, loading: loadingWallet, fetchWallet, fetchTransactions, withdrawFunds } = useWallet();
const { showToast } = useCustomToast();

const loadingTransactions = ref(true);
const showWithdrawModal = ref(false);
const withdrawAmount = ref(0);

const maskAccountNumber = (num: string) => `•••• •••• ${num.slice(-2)}`;

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const handleWithdraw = async () => {
  if (withdrawAmount.value <= 0 || withdrawAmount.value > balance.value) {
    showToast({ title: 'Invalid Amount', message: 'Please enter a valid amount within your balance.', toastType: 'error' });
    return;
  }
  
  try {
    await withdrawFunds(withdrawAmount.value);
    showWithdrawModal.value = false;
    showToast({ title: 'Payout Requested', message: `₦${withdrawAmount.value} is being processed.`, toastType: 'success' });
  } catch (err) {
    showToast({ title: 'Request Failed', message: 'Could not process payout request.', toastType: 'error' });
  }
};

onMounted(async () => {
  loadingTransactions.value = true;
  await Promise.all([fetchWallet(), fetchTransactions()]);
  loadingTransactions.value = false;
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.tracking-tighter { letter-spacing: -0.05em; }
</style>
