<template>
  <div class="min-h-screen w-full bg-white sm:bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
    <!-- Ambient Background -->
    <div class="absolute top-0 left-0 w-[600px] h-[600px] bg-parentPrimary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

    <div class="w-full max-w-[420px] relative z-10">
      <!-- Back to Home -->
      <NuxtLink to="/" class="absolute -top-16 left-0 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
        <ArrowLeft class="w-4 h-4" /> Back to website
      </NuxtLink>

      <!-- Main Content -->
      <div class="w-full">
        
        <!-- Header -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-parentPrimary/10 text-parentPrimary mb-6 shadow-inner">
            <Store class="w-8 h-8" />
          </div>
          <h1 class="text-3xl font-black text-gray-900 tracking-tight mb-2">Welcome Back</h1>
          <p class="text-gray-500 font-medium text-sm">Sign in to your merchant dashboard</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <UiAnimatedInput 
            v-model="email" 
            type="email" 
            label="Email Address" 
            :hasError="!!validationErrors.email"
            :errorMessage="validationErrors.email"
            @input="validationErrors.email = ''" 
          />
          
          <div class="space-y-2">
            <UiAnimatedInput 
              v-model="password" 
              type="password" 
              label="Password" 
              :hasError="!!validationErrors.password"
              :errorMessage="validationErrors.password"
              @input="validationErrors.password = ''" 
            />
            <div class="flex justify-end">
              <NuxtLink to="/auth/forgot-password" class="text-[13px] font-bold text-parentPrimary hover:text-[#E54D12] transition-colors">
                Forgot password?
              </NuxtLink>
            </div>
          </div>

          <transition name="fade">
            <div v-if="error" class="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-2xl text-[13px] font-bold text-red-600">
              <AlertCircle class="w-4 h-4 shrink-0" />
              {{ error }}
            </div>
          </transition>

          <button type="submit" :disabled="loading"
            class="w-full py-4 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-2xl font-black text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl shadow-[#FF5C1A]/20 group active:scale-[0.98]">
            <Loader2 v-if="loading" class="animate-spin w-5 h-5" />
            <span v-else>Sign In</span>
            <ArrowRight v-if="!loading" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <!-- Footer -->
        <div class="mt-10 text-center pt-8 border-t border-gray-200">
          <p class="text-gray-500 font-medium text-sm">
            Don't have a store yet? 
            <NuxtLink to="/auth/register" class="text-parentPrimary font-bold hover:underline">Open one now</NuxtLink>
          </p>
        </div>
      </div>
      
      <div class="mt-8 text-center flex items-center justify-center gap-4 text-sm font-bold text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} Erranders</p>
        <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
        <NuxtLink to="/terms" class="hover:text-gray-600 transition-colors">Terms & Privacy</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Store, Loader2, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-vue-next'
import { useAuth } from '@/composables/modules/auth'

definePageMeta({ layout: false })
useHead({ title: 'Merchant Sign In - Erranders' })

const { login, loading } = useAuth()
const email = ref('')
const password = ref('')
const error = ref('')

const validationErrors = reactive({
  email: '',
  password: ''
})

const validate = () => {
  let isValid = true
  validationErrors.email = ''
  validationErrors.password = ''

  if (!email.value) {
    validationErrors.email = 'Email address is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    validationErrors.email = 'Please enter a valid email'
    isValid = false
  }

  if (!password.value) {
    validationErrors.password = 'Password is required'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  error.value = ''
  if (!validate()) return

  try { 
    await login({ email: email.value, password: password.value }) 
  }
  catch (e: any) { 
    error.value = e.data?.message || e.response?.data?.message || 'Invalid credentials' 
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
