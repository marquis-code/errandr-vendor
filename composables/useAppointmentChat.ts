import { ref, onUnmounted, computed } from 'vue';
import { useSocket } from '@/composables/useSocket';
import { GATEWAY_ENDPOINT_WITH_AUTH as api } from '@/api_factory/axios.config';

interface Message {
  _id: string;
  appointmentId: string;
  senderId: string;
  receiverId: string;
  message: string;
  messageType?: 'text' | 'image' | 'voice';
  attachment?: string;
  sender?: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  createdAt: string;
}

export const useAppointmentChat = (appointmentId: string, currentUserId?: string, targetUserId?: string) => {
  const { connect, emit, on, off } = useSocket('chat');
  const messages = ref<Message[]>([]);
  const loading = ref(false);
  const isTyping = ref(false);
  const typingTimeout = ref<any>(null);

  const fetchMessages = async () => {
    loading.value = true;
    try {
      const res = await api.get(`/chat/appointment/${appointmentId}`);
      messages.value = (res.data || []).map((m: any) => ({
        ...m,
        senderId: m.senderId || m.sender?._id || m.sender,
        receiverId: m.receiverId || m.receiver?._id || m.receiver,
      }));
    } catch (e) {
      console.error('Failed to fetch messages', e);
    } finally {
      loading.value = false;
    }
  };

  const sendMessage = (text: string, receiverId: string, senderId: string, type: 'text' | 'image' | 'voice' = 'text', attachment?: string) => {
    emit('sendMessage', {
      appointmentId,
      roomType: 'direct',
      senderId,
      receiverId,
      message: text,
      messageType: type,
      attachment
    });
  };

  const sendTyping = (userId: string) => {
    emit('typing', { appointmentId, roomType: 'direct', userId });
    if (typingTimeout.value) clearTimeout(typingTimeout.value);
    typingTimeout.value = setTimeout(() => {
      emit('stopTyping', { appointmentId, roomType: 'direct', userId });
    }, 2000);
  };

  const setupListeners = () => {
    connect();
    
    off('newMessage');
    off('userTyping');
    
    emit('joinAppointment', { appointmentId, roomType: 'direct' });

    on('newMessage', (message: any) => {
      const msgAppointmentId = message.appointmentId || message.appointment;
      if (msgAppointmentId === appointmentId) {
        // Removed overly restrictive user filter; appointmentId is enough.

        if (!message._id || !messages.value.some(m => m._id === message._id)) {
          messages.value.push(message);
        }
      }
    });

    on('userTyping', (data: { userId: string, isTyping: boolean }) => {
      isTyping.value = data.isTyping;
    });
  };

  onUnmounted(() => {
    emit('leaveAppointment', { appointmentId, roomType: 'direct' });
  });

  return {
    messages,
    loading,
    isTyping,
    fetchMessages,
    sendMessage,
    sendTyping,
    setupListeners
  };
};
