<template>
 <div class="min-h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
 <!-- Left Side: Image Panel with Dark Overlay -->
 <div class="hidden md:block w-1/2 relative overflow-hidden">
 <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=1600&fit=crop" alt="Nigerian food vendor" class="absolute inset-0 w-full h-full object-cover" />
 <div class="absolute inset-0 bg-gradient-to-b from-[#065fdb]/80 via-[#065fdb]/70 to-black/80"></div>
 <div class="relative z-10 flex flex-col justify-between h-full p-12 lg:p-16">
 <div class="flex items-center gap-3">
 <div class="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
 <Store class="w-5 h-5 text-white" />
 </div>
 <span class="text-xl font-black text-white tracking-tighter">Errandr</span>
 </div>
 <div class="max-w-md">
 <h2 class="text-5xl font-black text-white leading-[1.1] tracking-tighter mb-6">
 Bring your kitchen to every hostel room.
 </h2>
 <p class="text-white/70 text-lg font-medium leading-relaxed mb-8">
 Open your digital storefront in minutes and reach thousands of hungry students on campus.
 </p>
 <div class="flex items-center gap-4">
 <div class="flex -space-x-3">
 <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop" class="w-10 h-10 rounded-full border-2 border-white/50 object-cover" />
 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" class="w-10 h-10 rounded-full border-2 border-white/50 object-cover" />
 <img src="https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=80&h=80&fit=crop" class="w-10 h-10 rounded-full border-2 border-white/50 object-cover" />
 </div>
 <p class="text-white/60 text-sm font-semibold">50+ vendors already on board</p>
 </div>
 </div>
 </div>
 </div>

 <!-- Right Side: Multi-Step Form -->
 <div class="w-full md:w-1/2 flex flex-col items-center justify-center px-6 sm:px-12 md:px-16 lg:px-20 py-10 relative z-10 overflow-y-auto max-h-screen bg-gray-50/50">
 <!-- Header -->
 <div class="mb-10 text-center max-w-md w-full">
 <div class="flex items-center justify-center gap-2 mb-6 md:hidden">
 <div class="w-10 h-10 rounded-xl bg-[#065fdb] flex items-center justify-center shadow-lg shadow-[#065fdb]/20">
 <Store class="w-5 h-5 text-white" />
 </div>
 <span class="text-2xl font-black text-gray-900 tracking-tighter">Errandr</span>
 </div>
 <h1 class="text-4xl font-black text-gray-900 mb-3 tracking-tighter">Open Your Store</h1>
 <p class="text-gray-500 text-lg font-medium">Complete 3 quick steps to start selling on campus</p>
 </div>

 <!-- Step Indicator -->
 <div class="flex items-center justify-center gap-4 mb-12 w-full max-w-md">
 <div v-for="s in totalSteps" :key="s" class="flex items-center gap-3">
 <div class="flex items-center justify-center w-10 h-10 rounded-2xl text-sm font-bold transition-all duration-500"
 :class="displayStep >= s ? 'bg-[#065fdb] text-white shadow-xl shadow-[#065fdb]/30 scale-110' : 'bg-white text-gray-400 border border-gray-100'">
 <Check v-if="displayStep > s" class="w-5 h-5" />
 <span v-else>{{ s }}</span>
 </div>
 <div v-if="s < totalSteps" class="w-10 md:w-16 h-[2px] rounded-full transition-all duration-500" :class="displayStep > s ? 'bg-[#065fdb]' : 'bg-gray-200'" />
 </div>
 </div>

 <!-- Step 1: Personal Info -->
 <form v-if="currentStep === 'account'" @submit.prevent="handleStep1" class="space-y-5 w-full max-w-md bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 transform transition-all duration-500">
 <p class="text-sm font-bold text-gray-400 tracking-widest mb-2">Step 1 — Your Account</p>
 <div class="grid grid-cols-2 gap-4">
 <UiAnimatedInput v-model="form.firstName" type="text" label="First Name" required />
 <UiAnimatedInput v-model="form.lastName" type="text" label="Last Name" required />
 </div>
 <UiAnimatedInput v-model="form.email" type="email" label="Email Address" required />
 <UiAnimatedInput v-model="form.phone" type="tel" label="Phone Number" />
 <UiAnimatedInput v-model="form.password" type="password" label="Password" required minlength="6" />

 <p v-if="error" class="text-red-500 text-sm font-medium">{{ error }}</p>

 <button type="submit" :disabled="loading"
 class="w-full py-3 bg-[#065fdb] hover:bg-[#054ec0] text-white rounded-xl font-bold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-[#065fdb]/20 mt-2">
 <Loader2 v-if="loading" class="animate-spin w-5 h-5" />
 {{ loading ? 'Creating Account...' : 'Continue' }}
 <ArrowRight v-if="!loading" class="w-5 h-5" />
 </button>

 <p class="text-center text-gray-500 text-sm font-medium">
 Already have a merchant account? <NuxtLink to="/auth/login" class="text-[#065fdb] font-bold hover:underline">Sign in</NuxtLink>
 </p>
 </form>

 <!-- OTP Verification Step -->
 <div v-if="currentStep === 'otp'" class="space-y-8 w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/60 border border-gray-100 transform transition-all duration-500 animate-in fade-in zoom-in duration-700">
 <div class="text-center">
 <div class="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
 <Mail class="w-12 h-12 text-[#065fdb]" />
 </div>
 <h2 class="text-3xl font-black text-gray-900 tracking-tighter mb-3">Check your inbox! 📬</h2>
 <p class="text-gray-500 text-base font-medium leading-relaxed">
 We sent a 6-digit code to <br/>
 <strong class="text-[#065fdb] font-bold">{{ form.email }}</strong>. 
 Enter it below to verify your email.
 </p>
 </div>

 <div class="flex justify-center gap-3">
 <input
 v-for="(_, i) in 6"
 :key="i"
 :ref="el => { if (el) otpRefs[i] = el as HTMLInputElement }"
 v-model="otpDigits[i]"
 @input="handleOTPInput(i)"
 @keydown.backspace="handleOTPBackspace(i, $event)"
 @paste.prevent="handleOTPPaste"
 type="text"
 maxlength="1"
 inputmode="numeric"
 class="w-12 h-16 text-center text-3xl font-black bg-gray-50 border-2 border-transparent rounded-2xl focus:ring-4 focus:ring-[#065fdb]/10 focus:border-[#065fdb] focus:bg-white outline-none transition-all duration-300 shadow-sm"
 />
 </div>

 <p v-if="error" class="text-red-500 text-sm font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100">{{ error }}</p>

 <button @click="verifyOTP" :disabled="verifyingOTP || otpDigits.join('').length < 6"
 class="w-full py-4 bg-[#065fdb] hover:bg-[#054ec0] text-white rounded-2xl font-black text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-[#065fdb]/30 group">
 <Loader2 v-if="verifyingOTP" class="animate-spin w-6 h-6" />
 <span v-else>Verify Email</span>
 <ArrowRight v-if="!verifyingOTP" class="w-6 h-6 group-hover:translate-x-1 transition-transform" />
 </button>

 <div class="text-center">
 <p class="text-sm text-gray-400 font-bold tracking-tight">
 Didn't get it?
 <button @click="resendOTP" :disabled="resendCooldown > 0" class="text-[#065fdb] font-extrabold hover:underline disabled:text-gray-300 disabled:no-underline ml-1">
 {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code' }}
 </button>
 </p>
 </div>
 </div>

 <!-- Step 2: Business Details -->
 <form v-if="currentStep === 'business'" @submit.prevent="handleStep2" class="space-y-6 w-full max-w-md bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 transform transition-all duration-500">
 <div class="flex items-center gap-3 mb-2">
 <div class="w-8 h-8 rounded-lg bg-blue-50 text-[#065fdb] flex items-center justify-center">
 <Store class="w-4 h-4" />
 </div>
 <p class="text-[11px] font-black text-gray-400 tracking-[0.2em]">Step 2 — Your Business</p>
 </div>

 <div class="space-y-4">
 <UiAnimatedInput v-model="vendor.storeName" type="text" label="Store Name" required />
 
 <UiSelectInput
 v-model="vendor.category"
 label="Business Category"
 :options="categoryOptions"
 />

 <UiAnimatedInput v-model="vendor.description" type="textarea" label="Store Description" :rows="3" />

 <UiAnimatedInput v-model="vendor.address" type="text" label="Store Address / Location" required />
 </div>

 <div class="space-y-3">
 <div class="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-[#065fdb]/30 transition-colors group cursor-pointer" @click="vendor.isInsideCampus = !vendor.isInsideCampus">
 <input type="checkbox" v-model="vendor.isInsideCampus" class="w-5 h-5 rounded-lg text-[#065fdb] border-gray-300 focus:ring-[#065fdb]/20" @click.stop />
 <div class="flex flex-col">
 <span class="text-sm font-bold text-gray-700">On-Campus Location</span>
 <span class="text-[10px] text-gray-400 font-medium">This store is located inside the university campus</span>
 </div>
 </div>

 <div class="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-[#065fdb]/30 transition-colors group cursor-pointer" @click="vendor.isStudentBusiness = !vendor.isStudentBusiness">
 <input type="checkbox" v-model="vendor.isStudentBusiness" class="w-5 h-5 rounded-lg text-[#065fdb] border-gray-300 focus:ring-[#065fdb]/20" @click.stop />
 <div class="flex flex-col">
 <span class="text-sm font-bold text-gray-700">Student Entrepreneur</span>
 <span class="text-[10px] text-gray-400 font-medium">Verify your student status for special perks</span>
 </div>
 </div>
 </div>

 <div v-if="vendor.isStudentBusiness" class="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
 <UiAnimatedInput v-model="vendor.matricNumber" type="text" label="Matric Number" />
 <UiSelectInput
 v-model="vendor.university"
 label="University"
 :options="universityOptions"
 searchable
 />
 </div>

 <p v-if="error" class="text-red-500 text-sm font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100">{{ error }}</p>

 <div class="flex gap-4 mt-2">
 <button type="button" @click="currentStep = 'otp'"
 class="w-14 h-14 flex items-center justify-center border-2 border-gray-100 text-gray-400 rounded-2xl font-bold transition-all hover:bg-gray-50 hover:text-gray-900 active:scale-95">
 <ArrowLeft class="w-6 h-6" />
 </button>
 <button type="submit"
 class="flex-1 py-4 bg-[#065fdb] hover:bg-[#054ec0] text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#065fdb]/20 transform active:scale-[0.98]">
 Continue <ArrowRight class="w-6 h-6" />
 </button>
 </div>
 </form>

 <!-- Step 3: Logo, Hours & Final Submission -->
 <form v-if="currentStep === 'logistics'" @submit.prevent="handleFinalSubmit" class="space-y-6 w-full max-w-md bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 transform transition-all duration-500">
 <div class="flex items-center gap-3 mb-2">
 <div class="w-8 h-8 rounded-lg bg-blue-50 text-[#065fdb] flex items-center justify-center">
 <ImageIcon class="w-4 h-4" />
 </div>
 <p class="text-[11px] font-black text-gray-400 tracking-[0.2em]">Step 3 — Logistics & Branding</p>
 </div>

 <!-- Logo Upload -->
 <div>
 <label class="block text-xs font-black text-gray-500 tracking-widest mb-3 ml-1">Store Logo</label>
 <div class="relative border-2 border-dashed border-gray-100 rounded-[2rem] p-8 text-center hover:border-[#065fdb]/30 hover:bg-gray-50/50 transition-all cursor-pointer group"
 @click="triggerLogoUpload">
 <input type="file" ref="logoInput" accept="image/*" class="hidden" @change="handleLogoSelect" />
 <div v-if="!logoPreview" class="flex flex-col items-center gap-3">
 <div class="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:scale-110 group-hover:text-[#065fdb] transition-all duration-500 shadow-sm border border-gray-100">
 <ImageIcon class="w-8 h-8" />
 </div>
 <div>
 <p class="text-sm font-bold text-gray-700">Upload your logo</p>
 <p class="text-[10px] text-gray-400 font-medium mt-0.5">PNG, JPG up to 5MB</p>
 </div>
 </div>
 <div v-else class="flex items-center gap-5">
 <div class="relative">
 <img :src="logoPreview" class="w-20 h-20 rounded-[1.5rem] object-cover border-2 border-white shadow-lg" />
 <div v-if="logoUrl" class="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white">
 <Check class="w-3.5 h-3.5" />
 </div>
 </div>
 <div class="text-left flex-1 min-w-0">
 <p class="text-sm font-black text-gray-900 truncate">{{ logoFile?.name }}</p>
 <p class="text-[11px] text-gray-400 font-bold tracking-tight">{{ logoFile ? (logoFile.size / 1024).toFixed(1) + ' KB' : '' }}</p>
 <div v-if="logoUploading" class="flex items-center gap-2 mt-2 text-[#065fdb]">
 <Loader2 class="animate-spin w-3.5 h-3.5" />
 <span class="text-[11px] font-black tracking-wider">Uploading...</span>
 </div>
 <div v-else-if="logoUrl" class="flex items-center gap-1.5 mt-2 text-emerald-600">
 <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
 <span class="text-[11px] font-black tracking-wider">Ready to launch</span>
 </div>
 </div>
 <button type="button" @click.stop="removeLogo" class="w-10 h-10 flex items-center justify-center bg-red-50 text-red-400 rounded-xl hover:bg-red-100 hover:text-red-500 transition-colors active:scale-95">
 <X class="w-5 h-5" />
 </button>
 </div>
 </div>
 </div>

 <div class="grid grid-cols-2 gap-4">
 <UiTimePicker v-model="vendor.operatingHours.open" label="Opens at" />
 <UiTimePicker v-model="vendor.operatingHours.close" label="Closes at" />
 </div>

 <div class="grid grid-cols-2 gap-4">
 <UiAnimatedInput v-model.number="vendor.preparationTime" type="number" label="Prep Time (min)" />
 <UiAnimatedInput v-model.number="vendor.minimumOrder" type="number" label="Min Order (₦)" />
 </div>

 <UiAnimatedInput v-model.number="vendor.deliveryFee" type="number" label="Delivery Fee (₦)" />

 <!-- Bank Details -->
 <div class="pt-2">
 <p class="text-[10px] font-black text-gray-400 tracking-widest mb-4 ml-1">Payout Details (Optional)</p>
 
 <div class="space-y-4">
 <UiSelectInput
 v-model="vendor.bankDetails.bankCode"
 label="Bank Name"
 :options="bankOptions"
 :disabled="banksLoading"
 searchable
 />

 <div class="relative">
 <UiAnimatedInput 
 v-model="vendor.bankDetails.accountNumber" 
 type="text" 
 label="Account Number"
 />
 <div v-if="resolvingAccount" class="absolute right-4 top-1/2 -translate-y-1/2">
 <Loader2 class="animate-spin w-5 h-5 text-[#065fdb]" />
 </div>
 <div v-else-if="accountResolved && vendor.bankDetails.accountName" class="absolute right-4 top-1/2 -translate-y-1/2">
 <div class="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
 <Check class="w-4 h-4" />
 </div>
 </div>
 </div>

 <!-- Resolved Account Name -->
 <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100">
 <div v-if="vendor.bankDetails.accountName" class="flex items-center gap-3 px-5 py-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
 <div class="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center">
 <CheckCircle class="w-5 h-5" />
 </div>
 <span class="text-sm font-black text-emerald-700 tracking-tight">{{ vendor.bankDetails.accountName }}</span>
 </div>
 </transition>
 
 <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform -translate-y-2 opacity-0" enter-to-class="transform translate-y-0 opacity-100">
 <div v-if="resolveError" class="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
 <AlertCircle class="w-4 h-4 text-red-600 shrink-0" />
 <span class="text-sm font-medium text-red-600">{{ resolveError }}</span>
 </div>
 </transition>
 </div>
 </div>

 <p v-if="error" class="text-red-500 text-sm font-black text-center bg-red-50 py-2 rounded-lg border border-red-100">{{ error }}</p>

 <div class="flex gap-4 mt-2">
 <button type="button" @click="currentStep = 'business'"
 class="w-14 h-14 flex items-center justify-center border-2 border-gray-100 text-gray-400 rounded-2xl font-bold transition-all hover:bg-gray-50 hover:text-gray-900 active:scale-95">
 <ArrowLeft class="w-6 h-6" />
 </button>
 <button type="submit" :disabled="submitting"
 class="flex-1 py-4 bg-[#065fdb] hover:bg-[#054ec0] text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#065fdb]/20 disabled:opacity-50 transform active:scale-[0.98]">
 <Loader2 v-if="submitting" class="animate-spin w-5 h-5" />
 <span>{{ submitting ? 'Launching...' : 'Launch Store 🚀' }}</span>
 </button>
 </div>
 </form>

 <!-- Footer -->
 <div class="mt-12 text-center">
 <div class="flex items-center justify-center gap-6 text-[11px] text-gray-400 font-black tracking-[0.2em]">
 <p>&copy; {{ new Date().getFullYear() }} Errandr</p>
 <NuxtLink to="/terms" class="hover:text-[#065fdb] transition-colors">Terms</NuxtLink>
 <NuxtLink to="/terms" class="hover:text-[#065fdb] transition-colors">Privacy</NuxtLink>
 </div>
 </div>
 </div>
 </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted, computed } from 'vue'
