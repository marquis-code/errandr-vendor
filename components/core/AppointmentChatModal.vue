<template>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-[999] flex justify-end animate-fade-in font-sans pb-10 sm:pb-0">
        <!-- Backdrop -->
        <div @click="close" class="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity" />
        
        <!-- Chat Panel -->
        <div class="relative w-full max-w-md bg-[#E5DDD5] h-full flex flex-col animate-slide-left overflow-hidden min-h-0">
          <!-- WhatsApp Green Header -->
          <div class="px-4 py-3 bg-[#075E54] text-white flex items-center gap-3 sticky top-0 z-20 shadow-sm">
            <button @click="close" class="p-1 hover:bg-white/10 rounded-md transition-colors mr-1">
              <X class="w-5 h-5 text-white" />
            </button>
          <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold overflow-hidden border border-white/10">
            <img v-if="studentAvatar" :src="studentAvatar" class="w-full h-full object-cover" />
            <span v-else class="text-white">{{ studentInitials }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-base font-bold truncate leading-tight">{{ studentName }}</h3>
            <p class="text-[11px] text-white/70 font-medium truncate">
              Student
            </p>
          </div>
        </div>

        <!-- Messages Area (WhatsApp patterned background) -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4" style="background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'); background-repeat: repeat; opacity: 0.95" ref="messagesContainer">
          <div v-if="loading" class="flex justify-center py-8">
            <Loader2 class="w-8 h-8 text-gray-500 animate-spin" />
          </div>
          
          <template v-else-if="messages.length > 0">
            <div 
              v-for="msg in messages" 
              :key="msg._id"
              class="flex flex-col max-w-[85%]"
              :class="msg.senderId === currentUserId ? 'ml-auto items-end' : 'mr-auto items-start'"
            >
              <div 
                class="px-3 py-2 rounded-lg text-sm shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] relative"
                :class="msg.senderId === currentUserId 
                  ? 'bg-[#dcf8c6] text-[#303030] rounded-tr-none' 
                  : 'bg-white text-[#303030] rounded-tl-none'"
              >
                <div class="break-words pr-12">{{ msg.message }}</div>
                <span class="text-[10px] text-gray-500 absolute bottom-1 right-2">{{ formatTime(msg.createdAt) }}</span>
              </div>
            </div>
          </template>

          <div v-else class="h-full flex flex-col items-center justify-center text-gray-500 space-y-3 bg-white/60 mx-4 p-4 rounded-xl shadow-sm backdrop-blur-sm">
            <MessageSquare class="w-8 h-8 text-gray-400" />
            <p class="text-sm font-medium text-center">Send a message to start the conversation.</p>
          </div>
        </div>

        <!-- Input Area -->
        <div class="px-2 py-2 bg-[#f0f0f0] flex items-end gap-2 border-t border-gray-200">
          <div class="flex-1 bg-white rounded-2xl flex items-end shadow-sm">
            <textarea
              v-model="newMessage"
              rows="1"
              placeholder="Type a message"
              class="w-full bg-transparent border-0 px-4 py-3 text-[15px] focus:outline-none resize-none max-h-32 text-gray-800 placeholder-gray-500"
              @keydown.enter.prevent="handleEnter"
              ref="inputRef"
              @input="adjustHeight"
            ></textarea>
          </div>
          <button 
            @click.prevent="submitMessage"
            :disabled="!newMessage.trim() || sending"
            class="w-12 h-12 bg-[#00a884] text-white rounded-full flex items-center justify-center flex-shrink-0 hover:bg-[#008f6f] disabled:opacity-50 transition-colors shadow-sm"
          >
            <Send class="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { X, Send, Loader2, MessageSquare } from 'lucide-vue-next';
import { useAppointmentChat } from '@/composables/useAppointmentChat';
import { useUser } from '@/composables/modules/auth/user';

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  appointmentId: { type: String, required: true },
  studentId: { type: String, required: true },
  studentName: { type: String, default: 'Student' },
  studentAvatar: { type: String, default: '' },
});

const emit = defineEmits(['close']);

const { user } = useUser();
const currentUserId = computed(() => (user.value as any)?._id || (user.value as any)?.id);

const { messages, loading, fetchMessages, sendMessage, setupListeners } = useAppointmentChat(
  props.appointmentId,
  currentUserId.value,
  props.studentId
);

const newMessage = ref('');
const sending = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLTextAreaElement | null>(null);

const studentInitials = computed(() => {
  if (!props.studentName) return 'S';
  return props.studentName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
});

const formatTime = (dateStr: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

const adjustHeight = () => {
  if (inputRef.value) {
    inputRef.value.style.height = 'auto';
    inputRef.value.style.height = Math.min(inputRef.value.scrollHeight, 128) + 'px';
  }
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const handleEnter = (e: KeyboardEvent) => {
  if (e.shiftKey) return;
  submitMessage();
};

const submitMessage = async () => {
  const text = newMessage.value.trim();
  if (!text || sending.value || !currentUserId.value) return;

  sending.value = true;
  try {
    sendMessage(text, props.studentId, currentUserId.value);
    newMessage.value = '';
    adjustHeight();
    scrollToBottom();
  } finally {
    sending.value = false;
  }
};

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    await fetchMessages();
    setupListeners();
    scrollToBottom();
  }
});

watch(messages, () => {
  scrollToBottom();
}, { deep: true });

const close = () => {
  emit('close');
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}

.animate-slide-left {
  animation: slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideLeft {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.15);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.25);
}
</style>
