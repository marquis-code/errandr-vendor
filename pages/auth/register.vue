<template>
  <div class="min-h-screen w-full bg-white sm:bg-gray-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
    <!-- Ambient Background -->
    <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-parentPrimary/10 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4"></div>
    <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4"></div>

    <div class="w-full max-w-[500px] relative z-10">
      
      <!-- Header -->
      <div class="text-center mb-8">
        <span class="text-2xl font-black tracking-tight hidden sm:block transition-colors">
          Erranders<span class="text-parentPrimary">.</span>
        </span>
        <h1 class="text-3xl font-black text-gray-900 tracking-tight mb-2">Open Your Store</h1>
        <p class="text-gray-500 font-medium text-sm">Join the campus delivery network</p>
      </div>

      <!-- Step Indicator -->
      <div class="mb-8 flex items-center justify-between relative px-6">
        <div class="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full z-0"></div>
        <div class="absolute left-10 top-1/2 -translate-y-1/2 h-1 bg-parentPrimary rounded-full z-0 transition-all duration-500" :style="{ width: progressWidth }"></div>

        <div v-for="s in 3" :key="s" class="relative z-10 flex flex-col items-center gap-2 bg-gray-50 p-1">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500 shadow-sm"
               :class="[displayStep > s ? 'bg-parentPrimary text-white ring-4 ring-parentPrimary/20' : displayStep === s ? 'bg-white border-2 border-parentPrimary text-parentPrimary scale-110' : 'bg-white border border-gray-200 text-gray-400']">
            <Check v-if="displayStep > s" class="w-4 h-4" />
            <span v-else>{{ s }}</span>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="relative min-h-[500px] flex flex-col w-full">
        
        <div class="relative flex-1">
          <!-- Step 1: Account -->
          <transition name="slide-up" mode="out-in">
            <form v-if="currentStep === 'account'" @submit.prevent="handleStep1" class="w-full flex flex-col space-y-6">
              <div class="mb-2">
                <h2 class="text-xl font-black text-gray-900 tracking-tight">Personal Details</h2>
                <p class="text-smtext-gray-500 font-medium">Create your merchant account</p>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UiAnimatedInput v-model="form.firstName" type="text" label="First Name" :hasError="!!valErrors.firstName" :errorMessage="valErrors.firstName" @input="valErrors.firstName=''" />
                <UiAnimatedInput v-model="form.lastName" type="text" label="Last Name" :hasError="!!valErrors.lastName" :errorMessage="valErrors.lastName" @input="valErrors.lastName=''" />
              </div>
              <UiAnimatedInput v-model="form.email" type="email" label="Email Address" :hasError="!!valErrors.email" :errorMessage="valErrors.email" @input="valErrors.email=''" />
              <UiAnimatedInput v-model="form.phone" type="tel" label="Phone Number" :hasError="!!valErrors.phone" :errorMessage="valErrors.phone" @input="valErrors.phone=''" />
              <UiAnimatedInput v-model="form.password" type="password" label="Password" :hasError="!!valErrors.password" :errorMessage="valErrors.password" @input="valErrors.password=''" />

              <!-- <div v-if="error" class="p-3 bg-red-50 text-red-600 text-smfont-bold rounded-xl flex items-center gap-2"><AlertCircle class="w-4 h-4 shrink-0" /> {{ error }}</div> -->

              <div class="mt-auto pt-4">
                <button type="submit" :disabled="loading" class="w-full py-4 bg-[#065fdb] hover:bg-[#054ec0] text-white rounded-2xl font-black text-base transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-[#065fdb]/20 active:scale-[0.98]">
                  <Loader2 v-if="loading" class="animate-spin w-5 h-5" />
                  <span>Continue</span>
                  <ArrowRight v-if="!loading" class="w-5 h-5" />
                </button>
                <p class="text-center text-gray-500 text-sm font-medium pt-4">
                  Already have an account? <NuxtLink to="/auth/login" class="text-parentPrimary font-bold hover:underline">Sign in</NuxtLink>
                </p>
              </div>
            </form>
          </transition>

          <!-- OTP Step -->
          <transition name="slide-up" mode="out-in">
            <div v-if="currentStep === 'otp'" class="w-full flex flex-col items-center justify-center text-center space-y-6">
              <div class="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center mx-auto mb-2 text-[#065fdb] shadow-inner">
                <Mail class="w-8 h-8" />
              </div>
              <h2 class="text-2xl font-black text-gray-900 tracking-tight">Check your inbox</h2>
              <p class="text-gray-500 text-smfont-medium leading-relaxed">We sent a 6-digit code to <br><strong class="text-gray-900">{{ form.email }}</strong></p>

              <div class="flex justify-center gap-2 py-4">
                <input v-for="(_, i) in 6" :key="i" :ref="el => { if (el) otpRefs[i] = el as HTMLInputElement }" v-model="otpDigits[i]" @input="handleOTPInput(i)" @keydown.backspace="handleOTPBackspace(i, $event)" @paste.prevent="handleOTPPaste" type="text" maxlength="1" inputmode="numeric" class="w-12 h-14 text-center text-2xl font-black bg-gray-50 border border-gray-200 rounded-xl focus:border-[#065fdb] focus:ring-4 focus:ring-[#065fdb]/10 outline-none transition-all" />
              </div>

              <!-- <div v-if="error" class="p-3 bg-red-50 text-red-600 text-smfont-bold rounded-xl flex items-center justify-center gap-2 w-full"><AlertCircle class="w-4 h-4 shrink-0" /> {{ error }}</div> -->

              <div class="w-full mt-auto pt-4">
                <button @click="verifyOTP" :disabled="verifyingOTP || otpDigits.join('').length < 6" class="w-full py-4 bg-[#065fdb] hover:bg-[#054ec0] text-white rounded-2xl font-black text-base transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#065fdb]/20 disabled:opacity-50 active:scale-[0.98]">
                  <Loader2 v-if="verifyingOTP" class="animate-spin w-5 h-5" />
                  <span v-else>Verify Email</span>
                </button>
                <button @click="resendOTP" :disabled="resendCooldown > 0" class="text-smfont-bold text-gray-500 hover:text-parentPrimary disabled:opacity-50 mt-4 transition-colors">
                  {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code' }}
                </button>
              </div>
            </div>
          </transition>

          <!-- Step 2: Business -->
          <transition name="slide-up" mode="out-in">
            <form v-if="currentStep === 'business'" @submit.prevent="handleStep2" class="w-full flex flex-col space-y-4">
              <div class="mb-4 flex justify-between items-center">
                <div>
                  <h2 class="text-xl font-black text-gray-900 tracking-tight">Business Profile</h2>
                  <p class="text-smtext-gray-500 font-medium">Tell us about your store</p>
                </div>
                <Store class="w-6 h-6 text-gray-300" />
              </div>

              <UiAnimatedInput v-model="vendor.storeName" type="text" label="Store Name" :hasError="!!valErrors.storeName" :errorMessage="valErrors.storeName" @input="valErrors.storeName=''" />
              <UiSelectInput v-model="vendor.category" label="Business Category" :options="categoryOptions" />
              <UiAnimatedInput v-model="vendor.description" type="textarea" label="Store Description" :rows="2" />
              <UiAnimatedInput v-model="vendor.address" type="text" label="Store Location / Address" :hasError="!!valErrors.address" :errorMessage="valErrors.address" @input="valErrors.address=''" />

              <div class="grid grid-cols-1 gap-2 pt-2">
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:border-parentPrimary/30 transition-colors" @click="vendor.isInsideCampus = !vendor.isInsideCampus">
                  <input type="checkbox" v-model="vendor.isInsideCampus" class="w-4 h-4 rounded text-parentPrimary border-gray-300 focus:ring-parentPrimary/20 pointer-events-none" />
                  <span class="text-sm font-bold text-gray-700">Located inside campus</span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:border-parentPrimary/30 transition-colors" @click="vendor.isStudentBusiness = !vendor.isStudentBusiness">
                  <input type="checkbox" v-model="vendor.isStudentBusiness" class="w-4 h-4 rounded text-parentPrimary border-gray-300 focus:ring-parentPrimary/20 pointer-events-none" />
                  <span class="text-sm font-bold text-gray-700">Student Entrepreneur</span>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <UiAnimatedInput v-model="vendor.matricNumber" type="text" label="Matric Number" />
                <UiSelectInput v-model="vendor.university" label="University" :options="universityOptions" searchable />
              </div>

              <!-- <div v-if="error" class="p-3 bg-red-50 text-red-600 text-smfont-bold rounded-xl flex items-center justify-center gap-2"><AlertCircle class="w-4 h-4 shrink-0" /> {{ error }}</div> -->

              <div class="flex gap-3 pt-4 mt-auto">
                <button type="button" @click="currentStep = 'otp'" class="w-14 h-14 shrink-0 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-600 rounded-2xl font-bold transition-all"><ArrowLeft class="w-5 h-5" /></button>
                <button type="submit" class="flex-1 py-4 bg-[#065fdb] hover:bg-[#054ec0] text-white rounded-2xl font-black text-base transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#065fdb]/20 active:scale-[0.98]">
                  Continue <ArrowRight class="w-5 h-5" />
                </button>
              </div>
            </form>
          </transition>

          <!-- Step 3: Logistics -->
          <transition name="slide-up" mode="out-in">
            <form v-if="currentStep === 'logistics'" @submit.prevent="handleFinalSubmit" class="w-full flex flex-col space-y-4">
              <div class="mb-4 flex justify-between items-center">
                <div>
                  <h2 class="text-xl font-black text-gray-900 tracking-tight">Logistics & Payouts</h2>
                  <p class="text-smtext-gray-500 font-medium">Final setup steps</p>
                </div>
                <ImageIcon class="w-6 h-6 text-gray-300" />
              </div>

              <!-- Logo -->
              <div class="relative border-2 border-dashed border-gray-200 rounded-[1.5rem] p-5 text-center hover:border-parentPrimary hover:bg-parentPrimary/5 transition-colors cursor-pointer group" @click="triggerLogoUpload">
                <input type="file" ref="logoInput" accept="image/*" class="hidden" @change="handleLogoSelect" />
                <div v-if="!logoPreview" class="flex flex-col items-center">
                  <div class="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:text-parentPrimary transition-transform">
                    <ImageIcon class="w-5 h-5" />
                  </div>
                  <p class="text-smfont-bold text-gray-700">Upload Store Logo</p>
                  <p class="text-[11px] text-gray-400 font-medium">PNG or JPG, up to 5MB</p>
                </div>
                <div v-else class="flex items-center gap-4">
                  <img :src="logoPreview" class="w-14 h-14 rounded-xl object-cover shadow-sm border border-gray-100" />
                  <div class="text-left flex-1 min-w-0">
                    <p class="text-sm font-black text-gray-900 truncate">{{ logoFile?.name }}</p>
                    <p v-if="logoUploading" class="text-sm font-bold text-parentPrimary flex items-center gap-1 mt-1"><Loader2 class="w-3 h-3 animate-spin" /> Uploading...</p>
                    <p v-else-if="logoUrl" class="text-sm font-bold text-emerald-600 flex items-center gap-1 mt-1"><CheckCircle class="w-3 h-3" /> Ready</p>
                  </div>
                  <button type="button" @click.stop="removeLogo" class="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"><X class="w-4 h-4" /></button>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <UiTimePicker v-model="vendor.operatingHours.open" label="Opens At" />
                <UiTimePicker v-model="vendor.operatingHours.close" label="Closes At" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <UiAnimatedInput v-model.number="vendor.preparationTime" type="number" label="Prep(m)" />
                <UiAnimatedInput v-model.number="vendor.minimumOrder" type="number" label="Min(₦)" />
                <UiAnimatedInput v-model.number="vendor.deliveryFee" type="number" label="Del(₦)" />
              </div>

              <!-- Banks -->
              <div class="bg-gray-50 rounded-2xl p-4 space-y-3 border border-gray-100">
                <p class="text-sm font-black text-gray-400 ">PAYOUT DETAILS (OPTIONAL)</p>
                <UiSelectInput v-model="vendor.bankDetails.bankCode" label="Bank Name" :options="bankOptions" :disabled="banksLoading" searchable />
                <div class="relative">
                  <UiAnimatedInput v-model="vendor.bankDetails.accountNumber" type="text" label="Account Number" />
                  <Loader2 v-if="resolvingAccount" class="absolute right-3 top-1/2 -translate-y-1/2 animate-spin w-4 h-4 text-parentPrimary" />
                </div>
                <div v-if="vendor.bankDetails.accountName" class="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-xl border border-emerald-100"><CheckCircle class="w-4 h-4 shrink-0" /> {{ vendor.bankDetails.accountName }}</div>
                <div v-if="resolveError" class="flex items-center gap-2 p-2 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100"><AlertCircle class="w-4 h-4 shrink-0" /> {{ resolveError }}</div>
              </div>

              <!-- <div v-if="error" class="p-3 bg-red-50 text-red-600 text-smfont-bold rounded-xl flex items-center justify-center gap-2"><AlertCircle class="w-4 h-4 shrink-0" /> {{ error }}</div> -->

              <div class="flex gap-3 pt-4 mt-auto">
                <button type="button" @click="currentStep = 'business'" class="w-14 h-14 shrink-0 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-600 rounded-2xl font-bold transition-all"><ArrowLeft class="w-5 h-5" /></button>
                <button type="submit" :disabled="submitting || logoUploading" class="flex-1 py-4 bg-[#065fdb] hover:bg-[#054ec0] text-white rounded-2xl font-black text-base transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#065fdb]/20 disabled:opacity-50 active:scale-[0.98]">
                  <Loader2 v-if="submitting" class="animate-spin w-5 h-5" />
                  <span>{{ submitting ? 'Launching...' : 'Launch Store 🚀' }}</span>
                </button>
              </div>
            </form>
          </transition>
        </div>
      </div>
      
      <!-- Footer Info -->
      <div class="mt-8 text-center flex items-center justify-center gap-4 text-sm font-bold text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} Erranders</p>
        <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
        <NuxtLink to="/terms" class="hover:text-gray-600 transition-colors">Terms & Privacy</NuxtLink>
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
useHead({ title: 'Open Your Store - Erranders' })

const { register, loading } = useAuth()
const { showToast } = useCustomToast()
const error = ref('')
const currentStep = ref<'account' | 'otp' | 'business' | 'logistics'>('account')
const submitting = ref(false)

const displayStep = computed(() => {
  if (currentStep.value === 'account') return 1
  if (currentStep.value === 'otp') return 1
  if (currentStep.value === 'business') return 2
  return 3
})

const progressWidth = computed(() => {
  if (displayStep.value === 1) return '0%'
  if (displayStep.value === 2) return '50%'
  return '100%'
})

// Validation
const valErrors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  storeName: '',
  address: ''
})

