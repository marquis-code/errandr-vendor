<template>
 <SideDrawer 
 :isOpen="isOpen" 
 :title="product ? 'Edit Menu Item' : 'New Menu Item'" 
 :subtitle="product ? 'Update your masterpiece details' : 'Add a new delicious option to your menu'" 
 @close="$emit('close')"
 >
 <div class="space-y-10 py-2">
 <!-- Media Section -->
 <section class="space-y-4">
 <label class="text-[10px] font-black text-gray-400 tracking-[0.15em] flex items-center gap-2 px-1">
 <ImageIcon class="w-3.5 h-3.5" /> 
 Photos & Visuals
 </label>
 
 <div class="grid grid-cols-2 gap-4">
 <div 
 v-for="(img, idx) in allImages" :key="idx"
 class="aspect-square rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center overflow-hidden group relative"
 >
 <img v-if="img" :src="img" class="w-full h-full object-cover" />
 <button v-if="img" @click.stop="removeImage(idx)" class="absolute top-2 right-2 bg-white/90 backdrop-blur-md p-2 rounded-xl text-red-500 shadow-xl opacity-0 group-hover:opacity-100 transition-all active:scale-90">
 <Trash2 class="w-4 h-4" />
 </button>
 </div>

 <button 
 v-if="allImages.length < 4"
 type="button"
 @click="triggerImageUpload"
 class="aspect-square rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center transition-all hover:bg-[#065fdb]/5 hover:border-[#065fdb]/30 group"
 >
 <div class="w-10 h-10 bg-white rounded-xl shadow-sm text-[#065fdb] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
 <Plus class="w-5 h-5" />
 </div>
 <p class="text-[9px] font-black text-gray-400 tracking-widest">Add Photo</p>
 <input type="file" ref="imageRef" class="hidden" @change="handleFileUpload" accept="image/*" multiple />
 </button>
 </div>
 <p v-if="uploading" class="text-[9px] text-[#065fdb] font-bold animate-pulse px-1">UPLOADING IMAGE...</p>
 </section>

 <div class="space-y-8">
 <!-- Main Details -->
 <div class="space-y-6">
 <AnimatedInput 
 v-model="form.name" 
 label="Menu Name" 
 info="The name of your dish as it appears to students."
 description="e.g. Signature Smoky Jollof with Chicken"
 required 
 />
 
 <SelectInput 
 v-model="form.category" 
 label="Category" 
 :options="categories" 
 info="Grouping items helps students find what they want faster."
 description="Select a food category"
 required 
 />

 <AnimatedInput 
 v-model="form.description" 
 type="textarea" 
 label="Description" 
 info="Describe the ingredients, taste, and portion."
 description="Tell the story of this dish..."
 />

 <div class="grid grid-cols-2 gap-4">
 <AnimatedInput 
 v-model.number="form.price" 
 type="number" 
 label="Standard Price" 
 info="Base price in Naira."
 description="e.g. 2500"
 required 
 />
 <AnimatedInput 
 v-model.number="form.discountPrice" 
 type="number" 
 label="Discount Price" 
 info="Set if you want to show a sale price."
 description="Optional"
 />
 </div>
 </div>

 <!-- Inventory & Servings -->
 <div class="space-y-6">
 <div class="grid grid-cols-2 gap-4">
 <AnimatedInput v-model="form.servingSize" label="Serving Size" description="e.g. 1 plate" />
 <AnimatedInput v-model="form.portionInfo" label="Portion Info" description="e.g. Feeds 1" />
 </div>

 <div class="grid grid-cols-2 gap-4">
 <AnimatedInput v-model.number="form.preparationTime" type="number" label="Wait Time (min)" description="e.g. 15" />
 <AnimatedInput v-model.number="form.stockQuantity" type="number" label="Daily Stock" description="-1 for unlimited" />
 </div>

 <div class="space-y-3 pt-2">
 <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
 <div class="flex items-center gap-3">
 <Star class="w-4 h-4 text-amber-500" />
 <span class="text-xs font-bold text-gray-700">Feature on menu</span>
 </div>
 <input type="checkbox" v-model="form.isFeatured" class="w-5 h-5 rounded-lg border-gray-200 text-[#065fdb] focus:ring-[#065fdb]" />
 </div>

 <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
 <div class="flex items-center gap-3">
 <CheckCircle class="w-4 h-4 text-emerald-500" />
 <span class="text-xs font-bold text-gray-700">Available for order</span>
 </div>
 <input type="checkbox" v-model="form.isAvailable" class="w-5 h-5 rounded-lg border-gray-200 text-emerald-600 focus:ring-emerald-500" />
 </div>
 </div>
 </div>
 </div>
 </div>

 <template #footer>
 <div class="flex items-center gap-4 w-full">
 <button @click="$emit('close')" class="flex-1 py-4 bg-white border border-gray-100 text-gray-400 text-[10px] font-black tracking-widest rounded-2xl hover:bg-gray-50 hover:text-gray-900 transition-all">Cancel</button>
 <button @click="handleSubmit" :disabled="uploading" class="flex-[2] py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-xl hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
 {{ product ? 'Update Item' : 'Publish Item' }}
 </button>
 </div>
 </template>
 </SideDrawer>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { ImageIcon, Trash2, Plus, Star, CheckCircle } from 'lucide-vue-next';
import SideDrawer from '@/components/ui/SideDrawer.vue';
import AnimatedInput from '@/components/ui/AnimatedInput.vue';
import SelectInput from '@/components/ui/SelectInput.vue';
import { vendors_api } from '@/api_factory/modules/vendors';

const props = defineProps<{
 isOpen: boolean;
 product?: any;
 categories: any[];
}>();

const emit = defineEmits(['close', 'save']);
const uploading = ref(false);
const imageRef = ref<HTMLInputElement | null>(null);

const form = reactive({
 name: '',
 description: '',
 price: 0,
 discountPrice: 0,
 category: '',
 servingSize: '',
 portionInfo: '',
 preparationTime: 15,
 stockQuantity: -1,
 minOrderQty: 1,
 maxOrderQty: 10,
 isAvailable: true,
 isFeatured: false,
 image: '',
 images: [] as string[]
});

const allImages = ref<string[]>([]);

watch(() => props.product, (p) => {
 if (p) {
 Object.assign(form, { ...p });
 allImages.value = p.images?.length ? [...p.images] : (p.image ? [p.image] : []);
 } else {
 Object.assign(form, {
 name: '', description: '', price: 0, discountPrice: 0, category: '',
 servingSize: '', portionInfo: '', preparationTime: 15, stockQuantity: -1,
 minOrderQty: 1, maxOrderQty: 10, isAvailable: true, isFeatured: false,
 image: '', images: []
 });
 allImages.value = [];
 }
}, { immediate: true });

const triggerImageUpload = () => imageRef.value?.click();

const handleFileUpload = async (e: Event) => {
 const files = (e.target as HTMLInputElement).files;
 if (!files) return;

 for (const file of Array.from(files)) {
 if (allImages.value.length >= 4) break;
 
 uploading.value = true;
 try {
 const res = await vendors_api.uploadImage(file);
 const url = res.data.url || res.data.secure_url;
 if (url) {
 allImages.value.push(url);
 }
 } finally {
 uploading.value = false;
 }
 }
};

const removeImage = (idx: number) => {
 allImages.value.splice(idx, 1);
};

const handleSubmit = async () => {
 form.image = allImages.value[0] || '';
 form.images = [...allImages.value];
 emit('save', { ...form });
};
</script>
