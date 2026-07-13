<template>
 <SideDrawer 
 :isOpen="isOpen" 
 :title="product ? 'Edit Item' : 'Create Item'" 
 :subtitle="product ? 'Update item details' : ''"
 @close="$emit('close')"
 >
 <div class="space-y-8 py-2">

  <!-- ═══════════════════════════════════════════════ -->
  <!-- 1. BASIC INFO -->
  <!-- ═══════════════════════════════════════════════ -->
  <section class="space-y-5">
   <AnimatedInput 
    v-model="form.name" 
    label="Item name" 
    description="e.g. Sausages"
    required 
   />

   <AnimatedInput 
    v-model="form.description" 
    type="textarea" 
    label="Description" 
    description="e.g. Sausages"
   />

   <SelectInput 
    v-model="form.category" 
    label="Category" 
    :options="categories" 
    description="Select a food category"
    required 
   />
  </section>

  <!-- ═══════════════════════════════════════════════ -->
  <!-- 2. PHOTOS & VIDEOS (Compact Horizontal) -->
  <!-- ═══════════════════════════════════════════════ -->
  <section class="space-y-3">
   <h3 class="text-sm font-semibold text-gray-800">Photos & Videos</h3>
   <div class="flex flex-wrap gap-2">
    <div 
     v-for="(img, idx) in allImages" :key="idx"
     class="h-20 w-20 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden group relative shrink-0"
    >
     <img :src="img" class="w-full h-full object-cover" />
     <button @click.stop="removeImage(idx)" class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
      <Trash2 class="w-4 h-4 text-white" />
     </button>
    </div>
    <div 
     v-for="(vid, idx) in allVideos" :key="`vid-${idx}`"
     class="h-20 w-20 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden group relative shrink-0"
    >
     <video :src="vid" class="w-full h-full object-cover" muted loop playsinline></video>
     <button @click.stop="removeVideo(idx)" class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
      <Trash2 class="w-4 h-4 text-white" />
     </button>
    </div>
    <button type="button" @click="triggerImageUpload" class="h-20 w-20 rounded-lg bg-gray-50 border border-dashed border-gray-300 flex flex-col items-center justify-center transition-all hover:bg-blue-50 hover:border-blue-300 shrink-0">
     <template v-if="uploadingImage">
      <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
     </template>
     <template v-else>
      <ImageIcon class="w-5 h-5 text-gray-400 mb-1" />
      <span class="text-[9px] font-medium text-gray-400">Photo</span>
     </template>
     <input type="file" ref="imageRef" class="hidden" @change="handleFileUpload" accept="image/*" multiple />
    </button>
    <button v-if="allVideos.length < 3" type="button" @click="triggerVideoUpload" class="h-20 w-20 rounded-lg bg-gray-50 border border-dashed border-gray-300 flex flex-col items-center justify-center transition-all hover:bg-blue-50 hover:border-blue-300 shrink-0">
     <template v-if="uploadingVideo">
      <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
     </template>
     <template v-else>
      <VideoIcon class="w-5 h-5 text-gray-400 mb-1" />
      <span class="text-[9px] font-medium text-gray-400">Video</span>
     </template>
     <input type="file" ref="videoRef" class="hidden" @change="handleVideoUpload" accept="video/mp4,video/quicktime" multiple />
    </button>
   </div>
  </section>

  <!-- ═══════════════════════════════════════════════ -->
  <!-- 3. TRACK STOCK -->
  <!-- ═══════════════════════════════════════════════ -->
  <section class="space-y-4">
   <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold text-gray-900">Track stock</h3>
    <label class="relative inline-flex items-center cursor-pointer">
     <input type="checkbox" v-model="form.trackStock" class="sr-only peer" />
     <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
    </label>
   </div>
   <Transition name="slide-fade">
    <div v-if="form.trackStock" class="space-y-4">
     <div>
      <label class="text-sm font-semibold text-gray-800 block mb-1.5">In stock</label>
      <input type="number" v-model.number="form.stockQuantity" placeholder="1,000" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all" />
     </div>
    </div>
   </Transition>
  </section>

  <!-- ═══════════════════════════════════════════════ -->
  <!-- 4. PRICING -->
  <!-- ═══════════════════════════════════════════════ -->
  <section class="space-y-4">
   <h3 class="text-lg font-bold text-gray-900">Pricing</h3>
   <div class="grid grid-cols-2 gap-4">
    <div>
     <label class="text-sm font-semibold text-gray-800 block mb-1.5">Cost Price</label>
     <input type="number" v-model.number="form.costPrice" placeholder="1,000" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all" />
    </div>
    <div>
     <label class="text-sm font-semibold text-gray-800 block mb-1.5">Price</label>
     <input type="number" v-model.number="form.price" placeholder="1,000" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all" required />
    </div>
   </div>
   <div>
    <label class="text-sm font-semibold text-gray-800 block mb-1.5">SKU (optional)</label>
    <input type="text" v-model="form.sku" placeholder="SKU-12333-HJI" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all" />
   </div>
  </section>

  <!-- ═══════════════════════════════════════════════ -->
  <!-- 5. VARIATIONS -->
  <!-- ═══════════════════════════════════════════════ -->
  <section class="space-y-4">
   <div>
    <h3 class="text-lg font-bold text-gray-900">Variations (optional)</h3>
    <p class="text-sm text-gray-500 mt-1">Use variations when you have multiple options or an item e.g. A glass of whiskey and a bottle of the same whiskey.</p>
   </div>

   <!-- Variation rows -->
   <div v-if="form.variations.length > 0" class="space-y-3">
    <!-- Header row -->
    <div class="grid grid-cols-[1fr_0.8fr_0.8fr_0.8fr_0.8fr_auto] gap-2 text-xs font-bold text-gray-700">
     <span>Name</span>
     <span>Cost Price</span>
     <span>Price</span>
     <span>SKU (optional)</span>
     <span>Stock</span>
     <span class="w-7"></span>
    </div>
    <div v-for="(v, idx) in form.variations" :key="idx" class="grid grid-cols-[1fr_0.8fr_0.8fr_0.8fr_0.8fr_auto] gap-2 items-center">
     <input v-model="v.name" placeholder="e.g Glass" class="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
     <input type="number" v-model.number="v.costPrice" placeholder="1000" class="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
     <input type="number" v-model.number="v.price" placeholder="1000" class="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
     <input v-model="v.sku" placeholder="e.g Glass" class="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
     <input type="number" v-model.number="v.stock" placeholder="e.g 100" class="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
     <button type="button" @click="removeVariation(idx)" class="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
      <X class="w-4 h-4" />
     </button>
    </div>
   </div>

   <button type="button" @click="addVariation" class="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition-all active:scale-95">
    <Plus class="w-4 h-4" />
    {{ form.variations.length > 0 ? 'Add another variation' : 'Create variation' }}
   </button>
  </section>

  <!-- ═══════════════════════════════════════════════ -->
  <!-- 6. MODIFIERS -->
  <!-- ═══════════════════════════════════════════════ -->
  <section class="space-y-4">
   <div>
    <h3 class="text-lg font-bold text-gray-900">Modifiers</h3>
    <p class="text-sm text-gray-500 mt-1">Modifiers are customizable mandatory options that can be applied to an item when ordering. E.g. Sausages, Eggs</p>
   </div>
   <DashboardMenuConfigurator v-model="form.modifiers" type="modifier" />
  </section>

  <!-- ═══════════════════════════════════════════════ -->
  <!-- 7. ADD-ONS -->
  <!-- ═══════════════════════════════════════════════ -->
  <section class="space-y-4">
   <div>
    <h3 class="text-lg font-bold text-gray-900">Add-ons</h3>
    <p class="text-sm text-gray-500 mt-1">Add-ons are customizable options your customers can add to their items when ordering. E.g. Syrups, Sugar, Milk</p>
   </div>
   <DashboardMenuConfigurator v-model="form.addOns" type="addon" />
  </section>

  <!-- ═══════════════════════════════════════════════ -->
  <!-- 8. TAGS -->
  <!-- ═══════════════════════════════════════════════ -->
  <section class="space-y-4">
   <div>
    <h3 class="text-lg font-bold text-gray-900">Tags</h3>
    <p class="text-sm text-gray-500 mt-1">Tags help customers find your food items. Choose at least five that describe your dishes, like cuisine type, ingredients, or dietary options.</p>
   </div>
   <div class="relative" ref="tagsDropdownRef">
    <button type="button" @click="tagsOpen = !tagsOpen" class="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-gray-300 transition-all">
     <span>{{ form.tags.length > 0 ? form.tags.join(', ') : 'Select option' }}</span>
     <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': tagsOpen }" />
    </button>
    <Transition name="slide-fade">
     <div v-if="tagsOpen" class="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
      <button 
       v-for="tag in availableTags" :key="tag" type="button"
       @click="toggleTag(tag)"
       class="w-full text-left px-4 py-2.5 text-sm transition-all"
       :class="form.tags.includes(tag) ? 'bg-green-400 text-white font-medium' : 'text-gray-700 hover:bg-gray-50'"
      >
       {{ tag }}
      </button>
     </div>
    </Transition>
   </div>
   <!-- Selected tags chips -->
   <div v-if="form.tags.length > 0" class="flex flex-wrap gap-2">
    <span v-for="tag in form.tags" :key="tag" class="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
     {{ tag }}
     <button type="button" @click="toggleTag(tag)" class="text-gray-400 hover:text-red-500">
      <X class="w-3 h-3" />
     </button>
    </span>
   </div>
  </section>

  <!-- ═══════════════════════════════════════════════ -->
  <!-- 9. PACKS -->
  <!-- ═══════════════════════════════════════════════ -->
  <section class="space-y-4">
   <div>
    <h3 class="text-lg font-bold text-gray-900">Packs</h3>
    <p class="text-sm text-gray-500 mt-1">Packs let you define how a meal is packaged for delivery, such as the type, size, or number of plates used.</p>
   </div>
   <div class="relative" ref="packsDropdownRef">
    <button type="button" @click="packsOpen = !packsOpen" class="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-gray-300 transition-all">
     <span>{{ form.packs.length > 0 ? form.packs.join(', ') : 'Select option' }}</span>
     <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': packsOpen }" />
    </button>
    <Transition name="slide-fade">
     <div v-if="packsOpen" class="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
      <button 
       v-for="pack in availablePacks" :key="pack" type="button"
       @click="togglePack(pack)"
       class="w-full text-left px-4 py-2.5 text-sm transition-all"
       :class="form.packs.includes(pack) ? 'bg-green-400 text-white font-medium' : 'text-gray-700 hover:bg-gray-50'"
      >
       {{ pack }}
      </button>
     </div>
    </Transition>
   </div>
  </section>

  <!-- ═══════════════════════════════════════════════ -->
  <!-- 10. ADVANCED CONSTRAINTS -->
  <!-- ═══════════════════════════════════════════════ -->
  <section class="space-y-4">
   <div class="grid grid-cols-2 gap-4">
    <div>
     <label class="text-sm font-semibold text-gray-800 block mb-1.5">Maximum Quantity (optional)</label>
     <input type="number" v-model.number="form.maxQuantity" placeholder="" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all" />
    </div>
    <div>
     <label class="text-sm font-semibold text-gray-800 block mb-1.5">Maximum Quantity as Side (optional)</label>
     <input type="number" v-model.number="form.maxQuantityAsSide" placeholder="" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all" />
    </div>
   </div>
   <div>
    <label class="text-sm font-semibold text-gray-800 block mb-1.5">Volume per Portion (optional)</label>
    <div class="relative">
     <input type="text" v-model="form.volumePerPortion" placeholder="" class="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all" />
     <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">kg</span>
    </div>
   </div>
  </section>

  <!-- ═══════════════════════════════════════════════ -->
  <!-- 11. SERVING & PREP (Kitchen specific) -->
  <!-- ═══════════════════════════════════════════════ -->
  <section class="space-y-4">
   <h3 class="text-lg font-bold text-gray-900">Preparation</h3>
   <div class="grid grid-cols-2 gap-4">
    <div>
     <label class="text-sm font-semibold text-gray-800 block mb-1.5">Serving Size</label>
     <input type="text" v-model="form.servingSize" placeholder="e.g. 1 plate" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all" />
    </div>
    <div>
     <label class="text-sm font-semibold text-gray-800 block mb-1.5">Prep Time (min)</label>
     <input type="number" v-model.number="form.preparationTime" placeholder="15" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all" />
    </div>
   </div>
  </section>

  <!-- ═══════════════════════════════════════════════ -->
  <!-- 12. TOGGLES -->
  <!-- ═══════════════════════════════════════════════ -->
  <section class="space-y-3">
   <div class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-100">
    <div class="flex items-center gap-3">
     <Star class="w-4 h-4 text-amber-500" />
     <span class="text-sm font-semibold text-gray-700">Feature on menu</span>
    </div>
    <label class="relative inline-flex items-center cursor-pointer">
     <input type="checkbox" v-model="form.isFeatured" class="sr-only peer" />
     <div class="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
    </label>
   </div>
   <div class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-100">
    <div class="flex items-center gap-3">
     <CheckCircle class="w-4 h-4 text-emerald-500" />
     <span class="text-sm font-semibold text-gray-700">Available for order</span>
    </div>
    <label class="relative inline-flex items-center cursor-pointer">
     <input type="checkbox" v-model="form.isAvailable" class="sr-only peer" />
     <div class="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
    </label>
   </div>
  </section>

 </div>

 <template #footer>
  <div class="flex items-center gap-4 w-full">
   <button v-if="product" @click="$emit('delete', product)" type="button" class="flex-none py-3 px-4 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-all flex items-center justify-center" title="Delete Product">
    <Trash2 class="w-5 h-5" />
   </button>
   <button @click="$emit('close')" type="button" class="flex-1 py-3 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all">Cancel</button>
   <button @click="handleSubmit" type="button" :disabled="uploadingImage || uploadingVideo || uploading" class="flex-[2] py-3 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2">
    {{ product ? 'Update Item' : 'Publish Item' }}
   </button>
  </div>
 </template>
 </SideDrawer>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from 'vue';