const validateStep1 = () => {
  let isValid = true
  valErrors.firstName = ''
  valErrors.lastName = ''
  valErrors.email = ''
  valErrors.password = ''
  valErrors.phone = ''

  if (!form.firstName) { valErrors.firstName = 'Required'; isValid = false }
  if (!form.lastName) { valErrors.lastName = 'Required'; isValid = false }
  if (!form.email) { valErrors.email = 'Required'; isValid = false }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { valErrors.email = 'Invalid email format'; isValid = false }
  if (!form.password) { valErrors.password = 'Required'; isValid = false }
  else if (form.password.length < 6) { valErrors.password = 'Min 6 characters'; isValid = false }
  if (!form.phone) { valErrors.phone = 'Required'; isValid = false }

  return isValid
}

const validateStep2 = () => {
  let isValid = true
  valErrors.storeName = ''
  valErrors.address = ''

  if (!vendor.storeName) { valErrors.storeName = 'Required'; isValid = false }
  if (!vendor.address) { valErrors.address = 'Required'; isValid = false }

  return isValid
}

// State
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  role: 'vendor',
})

const otpDigits = reactive(['', '', '', '', '', ''])
const otpRefs = reactive<HTMLInputElement[]>([])
const verifyingOTP = ref(false)
const resendCooldown = ref(0)
let cooldownInterval: ReturnType<typeof setInterval> | null = null

