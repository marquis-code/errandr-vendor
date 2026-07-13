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
 <label class="text-sm font-medium text-gray-400 tracking-[0.15em] flex items-center gap-2 px-1">
 <ImageIcon class="w-3.5 h-3.5" /> 
 Photos & Visuals
 </label>
 
 <div class="grid grid-cols-2 gap-4">
 <div 
 v-for="(img, idx) in allImages" :key="idx"
 class="aspect-square rounded-md bg-gray-50 border border-gray-100 flex flex-col items-center justify-center overflow-hidden group relative"
 >
 <img v-if="img" :src="img" class="w-full h-full object-cover" />
 <button v-if="img" @click.stop="removeImage(idx)" class="absolute top-2 right-2 bg-white/90 backdrop-blur-md p-2 rounded-md text-red-500 opacity-0 group-hover:opacity-100 transition-all active:scale-90">
 <Trash2 class="w-4 h-4" />
 </button>
 </div>

 <button 
 type="button"
 @click="triggerImageUpload"
 class="aspect-square rounded-md bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center transition-all hover:bg-[#FF5C1A]/5 hover:border-[#FF5C1A]/30 group"
 >
        <template v-if="uploadingImage">
          <div class="w-10 h-10 bg-[#FF5C1A]/10 rounded-md text-[#FF5C1A] flex items-center justify-center mb-3 animate-pulse">
            <div class="w-4 h-4 border-2 border-[#FF5C1A] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p class="text-xs font-bold text-[#FF5C1A] animate-pulse">UPLOADING...</p>
        </template>
        <template v-else>
          <div class="w-10 h-10 bg-white rounded-md text-[#FF5C1A] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus class="w-5 h-5" />
          </div>
          <p class="text-sm font-medium text-gray-400">Add Photo</p>
        </template>
 <input type="file" ref="imageRef" class="hidden" @change="handleFileUpload" accept="image/*" multiple />
 </button>
 </div>
  </section>

  <!-- Videos Section -->
  <section class="space-y-4">
    <label class="text-sm font-medium text-gray-400 tracking-[0.15em] flex items-center gap-2 px-1">
      <Video class="w-3.5 h-3.5" /> 
      Short Videos
    </label>
    
    <div class="grid grid-cols-2 gap-4">
      <div 
        v-for="(vid, idx) in allVideos" :key="`vid-${idx}`"
        class="aspect-square rounded-md bg-gray-50 border border-gray-100 flex flex-col items-center justify-center overflow-hidden group relative"
      >
        <video v-if="vid" :src="vid" class="w-full h-full object-cover" autoplay muted loop playsinline></video>
        <button v-if="vid" @click.stop="removeVideo(idx)" class="absolute top-2 right-2 bg-white/90 backdrop-blur-md p-2 rounded-md text-red-500 opacity-0 group-hover:opacity-100 transition-all active:scale-90">
          <Trash2 class="w-4 h-4" />
        </button>
      </div>

      <button 
        v-if="allVideos.length < 3"
        type="button"
        @click="triggerVideoUpload"
        class="aspect-square rounded-md bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center transition-all hover:bg-[#FF5C1A]/5 hover:border-[#FF5C1A]/30 group"
      >
        <template v-if="uploadingVideo">
          <div class="w-10 h-10 bg-[#FF5C1A]/10 rounded-md text-[#FF5C1A] flex items-center justify-center mb-3 animate-pulse">
            <div class="w-4 h-4 border-2 border-[#FF5C1A] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p class="text-xs font-bold text-[#FF5C1A] animate-pulse">UPLOADING...</p>
        </template>
        <template v-else>
          <div class="w-10 h-10 bg-white rounded-md text-[#FF5C1A] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus class="w-5 h-5" />
          </div>
          <p class="text-sm font-medium text-gray-400">Add Video (Max 10MB)</p>
        </template>
        <input type="file" ref="videoRef" class="hidden" @change="handleVideoUpload" accept="video/mp4,video/quicktime" multiple />
      </button>
    </div>
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

 <!-- Menu Configuration (Chowdeck Style) -->
 <div class="pt-4 border-t border-gray-100 mt-4 space-y-4">
    <div>
      <h3 class="text-sm font-bold text-gray-900 tracking-tight">Menu Configuration</h3>
      <p class="text-xs font-medium text-gray-500">Add mandatory choices (like protein) or optional extras.</p>
    </div>
    
    <div class="space-y-4">
      <div class="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-3">
        <h4 class="text-xs font-bold text-gray-700">Modifiers (Required Choices)</h4>
        <DashboardMenuConfigurator v-model="form.modifiers" type="modifier" />
      </div>

      <div class="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-3">
        <h4 class="text-xs font-bold text-gray-700">Add-ons (Optional Extras)</h4>
        <DashboardMenuConfigurator v-model="form.addOns" type="addon" />
      </div>
    </div>
  </div>

 <div class="space-y-3 pt-2">
 <div class="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-100/50">
 <div class="flex items-center gap-3">
 <Star class="w-4 h-4 text-parentPrimary" />
 <span class="text-sm font-bold text-gray-700">Feature on menu</span>
 </div>
 <input type="checkbox" v-model="form.isFeatured" class="w-5 h-5 rounded-lg border-gray-200 text-[#FF5C1A] focus:ring-[#FF5C1A]" />
 </div>

 <div class="flex items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-100/50">
 <div class="flex items-center gap-3">
 <CheckCircle class="w-4 h-4 text-emerald-500" />
 <span class="text-sm font-bold text-gray-700">Available for order</span>
 </div>
 <input type="checkbox" v-model="form.isAvailable" class="w-5 h-5 rounded-lg border-gray-200 text-emerald-600 focus:ring-emerald-500" />
 </div>
 </div>
 </div>
 </div>
 </div>

 <template #footer>
 <div class="flex items-center gap-4 w-full">
 <button @click="$emit('close')" class="flex-1 py-2 bg-white border border-gray-100 text-gray-400 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 transition-all">Cancel</button>
 <button @click="handleSubmit" :disabled="uploadingImage || uploadingVideo || uploading" class="flex-[2] py-2 bg-gray-900 text-white rounded-md font-medium text-sm hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
 {{ product ? 'Update Item' : 'Publish Item' }}
 </button>
 </div>
 </template>
 </SideDrawer>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { ImageIcon, Trash2, Plus, Star, CheckCircle, Video } from 'lucide-vue-next';
import SideDrawer from '@/components/ui/SideDrawer.vue';
import AnimatedInput from '@/components/ui/AnimatedInput.vue';
import SelectInput from '@/components/ui/SelectInput.vue';
import { vendors_api } from '@/api_factory/modules/vendors';
import { useCustomToast } from '@/composables/core/useCustomToast';

const props = defineProps<{
 isOpen: boolean;
 product?: any;
 categories: any[];
}>();

const emit = defineEmits(['close', 'save']);
const { showToast } = useCustomToast();
const uploading = ref(false);
const uploadingImage = ref(false);
const uploadingVideo = ref(false);
const imageRef = ref<HTMLInputElement | null>(null);
const videoRef = ref<HTMLInputElement | null>(null);

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
  images: [] as string[],
  videos: [] as string[],
  modifiers: [] as any[],
  addOns: [] as any[]
});

