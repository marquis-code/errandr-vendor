<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
    <!-- Form Card -->
    <div class="w-full max-w-md flex flex-col justify-center px-0 sm:px-6 py-12 bg-white sm:rounded-[2rem] relative z-10 my-8">
      <div class="mb-10 text-center flex flex-col items-center">
        <NuxtLink to="/" class="flex items-center gap-2 mb-4 inline-block group">
          <div class="flex items-center justify-center group-hover:scale-110 transition-transform">
            <img src="@/assets/img/logo.png" class="h-12 w-auto" />
          </div>
        </NuxtLink>
        <h1 class="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Welcome Back</h1>
        <p class="text-gray-500 text-base">Sign in to your vendor dashboard</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6 max-w-md">
        <UiAnimatedInput 
          v-model="email" 
          type="email" 
          label="Email Address" 
          :hasError="!!validationErrors.email"
          :errorMessage="validationErrors.email"
          @input="validationErrors.email = ''" 
          required 
        />
        
        <div class="space-y-2">
          <UiAnimatedInput 
            v-model="password" 
            type="password" 
            label="Password" 
            :hasError="!!validationErrors.password"
            :errorMessage="validationErrors.password"
            @input="validationErrors.password = ''" 
            required 
          />
          <div class="flex justify-end">
            <NuxtLink to="/auth/forgot-password" class="text-sm font-semibold text-[#FF5C1A] hover:underline">
              Forgot password?
            </NuxtLink>
          </div>
        </div>

        <transition name="fade">
          <div v-if="error" class="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-[13px] font-bold text-red-600">
            <AlertCircle class="w-5 h-5 shrink-0" />
            {{ error }}
          </div>
        </transition>

        <button type="submit" :disabled="loading"
          class="w-full py-3.5 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-xl font-bold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-[#FF5C1A]/20">
          <Loader2 v-if="loading" class="animate-spin w-6 h-6" />
          {{ loading ? 'signing in...' : 'sign in' }}
        </button>
      </form>

      <div class="max-w-md w-full mt-6">
        <p class="text-center text-gray-600 font-medium mt-8 text-base">
          Don't have a store yet? <NuxtLink to="/auth/register" class="text-[#FF5C1A] font-bold hover:underline">Open one now</NuxtLink>
        </p>
      </div>

      <div class="mt-auto pt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400 font-medium">
        <p>&copy; {{ new Date().getFullYear() }} Erranders</p>
        <NuxtLink to="/terms" class="hover:text-gray-600">Terms</NuxtLink>
        <NuxtLink to="/terms" class="hover:text-gray-600">Privacy</NuxtLink>
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