import { Loader2, ArrowRight, ArrowLeft, Store, Check, ImageIcon, X, CheckCircle, AlertCircle, Mail } from 'lucide-vue-next'
import { useAuth } from '@/composables/modules/auth'
import { vendors_api } from '@/api_factory/modules/vendors'
import { payments_api } from '@/api_factory/modules/payments'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { GATEWAY_ENDPOINT } from '@/api_factory/axios.config'

definePageMeta({ layout: false })
useHead({ title: 'Open Your Store - Errandr' })

const { register, loading } = useAuth()
const { showToast } = useCustomToast()
const error = ref('')
const currentStep = ref<'account' | 'otp' | 'business' | 'logistics'>('account')
const submitting = ref(false)
const totalSteps = 3

// Map step to display number for the indicator
const displayStep = computed(() => {
 if (currentStep.value === 'account') return 1
 if (currentStep.value === 'otp') return 1 // OTP is sub-step of 1
 if (currentStep.value === 'business') return 2
 return 3
})

// ── Step 1: Auth fields ──
const form = reactive({
 firstName: '',
 lastName: '',
 email: '',
 password: '',
 phone: '',
 role: 'vendor',
})

// ── OTP state ──
const otpDigits = reactive(['', '', '', '', '', ''])
const otpRefs = reactive<HTMLInputElement[]>([])
const verifyingOTP = ref(false)
const resendCooldown = ref(0)
let cooldownInterval: ReturnType<typeof setInterval> | null = null

