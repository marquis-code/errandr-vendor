<template>
  <div class="min-h-screen w-full bg-white flex items-center justify-center px-4 py-12 relative">
    <!-- Ambient Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-parentPrimary/10 rounded-md blur-[120px] translate-x-1/4 -translate-y-1/4"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-md blur-[120px] -translate-x-1/4 translate-y-1/4"></div>
    </div>

    <div class="w-full max-w-[500px] relative z-10">
      
      <!-- Header -->
      <transition name="fade" mode="out-in">
        <div v-if="currentStep !== 'success'" class="text-center mb-8">
          <!-- <img src="@/assets/img/logo-light.png" alt="" class="w-[200px] mx-auto" /> -->
          <span class="text-xl font-medium text-black tracking-tight hidden sm:block transition-colors">
            Erranders<span class="text-parentPrimary">.</span>
          </span>
          <h1 class="text-2xl font-medium text-gray-900 tracking-tight mb-2">Open Your Store</h1>
          <p class="text-gray-500 font-medium text-sm">Join the campus delivery network</p>
        </div>
      </transition>

      <!-- Step Indicator -->
      <transition name="fade" mode="out-in">
        <div v-if="currentStep !== 'success'" class="mb-8 flex items-center justify-between relative px-6">
        <div class="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-md z-0"></div>
        <div class="absolute left-10 top-1/2 -translate-y-1/2 h-1 bg-parentPrimary rounded-md z-0 transition-all duration-500" :style="{ width: progressWidth }"></div>

        <div v-for="s in 3" :key="s" class="relative z-10 flex flex-col items-center gap-2 bg-gray-50 p-1">
          <div class="w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-500"
               :class="[displayStep > s ? 'bg-parentPrimary text-white ring-4 ring-parentPrimary/20' : displayStep === s ? 'bg-white border-2 border-parentPrimary text-parentPrimary scale-110' : 'bg-white border border-gray-200 text-gray-400']">
            <Check v-if="displayStep > s" class="w-4 h-4" />
            <span v-else>{{ s }}</span>
          </div>
        </div>
      </div>
      </transition>

      <!-- Main Content -->
      <div class="relative min-h-[500px] flex flex-col w-full">
        
        <div class="relative flex-1">
          <!-- Step 1: Account -->
          <transition name="slide-up" mode="out-in">
            <form v-if="currentStep === 'account'" @submit.prevent="handleStep1" class="w-full flex flex-col space-y-6">
              <div class="mb-2">
                <h2 class="text-xl font-medium text-gray-900 tracking-tight">Personal Details</h2>
                <p class="text-smtext-gray-500 font-medium">Create your merchant account</p>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UiAnimatedInput v-model="form.firstName" type="text" label="First Name" :hasError="!!valErrors.firstName" :errorMessage="valErrors.firstName" @input="valErrors.firstName=''" />
                <UiAnimatedInput v-model="form.lastName" type="text" label="Last Name" :hasError="!!valErrors.lastName" :errorMessage="valErrors.lastName" @input="valErrors.lastName=''" />
              </div>
              <UiAnimatedInput v-model="form.email" type="email" label="Email Address" :hasError="!!valErrors.email" :errorMessage="valErrors.email" @input="valErrors.email=''" />
              <UiAnimatedInput v-model="form.phone" type="tel" label="Phone Number" :hasError="!!valErrors.phone" :errorMessage="valErrors.phone" @input="valErrors.phone=''" />
              <UiAnimatedInput v-model="form.password" type="password" label="Password" :hasError="!!valErrors.password" :errorMessage="valErrors.password" @input="valErrors.password=''" />
              <UiAnimatedInput v-model="form.referredBy" type="text" label="Referral Code (Optional)" placeholder="" @input="formatReferralCode" />

              <!-- <div v-if="error" class="p-3 bg-red-50 text-red-600 text-smfont-bold rounded-md flex items-center gap-2"><AlertCircle class="w-4 h-4 shrink-0" /> {{ error }}</div> -->

              <div class="mt-auto pt-4">
                <button type="submit" :disabled="loading || validatingReferral" class="w-full py-2 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-md font-medium text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]">
                  <Loader2 v-if="loading || validatingReferral" class="animate-spin w-5 h-5" />
                  <span>Continue</span>
                  <ArrowRight v-if="!loading && !validatingReferral" class="w-5 h-5" />
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
              <div class="w-16 h-16 bg-blue-50 rounded-md flex items-center justify-center mx-auto mb-2 text-[#FF5C1A]">
                <Mail class="w-8 h-8" />
              </div>
              <h2 class="text-xl font-medium text-gray-900 tracking-tight">Check your inbox</h2>
              <p class="text-gray-500 text-smfont-medium leading-relaxed">We sent a 6-digit code to <br><strong class="text-gray-900">{{ form.email }}</strong></p>

              <div class="flex justify-center gap-2 py-4">
                <input v-for="(_, i) in 6" :key="i" :ref="el => { if (el) otpRefs[i] = el as HTMLInputElement }" v-model="otpDigits[i]" @input="handleOTPInput(i)" @keydown.backspace="handleOTPBackspace(i, $event)" @paste.prevent="handleOTPPaste" type="text" maxlength="1" inputmode="numeric" class="w-12 h-14 text-center text-xl font-medium bg-gray-50 border border-gray-200 rounded-md focus:border-[#FF5C1A] focus:ring-4 focus:ring-[#FF5C1A]/10 outline-none transition-all" />
              </div>

              <!-- <div v-if="error" class="p-3 bg-red-50 text-red-600 text-smfont-bold rounded-md flex items-center justify-center gap-2 w-full"><AlertCircle class="w-4 h-4 shrink-0" /> {{ error }}</div> -->

              <div class="w-full mt-auto pt-4">
                <button @click="verifyOTP" :disabled="verifyingOTP || otpDigits.join('').length < 6" class="w-full py-2 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-md font-medium text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]">
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
                  <h2 class="text-xl font-medium text-gray-900 tracking-tight">Business Profile</h2>
                  <p class="text-smtext-gray-500 font-medium">Tell us about your store</p>
                </div>
                <Store class="w-6 h-6 text-gray-300" />
              </div>

              <UiAnimatedInput v-model="vendor.storeName" type="text" label="Store Name" :hasError="!!valErrors.storeName" :errorMessage="valErrors.storeName" @input="valErrors.storeName=''; if (useStoreNameAsUrl) syncSubdomainFromStore()" />
              
              <!-- Use Store Name as URL toggle -->
              <div 
                @click="useStoreNameAsUrl = !useStoreNameAsUrl; if (useStoreNameAsUrl) syncSubdomainFromStore()"
                class="flex items-center gap-3 px-4 py-3 rounded-md border cursor-pointer transition-all duration-300"
                :class="useStoreNameAsUrl ? 'bg-[#FF5C1A]/5 border-[#FF5C1A]/30' : 'bg-gray-50/80 border-gray-100 hover:border-gray-200'"
              >
                <div 
                  class="w-10 h-5 rounded-md relative transition-all duration-300 shrink-0"
                  :class="useStoreNameAsUrl ? 'bg-[#FF5C1A]' : 'bg-gray-200'"
                >
                  <div 
                    class="w-4 h-4 bg-white rounded-md absolute top-0.5 transition-all duration-300"
                    :class="useStoreNameAsUrl ? 'left-[22px]' : 'left-0.5'"
                  ></div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-gray-900">Use store name as my URL</p>
                  <p class="text-xs text-gray-400 font-medium">Auto-generate your custom link from store name</p>
                </div>
              </div>

              <!-- Subdomain Field -->
              <div class="space-y-2">
                <div class="relative">
                  <div class="flex items-center border rounded-md overflow-hidden transition-all duration-300"
                    :class="valErrors.subdomain ? 'border-red-300 bg-red-50/30' : subdomainAvailable === true ? 'border-emerald-300 bg-emerald-50/30' : subdomainAvailable === false && vendor.subdomain.length >= 3 ? 'border-red-300 bg-red-50/30' : 'border-gray-200 bg-white focus-within:border-[#FF5C1A]/40 focus-within:ring-2 focus-within:ring-[#FF5C1A]/10'"
                  >
                    <div class="pl-4 pr-2 py-3 bg-gray-50/80 border-r border-gray-100 shrink-0">
                      <span class="text-xs font-medium text-gray-400 tracking-wide">https://</span>
                    </div>
                    <input 
                      v-model="vendor.subdomain" 
                      :disabled="useStoreNameAsUrl"
                      type="text" 
                      placeholder="your-store-name"
                      class="flex-1 px-3 py-3 text-sm font-bold text-gray-900 bg-transparent outline-none placeholder:text-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                      @input="valErrors.subdomain = ''; vendor.subdomain = vendor.subdomain.toLowerCase().replace(/[^a-z0-9-]/g, ''); debouncedCheckSubdomain()"
                    />
                    <div class="pr-4 py-3 bg-gray-50/80 border-l border-gray-100 shrink-0">
                      <span class="text-xs font-medium text-gray-400 tracking-wide">.erranders.org</span>
                    </div>
                  </div>
                  <!-- Availability Status -->
                  <div class="flex items-center gap-2 mt-2 min-h-[20px]">
                    <template v-if="checkingSubdomain">
                      <div class="w-3.5 h-3.5 border-2 border-gray-200 border-t-[#FF5C1A] rounded-md animate-spin"></div>
                      <span class="text-xs font-bold text-gray-400">Checking availability...</span>
                    </template>
                    <template v-else-if="subdomainAvailable === true && vendor.subdomain.length >= 3">
                      <CheckCircle class="w-3.5 h-3.5 text-emerald-500" />
                      <span class="text-xs font-bold text-emerald-600">{{ vendor.subdomain }}.erranders.org is available! 🎉</span>
                    </template>
                    <template v-else-if="subdomainAvailable === false && vendor.subdomain.length >= 3">
                      <AlertCircle class="w-3.5 h-3.5 text-red-500" />
                      <span class="text-xs font-bold text-red-500">This subdomain is taken. Try another one.</span>
                    </template>
                    <template v-else-if="vendor.subdomain.length > 0 && vendor.subdomain.length < 3">
                      <AlertCircle class="w-3.5 h-3.5 text-amber-500" />
                      <span class="text-xs font-bold text-amber-500">Minimum 3 characters required</span>
                    </template>
                    <template v-else-if="valErrors.subdomain">
                      <AlertCircle class="w-3.5 h-3.5 text-red-500" />
                      <span class="text-xs font-bold text-red-500">{{ valErrors.subdomain }}</span>
                    </template>
                  </div>
                </div>
              </div>

              <UiAnimatedInput v-model="vendor.description" type="textarea" label="Store Description" :rows="2" />

              <div class="flex gap-3 pt-4 mt-auto">
                <button type="button" @click="currentStep = 'otp'" class="w-14 h-14 shrink-0 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-600 rounded-md font-bold transition-all"><ArrowLeft class="w-5 h-5" /></button>
                <button type="submit" class="flex-1 py-2 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-md font-medium text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                  Continue <ArrowRight class="w-5 h-5" />
                </button>
              </div>
            </form>
          </transition>

          <!-- Step: Business Type -->
          <transition name="slide-up" mode="out-in">
            <form v-if="currentStep === 'businessType'" @submit.prevent="handleStepType" class="w-full flex flex-col space-y-4">
              <div class="mb-4">
                <h2 class="text-xl font-medium text-gray-900 tracking-tight">Business Type</h2>
                <p class="text-sm text-gray-500 font-medium">What kind of business do you run?</p>
              </div>

              <div class="grid gap-3">
                <div @click="vendor.businessType = 'physical_product'" class="flex items-start gap-4 p-4 border rounded-md cursor-pointer transition-all duration-300" :class="vendor.businessType === 'physical_product' ? 'bg-[#FF5C1A]/5 border-[#FF5C1A] ring-1 ring-[#FF5C1A]/10' : 'bg-white border-gray-200 hover:border-[#FF5C1A]/50'">
                  <div class="w-10 h-10 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">📦</div>
                  <div>
                    <h3 class="text-sm font-bold text-gray-900 mb-1">Physical Products</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">I sell physical items that require delivery or pickup (e.g. food, clothing, groceries).</p>
                  </div>
                  <div class="ml-auto w-5 h-5 rounded-md border-2 flex items-center justify-center" :class="vendor.businessType === 'physical_product' ? 'border-[#FF5C1A] bg-[#FF5C1A]' : 'border-gray-300'"><Check v-if="vendor.businessType === 'physical_product'" class="w-3 h-3 text-white" /></div>
                </div>

                <div @click="vendor.businessType = 'service_provider'" class="flex items-start gap-4 p-4 border rounded-md cursor-pointer transition-all duration-300" :class="vendor.businessType === 'service_provider' ? 'bg-[#FF5C1A]/5 border-[#FF5C1A] ring-1 ring-[#FF5C1A]/10' : 'bg-white border-gray-200 hover:border-[#FF5C1A]/50'">
                  <div class="w-10 h-10 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">✂️</div>
                  <div>
                    <h3 class="text-sm font-bold text-gray-900 mb-1">Service Provider</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">I provide services that require booking appointments (e.g. salon, spa, tutoring).</p>
                  </div>
                  <div class="ml-auto w-5 h-5 rounded-md border-2 flex items-center justify-center" :class="vendor.businessType === 'service_provider' ? 'border-[#FF5C1A] bg-[#FF5C1A]' : 'border-gray-300'"><Check v-if="vendor.businessType === 'service_provider'" class="w-3 h-3 text-white" /></div>
                </div>

                <div @click="vendor.businessType = 'hybrid'" class="flex items-start gap-4 p-4 border rounded-md cursor-pointer transition-all duration-300" :class="vendor.businessType === 'hybrid' ? 'bg-[#FF5C1A]/5 border-[#FF5C1A] ring-1 ring-[#FF5C1A]/10' : 'bg-white border-gray-200 hover:border-[#FF5C1A]/50'">
                  <div class="w-10 h-10 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">🛍️</div>
                  <div>
                    <h3 class="text-sm font-bold text-gray-900 mb-1">Hybrid (Products & Services)</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">I provide services AND sell physical products (e.g. a salon selling hair cream).</p>
                  </div>
                  <div class="ml-auto w-5 h-5 rounded-md border-2 flex items-center justify-center" :class="vendor.businessType === 'hybrid' ? 'border-[#FF5C1A] bg-[#FF5C1A]' : 'border-gray-300'"><Check v-if="vendor.businessType === 'hybrid'" class="w-3 h-3 text-white" /></div>
                </div>
              </div>

              <div class="flex gap-3 pt-4 mt-auto">
                <button type="button" @click="currentStep = 'business'" class="w-14 h-14 shrink-0 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-600 rounded-md font-bold transition-all"><ArrowLeft class="w-5 h-5" /></button>
                <button type="submit" class="flex-1 py-2 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-md font-medium text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]">Continue <ArrowRight class="w-5 h-5" /></button>
              </div>
            </form>
          </transition>


          <!-- Step: Categories -->
          <transition name="slide-up" mode="out-in">
            <form v-if="currentStep === 'categories'" @submit.prevent="handleStepCategories" class="w-full flex flex-col space-y-4">
              <div class="mb-4">
                <h2 class="text-xl font-medium text-gray-900 tracking-tight">Business Categories</h2>
                <p class="text-sm text-gray-500 font-medium">What describes your offerings?</p>
              </div>

              <!-- Business Categories — Searchable Dropdown + Tags -->
              <div class="space-y-3">
                <div class="relative" ref="categoryDropdownRef">
                  <div 
                    @click="showCategoryDropdown = !showCategoryDropdown"
                    class="flex items-center flex-wrap gap-2 min-h-[48px] px-4 py-2.5 border rounded-md cursor-pointer transition-all duration-200 bg-white"
                    :class="showCategoryDropdown ? 'border-[#FF5C1A]/40 ring-1 ring-[#FF5C1A]/5' : 'border-gray-200 hover:border-gray-300'"
                  >
                    <div v-for="cat in selectedCategories" :key="cat" class="flex items-center gap-1.5 px-2.5 py-1 bg-[#FF5C1A]/10 border border-[#FF5C1A]/20 text-[#FF5C1A] text-xs font-medium rounded-lg">
                      {{ getCategoryLabel(cat) }}
                      <button type="button" @click.stop="removeCategory(cat)" class="hover:text-red-600 transition-colors"><X class="w-3 h-3" /></button>
                    </div>
                    <input 
                      v-model="categorySearch" 
                      @focus="showCategoryDropdown = true"
                      @keydown.enter.prevent="handleCategoryEnter"
                      type="text" 
                      :placeholder="selectedCategories.length === 0 ? 'Search or type a custom category...' : 'Add more...'"
                      class="flex-1 min-w-[120px] text-sm font-medium text-gray-900 bg-transparent outline-none placeholder:text-gray-300"
                      @click.stop
                    />
                    <div class="shrink-0 text-gray-300">
                      <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': showCategoryDropdown }" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </div>

                  <!-- Dropdown -->
                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0 translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-1"
                  >
                    <div v-if="showCategoryDropdown" class="absolute z-50 w-full mt-2 bg-white rounded-md border border-gray-200 max-h-[220px] overflow-y-auto">
                      <div v-if="filteredCategoryOptions.length === 0 && categorySearch.trim()" class="p-3">
                        <button type="button" @click="addCustomCategory" class="w-full flex items-center gap-2 px-4 py-2 rounded-md bg-gray-50 hover:bg-[#FF5C1A]/5 transition-all text-left">
                          <div class="w-7 h-7 rounded-lg bg-[#FF5C1A]/10 text-[#FF5C1A] flex items-center justify-center"><span class="text-sm font-medium">+</span></div>
                          <span class="text-sm font-bold text-gray-700">Add "<span class="text-[#FF5C1A]">{{ categorySearch.trim() }}</span>"</span>
                        </button>
                      </div>
                      <div v-for="cat in filteredCategoryOptions" :key="cat.value" 
                        @click="toggleCategory(cat.value); categorySearch = ''"
                        class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-all first:rounded-t-2xl last:rounded-b-2xl"
                      >
                        <div 
                          class="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200"
                          :class="selectedCategories.includes(cat.value) ? 'bg-[#FF5C1A] border-[#FF5C1A] scale-105' : 'border-gray-300'"
                        >
                          <Check v-if="selectedCategories.includes(cat.value)" class="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <span class="text-sm font-bold text-gray-900">{{ cat.label }}</span>
                        </div>
                      </div>
                      <div v-if="categorySearch.trim() && filteredCategoryOptions.length > 0" class="border-t border-gray-100 p-3">
                        <button type="button" @click="addCustomCategory" class="w-full flex items-center gap-2 px-4 py-2.5 rounded-md hover:bg-[#FF5C1A]/5 transition-all text-left">
                          <div class="w-6 h-6 rounded-md bg-gray-100 text-gray-400 flex items-center justify-center"><span class="text-xs font-medium">+</span></div>
                          <span class="text-xs font-bold text-gray-500">Add "<span class="text-[#FF5C1A]">{{ categorySearch.trim() }}</span>" as custom</span>
                        </button>
                      </div>
                    </div>
                  </transition>
                </div>

                <!-- Custom category note -->
                <p class="text-xs text-gray-400 font-medium mt-2 flex items-start gap-1.5 leading-relaxed">
                  <span class="text-amber-500 shrink-0 mt-px">💡</span>
                  If your business isn't among the list, simply type in the category of your business and it will be custom-added for you.
                </p>
              </div>
              
              <div class="grid grid-cols-1 gap-2.5 pt-2">
                <!-- Inside Campus Toggle -->
                <div 
                  @click="vendor.isInsideCampus = !vendor.isInsideCampus"
                  class="flex items-center gap-3 p-3.5 rounded-md border cursor-pointer transition-all duration-300"
                  :class="vendor.isInsideCampus ? 'bg-[#FF5C1A]/5 border-[#FF5C1A]/30' : 'bg-gray-50/80 border-gray-100 hover:border-gray-200'"
                >
                  <div 
                    class="w-9 h-9 rounded-md flex items-center justify-center shrink-0 transition-all duration-300"
                    :class="vendor.isInsideCampus ? 'bg-[#FF5C1A]/10 text-[#FF5C1A]' : 'bg-gray-100 text-gray-400'"
                  >
                    <MapPin class="w-4 h-4" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-gray-800">Inside campus</p>
                    <p class="text-[11px] text-gray-400 font-medium">Store is within the school premises</p>
                  </div>
                  <div 
                    class="w-10 h-6 rounded-md p-0.5 transition-all duration-300 shrink-0"
                    :class="vendor.isInsideCampus ? 'bg-[#FF5C1A]' : 'bg-gray-200'"
                  >
                    <div 
                      class="w-5 h-5 bg-white rounded-md transition-all duration-300"
                      :class="vendor.isInsideCampus ? 'translate-x-4' : 'translate-x-0'"
                    ></div>
                  </div>
                </div>

                <!-- Student Entrepreneur Toggle -->
                <div 
                  @click="vendor.isStudentBusiness = !vendor.isStudentBusiness"
                  class="flex items-center gap-3 p-3.5 rounded-md border cursor-pointer transition-all duration-300"
                  :class="vendor.isStudentBusiness ? 'bg-[#FF5C1A]/5 border-[#FF5C1A]/30' : 'bg-gray-50/80 border-gray-100 hover:border-gray-200'"
                >
                  <div 
                    class="w-9 h-9 rounded-md flex items-center justify-center shrink-0 transition-all duration-300"
                    :class="vendor.isStudentBusiness ? 'bg-[#FF5C1A]/10 text-[#FF5C1A]' : 'bg-gray-100 text-gray-400'"
                  >
                    <GraduationCap class="w-4 h-4" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-gray-800">Student entrepreneur</p>
                    <p class="text-[11px] text-gray-400 font-medium">Run by a current student</p>
                  </div>
                  <div 
                    class="w-10 h-6 rounded-md p-0.5 transition-all duration-300 shrink-0"
                    :class="vendor.isStudentBusiness ? 'bg-[#FF5C1A]' : 'bg-gray-200'"
                  >
                    <div 
                      class="w-5 h-5 bg-white rounded-md transition-all duration-300"
                      :class="vendor.isStudentBusiness ? 'translate-x-4' : 'translate-x-0'"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Student Details Fields -->
              <transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div v-if="vendor.isStudentBusiness" class="space-y-4 pt-4 border-t border-gray-100">
                  <div class="space-y-1.5">
                    <label class="text-xs font-bold text-gray-700 tracking-wide uppercase">Select Institution <span class="text-[#FF5C1A]">*</span></label>
                    <select 
                      v-model="vendor.university" 
                      class="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:border-[#FF5C1A] focus:bg-white transition-all text-gray-900"
                      required
                    >
                      <option value="" disabled selected>Select your institution</option>
                      <option v-for="opt in universityOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-xs font-bold text-gray-700 tracking-wide uppercase">Matriculation Number (Optional)</label>
                    <input 
                      v-model="vendor.matricNumber" 
                      type="text" 
                      placeholder="e.g. 1902040..."
                      class="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:border-[#FF5C1A] focus:bg-white transition-all text-gray-900"
                    />
                  </div>
                </div>
              </transition>

              <div class="flex gap-3 pt-4 mt-auto">
                <button type="button" @click="currentStep = 'businessType'" class="w-14 h-14 shrink-0 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-600 rounded-md font-bold transition-all"><ArrowLeft class="w-5 h-5" /></button>
                <button type="submit" class="flex-1 py-2 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-md font-medium text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]">Continue <ArrowRight class="w-5 h-5" /></button>
              </div>
            </form>
          </transition>

          <!-- Step: Team Size -->
          <transition name="slide-up" mode="out-in">
            <form v-if="currentStep === 'teamSize'" @submit.prevent="handleStepTeamSize" class="w-full flex flex-col space-y-4">
              <div class="mb-4">
                <h2 class="text-xl font-medium text-gray-900 tracking-tight">Team Size</h2>
                <p class="text-sm text-gray-500 font-medium">How many people work at your business?</p>
              </div>

              <div class="grid gap-3">
                <div @click="vendor.teamSize = 'independent'" class="flex items-center justify-between p-4 border rounded-md cursor-pointer transition-all duration-300" :class="vendor.teamSize === 'independent' ? 'bg-[#FF5C1A]/5 border-[#FF5C1A] ring-1 ring-[#FF5C1A]/10' : 'bg-white border-gray-200 hover:border-[#FF5C1A]/50'">
                  <span class="text-sm font-bold text-gray-900">It's just me</span>
                  <div class="w-5 h-5 rounded-md border-2 flex items-center justify-center" :class="vendor.teamSize === 'independent' ? 'border-[#FF5C1A] bg-[#FF5C1A]' : 'border-gray-300'"><Check v-if="vendor.teamSize === 'independent'" class="w-3 h-3 text-white" /></div>
                </div>

                <div @click="vendor.teamSize = '2-5'" class="flex items-center justify-between p-4 border rounded-md cursor-pointer transition-all duration-300" :class="vendor.teamSize === '2-5' ? 'bg-[#FF5C1A]/5 border-[#FF5C1A] ring-1 ring-[#FF5C1A]/10' : 'bg-white border-gray-200 hover:border-[#FF5C1A]/50'">
                  <span class="text-sm font-bold text-gray-900">2 - 5 people</span>
                  <div class="w-5 h-5 rounded-md border-2 flex items-center justify-center" :class="vendor.teamSize === '2-5' ? 'border-[#FF5C1A] bg-[#FF5C1A]' : 'border-gray-300'"><Check v-if="vendor.teamSize === '2-5'" class="w-3 h-3 text-white" /></div>
                </div>

                <div @click="vendor.teamSize = '6-10'" class="flex items-center justify-between p-4 border rounded-md cursor-pointer transition-all duration-300" :class="vendor.teamSize === '6-10' ? 'bg-[#FF5C1A]/5 border-[#FF5C1A] ring-1 ring-[#FF5C1A]/10' : 'bg-white border-gray-200 hover:border-[#FF5C1A]/50'">
                  <span class="text-sm font-bold text-gray-900">6 - 10 people</span>
                  <div class="w-5 h-5 rounded-md border-2 flex items-center justify-center" :class="vendor.teamSize === '6-10' ? 'border-[#FF5C1A] bg-[#FF5C1A]' : 'border-gray-300'"><Check v-if="vendor.teamSize === '6-10'" class="w-3 h-3 text-white" /></div>
                </div>
                
                <div @click="vendor.teamSize = '11-20'" class="flex items-center justify-between p-4 border rounded-md cursor-pointer transition-all duration-300" :class="vendor.teamSize === '11-20' ? 'bg-[#FF5C1A]/5 border-[#FF5C1A] ring-1 ring-[#FF5C1A]/10' : 'bg-white border-gray-200 hover:border-[#FF5C1A]/50'">
                  <span class="text-sm font-bold text-gray-900">11 - 20 people</span>
                  <div class="w-5 h-5 rounded-md border-2 flex items-center justify-center" :class="vendor.teamSize === '11-20' ? 'border-[#FF5C1A] bg-[#FF5C1A]' : 'border-gray-300'"><Check v-if="vendor.teamSize === '11-20'" class="w-3 h-3 text-white" /></div>
                </div>
                
                <div @click="vendor.teamSize = '20+'" class="flex items-center justify-between p-4 border rounded-md cursor-pointer transition-all duration-300" :class="vendor.teamSize === '20+' ? 'bg-[#FF5C1A]/5 border-[#FF5C1A] ring-1 ring-[#FF5C1A]/10' : 'bg-white border-gray-200 hover:border-[#FF5C1A]/50'">
                  <span class="text-sm font-bold text-gray-900">20+ people</span>
                  <div class="w-5 h-5 rounded-md border-2 flex items-center justify-center" :class="vendor.teamSize === '20+' ? 'border-[#FF5C1A] bg-[#FF5C1A]' : 'border-gray-300'"><Check v-if="vendor.teamSize === '20+'" class="w-3 h-3 text-white" /></div>
                </div>
              </div>

              <div class="flex gap-3 pt-4 mt-auto">
                <button type="button" @click="currentStep = 'categories'" class="w-14 h-14 shrink-0 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-600 rounded-md font-bold transition-all"><ArrowLeft class="w-5 h-5" /></button>
                <button type="submit" class="flex-1 py-2 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-md font-medium text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]">Continue <ArrowRight class="w-5 h-5" /></button>
              </div>
            </form>
          </transition>

          <!-- Step: Location Type -->
          <transition name="slide-up" mode="out-in">
            <form v-if="currentStep === 'locationType'" @submit.prevent="handleStepLocationType" class="w-full flex flex-col space-y-4">
              <div class="mb-4">
                <h2 class="text-xl font-medium text-gray-900 tracking-tight">Service Location</h2>
                <p class="text-sm text-gray-500 font-medium">Where do you provide your services/products?</p>
              </div>

              <div class="grid gap-3">
                <div @click="vendor.serviceLocation = 'physical_location'" class="flex items-start gap-4 p-4 border rounded-md cursor-pointer transition-all duration-300" :class="vendor.serviceLocation === 'physical_location' ? 'bg-[#FF5C1A]/5 border-[#FF5C1A] ring-1 ring-[#FF5C1A]/10' : 'bg-white border-gray-200 hover:border-[#FF5C1A]/50'">
                  <div class="w-10 h-10 rounded-md bg-orange-50 text-[#FF5C1A] flex items-center justify-center shrink-0"><MapPin class="w-5 h-5" /></div>
                  <div>
                    <h3 class="text-sm font-bold text-gray-900 mb-1">Physical Location</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">I have a store, salon, or physical space where customers come to me.</p>
                  </div>
                  <div class="ml-auto w-5 h-5 rounded-md border-2 flex items-center justify-center" :class="vendor.serviceLocation === 'physical_location' ? 'border-[#FF5C1A] bg-[#FF5C1A]' : 'border-gray-300'"><Check v-if="vendor.serviceLocation === 'physical_location'" class="w-3 h-3 text-white" /></div>
                </div>

                <div @click="vendor.serviceLocation = 'mobile_operator'" class="flex items-start gap-4 p-4 border rounded-md cursor-pointer transition-all duration-300" :class="vendor.serviceLocation === 'mobile_operator' ? 'bg-[#FF5C1A]/5 border-[#FF5C1A] ring-1 ring-[#FF5C1A]/10' : 'bg-white border-gray-200 hover:border-[#FF5C1A]/50'">
                  <div class="w-10 h-10 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">🚙</div>
                  <div>
                    <h3 class="text-sm font-bold text-gray-900 mb-1">Mobile Operator</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">I travel to my clients to provide services or deliver goods.</p>
                  </div>
                  <div class="ml-auto w-5 h-5 rounded-md border-2 flex items-center justify-center" :class="vendor.serviceLocation === 'mobile_operator' ? 'border-[#FF5C1A] bg-[#FF5C1A]' : 'border-gray-300'"><Check v-if="vendor.serviceLocation === 'mobile_operator'" class="w-3 h-3 text-white" /></div>
                </div>

                <div @click="vendor.serviceLocation = 'virtual_online'" class="flex items-start gap-4 p-4 border rounded-md cursor-pointer transition-all duration-300" :class="vendor.serviceLocation === 'virtual_online' ? 'bg-[#FF5C1A]/5 border-[#FF5C1A] ring-1 ring-[#FF5C1A]/10' : 'bg-white border-gray-200 hover:border-[#FF5C1A]/50'">
                  <div class="w-10 h-10 rounded-md bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">💻</div>
                  <div>
                    <h3 class="text-sm font-bold text-gray-900 mb-1">Virtual / Online</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">I provide my services entirely online or via social media.</p>
                  </div>
                  <div class="ml-auto w-5 h-5 rounded-md border-2 flex items-center justify-center" :class="vendor.serviceLocation === 'virtual_online' ? 'border-[#FF5C1A] bg-[#FF5C1A]' : 'border-gray-300'"><Check v-if="vendor.serviceLocation === 'virtual_online'" class="w-3 h-3 text-white" /></div>
                </div>
              </div>

              <div class="flex gap-3 pt-4 mt-auto">
                <button type="button" @click="currentStep = 'teamSize'" class="w-14 h-14 shrink-0 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-600 rounded-md font-bold transition-all"><ArrowLeft class="w-5 h-5" /></button>
                <button type="submit" class="flex-1 py-2 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-md font-medium text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]">Continue <ArrowRight class="w-5 h-5" /></button>
              </div>
            </form>
          </transition>

          <!-- Step: Address / Software -->
          <transition name="slide-up" mode="out-in">
            <form v-if="currentStep === 'addressOrSoftware'" @submit.prevent="handleStepAddressOrSoftware" class="w-full flex flex-col space-y-4">
              
              <div v-if="vendor.serviceLocation === 'physical_location'">
                <div class="mb-4">
                  <h2 class="text-xl font-medium text-gray-900 tracking-tight">Business Address</h2>
                  <p class="text-sm text-gray-500 font-medium">Where is your business located?</p>
                </div>
                <UiAnimatedInput v-model="vendor.address" type="textarea" :rows="3" label="Full Store Location / Address" :hasError="!!valErrors.address" :errorMessage="valErrors.address" @input="valErrors.address=''" />
              </div>

              <div v-else>
                <div class="mb-4">
                  <h2 class="text-xl font-medium text-gray-900 tracking-tight">Software Used</h2>
                  <p class="text-sm text-gray-500 font-medium">Which software are you currently using to manage your business?</p>
                </div>
                <UiAnimatedInput v-model="vendor.softwareUsed" type="text" label="Software Name (e.g. Fresha, Calendly, WhatsApp)" />
                <p class="text-xs text-gray-500 mt-2 bg-blue-50 text-blue-700 p-3 rounded-md border border-blue-100">
                  <span class="font-bold">Looking to switch?</span> We can help speed up your business setup and import your data into your new Erranders account.
                </p>
              </div>

              <!-- Pre-Order Toggle for all -->
              <div class="mt-4 pt-4 border-t border-gray-100">
                <div class="mb-3">
                  <h3 class="text-sm font-bold text-gray-900">Additional Options</h3>
                </div>
                <div 
                  class="rounded-md border transition-all duration-300"
                  :class="vendor.preOrderOnly ? 'bg-[#FF5C1A]/5 border-[#FF5C1A]/30' : 'bg-gray-50/80 border-gray-100 hover:border-gray-200'"
                >
                  <div 
                    @click="vendor.preOrderOnly = !vendor.preOrderOnly"
                    class="flex items-center gap-3 p-3.5 cursor-pointer"
                  >
                    <div 
                      class="w-9 h-9 rounded-md flex items-center justify-center shrink-0 transition-all duration-300"
                      :class="vendor.preOrderOnly ? 'bg-[#FF5C1A]/10 text-[#FF5C1A]' : 'bg-gray-100 text-gray-400'"
                    >
                      <Clock3 class="w-4 h-4" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-1.5">
                        <p class="text-sm font-bold text-gray-800">Pre-order / Appointments only</p>
                        <span 
                          @click.stop="showPreOrderInfo = !showPreOrderInfo" 
                          class="text-gray-300 hover:text-[#FF5C1A] transition-colors cursor-pointer"
                        >
                          <HelpCircle class="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <p class="text-[11px] text-gray-400 font-medium">Customers must order or book ahead</p>
                    </div>
                    <div 
                      class="w-10 h-6 rounded-md p-0.5 transition-all duration-300 shrink-0"
                      :class="vendor.preOrderOnly ? 'bg-[#FF5C1A]' : 'bg-gray-200'"
                    >
                      <div 
                        class="w-5 h-5 bg-white rounded-md transition-all duration-300"
                        :class="vendor.preOrderOnly ? 'translate-x-4' : 'translate-x-0'"
                      ></div>
                    </div>
                  </div>
                  
                  <!-- Info tooltip -->
                  <div v-if="showPreOrderInfo" class="px-3.5 pb-3.5">
                    <div class="p-3 bg-amber-50/70 border border-amber-100 rounded-md text-xs text-amber-800 leading-relaxed">
                      <div class="font-bold flex items-center gap-1.5 mb-1 text-amber-900">
                        <span>✨</span> How it works:
                      </div>
                      Perfect for bakers, salons, or custom creators! Customers order in advance (e.g., 24h notice or booked slots) so you have ample time to prep your magic without instant delivery stress!
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex gap-3 pt-4 mt-auto">
                <button type="button" @click="currentStep = 'locationType'" class="w-14 h-14 shrink-0 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-600 rounded-md font-bold transition-all"><ArrowLeft class="w-5 h-5" /></button>
                <button type="submit" class="flex-1 py-2 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-md font-medium text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]">Continue <ArrowRight class="w-5 h-5" /></button>
              </div>
            </form>
          </transition>

          <!-- Step 3: Logistics -->
          <transition name="slide-up" mode="out-in">
            <form v-if="currentStep === 'logistics'" @submit.prevent="handleFinalSubmit" class="w-full flex flex-col space-y-4">
              <div class="mb-4 flex justify-between items-center">
                <div>
                  <h2 class="text-xl font-medium text-gray-900 tracking-tight">Logistics & Payouts</h2>
                  <p class="text-smtext-gray-500 font-medium">Final setup steps</p>
                </div>
                <ImageIcon class="w-6 h-6 text-gray-300" />
              </div>

              <!-- Logo -->
              <div class="relative border-2 border-dashed border-gray-200 rounded-md p-5 text-center hover:border-parentPrimary hover:bg-parentPrimary/5 transition-colors cursor-pointer group" @click="triggerLogoUpload">
                <input type="file" ref="logoInput" accept="image/*" class="hidden" @change="handleLogoSelect" />
                <div v-if="!logoPreview" class="flex flex-col items-center">
                  <div class="w-10 h-10 bg-white rounded-md border border-gray-100 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:text-parentPrimary transition-transform">
                    <ImageIcon class="w-5 h-5" />
                  </div>
                  <p class="text-smfont-bold text-gray-700">Upload Store Logo</p>
                  <p class="text-[11px] text-gray-400 font-medium">PNG or JPG, up to 5MB</p>
                </div>
                <div v-else class="flex items-center gap-4">
                  <img :src="logoPreview" class="w-14 h-14 rounded-md object-cover border border-gray-100" />
                  <div class="text-left flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ logoFile?.name }}</p>
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

              <!-- Logistics Information Notice -->
              <div class="bg-blue-50/50 border border-blue-100 rounded-md p-3 flex gap-3 items-start">
                <div class="mt-0.5 w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Info class="w-3 h-3" />
                </div>
                <div class="text-xs text-blue-800 leading-relaxed">
                  <p class="font-bold mb-1">How this works for your business type:</p>
                  <ul class="list-disc pl-4 space-y-0.5 text-blue-700/90 font-medium">
                    <li><strong>Product Sellers:</strong> Set your average prep time, minimum order amount, and base delivery fee for campus dispatchers.</li>
                    <li><strong>Service Providers:</strong> Set 'Prep Time' as your average service duration. You can leave 'Delivery Fee' at ₦0.</li>
                  </ul>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <UiAnimatedInput v-model.number="vendor.preparationTime" type="number" label="Average Prep / Service Time (mins)">
                  <template #right>
                    <button type="button" @click.stop="activeInfoModal = 'prepTime'" class="text-gray-400 hover:text-[#FF5C1A] transition-colors p-1"><Info class="w-4 h-4" /></button>
                  </template>
                </UiAnimatedInput>
                <UiAnimatedInput v-model.number="vendor.minimumOrder" type="number" label="Lowest Acceptable Cart Value (₦)">
                  <template #right>
                    <button type="button" @click.stop="activeInfoModal = 'minOrder'" class="text-gray-400 hover:text-[#FF5C1A] transition-colors p-1"><Info class="w-4 h-4" /></button>
                  </template>
                </UiAnimatedInput>
                <UiAnimatedInput v-model.number="vendor.deliveryFee" type="number" label="Campus Runner Charge (₦)">
                  <template #right>
                    <button type="button" @click.stop="activeInfoModal = 'deliveryFee'" class="text-gray-400 hover:text-[#FF5C1A] transition-colors p-1"><Info class="w-4 h-4" /></button>
                  </template>
                </UiAnimatedInput>
              </div>

              <!-- Banks -->
              <div class="bg-gray-50 rounded-md p-4 space-y-3 border border-gray-100">
                <p class="text-sm font-medium text-gray-400">PAYOUT DETAILS (OPTIONAL)</p>
                
                <!-- Added Accounts List -->
                <div v-if="payoutAccounts.length > 0" class="space-y-2 mb-4">
                  <div v-for="acc in payoutAccounts" :key="acc.accountNumber" class="p-3 bg-white border border-gray-200 rounded-md flex items-center justify-between">
                    <div>
                      <p class="text-sm font-bold text-gray-900">{{ acc.bankName }}</p>
                      <p class="text-xs text-gray-500">{{ acc.accountNumber }} • {{ acc.accountName }}</p>
                    </div>
                    <button type="button" @click="payoutAccounts = payoutAccounts.filter(a => a.accountNumber !== acc.accountNumber)" class="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <X class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <!-- Add New Account Form -->
                <div class="space-y-3 border-t border-gray-200 pt-3">
                  <p class="text-xs font-bold text-gray-700">Add Account</p>
                  <UiSelectInput v-model="newAccount.bankCode" label="Bank Name" :options="bankOptions" :disabled="banksLoading" searchable />
                  <div class="relative">
                    <UiAnimatedInput v-model="newAccount.accountNumber" type="text" label="Account Number" />
                    <Loader2 v-if="resolvingAccount" class="absolute right-3 top-1/2 -translate-y-1/2 animate-spin w-4 h-4 text-parentPrimary" />
                  </div>
                  <div v-if="newAccount.accountName" class="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-md border border-emerald-100"><CheckCircle class="w-4 h-4 shrink-0" /> {{ newAccount.accountName }}</div>
                  <div v-if="resolveError" class="flex items-center gap-2 p-2 bg-red-50 text-red-600 text-sm font-bold rounded-md border border-red-100"><AlertCircle class="w-4 h-4 shrink-0" /> {{ resolveError }}</div>
                  
                  <button type="button" @click="addPayoutAccount" :disabled="!newAccount.accountName || resolvingAccount" class="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-medium text-sm transition-all disabled:opacity-50">
                    Add Account
                  </button>
                </div>
              </div>

              <!-- <div v-if="error" class="p-3 bg-red-50 text-red-600 text-smfont-bold rounded-md flex items-center justify-center gap-2"><AlertCircle class="w-4 h-4 shrink-0" /> {{ error }}</div> -->

              <div class="flex gap-3 pt-4 mt-auto">
                <button type="button" @click="currentStep = 'business'" class="w-14 h-14 shrink-0 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-600 rounded-md font-bold transition-all"><ArrowLeft class="w-5 h-5" /></button>
                <button type="submit" :disabled="submitting || logoUploading" class="flex-1 py-2 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-md font-medium text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]">
                  <Loader2 v-if="submitting" class="animate-spin w-5 h-5" />
                  <span>{{ submitting ? 'Launching...' : 'Launch Store 🚀' }}</span>
                </button>
              </div>
            </form>
          </transition>

          <!-- Success Step -->
          <transition name="success-zoom" mode="out-in">
            <div v-if="currentStep === 'success'" class="w-full flex flex-col items-center justify-center text-center space-y-6 min-h-[400px] bg-white rounded-md relative z-20 border border-gray-100 (255,92,26,0.1)] p-8">
              <div class="relative w-28 h-28 flex items-center justify-center mb-4">
                <div class="absolute inset-0 bg-[#FF5C1A]/10 rounded-md animate-ping" style="animation-duration: 2s;"></div>
                <div class="absolute inset-2 bg-[#FF5C1A]/20 rounded-md animate-ping" style="animation-duration: 2s; animation-delay: 0.5s;"></div>
                <div class="w-24 h-24 bg-gradient-to-br from-[#FF5C1A] to-[#FFA785] rounded-md flex items-center justify-center text-white relative z-10 animate-bounce">
                  <Check class="w-12 h-12" stroke-width="3" />
                </div>
              </div>
              
              <div class="space-y-3">
                <h2 class="text-2xl font-medium text-gray-900 tracking-tight">Welcome aboard! 🎉</h2>
                <div class="relative">
                  <p class="text-gray-500 font-medium leading-relaxed max-w-[300px] mx-auto text-[15px]">
                    We're incredibly excited to have you as a vendor. Get ready to share your magic with the campus! 💖
                  </p>
                </div>
              </div>

              <div class="w-full pt-8 mt-auto">
                <button @click="proceedToDashboard" class="w-full py-2.5 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-md font-medium text-[17px] transition-all flex items-center justify-center gap-2 active:scale-[0.98] group">
                  Proceed to Dashboard <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
      
      <!-- Info Modal -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="activeInfoModal && infoModalContent" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="activeInfoModal = null"></div>
          <div class="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-[#FF5C1A]/10 rounded-full flex items-center justify-center text-[#FF5C1A] mb-4">
              <Info class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ infoModalContent.title }}</h3>
            <p class="text-sm text-gray-500 font-medium leading-relaxed mb-6">{{ infoModalContent.description }}</p>
            
            <div class="w-full bg-gray-50 rounded-xl p-4 mb-6">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Why it's important</p>
              <p class="text-sm text-gray-700 font-medium">{{ infoModalContent.importance }}</p>
            </div>
            
            <button type="button" @click="activeInfoModal = null" class="w-full py-3 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-xl font-bold text-sm transition-all active:scale-95">
              Got it!
            </button>
          </div>
        </div>
      </transition>

      <!-- Footer Info -->
      <div class="mt-8 text-center flex items-center justify-center gap-4 text-sm font-bold text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} Erranders</p>
        <span class="w-1 h-1 bg-gray-300 rounded-md"></span>
        <NuxtLink to="/terms" class="hover:text-gray-600 transition-colors">Terms & Privacy</NuxtLink>
      </div>

    </div>

      <!-- Resume Modal -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="showResumeModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="ignoreResume"></div>
          <div class="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-[#FF5C1A]/10 rounded-full flex items-center justify-center text-[#FF5C1A] mb-4">
              <Store class="w-6 h-6" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Welcome Back!</h3>
            <p class="text-sm text-gray-500 font-medium leading-relaxed mb-6">We noticed that you did not complete your onboarding process. Please proceed to complete your onboarding here.</p>
            
            <div class="flex gap-3 w-full">
              <button type="button" @click="ignoreResume" class="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-all active:scale-95">
                Start Over
              </button>
              <button type="button" @click="resumeSession" class="flex-[2] py-3 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-xl font-bold text-sm transition-all active:scale-95">
                Continue
              </button>
            </div>
          </div>
        </div>
      </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { Loader2, ArrowRight, ArrowLeft, Store, Check, ImageIcon, X, CheckCircle, AlertCircle, Mail, HelpCircle, MapPin, GraduationCap, Clock3, Info } from 'lucide-vue-next'
