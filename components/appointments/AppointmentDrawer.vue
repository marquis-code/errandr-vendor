<template>
  <UiSideDrawer 
    :isOpen="isOpen" 
    @close="$emit('close')"
  >
    <div v-if="appointment" class="flex flex-col h-full -mt-6">
      
      <!-- Top Actions (like Fresha's header) -->
      <div class="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div 
            class="w-12 h-12 rounded-md flex items-center justify-center text-xl font-bold text-white"
            :class="getStatusColor(appointment.status).bg"
          >
            {{ clientInitials }}
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900">{{ appointment.user?.firstName }} {{ appointment.user?.lastName }}</h3>
            <p class="text-sm text-gray-500">{{ appointment.user?.email || 'No email provided' }}</p>
          </div>
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex gap-2 mb-8">
        <button class="flex-1 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors flex justify-center items-center gap-2">
          <MessageCircle class="w-4 h-4" /> Message
        </button>
        <button class="flex-1 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors flex justify-center items-center gap-2">
          <User class="w-4 h-4" /> Profile
        </button>
      </div>

      <!-- Service Details -->
      <div class="space-y-6 flex-1">
        <div>
          <h4 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar class="w-4 h-4 text-parentPrimary" /> 
            {{ formattedDate }}
          </h4>
          
          <div class="p-4 bg-gray-50 rounded-md border border-gray-100 relative overflow-hidden group">
            <div class="absolute left-0 top-0 bottom-0 w-1" :class="getStatusColor(appointment.status).border"></div>
            
            <div class="pl-2">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h5 class="font-bold text-gray-900">{{ appointment.items?.[0]?.service?.name || 'Service' }}</h5>
                  <p class="text-xs text-gray-500 mt-0.5">
                    {{ appointment.startTime }} - {{ appointment.endTime }} • {{ appointment.items?.[0]?.service?.durationInMinutes || 0 }}min
                  </p>
                </div>
                <span class="text-sm font-bold text-gray-900">₦{{ appointment.price?.toLocaleString() || 0 }}</span>
              </div>
              
              <div class="flex items-center gap-2 mt-3">
                <div class="w-6 h-6 rounded-md bg-gray-200 flex items-center justify-center shrink-0">
                  <User class="w-3 h-3 text-gray-500" />
                </div>
                <span class="text-xs font-semibold text-gray-600">With Store Owner</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Info class="w-4 h-4 text-gray-400" /> 
            Booking Info
          </h4>
          <div class="bg-white border border-gray-100 rounded-md p-4 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Status</span>
              <span 
                class="font-bold px-2 py-0.5 rounded-md text-xs uppercase tracking-wider"
                :class="getStatusColor(appointment.status).badge"
              >
                {{ appointment.status }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Payment</span>
              <span class="font-bold text-gray-900 capitalize">{{ appointment.paymentStatus || 'Pending' }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Reference</span>
              <span class="font-mono text-gray-900 text-xs">{{ appointment.paymentReference || 'N/A' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Actions -->
      <div class="pt-6 mt-6 border-t border-gray-100 space-y-3">
        <div class="flex justify-between items-center mb-4">
          <span class="text-sm font-bold text-gray-500">Total to pay</span>
          <span class="text-xl font-black text-gray-900">₦{{ appointment.price?.toLocaleString() || 0 }}</span>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button 
            v-if="appointment.status !== 'cancelled'"
            @click="handleUpdateStatus('cancelled')"
            :disabled="loading"
            class="w-full py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-md text-sm font-bold hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            Cancel Booking
          </button>
          
          <button 
            v-if="appointment.status === 'pending'"
            @click="handleUpdateStatus('confirmed')"
            :disabled="loading"
            class="w-full py-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-md text-sm font-bold hover:bg-blue-100 transition-colors disabled:opacity-50 col-span-2 sm:col-span-1"
          >
            Confirm Booking
          </button>
          
          <button 
            v-if="appointment.status === 'confirmed' || appointment.status === 'pending'"
            @click="handleUpdateStatus('completed')"
            :disabled="loading"
            class="w-full py-2.5 bg-gray-900 text-white rounded-md text-sm font-bold hover:bg-black transition-colors disabled:opacity-50 col-span-2"
          >
            Checkout (Complete)
          </button>
        </div>
      </div>

    </div>
  </UiSideDrawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Calendar, MessageCircle, User, Info } from 'lucide-vue-next';
import UiSideDrawer from '@/components/ui/SideDrawer.vue';

const props = defineProps<{
  isOpen: boolean;
  appointment: any;
  loading?: boolean;
}>();

const emit = defineEmits(['close', 'updateStatus']);

const clientInitials = computed(() => {
  if (!props.appointment?.user) return 'C';
  const f = props.appointment.user.firstName?.[0] || '';
  const l = props.appointment.user.lastName?.[0] || '';
  return (f + l).toUpperCase() || 'C';
});

const formattedDate = computed(() => {
  if (!props.appointment?.scheduledDate) return '';
  return new Date(props.appointment.scheduledDate).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
});

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'pending': 
      return { bg: 'bg-yellow-500', border: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-800' };
    case 'confirmed': 
      return { bg: 'bg-blue-500', border: 'bg-blue-500', badge: 'bg-blue-100 text-blue-800' };
    case 'completed': 
      return { bg: 'bg-emerald-500', border: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-800' };
    case 'cancelled': 
      return { bg: 'bg-red-500', border: 'bg-red-500', badge: 'bg-red-100 text-red-800' };
    default: 
      return { bg: 'bg-gray-500', border: 'bg-gray-500', badge: 'bg-gray-100 text-gray-800' };
  }
};

const handleUpdateStatus = (status: string) => {
  if (props.appointment) {
    emit('updateStatus', { id: props.appointment._id, status });
  }
};
</script>
