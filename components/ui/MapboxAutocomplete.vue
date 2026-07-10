<template>
  <div class="relative w-full z-[9999]">
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MapPin class="h-5 w-5 text-gray-400" />
      </div>
      <input
        ref="inputRef"
        type="text"
        :value="modelValue"
        @input="handleInput"
        @focus="isOpen = true"
        :placeholder="placeholder"
        :required="required"
        class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:border-parentPrimary/20 rounded-2xl text-sm font-bold text-gray-900 outline-none transition-all placeholder:text-gray-300"
      />
      <div v-if="loading" class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <Loader2 class="h-4 w-4 text-parentPrimary animate-spin" />
      </div>
    </div>

    <!-- Dropdown -->
    <Transition name="fade">
      <div 
        v-if="isOpen && suggestions.length > 0" 
        class="absolute z-[100] w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <ul class="max-h-60 overflow-y-auto custom-scrollbar py-2">
          <li 
            v-for="suggestion in suggestions" 
            :key="suggestion.id"
            @click="selectSuggestion(suggestion)"
            class="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-3 transition-colors border-b border-gray-50 last:border-0"
          >
            <MapPin class="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-gray-900 truncate">{{ suggestion.text }}</p>
              <p class="text-[11px] font-medium text-gray-400 truncate">{{ suggestion.place_name }}</p>
            </div>
          </li>
        </ul>
      </div>
    </Transition>
    
    <!-- Backdrop to close dropdown -->
    <div 
      v-if="isOpen && suggestions.length > 0" 
      class="fixed inset-0 z-[90]" 
      @click="isOpen = false"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { MapPin, Loader2 } from 'lucide-vue-next';
import { useRuntimeConfig } from '#app';
import { useDebounceFn } from '@vueuse/core';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search for your address...'
  },
  required: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'select']);

const config = useRuntimeConfig();
const token = config.public.mapboxToken;

const inputRef = ref<HTMLInputElement | null>(null);
const isOpen = ref(false);
const loading = ref(false);
const suggestions = ref<any[]>([]);

const fetchSuggestions = useDebounceFn(async (query: string) => {
  if (!query.trim()) {
    suggestions.value = [];
    return;
  }
  
  loading.value = true;
  try {
    if (!token) {
      console.error('Mapbox token is missing');
      return;
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${token}&country=ng&limit=5&types=address,poi,place,neighborhood`;
    const res = await fetch(url);
    const data = await res.json();
    suggestions.value = (data.features || []).map((item: any) => ({
      id: item.id,
      text: item.text,
      place_name: item.place_name,
      center: item.center
    }));
    isOpen.value = true;
  } catch (err) {
    console.error('Nominatim geocoding error:', err);
    suggestions.value = [];
  } finally {
    loading.value = false;
  }
}, 300);

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  fetchSuggestions(target.value);
};

const selectSuggestion = (suggestion: any) => {
  const address = suggestion.place_name;
  const coordinates = suggestion.center; // [longitude, latitude]
  
  emit('update:modelValue', address);
  emit('select', { address, coordinates });
  
  suggestions.value = [];
  isOpen.value = false;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
