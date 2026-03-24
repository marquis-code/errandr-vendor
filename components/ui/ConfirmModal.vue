<template>
 <Transition name="fade">
 <div v-if="isOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
 <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity" @click="$emit('cancel')"></div>
 
 <div class="relative bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full overflow-hidden transform transition-all group border border-white">
 <div class="p-10 text-center">
 <div :class="variantClass" class="w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-white transition-transform group-hover:scale-110">
 <component :is="icon || (variant === 'danger' ? 'AlertTriangle' : 'HelpCircle')" class="w-10 h-10" />
 </div>
 
 <h3 class="text-2xl font-black text-gray-900 tracking-tight leading-none mb-3">{{ title }}</h3>
 <p class="text-gray-500 font-medium leading-relaxed px-4">{{ message }}</p>
 </div>
 
 <div class="p-8 bg-gray-50/50 flex flex-col sm:flex-row gap-4 border-t border-gray-100">
 <button 
 type="button" 
 class="flex-1 py-4 px-6 bg-white border border-gray-100 text-gray-400 text-[10px] font-black tracking-widest rounded-2xl hover:bg-gray-100 hover:text-gray-900 transition-all active:scale-95 shadow-sm"
 @click="$emit('cancel')"
 >
 Go Back
 </button>
 <button 
 type="button" 
 :class="confirmBtnClass"
 class="flex-1 py-4 px-6 text-[10px] font-black tracking-widest rounded-2xl shadow-lg transition-all active:scale-95"
 @click="$emit('confirm')"
 >
 {{ confirmText || 'Proceed' }}
 </button>
 </div>
 </div>
 </div>
 </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { AlertTriangle, HelpCircle, Trash2, CheckCircle } from 'lucide-vue-next';

const props = defineProps<{
 isOpen: boolean;
 title: string;
 message: string;
 confirmText?: string;
 variant?: 'danger' | 'warning' | 'success' | 'info';
 icon?: any;
}>();

defineEmits(['confirm', 'cancel']);

const variantClass = computed(() => {
 switch (props.variant) {
 case 'danger': return 'bg-red-50 text-red-500';
 case 'warning': return 'bg-amber-50 text-amber-500';
 case 'success': return 'bg-emerald-50 text-emerald-500';
 default: return 'bg-blue-50 text-[#065fdb]';
 }
});

const confirmBtnClass = computed(() => {
 switch (props.variant) {
 case 'danger': return 'bg-red-500 text-white hover:bg-red-600 shadow-red-200';
 case 'warning': return 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200';
 case 'success': return 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200';
 default: return 'bg-[#065fdb] text-white hover:bg-[#054db3] shadow-blue-200';
 }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
 transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from, .fade-leave-to {
 opacity: 0;
 transform: scale(0.95);
}
</style>