import { ImageIcon, Trash2, Plus, Star, CheckCircle, Video as VideoIcon, X, ChevronDown } from 'lucide-vue-next';
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

const emit = defineEmits(['close', 'save', 'delete']);
const { showToast } = useCustomToast();
const uploading = ref(false);
const uploadingImage = ref(false);
const uploadingVideo = ref(false);
const imageRef = ref<HTMLInputElement | null>(null);
const videoRef = ref<HTMLInputElement | null>(null);

// Tags & Packs dropdowns
const tagsOpen = ref(false);
const packsOpen = ref(false);
const tagsDropdownRef = ref<HTMLElement | null>(null);
const packsDropdownRef = ref<HTMLElement | null>(null);

const availableTags = ['African', 'Breakfast', 'Snacks', 'Meat', 'Lunch', 'Fries', 'Vegetables', 'Rice', 'Soup', 'Pasta', 'Drinks', 'Desserts', 'Grills', 'Seafood', 'Vegan', 'Spicy'];
const availablePacks = ['Single plate', 'Double plate', 'Take-away box', 'Bowl', 'Cup', 'Family pack', 'Party tray'];

const form = reactive({
 name: '',
 description: '',
 price: 0,
 costPrice: 0,
 discountPrice: 0,
 category: '',
 servingSize: '',
 portionInfo: '',
 preparationTime: 15,
 trackStock: false,
 stockQuantity: 0,
 sku: '',
 minOrderQty: 1,
 maxOrderQty: 10,
 maxQuantity: null as number | null,
 maxQuantityAsSide: null as number | null,
 volumePerPortion: '',
 isAvailable: true,
 isFeatured: false,
 image: '',
 images: [] as string[],
 videos: [] as string[],
 modifiers: [] as any[],
 addOns: [] as any[],
 variations: [] as { name: string; costPrice: number; price: number; sku: string; stock: number }[],
 tags: [] as string[],
 packs: [] as string[],
});

