<template>
 <div class="bg-white rounded-md border border-gray-200 overflow-hidden flex flex-col min-h-[400px]">
 <!-- Table Body -->
  <div class="overflow-hidden">
  <table class="w-full text-left border-collapse block md:table">
  <thead class="bg-gray-50/30 sticky top-0 z-10 hidden md:table-header-group">
  <tr class="border-b border-gray-200">
  <th 
  v-for="col in columns" 
  :key="col.key" 
  class="px-8 py-5 text-sm font-medium text-gray-400 whitespace-nowrap"
  :class="col.class"
  >
  {{ col.label }}
  </th>
  <th v-if="hasActions" class="px-8 py-5 text-sm font-medium text-gray-400 text-right">Actions</th>
  </tr>
  </thead>
  <tbody class="divide-y divide-gray-200 block md:table-row-group">
  <tr v-if="loading" v-for="i in 5" :key="i" class="animate-pulse block md:table-row p-4 md:p-0">
  <td v-for="col in (hasActions ? columns.length + 1 : columns.length)" :key="col" class="block md:table-cell px-4 py-2 md:px-8 md:py-6">
  <div class="h-4 bg-gray-50 rounded-lg w-full"></div>
  </td>
  </tr>
  
  <tr v-else-if="items.length === 0" class="block md:table-row">
  <td :colspan="hasActions ? columns.length + 1 : columns.length" class="block md:table-cell px-4 py-16 md:px-8 md:py-32 text-center">
  <div class="flex flex-col items-center justify-center max-w-xs mx-auto">
  <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
  <component :is="emptyIcon || Inbox" class="w-8 h-8 text-gray-200" />
  </div>
  <h4 class="font-medium text-gray-900 text-lg tracking-tight">{{ emptyTitle || 'No items found' }}</h4>
  <p class="text-gray-400 text-sm mt-2 font-medium leading-relaxed">{{ emptySubtitle || 'Wait for data or try adjusting your filters.' }}</p>
  </div>
  </td>
  </tr>

  <tr 
  v-else 
  v-for="(item, idx) in items" 
  :key="item._id || idx" 
  class="hover:bg-gray-50/80 transition-all group border-b border-gray-100 md:border-gray-200 last:border-0 block md:table-row p-5 md:p-0 mb-3 md:mb-0 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none"
  >
  <td 
  v-for="(col, cIdx) in columns" 
  :key="col.key" 
  class="block md:table-cell px-0 py-2 md:px-8 md:py-6 text-sm font-medium text-gray-700 whitespace-normal md:whitespace-nowrap"
  :class="[col.class, cIdx === 0 ? 'mb-3 md:mb-0' : '']"
  >
  <div class="flex flex-col md:block">
  <span v-if="cIdx !== 0" class="md:hidden text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider">{{ col.label }}</span>
  <div>
  <slot :name="col.key" :item="item" :index="idx">
  {{ item[col.key] }}
  </slot>
  </div>
  </div>
  </td>
  <td v-if="hasActions" class="block md:table-cell px-0 py-3 md:px-8 md:py-6 text-left md:text-right whitespace-nowrap mt-3 md:mt-0 border-t border-gray-50 md:border-0">
  <div class="flex items-center justify-end md:justify-end w-full">
  <slot name="actions" :item="item" :index="idx"></slot>
  </div>
  </td>
  </tr>
  </tbody>
  </table>
  </div>

 <!-- Optional Footer / Pagination (Placeholder for now) -->
 <div v-if="showFooter" class="p-8 border-t border-gray-200 bg-gray-50/20 flex items-center justify-between">
 <slot name="footer"></slot>
 </div>
 </div>
</template>

<script setup lang="ts">
import { Inbox } from 'lucide-vue-next';

interface Column {
 key: string;
 label: string;
 class?: string;
}

defineProps<{
 columns: Column[];
 items: any[];
 loading?: boolean;
 hasActions?: boolean;
 showFooter?: boolean;
 emptyTitle?: string;
 emptySubtitle?: string;
 emptyIcon?: any;
}>();
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
 display: none;
}
.hide-scrollbar {
 -ms-overflow-style: none;
 scrollbar-width: none;
}
</style>
