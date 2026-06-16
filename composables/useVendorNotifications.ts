import { getToken, onMessage } from 'firebase/messaging';
import { useNuxtApp, useRuntimeConfig } from '#app';
import { vendors_api } from '@/api_factory/modules/vendors';

export const useVendorNotifications = () => {
  const { $messaging } = useNuxtApp();
  const config = useRuntimeConfig();

  const requestPermissionAndRegister = async () => {
    if (!$messaging) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Register SW with query params for config
        const swUrl = `/firebase-messaging-sw.js?apiKey=${config.public.firebaseApiKey}&projectId=${config.public.firebaseProjectId}&messagingSenderId=${config.public.firebaseMessagingSenderId}&appId=${config.public.firebaseAppId}`;
        
        const registration = await navigator.serviceWorker.register(swUrl);
        
        const currentToken = await getToken($messaging, { 
          vapidKey: config.public.firebaseVapidKey,
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
        const audio = new Audio('/order-alert.mp3');
        audio.play().catch(e => console.log('Audio play prevented:', e));
      } catch (e) {}

      // You could also trigger a Toast/Alert here using your UI library
      if (payload.notification) {
        // Example: showing a toast (depends on your UI setup)
        // toast.success(payload.notification.title, { description: payload.notification.body })
      }
    });
  };

  return {
    requestPermissionAndRegister,
    listenForOrders
  };
};
