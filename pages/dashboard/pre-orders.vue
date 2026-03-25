<template>
  <div class="space-y-8 pb-20 animate-fade-in max-w-7xl mx-auto px-4">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-gray-900 tracking-tighter">Pre-Order Hub</h1>
        <p class="text-sm text-gray-500 font-bold mt-1 tracking-wide">Manage your student business batches and scheduled deliveries.</p>
      </div>
      <button @click="showCampaignModal = true" class="px-8 py-3.5 bg-gray-900 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-parentPrimary transition-all shadow-xl shadow-black/10 active:scale-95 flex items-center gap-2">
        <Plus class="w-4 h-4" /> Start New Batch
      </button>
    </div>

    <!-- Stats Matrix -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in hubStats" :key="stat.label" class="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm group hover:shadow-xl transition-all relative overflow-hidden">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-parentPrimary/5 rounded-full blur-2xl group-hover:bg-parentPrimary/10 transition-colors"></div>
        <div class="relative z-10">
          <div class="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center border border-gray-100 shadow-inner" :class="stat.bg">
            <component :is="stat.icon" class="w-5 h-5" :class="stat.color" />
          </div>
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{{ stat.label }}</p>
          <h3 class="text-3xl font-black text-gray-900 tracking-tighter">{{ stat.value }}</h3>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Active Batches -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          <div class="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h3 class="font-black text-gray-900 text-xl tracking-tighter">Active Batches</h3>
              <p class="text-[10px] font-black text-gray-400 tracking-widest uppercase mt-0.5">Upcoming delivery windows</p>
            </div>
            <div class="flex items-center gap-2 text-[10px] font-black tracking-widest">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              LIVE
            </div>
          </div>

          <div v-if="batches.length === 0" class="flex-1 flex flex-col items-center justify-center p-20 text-center">
            <div class="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-3xl mb-6 grayscale opacity-50">🎂</div>
            <h4 class="text-lg font-black text-gray-900 tracking-tight">No active batches</h4>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 max-w-[200px]">Start a new batch to taking pre-orders for your next delivery date.</p>
          </div>

          <div v-else class="divide-y divide-gray-50">
            <div v-for="batch in batches" :key="batch._id" class="p-8 hover:bg-gray-50/50 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer">
              <div class="flex items-start gap-6">
                <div class="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <img v-if="batch.image" :src="batch.image" class="w-full h-full object-cover" />
                  <span v-else>🎁</span>
                </div>
                <div>
                  <div class="flex items-center gap-3">
                    <h4 class="font-black text-xl text-gray-900 tracking-tight">{{ batch.windowName }}</h4>
                    <span class="px-3 py-1 bg-parentPrimary/10 text-parentPrimary rounded-full text-[9px] font-black tracking-widest uppercase border border-parentPrimary/5">{{ batch.orderCount }} orders</span>
                  </div>
                  <p class="text-sm font-bold text-gray-500 mt-1">Delivery on {{ new Date(batch.deliveryDate).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) }}</p>
                </div>
              </div>
              
              <div class="flex items-center gap-8 text-right">
                <div class="hidden sm:block">
                  <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Deadline</p>
                  <p class="text-xs font-black text-rose-500">{{ formatDeadline(batch.deadline) }}</p>
                </div>
                <button class="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900">
                  <ArrowRight class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Schedule Widget -->
      <div class="space-y-6">
        <div class="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
          <div class="absolute -right-4 -top-4 w-32 h-32 bg-parentPrimary/20 rounded-full blur-3xl"></div>
          <div class="relative z-10">
            <h3 class="text-xl font-black tracking-tight mb-4 flex items-center gap-3">
              <Calendar class="w-5 h-5 text-parentPrimary" /> Batch Insights
            </h3>
            <p class="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-8 leading-relaxed">Most student pre-orders occur on Wednesdays for Weekend Deliveries.</p>
            
            <div class="space-y-4">
              <div class="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                <p class="text-[9px] font-black text-white/40 uppercase tracking-widest">Next Hot Window</p>
                <div class="flex items-center justify-between text-sm font-black">
                  <span>Saturday Delivery</span>
                  <span class="text-parentPrimary">88% Booked</span>
                </div>
                <div class="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full bg-parentPrimary w-[88%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm p-8 space-y-6">
          <div class="flex items-center gap-4 border-b border-gray-50 pb-6">
            <div class="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-100">
              <Zap class="w-5 h-5" />
            </div>
            <div>
              <h4 class="font-black text-gray-900 tracking-tight">Automation</h4>
              <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Auto-close pre-orders</p>
            </div>
          </div>
          
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer">
            <span class="text-[10px] font-black text-gray-900 uppercase tracking-widest">Auto-Notify Riders</span>
            <div class="w-10 h-5 bg-emerald-500 rounded-full relative">
              <div class="absolute top-1 right-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Campaign Modal (Simplified) -->
    <Transition name="fade-up">
      <div v-if="showCampaignModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div class="bg-white rounded-[2.5rem] max-w-lg w-full p-10 space-y-8 animate-scale-in relative">
          <button @click="showCampaignModal = false" class="absolute top-8 right-8 p-3 hover:bg-gray-50 rounded-xl transition-colors">
            <X class="w-5 h-5 text-gray-400" />
          </button>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-parentPrimary/10 text-parentPrimary rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Plus class="w-8 h-8" />
            </div>
            <h2 class="text-2xl font-black text-gray-900 tracking-tighter">New Pre-Order Batch</h2>
            <p class="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">Setup your next delivery window</p>
          </div>

          <div class="space-y-6 pt-4">
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Batch Name</label>
              <input v-model="newBatch.windowName" placeholder="e.g. Next Saturday Cake Batch" class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-black focus:ring-4 focus:ring-parentPrimary/10 outline-none transition-all shadow-inner" />
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Deadline</label>
                <input v-model="newBatch.deadline" type="datetime-local" class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black focus:ring-4 focus:ring-parentPrimary/10 outline-none transition-all shadow-inner" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Delivery Date</label>
                <input v-model="newBatch.deliveryDate" type="date" class="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black focus:ring-4 focus:ring-parentPrimary/10 outline-none transition-all shadow-inner" />
              </div>
            </div>

            <button @click="handleCreateBatch" class="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-xs tracking-[0.3em] uppercase hover:bg-parentPrimary transition-all shadow-2xl active:scale-95">
              Launch Pre-Order Window
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { 
  Package, Clock, Calendar, Plus, 
  ArrowRight, X, TrendingUp, Zap, 
  Star, ShoppingBag, BarChart3, Users
} from 'lucide-vue-next'
import { vendors_api } from '@/api_factory/modules/vendors'

