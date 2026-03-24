<template>
 <div class="relative" ref="containerRef">
 <!-- Trigger Field -->
 <div
 @click="open = !open"
 class="flex items-center w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-all group"
 :class="{ 'border-[#065fdb] ring-2 ring-[#065fdb]/10': open }"
 >
 <Clock class="w-4 h-4 text-gray-400 mr-3 shrink-0" />
 <div class="flex-1 min-w-0">
 <p v-if="label" class="text-[10px] font-bold text-gray-400 tracking-widest mb-0.5">{{ label }}</p>
 <p class="text-sm font-bold text-gray-900">{{ displayTime }}</p>
 </div>
 <ChevronDown class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors shrink-0" :class="{ 'rotate-180': open }" />
 </div>

 <!-- Picker Dropdown -->
 <Transition name="picker-fade">
 <div v-if="open" class="absolute z-50 top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-gray-900/10 overflow-hidden" style="min-width: 260px;">
 <!-- Header -->
 <div class="bg-[#065fdb] px-5 py-4 flex items-center justify-between">
 <div>
 <p class="text-[10px] font-bold text-white/60 tracking-widest">Select Time</p>
 <p class="text-xl font-black text-white tracking-tight mt-0.5">{{ padZero(hour) }}:{{ padZero(minute) }} {{ period }}</p>
 </div>
 <button @click="open = false" class="text-white/60 hover:text-white transition-colors">
 <X class="w-5 h-5" />
 </button>
 </div>

 <!-- Spinners -->
 <div class="flex items-center justify-center gap-4 py-8 px-6">
 <!-- Hour -->
 <div class="flex flex-col items-center gap-1">
 <button @click="incrementHour" class="w-10 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
 <ChevronUp class="w-5 h-5" />
 </button>
 <div class="w-16 h-16 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
 <span class="text-3xl font-black text-gray-900 tracking-tighter">{{ padZero(hour) }}</span>
 </div>
 <button @click="decrementHour" class="w-10 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
 <ChevronDown class="w-5 h-5" />
 </button>
 </div>

 <span class="text-2xl font-black text-gray-300 pt-0">:</span>

 <!-- Minute -->
 <div class="flex flex-col items-center gap-1">
 <button @click="incrementMinute" class="w-10 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
 <ChevronUp class="w-5 h-5" />
 </button>
 <div class="w-16 h-16 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
 <span class="text-3xl font-black text-gray-900 tracking-tighter">{{ padZero(minute) }}</span>
 </div>
 <button @click="decrementMinute" class="w-10 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
 <ChevronDown class="w-5 h-5" />
 </button>
 </div>
 </div>

 <!-- AM/PM Toggle -->
 <div class="flex gap-2 px-6 pb-4">
 <button
 @click="period = 'AM'"
 class="flex-1 py-3 rounded-xl text-sm font-bold tracking-widest transition-all"
 :class="period === 'AM' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'"
 >AM</button>
 <button
 @click="period = 'PM'"
 class="flex-1 py-3 rounded-xl text-sm font-bold tracking-widest transition-all"
 :class="period === 'PM' ? 'bg-[#065fdb] text-white shadow-md shadow-[#065fdb]/20' : 'text-gray-400 hover:text-gray-600'"
 >PM</button>
 </div>

 <!-- Footer Actions -->
 <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
 <button @click="setNow" class="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-white transition-all">Now</button>
 <div class="flex items-center gap-2">
 <button @click="clearTime" class="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-700 transition-colors">Clear</button>
 <button @click="confirmTime" class="px-6 py-2.5 bg-[#065fdb] text-white rounded-xl text-xs font-bold tracking-widest hover:brightness-110 transition-all shadow-md shadow-[#065fdb]/20">Confirm</button>
 </div>
 </div>
 </div>
 </Transition>
 </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Clock, ChevronDown, ChevronUp, X } from 'lucide-vue-next'

const props = defineProps<{
 modelValue: string
 label?: string
}>()

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const hour = ref(8)
const minute = ref(0)
const period = ref<'AM' | 'PM'>('AM')

const padZero = (n: number) => n.toString().padStart(2, '0')

const displayTime = computed(() => {
 if (!props.modelValue) return 'Select time'
 return `${padZero(hour.value)}:${padZero(minute.value)} ${period.value}`
})

// Parse modelValue on mount
const parseModelValue = () => {
 if (!props.modelValue) return
 const val = props.modelValue.trim()
 // Handle "08:00 AM" format
 const match = val.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i)
 if (match) {
 let h = parseInt(match[1])
 minute.value = parseInt(match[2])
 if (match[3]) {
 period.value = match[3].toUpperCase() as 'AM' | 'PM'
 hour.value = h > 12 ? h - 12 : (h === 0 ? 12 : h)
 } else {
 // 24hr format
 if (h >= 12) { period.value = 'PM'; hour.value = h === 12 ? 12 : h - 12; }
 else { period.value = 'AM'; hour.value = h === 0 ? 12 : h; }
 }
 }
}

watch(() => props.modelValue, parseModelValue, { immediate: true })

const incrementHour = () => { hour.value = hour.value >= 12 ? 1 : hour.value + 1 }
const decrementHour = () => { hour.value = hour.value <= 1 ? 12 : hour.value - 1 }
const incrementMinute = () => { minute.value = minute.value >= 55 ? 0 : minute.value + 5 }
const decrementMinute = () => { minute.value = minute.value <= 0 ? 55 : minute.value - 5 }

const setNow = () => {
 const now = new Date()
 let h = now.getHours()
 minute.value = Math.round(now.getMinutes() / 5) * 5
 if (minute.value === 60) { minute.value = 0; h++ }
 period.value = h >= 12 ? 'PM' : 'AM'
 hour.value = h > 12 ? h - 12 : (h === 0 ? 12 : h)
}

const clearTime = () => {
 emit('update:modelValue', '')
 open.value = false
}

const confirmTime = () => {
 const formatted = `${padZero(hour.value)}:${padZero(minute.value)} ${period.value}`
 emit('update:modelValue', formatted)
 open.value = false
}

// Close on outside click
const handleClickOutside = (e: MouseEvent) => {
 if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
 open.value = false
 }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.picker-fade-enter-active { transition: all 0.2s ease-out; }
.picker-fade-leave-active { transition: all 0.15s ease-in; }
.picker-fade-enter-from { opacity: 0; transform: translateY(-8px) scale(0.96); }
.picker-fade-leave-to { opacity: 0; transform: translateY(-4px) scale(0.98); }
</style>
