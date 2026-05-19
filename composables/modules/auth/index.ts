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
      if (res?.type === 'ERROR') throw res;
      
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
      if (res?.type === 'ERROR') throw res;
      
      setUser(res.data.user);
      setToken(res.data.token);
      showToast({
        title: "Account Created!",
        message: "Welcome to Erranders.",
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

  const forgotPassword = async (email: string) => {
    loading.value = true;
    try {
      const res = await auth_api.forgotPassword(email);
      if (res?.type === 'ERROR') throw res;
      showToast({
        title: "OTP Sent!",
        message: "A password reset code has been sent to your email 📬",
        toastType: "success"
      });
      return res.data;
    } catch (e: any) {
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const verifyResetOtp = async (payload: { email: string; otp: string }) => {
    loading.value = true;
    try {
      const res = await auth_api.verifyResetOtp(payload);
      if (res?.type === 'ERROR') throw res;
      showToast({
        title: "Code Verified!",
        message: "You can now reset your password.",
        toastType: "success"
      });
      return res.data;
    } catch (e: any) {
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const resetPassword = async (payload: any) => {
    loading.value = true;
    try {
      const res = await auth_api.resetPassword(payload);
      if (res?.type === 'ERROR') throw res;
      showToast({
        title: "Password Updated!",
        message: "Your password has been successfully reset. Log in ✨",
        toastType: "success"
      });
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
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    fetchProfile,
    logOut
  };
};