import confetti from 'canvas-confetti'
import { useAuth } from '@/composables/modules/auth'
import { useUser } from '@/composables/modules/auth/user'
import { vendors_api } from '@/api_factory/modules/vendors'
import { payments_api } from '@/api_factory/modules/payments'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { GATEWAY_ENDPOINT } from '@/api_factory/axios.config'

definePageMeta({ layout: false })
useHead({ title: 'Open Your Store - Erranders' })

const { register, loading } = useAuth()
const { isLoggedIn } = useUser()
const { showToast } = useCustomToast()
const error = ref('')
const currentStep = ref<'account' | 'otp' | 'business' | 'businessType' | 'teamSize' | 'locationType' | 'addressOrSoftware' | 'logistics' | 'success'>('account')
const submitting = ref(false)
const showPreOrderInfo = ref(false)

const activeInfoModal = ref<string | null>(null);
const infoModalData = {
  prepTime: {
    title: 'Average Prep / Service Time',
    description: 'If you sell physical products (like food or merch), this is how long it usually takes you to prepare, package, or cook an order. If you offer a service (like haircuts or makeup), this is how long an average session lasts.',
    importance: 'It sets proper customer expectations and helps dispatchers know exactly when to arrive so nobody is kept waiting!'
  },
  minOrder: {
    title: 'Lowest Acceptable Cart Value',
    description: 'This is the absolute minimum amount a customer must spend in your store before they are allowed to place an order.',
    importance: 'It ensures you stay profitable and don\'t lose money packing or processing extremely small orders.'
  },
  deliveryFee: {
    title: 'Campus Runner Charge',
    description: 'This is the base fee charged to the customer to transport the goods to them on campus. If you offer a service where you don\'t physically deliver anything, you can comfortably leave this as ₦0.',
    importance: 'It covers the logistics cost. Keeping it relatively low (or at ₦0 for services) increases your sales volume significantly!'
  }
};
const infoModalContent = computed(() => activeInfoModal.value ? infoModalData[activeInfoModal.value as keyof typeof infoModalData] : null);

