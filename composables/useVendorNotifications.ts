import { getToken, onMessage } from 'firebase/messaging';
import { useNuxtApp, useRuntimeConfig } from '#app';
import { vendors_api } from '@/api_factory/modules/vendors';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useVendorNotifications = () => {
  const { $messaging } = useNuxtApp();
  const config = useRuntimeConfig();
  const { showToast } = useCustomToast();

  const requestPermissionAndRegister = async () => {
    if (!$messaging) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const swUrl = `/firebase-messaging-sw.js?apiKey=${config.public.firebaseApiKey}&projectId=${config.public.firebaseProjectId}&messagingSenderId=${config.public.firebaseMessagingSenderId}&appId=${config.public.firebaseAppId}`;
        const registration = await navigator.serviceWorker.register(swUrl);
        
        const currentToken = await getToken($messaging, { 
          vapidKey: config.public.firebaseVapidKey || 'BJJs2JX_V36p-9sfug38GwMMGDWSQMObywAkys73EXlJgLEsiQaF6nRMDzVVjdgDb-MHJyw3Q_atT6KaluQN41I',
          serviceWorkerRegistration: registration
        });
        
        if (currentToken) {
          console.log('FCM Token:', currentToken);
          // Send to backend
          await vendors_api.updateFcmToken({ fcmToken: currentToken });
        }
      }
    } catch (e) {
      console.error('Error getting notification permission:', e);
    }
  };

  const listenForOrders = () => {
    if (!$messaging) return;
    
    onMessage($messaging, (payload) => {
      console.log('Foreground message received:', payload);
      
      // Play sound
      try {
        const audio = new Audio('/sounds/order-alert.mp3');
        audio.play().catch(e => console.log('Audio play prevented:', e));
      } catch (e) {}

      const title = payload.notification?.title || payload.data?.title || 'New Notification';
      const body = payload.notification?.body || payload.data?.body || 'You have a new message';

      showToast({
        title: title,
        message: body,
        toastType: 'info'
      });
    });
  };

  return {
    requestPermissionAndRegister,
    listenForOrders
  };
};