const handleOTPInput = (i: number) => {
 if (otpDigits[i] && i < 5) otpRefs[i + 1]?.focus()
}

const handleOTPBackspace = (i: number, e: KeyboardEvent) => {
 if (!otpDigits[i] && i > 0) {
 otpRefs[i - 1]?.focus()
 }
}

const handleOTPPaste = (e: ClipboardEvent) => {
 const pasted = e.clipboardData?.getData('text')?.replace(/\D/g, '').slice(0, 6) || ''
 for (let i = 0; i < 6; i++) {
 otpDigits[i] = pasted[i] || ''
 }
 if (pasted.length >= 6) otpRefs[5]?.focus()
}

const startCooldown = () => {
 resendCooldown.value = 60
 if (cooldownInterval) clearInterval(cooldownInterval)
 cooldownInterval = setInterval(() => {
 resendCooldown.value--
 if (resendCooldown.value <= 0) {
 clearInterval(cooldownInterval!)
 cooldownInterval = null
 }
 }, 1000)
}

const verifyOTP = async () => {
 error.value = ''
 verifyingOTP.value = true
 try {
 await GATEWAY_ENDPOINT.post('/auth/verify-otp', {
 email: form.email,
 otp: otpDigits.join(''),
 })
 showToast({ title: 'Verified! 🎉', message: 'Your email is confirmed. Let\'s set up your store!', toastType: 'success' })
 currentStep.value = 'business'
 } catch (e: any) {
 error.value = e?.response?.data?.message || e?.data?.message || 'Invalid code. Please try again.'
 } finally {
 verifyingOTP.value = false
 }
}