const displayStep = computed(() => {
  if (currentStep.value === 'account' || currentStep.value === 'otp') return 1
  if (['business', 'businessType', 'teamSize', 'locationType', 'addressOrSoftware'].includes(currentStep.value)) return 2
  return 3
})

const progressWidth = computed(() => {
  if (displayStep.value === 1) return '0%'
  if (displayStep.value === 2) {
    if (currentStep.value === 'business') return '25%'
    if (currentStep.value === 'businessType') return '35%'
    if (currentStep.value === 'teamSize') return '45%'
    if (currentStep.value === 'locationType') return '55%'
    if (currentStep.value === 'addressOrSoftware') return '65%'
    return '50%'
  }
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
  address: '',
  subdomain: ''
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
  valErrors.subdomain = ''

  if (!vendor.storeName) { valErrors.storeName = 'Required'; isValid = false }
  if (!vendor.subdomain) { valErrors.subdomain = 'Required'; isValid = false }
  else if (vendor.subdomain.length < 3) { valErrors.subdomain = 'Min 3 characters'; isValid = false }
  else if (subdomainAvailable.value === false) { valErrors.subdomain = 'Subdomain is not available'; isValid = false }

  if (!vendor.address) { valErrors.address = 'Required'; isValid = false }
  if (selectedCategories.value.length === 0) { 
    showToast({ title: 'Category Required', message: 'Please select at least one business category.', toastType: 'error' })
    isValid = false 
  }

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
  referredBy: '',
})


