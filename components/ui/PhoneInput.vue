<template>
  <div class="space-y-2">
    <div class="relative">
      <div class="flex gap-2">
        <!-- Country Selector -->
        <div class="relative" ref="dropdownRef">
          <button
            type="button"
            @click="toggleDropdown"
            :class="[
              'flex items-center gap-2 px-3 py-2 bg-white border-[0.5px] rounded-lg',
              error ? 'border-red-300' : 'border-gray-100'
            ]"
          >
            <span class="text-2xl">{{ selectedCountry.flag }}</span>
            <span class="text-sm font-medium text-gray-700">
              {{ selectedCountry.dialCode }}
            </span>
            <ChevronDown 
              :class="['h-4 w-4 text-gray-500 transition-transform', isOpen ? 'rotate-180' : '']"
            />
          </button>

          <!-- Dropdown -->
          <Teleport to="body">
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div 
                v-if="isOpen" 
                :style="dropdownStyle"
                class="fixed w-80 bg-white border-[0.5px] border-gray-25 rounded-lg shadow-2xl max-h-96 flex flex-col"
                style="z-index: 9999;"
              >
              <!-- Search -->
              <div class="p-3 border-b border-gray-100">
                <div class="relative">
                  <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search countries..."
                    class="custom-input"
                  />
                </div>
              </div>

              <!-- Country List -->
              <div class="overflow-y-auto">
                <template v-if="filteredCountries.length > 0">
                  <button
                    v-for="country in filteredCountries"
                    :key="country.code"
                    type="button"
                    @click="handleCountrySelect(country)"
                    :class="[
                      'w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left',
                      selectedCountry.code === country.code ? 'bg-blue-50' : ''
                    ]"
                  >
                    <span class="text-2xl">{{ country.flag }}</span>
                    <div class="flex-1 min-w-0">
                      <div class="font-medium text-gray-900 text-sm truncate">
                        {{ country.name }}
                      </div>
                      <div class="text-xs text-gray-500">{{ country.dialCode }}</div>
                    </div>
                    <Check 
                      v-if="selectedCountry.code === country.code"
                      class="h-5 w-5 text-blue-600 flex-shrink-0"
                    />
                  </button>
                </template>
                <div v-else class="px-4 py-8 text-center text-gray-500 text-sm">
                  No countries found
                </div>
              </div>
            </div>
            </Transition>
          </Teleport>
        </div>

        <!-- Phone Number Input -->
        <div class="flex-1">
          <input
            v-model="displayPhone"
            type="tel"
            @input="handlePhoneChange"
            @keydown="handleKeyDown"
            :placeholder="selectedCountry.format.replace(/#/g, '0')"
            :maxlength="selectedCountry.format.length"
            :class="[
              'custom-input',
              error ? 'border-red-300' : 'border-gray-100'
            ]"
          />
        </div>
      </div>
    </div>

    <!-- Helper text or error -->
    <div v-if="error" class="flex items-center gap-1 text-red-600 text-xs">
      <XCircle class="h-3 w-3" />
      <span>{{ error }}</span>
    </div>
    <div v-else-if="displayPhone && !isPhoneValid" class="flex items-center gap-1 text-amber-600 text-xs">
      <AlertTriangle class="h-3 w-3" />
      <span>Please enter a complete {{ selectedCountry.length }}-digit phone number</span>
    </div>
    <div v-else-if="displayPhone && isPhoneValid" class="flex items-center gap-1 text-green-600 text-xs">
      <CheckCircle class="h-3 w-3" />
      <span>Valid phone number</span>
    </div>
    <div v-else class="text-xs text-gray-500">
      Enter your phone number with country code
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ChevronDown, 
  Search, 
  Check, 
  XCircle, 
  AlertTriangle, 
  CheckCircle 
} from 'lucide-vue-next'
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

interface Country {
  code: string
  name: string
  dialCode: string
  flag: string
  format: string
  length: number
}

interface PhoneData {
  fullNumber: string
  countryCode: string
  nationalNumber: string
  isValid: boolean
  country: string
}

interface Props {
  modelValue?: PhoneData | null
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  error: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: PhoneData | null]
}>()

const countries: Country[] = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', format: '(###) ###-####', length: 10 },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', format: '#### ### ####', length: 10 },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬', format: '### ### ####', length: 10 },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', format: '(###) ###-####', length: 10 },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', format: '### ### ###', length: 9 },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', format: '##### #####', length: 10 },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', format: '### ########', length: 11 },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', format: '# ## ## ## ##', length: 9 },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷', format: '(##) #####-####', length: 11 },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽', format: '### ### ####', length: 10 },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', format: '## ### ####', length: 9 },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪', format: '### ######', length: 9 },
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭', format: '### ### ####', length: 10 },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬', format: '### ### ####', length: 10 },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', format: '## ### ####', length: 9 },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', format: '#### ####', length: 8 },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵', format: '##-####-####', length: 10 },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳', format: '### #### ####', length: 11 },
]