definePageMeta({ layout: 'vendor' })
useHead({ title: 'Pre-Order Hub - Errandr Vendor' })

const showCampaignModal = ref(false)
const batches = ref<any[]>([])
const loading = ref(true)

const newBatch = ref({
  windowName: '',
  deadline: '',
  deliveryDate: '',
  isActive: true
})

const hubStats = ref([
  { label: 'Active Batches', value: '0', icon: Calendar, color: 'text-parentPrimary', bg: 'bg-parentPrimary/5' },
  { label: 'Total Pre-orders', value: '0', icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Avg. Conv. Time', value: '4.2 Days', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' }
])

const fetchBatches = async () => {
  loading.value = true
  try {
    const res = await vendors_api.getProfile()
    const vendor = res.data
    batches.value = vendor.batchSchedule || []
    
    // Update stats
    hubStats.value[0].value = batches.value.filter(b => b.isActive).length.toString()
    hubStats.value[1].value = vendor.totalOrders?.toString() || '0'
  } catch (e) {
    console.error('Failed to fetch batches:', e)
  } finally {
    loading.value = false
  }
}

const handleCreateBatch = async () => {
  try {
    const updatedSchedule = [...batches.value, { ...newBatch.value }]
    await vendors_api.updateProfile({ batchSchedule: updatedSchedule })
    showCampaignModal.value = false
    Object.assign(newBatch.value, { windowName: '', deadline: '', deliveryDate: '' })
    fetchBatches()
  } catch (e) {
    console.error('Failed to create batch:', e)
  }
}

const formatDeadline = (date: string) => {
  const d = new Date(date)
  const now = new Date()
  const diff = d.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days < 1) return 'Closing Soon'
  return `Ends in ${days} days`
}

onMounted(fetchBatches)
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>