const validatingReferral = ref(false)

const formatReferralCode = () => {
  if (!form.referredBy) return;
  let val = form.referredBy;
  let formatted = val.toUpperCase().replace(/[^A-Z0-9-]/g, '');
  if (formatted.startsWith('ERR-')) {
    formatted = formatted.substring(4);
  } else if (formatted.startsWith('ERR')) {
    formatted = formatted.substring(3);
  } else if (formatted.startsWith('ER')) {
    formatted = formatted.substring(2);
  } else if (formatted.startsWith('E')) {
    formatted = formatted.substring(1);
  }
  
  if (formatted.length > 0) {
    form.referredBy = 'ERR-' + formatted.replace(/-/g, '');
  } else if (val.length > 0 && !['ERR', 'ER', 'E'].includes(val.toUpperCase())) {
     form.referredBy = 'ERR-';
  } else {
    form.referredBy = val.toUpperCase();
  }
}
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
  storeName: '', description: '', address: '', subdomain: '',
  businessType: 'physical_product' as 'physical_product' | 'service_provider' | 'hybrid',
  teamSize: 'independent' as 'independent' | '2-5' | '6-10' | '11-20' | '20+',
  serviceLocation: 'physical_location' as 'physical_location' | 'mobile_operator' | 'virtual_online',
  softwareUsed: '',
  isInsideCampus: false, isStudentBusiness: false, preOrderOnly: false, matricNumber: '', university: '',
  operatingHours: { open: '08:00 AM', close: '08:00 PM' },
  preparationTime: 15, minimumOrder: 0, deliveryFee: 0,
  bankDetails: { bankCode: '', bankName: '', accountNumber: '', accountName: '' },
})

