<template>
 <div class="space-y-6 animate-fade-in w-full px-4 pb-20 sm:px-8">
 <!-- Header with Stats & Actions -->
 <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-6">
 <div class="space-y-1">
 <h1 class="text-xl font-bold text-gray-900 tracking-tight sm:text-2xl">Menu Management</h1>
 <p class="text-sm text-gray-400 font-medium flex items-center gap-2">
 Organize your meals and categories in real-time. 
 <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-sm font-bold bg-blue-50 text-[#FF5C1A]">
 {{ products.length }} ITEMS LIVE
 </span>
 </p>
 </div>
 
      <div class="flex flex-wrap items-center gap-3">
        <button v-if="activeTab === 'items'" @click="isCategoryDrawerOpen = true" class="px-5 py-2 bg-white border border-gray-50 text-gray-500 rounded-md font-bold text-sm hover: active:scale-95 transition-all flex items-center gap-2">
          <FolderPlus class="w-4 h-4" /> Manage Categories
        </button>
        <button v-if="activeTab === 'items'" @click="openAddProduct" class="px-6 py-2 bg-gray-900 text-white rounded-md font-bold text-sm hover:bg-black active:scale-95 transition-all flex items-center gap-2">
          <Plus class="w-4 h-4" /> Add New Item
        </button>
        <button v-if="activeTab === 'packs'" @click="openAddPack" class="px-6 py-2 bg-gray-900 text-white rounded-md font-bold text-sm hover:bg-black active:scale-95 transition-all flex items-center gap-2">
          <Plus class="w-4 h-4" /> Add Combo Pack
        </button>
        <button v-if="activeTab === 'addons'" @click="openAddAddOn" class="px-6 py-2 bg-gray-900 text-white rounded-md font-bold text-sm hover:bg-black active:scale-95 transition-all flex items-center gap-2">
          <Plus class="w-4 h-4" /> Add Add-on Group
        </button>
      </div>
 </div>

 <!-- Inventory Controls -->
 <div class="bg-gray-50/50 p-2 rounded-md border border-gray-50/50 flex flex-col md:flex-row items-center gap-4">
 <!-- Search -->
 <div class="relative flex-1 w-full">
 <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
 <input 
 v-model="searchQuery"
 type="text" 
 placeholder="Search items..." 
 class="w-full pl-11 pr-4 py-3 bg-white border-transparent focus:border-[#FF5C1A]/30 rounded-md text-sm font-medium placeholder:text-gray-300 focus:ring-4 focus:ring-[#FF5C1A]/5 outline-none transition-all"
 />
 </div>

      <!-- Master Tabs -->
      <div v-if="isFoodVendor" class="flex gap-4 border-b border-gray-200 mb-4 px-2">
        <button @click="activeTab = 'items'" class="pb-2 font-bold transition-colors" :class="activeTab === 'items' ? 'text-[#FF5C1A] border-b-2 border-[#FF5C1A]' : 'text-gray-400 hover:text-gray-600'">Menu Items</button>
        <button @click="activeTab = 'packs'" class="pb-2 font-bold transition-colors" :class="activeTab === 'packs' ? 'text-[#FF5C1A] border-b-2 border-[#FF5C1A]' : 'text-gray-400 hover:text-gray-600'">Combo Packs</button>
        <button @click="activeTab = 'addons'" class="pb-2 font-bold transition-colors" :class="activeTab === 'addons' ? 'text-[#FF5C1A] border-b-2 border-[#FF5C1A]' : 'text-gray-400 hover:text-gray-600'">Add-on Groups</button>
      </div>

      <!-- Category Tabs (Dynamic) for Items -->
      <div v-if="activeTab === 'items'" class="flex items-center gap-1 overflow-x-auto max-w-full md:max-w-[400px] lg:max-w-none no-scrollbar py-0.5 px-1">
        <button
          @click="activeCategory = 'all'"
          class="shrink-0 px-4 py-2 rounded-lg text-sm font-bold transition-all"
          :class="activeCategory === 'all' ? 'bg-white text-[#FF5C1A] shadow-sm' : 'text-gray-400 hover:text-gray-600'"
        >
          All Items
        </button>
        <button
          v-for="cat in categories"
          :key="cat._id"
          @click="activeCategory = cat.name"
          class="shrink-0 px-4 py-2 rounded-lg text-sm font-bold transition-all border"
          :class="activeCategory === cat.name ? 'bg-white text-[#FF5C1A] shadow-sm' : 'text-gray-400 border-transparent hover:text-gray-600'"
        >
          {{ cat.name }}
        </button>
      </div>
 </div>

    <!-- Items Table -->
    <div v-if="activeTab === 'items'" class="bg-white rounded-md overflow-hidden min-h-[500px]">
      <UiTable  
        :columns="productColumns" 
        :items="filteredProducts" 
        :loading="loadingProds"
        empty-title="No items found"
        empty-subtitle="You haven't added any products to this category yet."
        :has-actions="true">
        <template #name="{ item }">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-md bg-gray-50 overflow-hidden shrink-0">
              <img :src="(item as any).image || '/placeholder-food.jpg'" class="w-full h-full object-cover" />
            </div>
            <div class="truncate">
              <p class="font-bold text-gray-900 truncate">{{ (item as any).name }}</p>
              <p class="text-sm text-gray-400 font-bold">{{ (item as any).category?.name || (item as any).category }}</p>
            </div>
          </div>
        </template>
        
        <template #price="{ item }">
          <div class="flex flex-col">
            <span class="font-bold text-gray-900">₦{{ ((item as any).pricePerPortion || (item as any).price || 0).toLocaleString() }}</span>
            <span v-if="(item as any).discountPrice" class="text-xs text-emerald-500 font-bold">Disc. Active</span>
          </div>
        </template>

        <template #stock="{ item }">
          <div class="flex items-center gap-2">
            <div 
              class="w-1.5 h-1.5 rounded-md" 
              :class="(item as any).stockQuantity === 0 ? 'bg-red-500' : ((item as any).stockQuantity < 5 && (item as any).stockQuantity !== -1 ? 'bg-amber-500' : 'bg-emerald-500')"
            />
            <span class="text-sm font-bold text-gray-600">
              {{ (item as any).stockQuantity === -1 ? 'Unlimited' : ((item as any).stockQuantity || 0) + ' Left' }}
            </span>
          </div>
        </template>

        <template #status="{ item }">
          <span 
            :class="(item as any).isAvailable ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' : 'bg-red-50 text-red-600 border-red-100/50'"
            class="text-xs font-bold px-2 py-0.5 rounded-lg border-0 cursor-pointer hover:scale-105 transition-transform"
            @click.stop="quickToggleAvailability(item as any)"
          >
            {{ (item as any).isAvailable ? 'Available' : 'Unavailable' }}
          </span>
        </template>

        <template #actions="{ item }">
          <div class="flex items-center gap-2">
            <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-300 hover:text-gray-900" @click.stop="editProduct(item as any)">
              <Edit2 class="w-3.5 h-3.5" />
            </button>
            <button class="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-300 hover:text-red-500" @click.stop="confirmDelete(item as any)">
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </template>
      </UiTable>
    </div>

    <!-- Packs Table -->
    <div v-if="activeTab === 'packs'" class="bg-white rounded-md overflow-hidden min-h-[500px]">
      <UiTable  
        :columns="[{ key: 'name', label: 'Pack Details' }, { key: 'price', label: 'Bundle Price' }]" 
        :items="packs" 
        :loading="loadingPacks"
        empty-title="No combo packs found"
        :has-actions="true">
        <template #name="{ item }">
          <p class="font-bold text-gray-900">{{ (item as any).name }}</p>
          <p class="text-sm text-gray-400 font-bold">{{ (item as any).description }}</p>
        </template>
        <template #price="{ item }">
          <span class="font-bold text-gray-900">₦{{ ((item as any).bundlePrice || 0).toLocaleString() }}</span>
        </template>
        <template #actions="{ item }">
          <button class="p-2 hover:bg-gray-100 rounded-lg text-gray-300 hover:text-gray-900" @click.stop="editPack(item)"><Edit2 class="w-3.5 h-3.5" /></button>
          <button class="p-2 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-500" @click.stop="deletePack(item._id)"><Trash2 class="w-3.5 h-3.5" /></button>
        </template>
      </UiTable>
    </div>

    <!-- AddOnGroups Table -->
    <div v-if="activeTab === 'addons'" class="bg-white rounded-md overflow-hidden min-h-[500px]">
      <UiTable  
        :columns="[{ key: 'name', label: 'Group Name' }, { key: 'options', label: 'Options Count' }]" 
        :items="addOnGroups" 
        :loading="loadingAddOns"
        empty-title="No add-on groups found"
        :has-actions="true">
        <template #name="{ item }">
          <p class="font-bold text-gray-900">{{ (item as any).name }}</p>
        </template>
        <template #options="{ item }">
          <span class="text-sm text-gray-600">{{ (item as any).options?.length || 0 }} options</span>
        </template>
        <template #actions="{ item }">
          <button class="p-2 hover:bg-gray-100 rounded-lg text-gray-300 hover:text-gray-900" @click.stop="editAddOn(item)"><Edit2 class="w-3.5 h-3.5" /></button>
          <button class="p-2 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-500" @click.stop="deleteAddOnGroup(item._id)"><Trash2 class="w-3.5 h-3.5" /></button>
        </template>
      </UiTable>
    </div>
 </div>

 <!-- Drawers & Modals -->
  <ProductDrawer 
  :isOpen="isProductDrawerOpen" 
  :product="selectedProduct" 
  :categories="categories"
  :addOnGroups="addOnGroups"
  @close="closeProductDrawer"
  @save="handleSaveProduct"
  @createCategory="isCategoryDrawerOpen = true"
  @createAddOnGroup="isAddOnDrawerOpen = true; selectedAddOn = null"
  @editAddOnGroup="editAddOn"
  @deleteAddOnGroup="deleteAddOnGroup"
  />

  <PackDrawer :isOpen="isPackDrawerOpen" :pack="selectedPack" :categories="categories" :addOnGroups="addOnGroups" :products="products" @close="isPackDrawerOpen = false; fetchPacks();" @createCategory="isCategoryDrawerOpen = true" />
  <AddOnGroupDrawer :isOpen="isAddOnDrawerOpen" :group="selectedAddOn" @close="isAddOnDrawerOpen = false; fetchAddOnGroups();" />

  <CategoryDrawer 
    :isOpen="isCategoryDrawerOpen" 
    :categories="categories"
 @close="isCategoryDrawerOpen = false"
 @save="handleSaveCategory"
 />

 <ConfirmModal 
 :isOpen="isDeleteModalOpen"
 title="Delete Menu Item?"
 :message="`Are you sure you want to remove '${(productToDelete as any)?.name}'? This action cannot be undone.`"
 variant="danger"
 confirm-text="Delete Item"
 @confirm="handleDeleteProduct"
 @cancel="isDeleteModalOpen = false"
 />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { 
 Plus, Search, FolderPlus, 
 Edit2, Trash2, CheckCircle, Ban 
} from 'lucide-vue-next';
import { useVendorProducts, useVendorCategories, useVendorAddOnGroups, useVendorPacks } from '@/composables/modules/products';
import { useVendorProfile } from '@/composables/modules/vendors';
import ProductDrawer from '@/components/dashboard/ProductDrawer.vue';
import PackDrawer from '@/components/dashboard/PackDrawer.vue';
import AddOnGroupDrawer from '@/components/dashboard/AddOnGroupDrawer.vue';
import CategoryDrawer from '@/components/dashboard/CategoryDrawer.vue';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import UiTable from '@/components/ui/UiTable.vue';

definePageMeta({ layout: 'vendor' });
useHead({ title: 'Inventory - Errander Vendor' });

const { products, loading: loadingProds, fetchProducts, createProduct, updateProduct, deleteProduct, toggleAvailability } = useVendorProducts();
const { categories, fetchCategories, createCategory } = useVendorCategories();
const { addOnGroups, loading: loadingAddOns, fetchAddOnGroups, deleteAddOnGroup } = useVendorAddOnGroups();
const { packs, loading: loadingPacks, fetchPacks, deletePack } = useVendorPacks();
const { profile } = useVendorProfile();

const isFoodVendor = computed(() => {
  const type = (profile.value?.businessType || profile.value?.storeType || '').toLowerCase();
  const category = (profile.value?.category || '').toLowerCase();
  const foodCategories = ['restaurant', 'eatery', 'snacks', 'drinks', 'bakery', 'food'];
  return foodCategories.includes(category) || type === 'food' || type === 'restaurant';
});

const activeTab = ref<'items' | 'packs' | 'addons'>('items');
const isPackDrawerOpen = ref(false);
const isAddOnDrawerOpen = ref(false);
const selectedPack = ref(null);
const selectedAddOn = ref(null);

const isProductDrawerOpen = ref(false);
const isCategoryDrawerOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedProduct = ref(null);
const productToDelete = ref(null);
const searchQuery = ref('');
const activeCategory = ref('all');

const productColumns = [
 { key: 'name', label: 'Item Details' },
 { key: 'price', label: 'Price' },
 { key: 'stock', label: 'Inventory' },
 { key: 'status', label: 'Status' }
];

const filteredProducts = computed(() => {
 let list = products.value;
 if (activeCategory.value !== 'all') {
 list = list.filter(p => {
 const catName = p.category?.name || p.category;
 return catName === activeCategory.value;
 });
 }
 if (searchQuery.value) {
 const q = searchQuery.value.toLowerCase();
 list = list.filter(p => {
 const catName = p.category?.name || p.category;
 return (
 p.name?.toLowerCase().includes(q) ||
 p.description?.toLowerCase().includes(q) ||
 catName?.toLowerCase().includes(q)
 );
 });
 }
 return list;
});

const openAddProduct = () => {
 selectedProduct.value = null;
 isProductDrawerOpen.value = true;
};

const editProduct = (product: any) => {
 selectedProduct.value = { ...product };
 isProductDrawerOpen.value = true;
};

const closeProductDrawer = () => {
 isProductDrawerOpen.value = false;
 selectedProduct.value = null;
};

const handleSaveProduct = async (formData: any) => {
 if (selectedProduct.value) {
 await updateProduct((selectedProduct.value as any)._id, formData);
 } else {
 await createProduct(formData);
 }
 closeProductDrawer();
};

const confirmDelete = (product: any) => {
 productToDelete.value = product;
 isDeleteModalOpen.value = true;
};

const handleDeleteProduct = async () => {
 if (productToDelete.value) {
 await deleteProduct((productToDelete.value as any)._id);
 isDeleteModalOpen.value = false;
 productToDelete.value = null;
 }
};

const handleSaveCategory = async (catData: any) => {
 await createCategory(catData);
 isCategoryDrawerOpen.value = false;
};

const openAddPack = () => { selectedPack.value = null; isPackDrawerOpen.value = true; };
const editPack = (pack: any) => { selectedPack.value = { ...pack }; isPackDrawerOpen.value = true; };
const openAddAddOn = () => { selectedAddOn.value = null; isAddOnDrawerOpen.value = true; };
const editAddOn = (addon: any) => { selectedAddOn.value = { ...addon }; isAddOnDrawerOpen.value = true; };

const quickToggleAvailability = async (product: any) => {
 await toggleAvailability(product._id);
};

import { watch } from 'vue';

const loadData = () => {
  fetchProducts();
  fetchCategories();
  if (isFoodVendor.value) {
    fetchAddOnGroups();
    fetchPacks();
  }
};

onMounted(() => {
  if (profile.value && (profile.value.category || profile.value.businessType)) {
    loadData();
  }
});

watch(() => profile.value, (newVal) => {
  if (newVal && (newVal.category || newVal.businessType)) {
    loadData();
  }
}, { deep: true });
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
