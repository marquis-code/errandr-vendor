<template>
 <div class="space-y-4 animate-fade-in max-w-7xl mx-auto pb-10">
 <!-- Header with Search Bar -->
 <div class="flex items-center justify-between gap-4 mb-4 mt-2">
 <div class="flex-1 relative max-w-2xl">
 <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
 <input 
 v-model="searchQuery"
 type="text" 
 placeholder="Search items by name, category, or description" 
 class="w-full pl-11 pr-14 py-2.5 bg-gray-50/70 hover:bg-gray-100 transition-colors border-none rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-parentPrimary/20"
 />
 <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
 <kbd class="px-1.5 py-0.5 text-[10px] font-bold bg-white text-gray-400 rounded-md border border-gray-200">⌘</kbd>
 <kbd class="px-1.5 py-0.5 text-[10px] font-bold bg-white text-gray-400 rounded-md border border-gray-200">K</kbd>
 </div>
 </div>
 <div class="flex items-center gap-4">
 <span class="text-sm font-medium text-gray-500 hidden md:block">Total Products: <strong class="text-gray-900">{{ products.length }}</strong></span>
 </div>
 </div>

 <div class="mb-6">
 <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
 <div>
 <h1 class="text-2xl font-bold text-gray-900 tracking-tight font-display mb-1">Product Catalog</h1>
 <p class="text-gray-500 text-sm font-medium">Manage your store's menu, inventory availability, and pricing.</p>
 </div>
 <button @click="openAddDrawer" class="px-6 py-2.5 bg-parentPrimary text-white rounded-full font-bold text-xs shadow-sm shadow-parentPrimary/20 hover:brightness-110 active:scale-[0.98] transition-all tracking-widest flex items-center gap-2">
 <span class="text-lg leading-none">+</span> New Product
 </button>
 </div>

 <div class="flex items-center gap-4">
 <button class="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-medium text-gray-700 transition-colors border border-gray-200">
 <ListFilter class="w-4 h-4" />
 Filters
 </button>
 <span class="text-sm font-medium text-gray-400">Category filter applied</span>
 
 <div class="ml-auto flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
 <button
 v-for="cat in categories"
 :key="cat"
 @click="activeCategory = cat"
 class="px-4 py-1.5 rounded-full text-xs font-bold transition-all tracking-wider whitespace-nowrap"
 :class="activeCategory === cat ? 'bg-parentPrimary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 bg-gray-50 border border-transparent'"
 >
 {{ cat }}
 </button>
 </div>
 </div>
 </div>


 <!-- Product List -->
 <div v-if="loading" class="p-10 text-center">
 <div class="space-y-4">
 <div v-for="i in 8" :key="i" class="h-12 bg-gray-100 rounded-2xl animate-pulse"></div>
 </div>
 </div>

 <div v-else-if="filteredProducts.length === 0">
 <EmptyState 
 :title="products.length === 0 ? 'Your store is empty' : 'No match found'" 
 description="Add your first campus favorite to start receiving orders!"
 actionLabel="Create First Product"
 @action="openAddDrawer"
 >
 <template #icon>
 🍔
 </template>
 </EmptyState>
 </div>

 <div v-else class="bg-white">
 <div class="overflow-x-auto pb-20">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="border-b border-gray-100">
 <th class="py-4 px-2 font-medium text-gray-400 text-[11px] whitespace-nowrap">Product</th>
 <th class="py-4 px-2 font-medium text-gray-400 text-[11px] whitespace-nowrap">Category</th>
 <th class="py-4 px-2 font-medium text-gray-400 text-[11px] whitespace-nowrap text-right">Price</th>
 <th class="py-4 px-2 font-medium text-gray-400 text-[11px] whitespace-nowrap text-right">Status</th>
 <th class="py-4 px-2 font-medium text-gray-400 text-[11px] whitespace-nowrap"></th>
 </tr>
 </thead>
 <tbody class="divide-y divide-gray-50/50">
 <tr v-for="product in filteredProducts" :key="product._id" class="hover:bg-gray-50/80 transition-colors group cursor-pointer" @click="selectedProduct = product">
 <td class="py-4 px-2 min-w-[250px]">
 <div class="flex items-center gap-3">
 <div class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200">
 <img :src="product.image || '/placeholder-food.jpg'" class="w-full h-full object-cover" />
 </div>
 <div class="min-w-0">
 <h3 class="font-bold text-gray-900 text-[13px] tracking-tight truncate">{{ product.name }}</h3>
 <p class="text-[11px] text-gray-500 font-medium truncate max-w-[200px]">{{ product.description }}</p>
 </div>
 </div>
 </td>
 <td class="py-4 px-2">
 <span class="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-bold tracking-widest border border-gray-200/50">{{ product.category }}</span>
 </td>
 <td class="py-4 px-2 text-right">
 <p class="text-[13px] font-bold text-gray-900 tracking-tighter">₦{{ product.price?.toLocaleString() }}</p>
 </td>
 <td class="py-4 px-2 text-right">
 <span :class="product.isAvailable ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-500 border-rose-100'" class="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-md border inline-block">
 {{ product.isAvailable ? 'Live & Active' : 'Offline' }}
 </span>
 </td>
 <td class="py-4 px-2 text-right w-10">
 <ChevronRight class="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors inline-block" />
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <!-- SideDrawer for Product Details & Editing -->
 <SideDrawer :isOpen="!!selectedProduct" @close="selectedProduct = null">
 <template v-if="selectedProduct">
 <div class="flex flex-col items-center justify-center py-6 border-b border-gray-100">
 <div class="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden shadow-sm mb-4 border border-gray-200">
 <img :src="selectedProduct.image || '/placeholder-food.jpg'" class="w-full h-full object-cover" />
 </div>
 
 <h3 class="text-xl font-bold text-gray-900 tracking-tight text-center">{{ selectedProduct.name }}</h3>
 <p class="text-sm font-medium text-gray-500 mt-1">₦{{ selectedProduct.price?.toLocaleString() }}</p>
 
 <div class="mt-4 flex gap-2">
 <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold tracking-widest border border-gray-200/50">
 {{ selectedProduct.category }}
 </span>
 <span :class="selectedProduct.isAvailable ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-500 border-rose-100'" class="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border shadow-sm">
 {{ selectedProduct.isAvailable ? 'Available' : 'Sold Out' }}
 </span>
 </div>
 </div>

 <div class="py-6 space-y-6">
 <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100">
 <p class="text-[10px] font-bold tracking-widest text-gray-400 mb-2">Description & Notes</p>
 <p class="text-sm font-medium text-gray-700 leading-relaxed">{{ selectedProduct.description }}</p>
 </div>

 <div class="pt-4 border-t border-gray-100 flex flex-col gap-3">
 <h4 class="text-[10px] font-bold tracking-widest text-gray-400 mb-2">Item Actions</h4>
 
 <button 
 @click="handleToggleAvailability(selectedProduct)" 
 class="w-full px-5 py-4 bg-white text-gray-700 rounded-xl text-[11px] font-bold tracking-widest border border-gray-200 shadow-sm hover:border-gray-300 active:scale-[0.98] transition-all flex items-center justify-between"
 >
 <span>{{ selectedProduct.isAvailable ? 'Mark as Out of Stock' : 'Mark as Available' }}</span>
 <ToggleLeft v-if="!selectedProduct.isAvailable" class="w-4 h-4 text-gray-400" />
 <ToggleRight v-else class="w-4 h-4 text-emerald-500" />
 </button>
 
 <button 
 @click="handleDelete(selectedProduct._id); selectedProduct = null;" 
 class="w-full px-5 py-3.5 bg-rose-50 text-rose-500 rounded-xl text-[11px] font-bold tracking-widest border border-rose-100 hover:bg-rose-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
 >
 <Trash2 class="w-3.5 h-3.5" /> Delete Product
 </button>
 </div>
 </div>
 </template>
 </SideDrawer>

 <!-- SideDrawer for Add Product Form -->
 <SideDrawer :isOpen="showAddDrawer" @close="showAddDrawer = false">
 <div class="space-y-6">
 <div class="border-b border-gray-100 pb-4">
 <h2 class="text-2xl font-bold text-gray-900 tracking-tight font-display">List New Product</h2>
 <p class="text-gray-500 text-sm mt-1 font-medium">Your item will be immediately visible to campus students.</p>
 </div>
 
 <form @submit.prevent="handleAddProduct" class="space-y-5">
 <div class="space-y-1.5">
 <label class="text-[10px] font-bold text-gray-400 tracking-widest ml-1">Product Name</label>
 <input v-model="newProduct.name" placeholder="e.g. Authentic Suya Skewers" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-parentPrimary/20 focus:bg-white focus:border-parentPrimary/30 outline-none transition-all shadow-inner" required />
 </div>
 
 <div class="space-y-1.5">
 <label class="text-[10px] font-bold text-gray-400 tracking-widest ml-1">Description & Ingredients</label>
 <textarea v-model="newProduct.description" placeholder="Specify portion size, spice levels, or packaging details..." class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-parentPrimary/20 focus:bg-white focus:border-parentPrimary/30 outline-none transition-all h-24 resize-none shadow-inner" />
 </div>

 <div class="grid grid-cols-2 gap-4">
 <div class="space-y-1.5">
 <label class="text-[10px] font-bold text-gray-400 tracking-widest ml-1">Price (₦)</label>
 <div class="relative">
 <span class="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">₦</span>
 <input v-model.number="newProduct.price" type="number" placeholder="0" class="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-black focus:ring-2 focus:ring-parentPrimary/20 focus:bg-white focus:border-parentPrimary/30 outline-none transition-all shadow-inner" required />
 </div>
 </div>
 <div class="space-y-1.5">
 <label class="text-[10px] font-bold text-gray-400 tracking-widest ml-1">Category</label>
 <input v-model="newProduct.category" placeholder="snacks, mains, etc." class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-parentPrimary/20 focus:bg-white focus:border-parentPrimary/30 outline-none transition-all shadow-inner tracking-wider" required />
 </div>
 </div>

 <!-- Pre-order Toggle & Config -->
 <div class="pt-4 space-y-4">
 <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100/50 transition-all" @click="newProduct.isPreOrder = !newProduct.isPreOrder">
 <div>
 <p class="text-[10px] font-black text-gray-900 uppercase tracking-widest">Pre-order Item</p>
 <p class="text-[9px] text-gray-400 font-bold">This item requires advanced ordering</p>
 </div>
 <div class="w-10 h-5 rounded-full relative transition-colors duration-300" :class="newProduct.isPreOrder ? 'bg-parentPrimary' : 'bg-gray-200'">
 <div class="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 shadow-sm" :class="newProduct.isPreOrder ? 'translate-x-5' : ''" />
 </div>
 </div>

 <Transition name="fade-up">
 <div v-if="newProduct.isPreOrder" class="space-y-4">
 <div class="grid grid-cols-2 gap-4">
 <div class="space-y-1.5">
 <label class="text-[10px] font-bold text-gray-400 tracking-widest ml-1">Order Deadline</label>
 <input v-model="newProduct.preOrderDeadline" type="datetime-local" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-bold focus:ring-2 focus:ring-parentPrimary/20 outline-none transition-all shadow-inner" />
 </div>
 <div class="space-y-1.5">
 <label class="text-[10px] font-bold text-gray-400 tracking-widest ml-1">Delivery Date</label>
 <input v-model="newProduct.availableDate" type="date" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-bold focus:ring-2 focus:ring-parentPrimary/20 outline-none transition-all shadow-inner" />
 </div>
 </div>
 <div class="space-y-1.5">
 <label class="text-[10px] font-bold text-gray-400 tracking-widest ml-1">Pre-order Note</label>
 <input v-model="newProduct.preOrderNote" placeholder="e.g. Freshly baked every Saturday morning" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-parentPrimary/20 outline-none transition-all shadow-inner" />
 </div>
 </div>
 </Transition>
 </div>

 <div class="pt-6 border-t border-gray-100 mt-6">
 <button type="submit" class="w-full py-4 bg-parentPrimary text-white rounded-xl text-xs font-bold tracking-widest shadow-lg shadow-parentPrimary/20 hover:brightness-110 active:scale-[0.98] transition-all">Publish Item</button>
 </div>
 </form>
 </div>
 </SideDrawer>
 </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useVendorProducts } from '@/composables/modules/products';