const allImages = ref<string[]>([]);
const allVideos = ref<string[]>([]);

const defaultForm = () => ({
 name: '', description: '', price: 0, costPrice: 0, discountPrice: 0, category: '',
 servingSize: '', portionInfo: '', preparationTime: 15, trackStock: false, stockQuantity: 0,
 sku: '', minOrderQty: 1, maxOrderQty: 10, maxQuantity: null, maxQuantityAsSide: null,
 volumePerPortion: '', isAvailable: true, isFeatured: false,
 image: '', images: [], videos: [], modifiers: [], addOns: [],
 variations: [], tags: [], packs: [],
});

watch(() => props.isOpen, (isOpen) => {
 if (isOpen) {
  if (props.product) {
   const p = props.product;
   Object.assign(form, { ...defaultForm(), ...p });
   allImages.value = p.images?.length ? [...p.images] : (p.image ? [p.image] : []);
   allVideos.value = p.videos?.length ? [...p.videos] : [];
  } else {
   Object.assign(form, defaultForm());
   allImages.value = [];
   allVideos.value = [];
  }
 }
});

// ── Variations ──
const addVariation = () => {
 form.variations.push({ name: '', costPrice: 0, price: 0, sku: '', stock: 0 });
};
const removeVariation = (idx: number) => {
 form.variations.splice(idx, 1);
};