// === Subdomain ===
const useStoreNameAsUrl = ref(true)
const checkingSubdomain = ref(false)
const subdomainAvailable = ref<boolean | null>(null)
let subdomainCheckTimeout: ReturnType<typeof setTimeout> | null = null

const syncSubdomainFromStore = () => {
  vendor.subdomain = vendor.storeName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9-]/g, '')
  subdomainAvailable.value = null
  debouncedCheckSubdomain()
}

const debouncedCheckSubdomain = () => {
  subdomainAvailable.value = null
  if (subdomainCheckTimeout) clearTimeout(subdomainCheckTimeout)
  if (vendor.subdomain.length < 3) return
  subdomainCheckTimeout = setTimeout(() => checkSubdomainAvailability(), 600)
}

const checkSubdomainAvailability = async () => {
  if (vendor.subdomain.length < 3) return
  checkingSubdomain.value = true
  try {
    const res = await vendors_api.checkSubdomain(vendor.subdomain)
    const data = res?.data?.data || res?.data || {}
    subdomainAvailable.value = data.available === true
  } catch (e) {
    subdomainAvailable.value = null
  } finally {
    checkingSubdomain.value = false
  }
}

// === Categories ===
const selectedCategories = ref<string[]>([])
const categorySearch = ref('')
const showCategoryDropdown = ref(false)
const categoryDropdownRef = ref<HTMLElement | null>(null)

