<template>
 <SideDrawer 
 :isOpen="isOpen" 
 :title="category ? 'Edit Category' : 'New Category'" 
 :subtitle="category ? 'Update category details and visibility.' : 'Create a new category to organize your menu items.'"
 @close="$emit('close')"
 >
 <div class="space-y-10 py-4">
 <!-- Icon/Image Upload -->
 <div class="flex flex-col items-center gap-4 py-6 bg-gray-50 rounded-[2rem] border border-gray-100 shadow-inner relative overflow-hidden group/upload">
 <div class="absolute inset-0 bg-blue-50/20 opacity-0 group-hover/upload:opacity-100 transition-opacity"></div>
 
 <div 
 @click="triggerImageUpload"
 class="w-24 h-24 rounded-[2rem] bg-white border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all overflow-hidden relative z-10 box-content p-1"
 >
 <img v-if="previewImage" :src="previewImage" class="w-full h-full object-cover rounded-[1.8rem]" />
 <div v-else class="text-center">
 <Plus class="w-6 h-6 text-gray-300 mx-auto" stroke-width="3" />
 <p class="text-[9px] font-black text-gray-400 mt-1 tracking-widest">Icon</p>
 </div>
 <div class="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity" v-if="previewImage">
 <Camera class="w-6 h-6 text-white" />
 </div>
 <input type="file" ref="imageRef" class="hidden" @change="handleFileUpload" accept="image/*" />
 </div>
 
 <div class="text-center relative z-10">
 <p class="text-xs font-bold text-gray-900">Category Branding</p>
 <p class="text-[9px] text-gray-400 font-bold tracking-widest mt-1">PNG or JPG • Max 2MB</p>
 </div>
 </div>

 <!-- Form Inputs -->
 <div class="space-y-6">
 <AnimatedInput 
 v-model="form.name" 
 label="Category Name" 
 description="e.g. Traditional Soups, Buka Specials" 
 required 
 info="This name will be visible to students on your store page."
 />
 <AnimatedInput 
 v-model="form.description" 
 type="textarea" 
 label="Brief Description" 
 description="A short note about this collection." 
 info="Optional. Helps students understand what's in this category."
 />
 </div>

 <!-- Status Toggle -->
 <div class="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
 <div class="space-y-0.5">
 <p class="text-sm font-bold text-gray-900">Visibility Status</p>
 <p class="text-[10px] text-gray-400 font-medium">Toggle to hide this category from the store.</p>
 </div>
 <button 
 @click="form.isActive = !form.isActive"
 class="relative w-12 h-7 rounded-full transition-all duration-300 shadow-inner"
 :class="form.isActive ? 'bg-emerald-500' : 'bg-gray-200'"
 >
 <span 
 class="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300"
 :class="form.isActive ? 'left-6' : 'left-1'" 
 />
 </button>
 </div>

 <div v-if="uploading" class="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100/50">
 <Loader2 class="w-4 h-4 text-[#065fdb] animate-spin" />
 <p class="text-[10px] font-black text-[#065fdb] tracking-widest">Processing Image...</p>
 </div>
 </div>

 <template #footer>
 <div class="flex items-center gap-4 w-full">
 <button @click="$emit('close')" class="flex-1 py-4 bg-white border border-gray-100 text-gray-400 text-[10px] font-black tracking-widest rounded-2xl">Cancel</button>
 <button 
 @click="handleSubmit" 
 :disabled="loading || uploading || !form.name" 
 class="flex-[2] py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-xl hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
 >
 <Loader2 v-if="loading" class="w-3.5 h-3.5 animate-spin" />
 {{ category ? 'Update Category' : 'Save Category' }}
 </button>
 </div>
 </template>
 </SideDrawer>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { Plus, Camera, Loader2 } from 'lucide-vue-next';
import SideDrawer from '@/components/ui/SideDrawer.vue';
import AnimatedInput from '@/components/ui/AnimatedInput.vue';
import { vendors_api } from '@/api_factory/modules/vendors';

const props = defineProps<{
 isOpen: boolean;
 category?: any;
}>();

const emit = defineEmits(['close', 'save']);
const loading = ref(false);
const uploading = ref(false);
const imageRef = ref<HTMLInputElement | null>(null);
const previewImage = ref('');

const form = reactive({
 name: '',
 description: '',
 image: '',
 isActive: true
});

watch(() => props.category, (c) => {
 if (c) {
 Object.assign(form, { ...c });
 previewImage.value = c.image || '';
 } else {
 Object.assign(form, { name: '', description: '', image: '', isActive: true });
 previewImage.value = '';
 }
}, { immediate: true });

const triggerImageUpload = () => imageRef.value?.click();

const handleFileUpload = async (e: Event) => {
 const file = (e.target as HTMLInputElement).files?.[0];
 if (!file) return;

 uploading.value = true;
 try {
 const res = await vendors_api.uploadImage(file);
 const url = res.data.url || res.data.secure_url || res.data.data?.url;
 if (url) {
 form.image = url;
 previewImage.value = url;
 }
 } finally {
 uploading.value = false;
 }
};

const handleSubmit = () => {
 emit('save', { ...form });
};
</script>
