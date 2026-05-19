<template>
  <Teleport to="body">
    <div class="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] flex flex-col gap-3 max-w-[420px] w-full items-center px-4">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'toast-base',
            {
              'border-l-4 border-l-rose-500': toast.type === 'error',
              'border-l-4 border-l-emerald-500': toast.type === 'success',
              'border-l-4 border-l-amber-500': toast.type === 'warning',
              'border-l-4 border-l-blue-500': toast.type === 'info'
            }
          ]"
          class="w-full rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-xl p-4 flex items-start gap-3.5 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-300"
          @click="removeToast(toast.id)"
        >
          <!-- Status Icon container -->
          <div class="flex-shrink-0 mt-0.5">
            <div :class="[
              'w-9 h-9 rounded-xl flex items-center justify-center shadow-sm',
              {
                'bg-rose-50 text-rose-600': toast.type === 'error',
                'bg-emerald-50 text-emerald-600': toast.type === 'success', 
                'bg-amber-50 text-amber-600': toast.type === 'warning',
                'bg-blue-50 text-blue-600': toast.type === 'info'
              }
            ]">
              <CheckCircle v-if="toast.type === 'success'" :size="20" class="stroke-[2.5]" />
              <AlertCircle v-else-if="toast.type === 'error'" :size="20" class="stroke-[2.5]" />
              <AlertTriangle v-else-if="toast.type === 'warning'" :size="20" class="stroke-[2.5]" />
              <Info v-else :size="20" class="stroke-[2.5]" />
            </div>
          </div>
          
          <!-- Content Container -->
          <div class="flex-1 min-w-0">
            <!-- Toast Title (if exists, or fall back to capitalized type) -->
            <h4 class="font-black text-sm text-gray-900 leading-snug tracking-tight">
              {{ toast.title || (toast.type.charAt(0).toUpperCase() + toast.type.slice(1)) }}
            </h4>
            <!-- Toast Message -->
            <p class="text-xs font-bold text-gray-500 leading-relaxed mt-0.5">
              {{ toast.message }}
            </p>
          </div>
          
          <!-- Close button hint -->
          <div class="flex-shrink-0 self-center text-gray-300 hover:text-gray-500 transition-colors pl-2">
            <X :size="16" />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-vue-next'

interface Toast {
  id: number
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration: number
  timeoutId?: number
}

const toasts = ref<Toast[]>([])
let toastCounter = 0

// Create a new toast
const showToast = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 5000) => {
  const id = toastCounter++
  const newToast: Toast = { id, title, message, type, duration }
  
  toasts.value.push(newToast)
  
  // Auto-remove toast after duration
  const timeoutId = window.setTimeout(() => {
    removeToast(id)
  }, duration)
  
  // Store timeout ID for cleanup
  newToast.timeoutId = timeoutId
  
  return id
}

// Remove a toast by ID
const removeToast = (id: number) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index !== -1) {
    // Clear the timeout if it exists
    if (toasts.value[index].timeoutId) {
      clearTimeout(toasts.value[index].timeoutId)
    }
    toasts.value.splice(index, 1)
  }
}

// IMPORTANT: Explicitly expose methods to parent components
defineExpose({
  showToast,
  removeToast
})
</script>

<style scoped>
/* Animations */
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.7, 0, 0.84, 0);
}

.toast-enter-from {
  transform: translateY(-40px) scale(0.95);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}

.toast-base {
  transition: all 0.2s ease-in-out;
}

.toast-base:hover {
  transform: translateY(1px);
}
</style>