const resendOTP = async () => {
 try {
 await GATEWAY_ENDPOINT.post('/auth/send-otp', { email: form.email })
 showToast({ title: 'Code Sent! 💌', message: 'A fresh verification code is on its way.', toastType: 'success' })
 startCooldown()
 } catch (e: any) {
 showToast({ title: 'Oops!', message: e?.response?.data?.message || 'Could not resend code.', toastType: 'error' })
 }
}

// ── Step 2 & 3: Vendor profile fields ──
const vendor = reactive({
 storeName: '',
 description: '',
 category: '',
 address: '',
 isInsideCampus: false,
 isStudentBusiness: false,
 matricNumber: '',
 university: '',
 operatingHours: { open: '08:00 AM', close: '08:00 PM' },
 preparationTime: 15,
 minimumOrder: 0,
 deliveryFee: 0,
 bankDetails: { bankCode: '', bankName: '', accountNumber: '', accountName: '' },
})

// ── Category options ──
const categoryOptions = [
 { label: 'Restaurant', value: 'restaurant' },
 { label: 'Eatery / Buka', value: 'eatery' },
 { label: 'Snacks & Small Chops', value: 'snacks' },
 { label: 'Drinks & Smoothies', value: 'drinks' },
 { label: 'Groceries', value: 'groceries' },
 { label: 'Bakery & Pastries', value: 'bakery' },
 { label: 'Pharmacy', value: 'pharmacy' },
 { label: 'Stationery & Printing', value: 'stationery' },
 { label: 'Other', value: 'other' },
]

