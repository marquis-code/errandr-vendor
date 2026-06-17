<template>
  <UiSideDrawer 
    :isOpen="isOpen" 
    @close="$emit('close')"
    title="Waitlist"
  >
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-between mb-6">
        <div class="flex bg-gray-100 p-1 rounded-lg">
          <button class="px-4 py-1.5 text-sm font-semibold bg-white rounded-md text-gray-900">Waiting 0</button>
          <button class="px-4 py-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700">Expired 0</button>
          <button class="px-4 py-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700">Booked 0</button>
        </div>
      </div>

      <div class="flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
        <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-md flex items-center justify-center mb-6 transform -rotate-6">
          <CalendarDays class="w-8 h-8 text-white" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">No waitlist entries</h3>
        <p class="text-gray-500 max-w-[250px]">You don't have any clients on the waitlist at the moment.</p>
        
        <button class="mt-8 px-6 py-2 bg-parentPrimary text-white rounded-md text-sm font-bold hover:brightness-110 transition-all flex items-center gap-2">
          <Plus class="w-4 h-4" />
          Add to Waitlist
        </button>
      </div>
    </div>
  </UiSideDrawer>
</template>

<script setup lang="ts">
import { CalendarDays, Plus } from 'lucide-vue-next';
import UiSideDrawer from '@/components/ui/SideDrawer.vue';

defineProps<{
  isOpen: boolean;
}>();

defineEmits(['close']);
</script>