const handleOTPInput = (i: number) => { if (otpDigits[i] && i < 5) otpRefs[i + 1]?.focus() }
const handleOTPBackspace = (i: number, e: KeyboardEvent) => { if (!otpDigits[i] && i > 0) otpRefs[i - 1]?.focus() }
const handleOTPPaste = (e: ClipboardEvent) => {
  const pasted = e.clipboardData?.getData('text')?.replace(/\D/g, '').slice(0, 6) || ''
  for (let i = 0; i < 6; i++) otpDigits[i] = pasted[i] || ''
  if (pasted.length >= 6) otpRefs[5]?.focus()
}

const startCooldown = () => {
  resendCooldown.value = 60
  if (cooldownInterval) clearInterval(cooldownInterval)
  cooldownInterval = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) { clearInterval(cooldownInterval!); cooldownInterval = null }
  }, 1000)
}

const verifyOTP = async () => {
  error.value = ''
  verifyingOTP.value = true
  try {
    const res = await GATEWAY_ENDPOINT.post('/auth/verify-otp', { email: form.email, otp: otpDigits.join('') })
    if (res?.type === 'ERROR') throw res;
    showToast({ title: 'Verified! 🎉', message: 'Email confirmed.', toastType: 'success' })
    currentStep.value = 'business'
  } catch (e: any) {
    error.value = e?.response?.data?.message || 'Invalid code. Try again.'
  } finally { verifyingOTP.value = false }
}