const categoryOptions = [
  { label: 'Restaurant', value: 'restaurant' }, { label: 'Eatery / Buka', value: 'eatery' },
  { label: 'Snacks & Small Chops', value: 'snacks' }, { label: 'Drinks & Smoothies', value: 'drinks' },
  { label: 'Groceries', value: 'groceries' }, { label: 'Bakery & Pastries', value: 'bakery' },
  { label: 'Pharmacy', value: 'pharmacy' }, { label: 'Laundry & Cleaning', value: 'laundry' },
  { label: 'Hair & Beauty', value: 'hair-beauty' }, { label: 'Printing & Stationery', value: 'printing' },
  { label: 'Electronics & Gadgets', value: 'electronics' }, { label: 'Fashion & Clothing', value: 'fashion' },
  { label: 'Tutoring & Academic', value: 'tutoring' }, { label: 'Other', value: 'other' },
]

const filteredCategoryOptions = computed(() => {
  if (!categorySearch.value.trim()) return categoryOptions
  const q = categorySearch.value.toLowerCase()
  return categoryOptions.filter(c => c.label.toLowerCase().includes(q))
})

const toggleCategory = (val: string) => {
  if (selectedCategories.value.includes(val)) selectedCategories.value = selectedCategories.value.filter(c => c !== val)
  else selectedCategories.value.push(val)
}
const addCustomCategory = () => {
  const val = categorySearch.value.trim()
  if (val && !selectedCategories.value.includes(val)) {
    selectedCategories.value.push(val)
  }
  categorySearch.value = ''
}
const handleCategoryEnter = () => {
  if (filteredCategoryOptions.value.length === 1) {
    toggleCategory(filteredCategoryOptions.value[0].value)
    categorySearch.value = ''
  } else if (categorySearch.value.trim()) {
    addCustomCategory()
  }
}
const removeCategory = (val: string) => {
  selectedCategories.value = selectedCategories.value.filter(c => c !== val)
}

