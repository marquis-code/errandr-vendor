<template>
  <div class="h-screen w-full flex flex-col font-sans relative overflow-hidden bg-white">
    <!-- Header / Toolbar -->
    <header class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white z-20 shrink-0">
      
      <!-- Left: Navigation & Date -->
      <div class="flex items-center gap-4">
        <button 
          @click="selectDate(new Date())"
          class="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none"
        >
          Today
        </button>
        
        <div class="flex items-center gap-1 bg-gray-50 rounded-xl p-1 border border-gray-200">
          <button @click="addDays(-1)" class="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all">
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button @click="addDays(1)" class="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all">
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>

        <!-- Custom Date Picker Dropdown -->
        <DatePickerPopover v-model="currentDate" @update:modelValue="onDateChanged" />
        
        <!-- Filter Mockup -->
        <button class="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors ml-2">
          <SlidersHorizontal class="w-4 h-4" />
        </button>
      </div>

      <!-- Right: Waitlist & Add -->
      <div class="flex items-center gap-3">
        <button 
          @click="isWaitlistOpen = true"
          class="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2"
        >
          <Users class="w-4 h-4" /> Waitlist
        </button>

        <button class="px-4 py-2 text-sm font-bold text-white bg-gray-900 hover:bg-black rounded-xl shadow-md transition-all flex items-center gap-2">
          Add <ChevronDown class="w-4 h-4 opacity-70" />
        </button>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-hidden relative bg-white">
      <div v-if="loading && !appointmentsList.length" class="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
      
      <div class="h-full p-4 overflow-y-auto no-scrollbar">
        <CalendarGrid 
          :appointments="todaysAppointments" 
          @select="openAppointmentDetails" 
        />
      </div>
    </main>

    <!-- Side Drawers -->
    <WaitlistDrawer 
      :isOpen="isWaitlistOpen" 
      @close="isWaitlistOpen = false" 
    />
    
    <AppointmentDrawer 
      :isOpen="isAppointmentDrawerOpen"
      :appointment="selectedAppointment"
      :loading="loading"
      @close="isAppointmentDrawerOpen = false"
      @updateStatus="handleStatusUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { ChevronLeft, ChevronRight, ChevronDown, SlidersHorizontal, Users } from 'lucide-vue-next';
import { useVendorAppointments } from '@/composables/modules/appointments';

// Import our new components
import DatePickerPopover from '@/components/appointments/DatePickerPopover.vue';
import CalendarGrid from '@/components/appointments/CalendarGrid.vue';
import WaitlistDrawer from '@/components/appointments/WaitlistDrawer.vue';
import AppointmentDrawer from '@/components/appointments/AppointmentDrawer.vue';

definePageMeta({ layout: 'vendor' });
useHead({ title: 'Appointments - Errander Vendor' });

const { appointmentsList, loading, fetchAppointments, updateStatus } = useVendorAppointments();

// State
const currentDate = ref(new Date());
const isWaitlistOpen = ref(false);
const isAppointmentDrawerOpen = ref(false);
const selectedAppointment = ref(null);

// Computeds
const todaysAppointments = computed(() => {
  return appointmentsList.value.filter(app => {
    if (!app.scheduledDate) return false;
    const appDate = new Date(app.scheduledDate);
    return appDate.toDateString() === currentDate.value.toDateString();
  });
});

// Methods
const selectDate = (date: Date) => {
  currentDate.value = date;
  fetchAppointmentsForDate(date);
};

const addDays = (days: number) => {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() + days);
  selectDate(newDate);
};

const onDateChanged = (newDate: Date) => {
  fetchAppointmentsForDate(newDate);
};

const fetchAppointmentsForDate = (date: Date) => {
  // Pass the ISO string of the date to backend to fetch specific day's data
  // The backend handles query.date
  fetchAppointments({ date: date.toISOString() });
};

const openAppointmentDetails = (app: any) => {
  selectedAppointment.value = app;
  isAppointmentDrawerOpen.value = true;
};

const handleStatusUpdate = async ({ id, status }: { id: string, status: string }) => {
  const success = await updateStatus(id, status);
  if (success && selectedAppointment.value && selectedAppointment.value._id === id) {
    selectedAppointment.value = { ...selectedAppointment.value, status };
  }
};

onMounted(() => {
  fetchAppointmentsForDate(currentDate.value);
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