const resendOTP = async () => {
  try {
    const res = await GATEWAY_ENDPOINT.post('/auth/send-otp', { email: form.email })
    if (res?.type === 'ERROR') throw res;
    showToast({ title: 'Code Sent!', message: 'A fresh code is on its way.', toastType: 'success' })
    startCooldown()
  } catch (e: any) { showToast({ title: 'Oops!', message: 'Could not resend code.', toastType: 'error' }) }
}

const vendor = reactive({
  storeName: '', description: '', category: 'restaurant', address: '',
  isInsideCampus: false, isStudentBusiness: false, matricNumber: '', university: '',
  operatingHours: { open: '08:00 AM', close: '08:00 PM' },
  preparationTime: 15, minimumOrder: 0, deliveryFee: 0,
  bankDetails: { bankCode: '', bankName: '', accountNumber: '', accountName: '' },
})

const categoryOptions = [
  { label: 'Restaurant', value: 'restaurant' }, { label: 'Eatery / Buka', value: 'eatery' },
  { label: 'Snacks & Small Chops', value: 'snacks' }, { label: 'Drinks & Smoothies', value: 'drinks' },
  { label: 'Groceries', value: 'groceries' }, { label: 'Bakery & Pastries', value: 'bakery' },
  { label: 'Pharmacy', value: 'pharmacy' }, { label: 'Other', value: 'other' },
]