const selectedCountry = ref<Country>(countries[0])
const displayPhone = ref('')
const isOpen = ref(false)
const searchQuery = ref('')
const dropdownRef = ref<HTMLElement | null>(null)
const dropdownStyle = ref({})

// Computed property to check if phone is valid
const isPhoneValid = computed(() => {
  const numbers = displayPhone.value.replace(/\D/g, '')
  return numbers.length === selectedCountry.value.length
})

// Calculate dropdown position
const updateDropdownPosition = () => {
  if (dropdownRef.value && isOpen.value) {
    const rect = dropdownRef.value.getBoundingClientRect()
    dropdownStyle.value = {
      top: `${rect.bottom + window.scrollY + 8}px`,
      left: `${rect.left + window.scrollX}px`,
    }
  }
}

// Computed filtered countries
const filteredCountries = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return countries.filter(country =>
    country.name.toLowerCase().includes(query) ||
    country.dialCode.includes(query) ||
    country.code.toLowerCase().includes(query)
  )
})

// Format phone number according to country pattern
const formatPhoneNumber = (input: string, format: string): string => {
  const numbers = input.replace(/\D/g, '')
  let formatted = ''
  let numberIndex = 0

  for (let i = 0; i < format.length && numberIndex < numbers.length; i++) {
    if (format[i] === '#') {
      formatted += numbers[numberIndex]
      numberIndex++
    } else {
      formatted += format[i]
    }
  }
  return formatted
}

// Handle keydown to prevent typing beyond limit
const handleKeyDown = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement
  const numbers = target.value.replace(/\D/g, '')
  
  // Allow backspace, delete, arrow keys, tab, etc.
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End']
  
  if (allowedKeys.includes(event.key)) {
    return
  }
  
  // Allow Ctrl/Cmd combinations (copy, paste, etc.)
  if (event.ctrlKey || event.metaKey) {
    return
  }
  
  // Prevent typing if we've reached the limit
  if (numbers.length >= selectedCountry.value.length && /[0-9]/.test(event.key)) {
    event.preventDefault()
  }
}

// Handle phone number input with strict validation
const handlePhoneChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const input = target.value.replace(/\D/g, '')
  
  // Strictly limit to country's phone length - prevent typing beyond limit
  const limitedInput = input.slice(0, selectedCountry.value.length)
  
  // Format the phone number
  const formatted = formatPhoneNumber(limitedInput, selectedCountry.value.format)
  displayPhone.value = formatted
  
  // Set cursor position at the end
  nextTick(() => {
    target.setSelectionRange(formatted.length, formatted.length)
  })
  
  // Emit full international format with validation
  if (limitedInput.length > 0) {
    const fullNumber = `${selectedCountry.value.dialCode}${limitedInput}`
    const isValid = limitedInput.length === selectedCountry.value.length
    
    emit('update:modelValue', {
      fullNumber,
      countryCode: selectedCountry.value.dialCode,
      nationalNumber: limitedInput,
      isValid,
      country: selectedCountry.value.code
    })
  } else {
    emit('update:modelValue', null)
  }
}

// Handle country selection
const handleCountrySelect = (country: Country) => {
  selectedCountry.value = country
  isOpen.value = false
  searchQuery.value = ''
  
  // Reset phone number when country changes and revalidate
  const numbers = displayPhone.value.replace(/\D/g, '')
  const limitedNumbers = numbers.slice(0, country.length)
  const formatted = formatPhoneNumber(limitedNumbers, country.format)
  displayPhone.value = formatted
  
  if (limitedNumbers.length > 0) {
    const fullNumber = `${country.dialCode}${limitedNumbers}`
    const isValid = limitedNumbers.length === country.length
    
    emit('update:modelValue', {
      fullNumber,
      countryCode: country.dialCode,
      nationalNumber: limitedNumbers,
      isValid,
      country: country.code
    })
  } else {
    emit('update:modelValue', null)
  }
}

// Toggle dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      updateDropdownPosition()
    })
  } else {
    searchQuery.value = ''
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  window.addEventListener('scroll', updateDropdownPosition, true)
  window.addEventListener('resize', updateDropdownPosition)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  window.removeEventListener('scroll', updateDropdownPosition, true)
  window.removeEventListener('resize', updateDropdownPosition)
})
</script>