// ── Nigerian Universities Dropdown ──
const universityOptions = [
 { label: 'University of Lagos (UNILAG)', value: 'unilag' },
 { label: 'University of Ibadan (UI)', value: 'ui' },
 { label: 'Obafemi Awolowo University (OAU)', value: 'oau' },
 { label: 'University of Nigeria, Nsukka (UNN)', value: 'unn' },
 { label: 'University of Benin (UNIBEN)', value: 'uniben' },
 { label: 'Ahmadu Bello University (ABU)', value: 'abu' },
 { label: 'University of Ilorin (UNILORIN)', value: 'unilorin' },
 { label: 'Lagos State University (LASU)', value: 'lasu' },
 { label: 'Federal University of Technology, Akure (FUTA)', value: 'futa' },
 { label: 'Covenant University', value: 'covenant' },
 { label: 'Babcock University', value: 'babcock' },
 { label: 'University of Port Harcourt (UNIPORT)', value: 'uniport' },
 { label: 'Federal University of Technology, Minna (FUTMINNA)', value: 'futminna' },
 { label: 'Nnamdi Azikiwe University (UNIZIK)', value: 'unizik' },
 { label: 'University of Calabar (UNICAL)', value: 'unical' },
 { label: 'Federal University of Technology, Owerri (FUTO)', value: 'futo' },
 { label: 'Bayero University Kano (BUK)', value: 'buk' },
 { label: 'University of Abuja (UNIABUJA)', value: 'uniabuja' },
 { label: 'Ekiti State University (EKSU)', value: 'eksu' },
 { label: 'Adekunle Ajasin University (AAUA)', value: 'aaua' },
 { label: 'Olabisi Onabanjo University (OOU)', value: 'oou' },
 { label: 'Ladoke Akintola University (LAUTECH)', value: 'lautech' },
 { label: 'Rivers State University (RSU)', value: 'rsu' },
 { label: 'University of Jos (UNIJOS)', value: 'unijos' },
 { label: 'University of Maiduguri (UNIMAID)', value: 'unimaid' },
 { label: 'Usmanu Danfodiyo University (UDUSOK)', value: 'udusok' },
 { label: 'Delta State University (DELSU)', value: 'delsu' },
 { label: 'Ambrose Alli University (AAU)', value: 'aau' },
 { label: 'Michael Okpara Univ. of Agriculture (MOUAU)', value: 'mouau' },
 { label: 'Federal University Oye-Ekiti (FUOYE)', value: 'fuoye' },
 { label: 'Bowen University', value: 'bowen' },
 { label: 'Lead City University', value: 'leadcity' },
 { label: 'Pan-Atlantic University', value: 'pau' },
 { label: 'Redeemer\'s University (RUN)', value: 'run' },
 { label: 'Bells University of Technology', value: 'bells' },
 { label: 'Caleb University', value: 'caleb' },
 { label: 'Crawford University', value: 'crawford' },
 { label: 'Landmark University', value: 'landmark' },
 { label: 'Afe Babalola University (ABUAD)', value: 'abuad' },
 { label: 'Other', value: 'other' },
]