const universityOptions = [
  { label: 'University of Lagos (UNILAG)', value: 'unilag' },
  { label: 'University of Ibadan (UI)', value: 'ui' },
  { label: 'Obafemi Awolowo University (OAU)', value: 'oau' },
  { label: 'Other', value: 'other' },
]

const bankOptions = ref<{ label: string; value: string }[]>([])
const banksLoading = ref(false)

const fetchBanks = async () => {
  banksLoading.value = true
  try {
    const res = await payments_api.getBanks()
    const banks = res?.data?.data || res?.data || []
    bankOptions.value = banks.map((b: any) => ({ label: b.name || b.bank_name, value: b.code || b.bank_code || b.slug }))
  } catch (e) { } finally { banksLoading.value = false }
}

const resolvingAccount = ref(false)
const accountResolved = ref(false)
const resolveError = ref('')
let resolveTimeout: ReturnType<typeof setTimeout> | null = null

watch(() => vendor.bankDetails.accountNumber, (newVal) => {
  vendor.bankDetails.accountName = ''; accountResolved.value = false; resolveError.value = ''
  if (resolveTimeout) clearTimeout(resolveTimeout)
  const cleaned = newVal.replace(/\D/g, '')
  if (cleaned.length === 10 && vendor.bankDetails.bankCode) resolveTimeout = setTimeout(() => resolveAccount(cleaned), 500)
})