const allImages = ref<string[]>([]);
const allVideos = ref<string[]>([]);

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    if (props.product) {
      const p = props.product;
      Object.assign(form, { ...p });
      allImages.value = p.images?.length ? [...p.images] : (p.image ? [p.image] : []);
      allVideos.value = p.videos?.length ? [...p.videos] : [];
    } else {
      Object.assign(form, {
        name: '', description: '', price: 0, discountPrice: 0, category: '',
        servingSize: '', portionInfo: '', preparationTime: 15, stockQuantity: -1,
        minOrderQty: 1, maxOrderQty: 10, isAvailable: true, isFeatured: false,
        image: '', images: [], videos: [], modifiers: [], addOns: []
      });
      allImages.value = [];
      allVideos.value = [];
    }
  }
});

const triggerImageUpload = () => imageRef.value?.click();

const handleFileUpload = async (e: Event) => {
 const files = (e.target as HTMLInputElement).files;
 if (!files) return;

  for (const file of Array.from(files)) {
    uploadingImage.value = true;
    try {
      const res = await vendors_api.uploadImage(file);
      const url = res.data.url || res.data.secure_url;
      if (url) {
        allImages.value.push(url);
      }
    } finally {
      uploadingImage.value = false;
    }
  }
};

const removeImage = (idx: number) => {
 allImages.value.splice(idx, 1);
};

const triggerVideoUpload = () => videoRef.value?.click();

const handleVideoUpload = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;

  for (const file of Array.from(files)) {
    if (allVideos.value.length >= 3) {
      showToast({ title: 'Limit Reached', message: 'You can only upload up to 3 videos per product.', toastType: 'error' });
      break;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast({ title: 'File Too Large', message: 'Each video must be 10MB or smaller.', toastType: 'error' });
      continue;
    }
    
    uploadingVideo.value = true;
    try {
      const res = await vendors_api.uploadVideo(file);
      const url = res.data.url || res.data.secure_url;
      if (url) {
        allVideos.value.push(url);
      }
    } catch (e: any) {
      showToast({ title: 'Upload Failed', message: e?.response?.data?.message || 'Could not upload video.', toastType: 'error' });
    } finally {
      uploadingVideo.value = false;
    }
  }
};

const removeVideo = (idx: number) => {
  allVideos.value.splice(idx, 1);
};

const handleSubmit = async () => {
  form.image = allImages.value[0] || '';
  form.images = [...allImages.value];
  form.videos = [...allVideos.value];
  emit('save', { ...form });
};
</script>
