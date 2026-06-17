<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" @click="$emit('close')"></div>
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-y-full md:translate-y-0 md:translate-x-full"
      enter-to-class="translate-y-0 md:translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-y-0 md:translate-x-0"
      leave-to-class="translate-y-full md:translate-y-0 md:translate-x-full"
    >
      <div v-if="isOpen" class="fixed inset-x-0 bottom-0 md:top-4 md:bottom-4 md:right-4 md:left-auto z-[101] bg-white rounded-t-[2rem] md:rounded-md md:w-[600px] flex flex-col max-h-[90vh] md:max-h-[calc(100vh-2rem)] border border-gray-200 overflow-hidden h-full">
        
        <!-- Header -->
        <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <h2 class="text-lg font-bold text-gray-900">{{ isEditing ? 'Edit Service' : 'Add New Service' }}</h2>
          <button @click="$emit('close')" class="w-8 h-8 rounded-md bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto p-6 space-y-8">
          
          <!-- Basic Info -->
          <div class="space-y-4">
            <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2"><Info class="w-4 h-4 text-parentPrimary"/> Basic Information</h3>
            
            <div class="grid gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1.5">Service Name</label>
                <input v-model="form.name" type="text" placeholder="e.g. Classic European Massage" class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-parentPrimary focus:border-parentPrimary block p-3 outline-none transition-all" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1.5">Category</label>
                <input v-model="form.category" type="text" placeholder="e.g. Massage" class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-parentPrimary focus:border-parentPrimary block p-3 outline-none transition-all" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1.5">Description</label>
                <textarea v-model="form.description" rows="3" placeholder="Briefly describe what this service includes..." class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-parentPrimary focus:border-parentPrimary block p-3 outline-none transition-all"></textarea>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1.5">Base Price (₦)</label>
                  <input v-model.number="form.price" type="number" placeholder="30000" class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-parentPrimary focus:border-parentPrimary block p-3 outline-none transition-all" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1.5">Base Duration (Mins)</label>
                  <input v-model.number="form.durationInMinutes" type="number" placeholder="60" class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-parentPrimary focus:border-parentPrimary block p-3 outline-none transition-all" />
                </div>
              </div>
            </div>
          </div>

          <hr class="border-gray-100" />

          <!-- Variants -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2"><Layers class="w-4 h-4 text-blue-500"/> Service Variants</h3>
              <button @click="addVariant" class="text-xs font-bold text-parentPrimary hover:underline">Add Variant</button>
            </div>
            <p class="text-xs text-gray-500">Provide different duration/price options (e.g. "Pick me up - 30mins", "Classic - 1hr"). If left empty, the base price/duration is used.</p>
            
            <div v-for="(v, idx) in form.variants" :key="idx" class="p-4 bg-gray-50 border border-gray-100 rounded-md space-y-3 relative group">
              <button @click="removeVariant(idx)" class="absolute top-2 right-2 p-1.5 bg-white text-gray-400 hover:text-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 class="w-3.5 h-3.5"/></button>
              
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Variant Name</label>
                <input v-model="v.name" type="text" placeholder="e.g. A little longer" class="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg p-2 outline-none" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Price (₦)</label>
                  <input v-model.number="v.price" type="number" class="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg p-2 outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Duration (Mins)</label>
                  <input v-model.number="v.durationInMinutes" type="number" class="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg p-2 outline-none" />
                </div>
              </div>
            </div>
          </div>

          <hr class="border-gray-100" />

          <!-- Extras -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2"><Sparkles class="w-4 h-4 text-amber-500"/> Extra Add-ons</h3>
              <button @click="addExtra" class="text-xs font-bold text-amber-500 hover:underline">Add Extra</button>
            </div>
            <p class="text-xs text-gray-500">Suggest optional upsells clients can add to this service (e.g. "TNC Signature Pedicure").</p>
            
            <div v-for="(ext, idx) in form.extras" :key="idx" class="p-4 bg-amber-50/50 border border-amber-100 rounded-md space-y-3 relative group">
              <button @click="removeExtra(idx)" class="absolute top-2 right-2 p-1.5 bg-white text-gray-400 hover:text-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 class="w-3.5 h-3.5"/></button>
              
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Extra Name</label>
                <input v-model="ext.name" type="text" placeholder="e.g. Pedicure" class="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg p-2 outline-none" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Extra Price (₦)</label>
                  <input v-model.number="ext.price" type="number" class="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg p-2 outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Added Duration (Mins)</label>
                  <input v-model.number="ext.durationInMinutes" type="number" class="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg p-2 outline-none" />
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0">
          <button 
            @click="handleSubmit" 
            :disabled="loading"
            class="w-full py-2.5 bg-parentPrimary text-white rounded-md text-sm font-bold hover:brightness-110 hover: transition-all flex items-center justify-center disabled:opacity-50"
          >
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
            <span v-else>{{ isEditing ? 'Save Changes' : 'Publish Service' }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { X, Info, Layers, Sparkles, Trash2, Loader2 } from 'lucide-vue-next';

const props = defineProps<{
  isOpen: boolean;
  service?: any;
}>();

const emit = defineEmits(['close', 'save']);

const loading = ref(false);
const isEditing = ref(false);

const form = ref({
  name: '',
  category: '',
  description: '',
  price: 0,
  durationInMinutes: 30,
  variants: [] as any[],
  extras: [] as any[]
});

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.service) {
      isEditing.value = true;
      form.value = { 
        ...props.service,
        variants: props.service.variants ? [...props.service.variants] : [],
        extras: props.service.extras ? [...props.service.extras] : []
      };
    } else {
      isEditing.value = false;
      form.value = {
        name: '',
        category: '',
        description: '',
        price: 0,
        durationInMinutes: 30,
        variants: [],
        extras: []
      };
    }
  }
});

const addVariant = () => form.value.variants.push({ name: '', price: 0, durationInMinutes: 30 });
const removeVariant = (idx: number) => form.value.variants.splice(idx, 1);

const addExtra = () => form.value.extras.push({ name: '', price: 0, durationInMinutes: 0 });
const removeExtra = (idx: number) => form.value.extras.splice(idx, 1);

const handleSubmit = async () => {
  loading.value = true;
  try {
    emit('save', form.value);
  } finally {
    setTimeout(() => { loading.value = false; }, 1000); // Simulate network if emit doesn't await
  }
};
</script>