watch(() => vendor.bankDetails.bankCode, (newVal) => {
  const selected = bankOptions.value.find(b => b.value === newVal)
  if (selected) vendor.bankDetails.bankName = selected.label
  const cleaned = vendor.bankDetails.accountNumber.replace(/\D/g, '')
  if (cleaned.length === 10 && newVal) resolveAccount(cleaned)
})

const resolveAccount = async (accountNumber: string) => {
  resolvingAccount.value = true; resolveError.value = ''
  try {
    const res = await payments_api.resolveAccount(accountNumber, vendor.bankDetails.bankCode)
    const data = res?.data?.data || res?.data || {}
    vendor.bankDetails.accountName = data.account_name || data.accountName || ''
    accountResolved.value = !!vendor.bankDetails.accountName
  } catch (e: any) {
    resolveError.value = e?.response?.data?.message || 'Failed to verify account.'
    vendor.bankDetails.accountName = ''
  } finally { resolvingAccount.value = false }
}

const logoInput = ref<HTMLInputElement | null>(null)
const logoFile = ref<File | null>(null)
const logoPreview = ref('')
const logoUrl = ref('')
const logoUploading = ref(false)

const triggerLogoUpload = () => logoInput.value?.click()

const handleLogoSelect = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    logoFile.value = file; logoPreview.value = URL.createObjectURL(file); logoUploading.value = true
    try {
      const res = await vendors_api.uploadImage(file)
      logoUrl.value = res?.data?.url || res?.data?.imageUrl || res?.data?.data?.url || ''
    } catch (err) { showToast({ title: 'Upload Failed', message: 'Could not upload logo.', toastType: 'error' }) }
    finally { logoUploading.value = false }
  }
}

const removeLogo = () => { logoFile.value = null; logoPreview.value = ''; logoUrl.value = '' }

const handleStep1 = async () => {
  error.value = ''
  if (!validateStep1()) return
  try {
    await register({ ...form }, { skipRedirect: true })
    startCooldown(); currentStep.value = 'otp'; setTimeout(() => otpRefs[0]?.focus(), 200)
  } catch (e: any) { error.value = e?.data?.message || e?.response?.data?.message || 'Registration failed.' }
}

const handleStep2 = () => {
  error.value = ''
  if (!validateStep2()) return
  currentStep.value = 'logistics'
}

const handleFinalSubmit = async () => {
  error.value = ''
  submitting.value = true
  try {
    const payload: any = {
      storeName: vendor.storeName, description: vendor.description, category: vendor.category, address: vendor.address,
      isInsideCampus: vendor.isInsideCampus, isStudentBusiness: vendor.isStudentBusiness, operatingHours: vendor.operatingHours,
      preparationTime: vendor.preparationTime, minimumOrder: vendor.minimumOrder, deliveryFee: vendor.deliveryFee,
    }
    if (logoUrl.value) payload.logo = logoUrl.value
    if (vendor.isStudentBusiness) { payload.matricNumber = vendor.matricNumber; payload.university = vendor.university }
    if (vendor.bankDetails.bankName && vendor.bankDetails.accountNumber) payload.bankDetails = { bankName: vendor.bankDetails.bankName, bankCode: vendor.bankDetails.bankCode, accountNumber: vendor.bankDetails.accountNumber, accountName: vendor.bankDetails.accountName }

    const res = await vendors_api.createVendor(payload)
    if (res?.type === 'ERROR') throw res;
    showToast({ title: 'You\'re In! 🎉', message: 'Your store is live!', toastType: 'success' })
    navigateTo('/dashboard')
  } catch (e: any) { error.value = e?.data?.message || e?.response?.data?.message || 'Failed to create store.' }
  finally { submitting.value = false }
}

onMounted(() => fetchBanks())
onUnmounted(() => { if (cooldownInterval) clearInterval(cooldownInterval) })
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { 
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
}
.slide-up-enter-from { opacity: 0; transform: translateY(20px) scale(0.98); }
.slide-up-leave-to { opacity: 0; transform: translateY(-20px) scale(0.98); }
.slide-up-enter-to, .slide-up-leave-from { opacity: 1; transform: translateY(0) scale(1); }
</style>
