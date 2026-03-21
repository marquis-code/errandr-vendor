<template>
  <div class="space-y-6 animate-fade-in max-w-[1400px] mx-auto pb-20 px-4 sm:px-8">
    <!-- Header with Stats & Actions -->
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-6">
      <div class="space-y-1">
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">Menu Management</h1>
        <p class="text-xs text-gray-400 font-medium italic flex items-center gap-2">
          Organize your meals and categories in real-time. 
          <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-bold bg-blue-50 text-[#065fdb] border border-blue-100">
            {{ products.length }} ITEMS LIVE
          </span>
        </p>
      </div>
      
      <div class="flex flex-wrap items-center gap-3">
        <button 
          @click="isCategoryDrawerOpen = true"
          class="px-5 py-3 bg-white border border-gray-100 text-gray-500 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-sm hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2"
        >
          <FolderPlus class="w-4 h-4" /> Manage Categories
        </button>
        <button 
          @click="openAddProduct"
          class="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg hover:bg-black active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus class="w-4 h-4" /> Add New Item
        </button>
      </div>
    </div>

    <!-- Inventory Controls -->
    <div class="bg-gray-50/50 p-2 rounded-2xl border border-gray-100/50 flex flex-col md:flex-row items-center gap-4">
      <!-- Search -->
      <div class="relative flex-1 w-full">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search items..." 
          class="w-full pl-11 pr-4 py-3 bg-white border-transparent focus:border-[#065fdb]/30 rounded-xl text-sm font-medium placeholder:text-gray-300 focus:ring-4 focus:ring-[#065fdb]/5 outline-none transition-all"
        />
      </div>

      <!-- Category Tabs (Dynamic) -->
      <div class="flex items-center gap-1 overflow-x-auto max-w-full md:max-w-[400px] lg:max-w-none no-scrollbar py-0.5 px-1">
        <button
          @click="activeCategory = 'all'"
          class="shrink-0 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
          :class="activeCategory === 'all' ? 'bg-white text-[#065fdb] shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'"
        >
          All Items
        </button>
        <button
          v-for="cat in categories"
          :key="cat._id"
          @click="activeCategory = cat.name"
          class="shrink-0 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border"
          :class="activeCategory === cat.name ? 'bg-white text-[#065fdb] border-gray-100 shadow-sm' : 'text-gray-400 border-transparent hover:text-gray-600'"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <!-- Items Table -->
    <div class="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
      <UiTable 
        :columns="productColumns" 
        :items="filteredProducts" 
        :loading="loadingProds"
        empty-title="No items found"
        empty-subtitle="You haven't added any products to this category yet."
      >
        <template #name="{ item }">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-gray-50 overflow-hidden border border-gray-100 shrink-0">
              <img :src="(item as any).image || '/placeholder-food.jpg'" class="w-full h-full object-cover" />
            </div>
            <div class="truncate">
              <p class="font-bold text-gray-900 truncate">{{ (item as any).name }}</p>
              <p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{{ (item as any).category }}</p>
            </div>
          </div>
        </template>
        
        <template #price="{ item }">
          <div class="flex flex-col">
            <span class="font-bold text-gray-900">₦{{ (item as any).price?.toLocaleString() }}</span>
            <span v-if="(item as any).discountPrice" class="text-[8px] text-emerald-500 font-bold uppercase tracking-widest">Disc. Active</span>
          </div>
        </template>

        <template #stock="{ item }">
          <div class="flex items-center gap-2">
            <div 
              class="w-1.5 h-1.5 rounded-full" 
              :class="(item as any).stockQuantity === 0 ? 'bg-red-500' : ((item as any).stockQuantity < 5 && (item as any).stockQuantity !== -1 ? 'bg-amber-500' : 'bg-emerald-500')"
            />
            <span class="text-xs font-bold text-gray-600">
              {{ (item as any).stockQuantity === -1 ? 'Unlimited' : ((item as any).stockQuantity || 0) + ' Left' }}
            </span>
          </div>
        </template>

        <template #status="{ item }">
          <span 
            :class="(item as any).isAvailable ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' : 'bg-red-50 text-red-600 border-red-100/50'"
            class="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
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

    <!-- Drawers & Modals -->
    <ProductDrawer 
      :isOpen="isProductDrawerOpen" 
      :product="selectedProduct" 
      :categories="categories"
      @close="closeProductDrawer"
      @save="handleSaveProduct"
    />

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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { 
  Plus, Search, FolderPlus, 
  Edit2, Trash2, CheckCircle, Ban 
} from 'lucide-vue-next';
import { useVendorProducts, useVendorCategories } from '@/composables/modules/products';
import ProductDrawer from '@/components/dashboard/ProductDrawer.vue';
import CategoryDrawer from '@/components/dashboard/CategoryDrawer.vue';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import UiTable from '@/components/ui/UiTable.vue';

definePageMeta({ layout: 'vendor' });
useHead({ title: 'Inventory - Errandr Vendor' });

const { products, loading: loadingProds, fetchProducts, createProduct, updateProduct, deleteProduct, toggleAvailability } = useVendorProducts();
const { categories, fetchCategories, createCategory } = useVendorCategories();

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
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' }
];

const filteredProducts = computed(() => {
  let list = products.value;
  if (activeCategory.value !== 'all') {
    list = list.filter(p => p.category === activeCategory.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(p => 
      p.name?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
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

const quickToggleAvailability = async (product: any) => {
  await toggleAvailability(product._id);
};

onMounted(() => {
  fetchProducts();
  fetchCategories();
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
