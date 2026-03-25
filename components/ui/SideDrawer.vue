<template>
 <Teleport to="body">
 <div class="z-[100]">
 <Transition name="fade">
 <div v-if="isOpen" class="fixed inset-0 bg-gray-900/40 backdrop-blur-[2px] transition-opacity" @click="$emit('close')" aria-hidden="true" />
 </Transition>

 <Transition name="drawer">
 <div v-if="isOpen" class="fixed inset-y-0 right-0 w-full max-w-lg h-full bg-white shadow-[-20px_0_50px_-12px_rgba(0,0,0,0.1)] flex flex-col pointer-events-auto z-[101]">
 
 <!-- Header -->
 <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
 <div>
 <h2 v-if="title" class="text-xl font-black text-gray-900 tracking-tight">{{ title }}</h2>
 <p v-if="subtitle" class="text-[10px] font-bold text-gray-400 tracking-widest mt-1">{{ subtitle }}</p>
 </div>
 <button 
 type="button" 
 class="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all active:scale-95" 
 @click="$emit('close')"
 >
 <X class="w-5 h-5" />
 </button>
 </div>

 <!-- Scrollable Content -->
 <div class="flex-1 overflow-y-auto hide-scrollbar p-8">
 <slot></slot>
 </div>

 <!-- Optional Footer Slot (e.g., for Action Buttons) -->
 <div v-if="$slots.footer" class="px-8 py-6 border-t border-gray-100 bg-gray-50/50">
 <slot name="footer"></slot>
 </div>
 </div>
 </Transition>
 </div>
 </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next';

defineProps<{
 isOpen: boolean;
 title?: string;
 subtitle?: string;
}>();

defineEmits(['close']);
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
 transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from {
 transform: translateX(100%);
}

.drawer-leave-to {
 transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
 transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
 opacity: 0;
}

.hide-scrollbar::-webkit-scrollbar {
 display: none;
}
.hide-scrollbar {
 -ms-overflow-style: none;
 scrollbar-width: none;
}
</style>