import { Search, ListFilter, ChevronRight, ToggleLeft, ToggleRight, Trash2 } from 'lucide-vue-next';
import SideDrawer from '@/components/ui/SideDrawer.vue';
import EmptyState from '@/components/core/EmptyState.vue';


definePageMeta({
 layout: 'vendor'
})

const { products, loading, fetchProducts, createProduct, updateProduct, deleteProduct } = useVendorProducts();
const showAddDrawer = ref(false);
const selectedProduct = ref<any>(null);
const searchQuery = ref('');
const activeCategory = ref('all');

const categories = computed(() => {
 const cats = new Set(products.value.map(p => p.category));
 return ['all', ...Array.from(cats)].filter(c => c);
});

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

const newProduct = reactive({ 
 name: '', 
 description: '', 
 price: 0, 
 category: '', 
 preparationTime: 15,
 isAvailable: true,
 isPreOrder: false,
 preOrderDeadline: '',
 availableDate: '',
 preOrderNote: ''
});

const openAddDrawer = () => {
 showAddDrawer.value = true;
};

const handleAddProduct = async () => {
 const success = await createProduct(newProduct);
 if (success) {
 showAddDrawer.value = false;
 Object.assign(newProduct, { 
  name: '', 
  description: '', 
  price: 0, 
  category: '', 
  preparationTime: 15, 
  isAvailable: true,
  isPreOrder: false,
  preOrderDeadline: '',
  availableDate: '',
  preOrderNote: ''
 });
 }
};

const handleToggleAvailability = async (product: any) => {
 await updateProduct(product._id, { isAvailable: !product.isAvailable });
};

const handleDelete = async (id: string) => {
 if (confirm('Permanently remove this item from your public catalog?')) {
 await deleteProduct(id);
 }
};

onMounted(fetchProducts);
useHead({ title: 'Menu Management - Errandr Vendor' });
</script>

<style scoped>
.animate-fade-in {
 animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.animate-scale-in {
 animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeIn {
 from { opacity: 0; transform: translateY(30px); }
 to { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
 from { opacity: 0; transform: scale(0.9) translateY(10px); }
 to { opacity: 1; transform: scale(1) translateY(0); }
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
