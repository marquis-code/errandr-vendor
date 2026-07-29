import { computed } from 'vue';
import { useCookie } from '#app';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
  matricNumber?: string;
}

export const useUser = () => {
  const token = useCookie<string | null>('errandr_vendor_token', {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    sameSite: 'lax',
  });
  
  const user = useCookie<User | null>('errandr_vendor_user', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
  });

  const setUser = (userData: User) => {
    user.value = userData;
    if (typeof window !== 'undefined') {
      const expires = new Date(Date.now() + 7 * 86400 * 1000).toUTCString();
      document.cookie = `errandr_vendor_user=${encodeURIComponent(JSON.stringify(userData))}; expires=${expires}; path=/; samesite=lax`;
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const setToken = (newToken: string) => {
    token.value = newToken;
    if (typeof window !== 'undefined') {
      const expires = new Date(Date.now() + 7 * 86400 * 1000).toUTCString();
      document.cookie = `errandr_vendor_token=${newToken}; expires=${expires}; path=/; samesite=lax`;
      localStorage.setItem('token', newToken);
    }
  };

  const logOut = () => {
    user.value = null;
    token.value = null;
    
    // Clear profile cookie as well so new vendor doesn't see old vendor's logo/data
    const profile = useCookie<any>('errandr_vendor_profile');
    profile.value = null;

    if (typeof window !== 'undefined') {
      localStorage.removeItem('errandr_cart');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Explicitly remove cookies at the browser level to ensure they're gone
      document.cookie = 'errandr_vendor_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=lax';
      document.cookie = 'errandr_vendor_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=lax';
      document.cookie = 'errandr_vendor_profile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=lax';

      if (window.location.pathname !== '/auth/login') {
        window.location.href = '/auth/login';
      }
    }
  };

  const isLoggedIn = computed(() => !!token.value);

  const fullName = computed(() => {
    if (!user.value) return '';
    return `${user.value.firstName} ${user.value.lastName}`;
  });

  return {
    user,
    token,
    setUser,
    setToken,
    logOut,
    isLoggedIn,
    fullName
  };
};