// ── Tags ──
const toggleTag = (tag: string) => {
 const idx = form.tags.indexOf(tag);
 if (idx >= 0) form.tags.splice(idx, 1);
 else form.tags.push(tag);
};

// ── Packs ──
const togglePack = (pack: string) => {
 const idx = form.packs.indexOf(pack);
 if (idx >= 0) form.packs.splice(idx, 1);
 else form.packs.push(pack);
};

// ── Click outside to close dropdowns ──
const handleClickOutside = (e: MouseEvent) => {
 if (tagsDropdownRef.value && !tagsDropdownRef.value.contains(e.target as Node)) tagsOpen.value = false;
 if (packsDropdownRef.value && !packsDropdownRef.value.contains(e.target as Node)) packsOpen.value = false;
};
onMounted(() => document.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));

// ── Image upload ──
const triggerImageUpload = () => imageRef.value?.click();
const handleFileUpload = async (e: Event) => {
 const files = (e.target as HTMLInputElement).files;
 if (!files) return;
 for (const file of Array.from(files)) {
  uploadingImage.value = true;
  try {
   const res = await vendors_api.uploadImage(file);
   const url = res.data.url || res.data.secure_url;
   if (url) allImages.value.push(url);
  } finally {
   uploadingImage.value = false;
  }
 }
};
const removeImage = (idx: number) => allImages.value.splice(idx, 1);

// ── Video upload ──
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
   if (url) allVideos.value.push(url);
  } catch (e: any) {
   showToast({ title: 'Upload Failed', message: e?.response?.data?.message || 'Could not upload video.', toastType: 'error' });
  } finally {
   uploadingVideo.value = false;
  }
 }
};
const removeVideo = (idx: number) => allVideos.value.splice(idx, 1);

// ── Submit ──
const handleSubmit = async () => {
 form.image = allImages.value[0] || '';
 form.images = [...allImages.value];
 form.videos = [...allVideos.value];
 emit('save', { ...form });
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
 transition: all 0.2s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
 opacity: 0;
 transform: translateY(-4px);
}
</style>