// ── Bank list from API ──
const bankOptions = ref<{ label: string; value: string }[]>([])
const banksLoading = ref(false)

const fetchBanks = async () => {
 banksLoading.value = true
 try {
 const res = await payments_api.getBanks()
 const banks = res?.data?.data || res?.data || []
 bankOptions.value = banks.map((b: any) => ({
 label: b.name || b.bank_name,
 value: b.code || b.bank_code || b.slug,
 }))
 } catch (e) {
 console.error('Failed to fetch banks:', e)
 } finally {
 banksLoading.value = false
 }
}

// ── Account Number Validation ──
const resolvingAccount = ref(false)
const accountResolved = ref(false)
const resolveError = ref('')

let resolveTimeout: ReturnType<typeof setTimeout> | null = null

watch(() => vendor.bankDetails.accountNumber, (newVal) => {
 vendor.bankDetails.accountName = ''
 accountResolved.value = false
 resolveError.value = ''
 if (resolveTimeout) clearTimeout(resolveTimeout)
 const cleaned = newVal.replace(/\D/g, '')
 if (cleaned.length === 10 && vendor.bankDetails.bankCode) {
 resolveTimeout = setTimeout(() => resolveAccount(cleaned), 500)
 }
})

watch(() => vendor.bankDetails.bankCode, (newVal) => {
 const selected = bankOptions.value.find(b => b.value === newVal)
 if (selected) vendor.bankDetails.bankName = selected.label
 const cleaned = vendor.bankDetails.accountNumber.replace(/\D/g, '')
 if (cleaned.length === 10 && newVal) {
 vendor.bankDetails.accountName = ''
 accountResolved.value = false
 resolveError.value = ''
 resolveAccount(cleaned)
 }
})