// Session sync
let syncTimeout: ReturnType<typeof setTimeout> | null = null
watch([currentStep, vendor, selectedCategories], () => {
  if (isLoggedIn.value && currentStep.value !== 'success' && currentStep.value !== 'account' && currentStep.value !== 'otp') {
    if (syncTimeout) clearTimeout(syncTimeout)
    syncTimeout = setTimeout(async () => {
      try {
        await GATEWAY_ENDPOINT.put('/users/me', {
          vendorOnboardingSession: {
            currentStep: currentStep.value,
            vendor,
            selectedCategories: selectedCategories.value
          }
        })
      } catch (e) { console.error('Failed to sync session', e) }
    }, 1000)
  }
}, { deep: true })
const getCategoryLabel = (val: string) => {
  const opt = categoryOptions.find(o => o.value === val)
  return opt ? opt.label : val
}

// Close category dropdown on outside click
const handleClickOutside = (e: MouseEvent) => {
  if (categoryDropdownRef.value && !categoryDropdownRef.value.contains(e.target as Node)) {
    showCategoryDropdown.value = false
  }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

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

const payoutAccounts = ref<any[]>([])
const newAccount = reactive({ bankCode: '', bankName: '', accountNumber: '', accountName: '', purpose: 'default' })

watch(() => newAccount.accountNumber, (newVal) => {
  newAccount.accountName = ''; accountResolved.value = false; resolveError.value = ''
  if (resolveTimeout) clearTimeout(resolveTimeout)
  const cleaned = newVal.replace(/\D/g, '')
  if (cleaned.length === 10 && newAccount.bankCode) resolveTimeout = setTimeout(() => resolveAccount(cleaned), 500)
})

watch(() => newAccount.bankCode, (newVal) => {
  const selected = bankOptions.value.find(b => b.value === newVal)
  if (selected) newAccount.bankName = selected.label
  const cleaned = newAccount.accountNumber.replace(/\D/g, '')
  if (cleaned.length === 10 && newVal) resolveAccount(cleaned)
})

const resolveAccount = async (accountNumber: string) => {
  resolvingAccount.value = true; resolveError.value = ''
  try {
    const res = await payments_api.resolveAccount(accountNumber, newAccount.bankCode)
    const data = res?.data?.data || res?.data || {}
    newAccount.accountName = data.account_name || data.accountName || ''
    accountResolved.value = !!newAccount.accountName
  } catch (e: any) {
    resolveError.value = e?.response?.data?.message || 'Failed to verify account.'
    newAccount.accountName = ''
  } finally { resolvingAccount.value = false }
}

const addPayoutAccount = () => {
  if (!newAccount.accountName) return;
  payoutAccounts.value.push({ ...newAccount, isActive: payoutAccounts.value.length === 0 });
  newAccount.bankCode = '';
  newAccount.bankName = '';
  newAccount.accountNumber = '';
  newAccount.accountName = '';
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

  if (form.referredBy) {
    validatingReferral.value = true
    try {
      const res = await GATEWAY_ENDPOINT.get(`/referrals/validate-code/${form.referredBy}`)
      if (res?.data?.type === 'ERROR' || res?.type === 'ERROR') throw res;
    } catch (e: any) {
      error.value = e?.response?.data?.message || e?.data?.message || 'Invalid referral code.'
      return
    } finally {
      validatingReferral.value = false
    }
  }

  try {
    await register({ ...form }, { skipRedirect: true })
    startCooldown(); currentStep.value = 'otp'; setTimeout(() => otpRefs[0]?.focus(), 200)
  } catch (e: any) { error.value = e?.data?.message || e?.response?.data?.message || 'Registration failed.' }
}

const handleStep2 = () => {
  error.value = ''
  // Basic validation for step 2 (store name, subdomain)
  if (!vendor.storeName) { valErrors.storeName = 'Required'; return }
  if (!vendor.subdomain) { valErrors.subdomain = 'Required'; return }
  else if (vendor.subdomain.length < 3) { valErrors.subdomain = 'Min 3 characters'; return }
  else if (subdomainAvailable.value === false) { valErrors.subdomain = 'Subdomain is not available'; return }
  
  currentStep.value = 'businessType'
}

const handleStepType = () => {
  currentStep.value = 'categories'
}

const handleStepCategories = () => {
  if (selectedCategories.value.length === 0) { 
    showToast({ title: 'Category Required', message: 'Please select at least one business category.', toastType: 'error' })
    return 
  }
  if (vendor.isStudentBusiness && !vendor.university) {
    showToast({ title: 'Institution Required', message: 'Please select your institution since you are a student entrepreneur.', toastType: 'error' })
    return
  }
  currentStep.value = 'teamSize'
}

const handleStepTeamSize = () => {
  currentStep.value = 'locationType'
}

const handleStepLocationType = () => {
  currentStep.value = 'addressOrSoftware'
}

const handleStepAddressOrSoftware = () => {
  if (vendor.serviceLocation === 'physical_location' && !vendor.address) {
    valErrors.address = 'Required'
    return
  }
  currentStep.value = 'logistics'
}

const handleFinalSubmit = async () => {
  error.value = ''
  submitting.value = true
  try {
    const payload: any = {
      storeName: vendor.storeName, description: vendor.description, 
      businessType: vendor.businessType, teamSize: vendor.teamSize, serviceLocation: vendor.serviceLocation, softwareUsed: vendor.softwareUsed,
      category: selectedCategories.value.length > 0 ? selectedCategories.value[0] : 'other',
      tags: selectedCategories.value,
      address: vendor.address,
      subdomain: vendor.subdomain,
      isInsideCampus: vendor.isInsideCampus, isStudentBusiness: vendor.isStudentBusiness, preOrderOnly: vendor.preOrderOnly, operatingHours: vendor.operatingHours,
      preparationTime: vendor.preparationTime, minimumOrder: vendor.minimumOrder, deliveryFee: vendor.deliveryFee,
    }
    if (logoUrl.value) payload.logo = logoUrl.value
    if (vendor.isStudentBusiness) { payload.matricNumber = vendor.matricNumber; payload.university = vendor.university }
    
    // We will save bank details to wallet instead of just vendor profile
    if (payoutAccounts.value.length > 0) {
      const active = payoutAccounts.value.find(a => a.isActive) || payoutAccounts.value[0];
      payload.bankDetails = { bankName: active.bankName, bankCode: active.bankCode, accountNumber: active.accountNumber, accountName: active.accountName }
    }

    const res = await vendors_api.createVendor(payload)
    if (res?.type === 'ERROR') throw res;

    // After vendor is successfully created, save bank details to their new wallet
    if (payoutAccounts.value.length > 0) {
        try {
            const { wallets_api } = await import('@/api_factory/modules/wallets')
            await wallets_api.updatePreferences({
                preference: 'weekly',
                bankDetails: payload.bankDetails,
                bankAccounts: payoutAccounts.value,
                metadata: { payoutAccounts: payoutAccounts.value }
            })
        } catch (e) {
            console.error('Failed to update initial wallet preferences', e)
        }
    }

    try {
      await GATEWAY_ENDPOINT.put('/users/me', { vendorOnboardingSession: null })
    } catch (e) {}
    
    // Show personalized success modal instead of immediate redirect
    currentStep.value = 'success'
    nextTick(() => {
      triggerConfetti()
    })
  } catch (e: any) { error.value = e?.data?.message || e?.response?.data?.message || 'Failed to create store.' }
  finally { submitting.value = false }
}

const triggerConfetti = () => {
  const duration = 3500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.6 },
      colors: ['#FF5C1A', '#FFA785', '#FFF', '#FFD700', '#FF69B4']
    });
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.6 },
      colors: ['#FF5C1A', '#FFA785', '#FFF', '#FFD700', '#FF69B4']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};

