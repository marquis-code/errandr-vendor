import { ref } from 'vue';
import { auth_api } from '@/api_factory/modules/auth';
import { useUser } from './user';
import { navigateTo } from '#imports';
import { useCustomToast } from '@/composables/core/useCustomToast';

export const useAuth = () => {
  const { setUser, setToken, logOut } = useUser();
  const { showToast } = useCustomToast();
  const loading = ref(false);

  const login = async (payload: any) => {
    loading.value = true;
    try {
      const res = await auth_api.login(payload);
      
      // Handle potential response wrapping (res.data or res.data.data)
      const responseData = res.data?.data || res.data;
      const userData = responseData?.user;
      const tokenValue = responseData?.token;
      
      if (!userData || !tokenValue) {
        throw { data: { message: 'Login failed: unexpected response format' } };
      }
      
      setUser(userData);
      setToken(tokenValue);
      
      showToast({
        title: "Welcome Back!",
        message: "You've successfully logged in.",
        toastType: "success",
      });
      
      // Navigate to dashboard after setting credentials
      try {
        await navigateTo('/dashboard/orders');
      } catch (navError) {
        // Navigation aborts are expected in Nuxt — ignore them
      }
      
      return responseData;
    } catch (e: any) {
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const register = async (payload: any, options?: { skipRedirect?: boolean }) => {
    loading.value = true;
    try {
      const res = await auth_api.register(payload);
      setUser(res.data.user);
      setToken(res.data.token);
      showToast({
        title: "Account Created!",
        message: "Welcome to Errandr.",
        toastType: "success",
      });
      if (!options?.skipRedirect) {
        navigateTo('/');
      }
      return res.data;
    } catch (e: any) {
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await auth_api.getProfile();
      setUser(res.data);
    } catch (e) {
      logOut();
    }
  };

  return {
    loading,
    login,
    register,
    fetchProfile,
    logOut
  };
};