const resolveAccount = async (accountNumber: string) => {
 resolvingAccount.value = true
 resolveError.value = ''
 try {
 const res = await payments_api.resolveAccount(accountNumber, vendor.bankDetails.bankCode)
 const data = res?.data?.data || res?.data || {}
 vendor.bankDetails.accountName = data.account_name || data.accountName || ''
 accountResolved.value = !!vendor.bankDetails.accountName
 if (!vendor.bankDetails.accountName) {
 resolveError.value = 'Could not resolve account. Please check the details.'
 }
 } catch (e: any) {
 resolveError.value = e?.response?.data?.message || 'Failed to verify account number.'
 vendor.bankDetails.accountName = ''
 } finally {
 resolvingAccount.value = false
 }
}

// ── Logo Upload ──
const logoInput = ref<HTMLInputElement | null>(null)
const logoFile = ref<File | null>(null)
const logoPreview = ref('')
const logoUrl = ref('')
const logoUploading = ref(false)

const triggerLogoUpload = () => logoInput.value?.click()

const handleLogoSelect = async (e: Event) => {
 const file = (e.target as HTMLInputElement).files?.[0]
 if (file) {
 logoFile.value = file
 logoPreview.value = URL.createObjectURL(file)
 logoUploading.value = true
 try {
 const res = await vendors_api.uploadImage(file)
 logoUrl.value = res?.data?.url || res?.data?.imageUrl || res?.data?.data?.url || ''
 } catch (err) {
 console.error('Logo upload failed:', err)
 showToast({ title: 'Upload Failed', message: 'Could not upload logo. Please try again.', toastType: 'error' })
 } finally {
 logoUploading.value = false
 }
 }
}