const proceedToDashboard = () => {
  navigateTo('/dashboard')
}

const showResumeModal = ref(false)
const savedSession = ref<any>(null)

const resumeSession = () => {
  if (savedSession.value) {
    Object.assign(vendor, savedSession.value.vendor)
    selectedCategories.value = savedSession.value.selectedCategories || []
    currentStep.value = savedSession.value.currentStep
  }
  showResumeModal.value = false
}

const ignoreResume = async () => {
  showResumeModal.value = false
  try {
    await GATEWAY_ENDPOINT.put('/users/me', { vendorOnboardingSession: null })
  } catch (e) {}
}

onMounted(async () => {
  fetchBanks()
  if (isLoggedIn.value) {
    try {
      const res = await GATEWAY_ENDPOINT.get('/users/me')
      const profile = res?.data?.data || res?.data
      if (profile && profile.vendorOnboardingSession && profile.vendorOnboardingSession.currentStep) {
        savedSession.value = profile.vendorOnboardingSession
        showResumeModal.value = true
      }
    } catch (e) { console.error('Failed to fetch profile', e) }
  }
})

onUnmounted(() => { if (cooldownInterval) clearInterval(cooldownInterval) })
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { 
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
}
.slide-up-enter-from { opacity: 0; transform: translateY(20px) scale(0.98); }
.slide-up-leave-to { opacity: 0; transform: translateY(-20px) scale(0.98); }
.slide-up-enter-to, .slide-up-leave-from { opacity: 1; transform: translateY(0) scale(1); }

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.success-zoom-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.success-zoom-leave-active {
  transition: all 0.3s ease-in;
}
.success-zoom-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}
.success-zoom-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}
</style>