const removeLogo = () => {
 logoFile.value = null
 logoPreview.value = ''
 logoUrl.value = ''
}

// ── Step 1: Register user account ──
const handleStep1 = async () => {
 error.value = ''
 try {
 await register({ ...form }, { skipRedirect: true })
 showToast({ title: 'Account Created! 🎉', message: 'Now let\'s verify your email — check your inbox!', toastType: 'success' })
 startCooldown()
 currentStep.value = 'otp'
 // Focus first OTP input after render
 setTimeout(() => otpRefs[0]?.focus(), 200)
 } catch (e: any) {
 error.value = e?.data?.message || e?.response?.data?.message || 'Registration failed. Please try again.'
 }
}

// ── Step 2: Validate business details ──
const handleStep2 = () => {
 error.value = ''
 if (!vendor.storeName || !vendor.category || !vendor.address) {
 error.value = 'Please fill in all required fields.'
 return
 }
 currentStep.value = 'logistics'
}

// ── Step 3: Create vendor profile ──
const handleFinalSubmit = async () => {
 error.value = ''
 submitting.value = true
 try {
 const payload: any = {
 storeName: vendor.storeName,
 description: vendor.description,
 category: vendor.category,
 address: vendor.address,
 isInsideCampus: vendor.isInsideCampus,
 isStudentBusiness: vendor.isStudentBusiness,
 operatingHours: vendor.operatingHours,
 preparationTime: vendor.preparationTime,
 minimumOrder: vendor.minimumOrder,
 deliveryFee: vendor.deliveryFee,
 }

 if (logoUrl.value) payload.logo = logoUrl.value
 if (vendor.isStudentBusiness) {
 payload.matricNumber = vendor.matricNumber
 payload.university = vendor.university
 }
 if (vendor.bankDetails.bankName && vendor.bankDetails.accountNumber) {
 payload.bankDetails = {
 bankName: vendor.bankDetails.bankName,
 bankCode: vendor.bankDetails.bankCode,
 accountNumber: vendor.bankDetails.accountNumber,
 accountName: vendor.bankDetails.accountName,
 }
 }

 await vendors_api.createVendor(payload)

 showToast({
 title: 'You\'re In! 🎉',
 message: 'Your store is live! Check your email for next steps.',
 toastType: 'success',
 })

 navigateTo('/dashboard')
 } catch (e: any) {
 error.value = e?.data?.message || e?.response?.data?.message || 'Failed to create store. Please try again.'
 } finally {
 submitting.value = false
 }
}

// ── Fetch banks on mount ──
onMounted(() => {
 fetchBanks()
})

onUnmounted(() => {
 if (cooldownInterval) clearInterval(cooldownInterval)
})
</script>
