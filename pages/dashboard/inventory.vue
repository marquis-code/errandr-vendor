<template>
 <div class="inv-page">
  <!-- ─── Header ─── -->
  <header class="inv-header">
   <div class="inv-header__left">
    <h1 class="inv-header__title">Products</h1>
    <p class="inv-header__sub">Manage your catalog, categories &amp; stock in one place.</p>
   </div>
   <div class="inv-header__actions">
    <button v-if="activeTab === 'items'" @click="isCategoryDrawerOpen = true" class="inv-btn inv-btn--outline">
     <FolderPlus class="inv-btn__icon" /> Categories
    </button>
    <button v-if="activeTab === 'items'" @click="openAddProduct" class="inv-btn inv-btn--primary">
     <Plus class="inv-btn__icon" /> Add Product
    </button>
    <button v-if="activeTab === 'packs'" @click="openAddPack" class="inv-btn inv-btn--primary">
     <Plus class="inv-btn__icon" /> Add Combo Pack
    </button>
    <button v-if="activeTab === 'addons'" @click="openAddAddOn" class="inv-btn inv-btn--primary">
     <Plus class="inv-btn__icon" /> Add Add-on Group
    </button>
   </div>
  </header>

  <!-- ─── Stats Row ─── -->
  <div class="inv-stats">
   <div class="inv-stat-card">
    <div class="inv-stat-card__icon inv-stat-card__icon--blue">
     <Package class="w-5 h-5" />
    </div>
    <div>
     <p class="inv-stat-card__value">{{ products.length }}</p>
     <p class="inv-stat-card__label">Total Products</p>
    </div>
   </div>
   <div class="inv-stat-card">
    <div class="inv-stat-card__icon inv-stat-card__icon--green">
     <CheckCircle class="w-5 h-5" />
    </div>
    <div>
     <p class="inv-stat-card__value">{{ availableCount }}</p>
     <p class="inv-stat-card__label">Available</p>
    </div>
   </div>
   <div class="inv-stat-card">
    <div class="inv-stat-card__icon inv-stat-card__icon--amber">
     <AlertTriangle class="w-5 h-5" />
    </div>
    <div>
     <p class="inv-stat-card__value">{{ lowStockCount }}</p>
     <p class="inv-stat-card__label">Low Stock</p>
    </div>
   </div>
   <div class="inv-stat-card">
    <div class="inv-stat-card__icon inv-stat-card__icon--purple">
     <Layers class="w-5 h-5" />
    </div>
    <div>
     <p class="inv-stat-card__value">{{ categories.length }}</p>
     <p class="inv-stat-card__label">Categories</p>
    </div>
   </div>
  </div>

  <!-- ─── Master Tabs (food vendors only) ─── -->
  <div v-if="isFoodVendor" class="inv-master-tabs">
   <button
    v-for="tab in masterTabs"
    :key="tab.key"
    @click="activeTab = tab.key"
    class="inv-master-tab"
    :class="{ 'inv-master-tab--active': activeTab === tab.key }"
   >
    <component :is="tab.icon" class="w-4 h-4" />
    {{ tab.label }}
   </button>
  </div>

  <!-- ─── Toolbar: Search + Category Filter ─── -->
  <div v-if="activeTab === 'items'" class="inv-toolbar">
   <div class="inv-search">
    <Search class="inv-search__icon" />
    <input
     v-model="searchQuery"
     type="text"
     placeholder="Search products..."
     class="inv-search__input"
    />
    <button v-if="searchQuery" @click="searchQuery = ''" class="inv-search__clear">
     <X class="w-3.5 h-3.5" />
    </button>
   </div>

   <div class="inv-category-pills">
    <button
     @click="activeCategory = 'all'"
     class="inv-pill"
     :class="{ 'inv-pill--active': activeCategory === 'all' }"
    >
     All
    </button>
    <button
     v-for="cat in categories"
     :key="cat._id"
     @click="activeCategory = cat.name"
     class="inv-pill"
     :class="{ 'inv-pill--active': activeCategory === cat.name }"
    >
     {{ cat.name }}
    </button>
   </div>
  </div>

  <!-- ═══════════════════════════════════════════ -->
  <!-- PRODUCTS TABLE (Items Tab)                 -->
  <!-- ═══════════════════════════════════════════ -->
  <div v-if="activeTab === 'items'" class="inv-table-section">
   <UiTable
    :columns="productColumns"
    :items="filteredProducts"
    :loading="loadingProds"
    empty-title="No products yet"
    empty-subtitle="Add your first product to start selling."
    :has-actions="true">
    <template #name="{ item }">
     <div class="inv-tbl-product">
      <div class="inv-tbl-product__img">
       <img :src="(item as any).image || (item as any).images?.[0] || '/placeholder-food.jpg'" :alt="(item as any).name" />
      </div>
      <div class="inv-tbl-product__info">
       <p class="inv-tbl-product__name">{{ (item as any).name }}</p>
       <p class="inv-tbl-product__cat">{{ (item as any).category?.name || (item as any).categoryId?.name || (item as any).category || 'Uncategorized' }}</p>
      </div>
     </div>
    </template>

    <template #price="{ item }">
     <span class="inv-tbl-price">₦{{ ((item as any).pricePerPortion || (item as any).price || 0).toLocaleString() }}</span>
    </template>

    <template #stock="{ item }">
     <div class="inv-tbl-stock">
      <span class="inv-tbl-stock__dot" :class="stockDotClass(item as any)"></span>
      <span class="inv-tbl-stock__text" :class="stockTextClass(item as any)">{{ stockLabel(item as any) }}</span>
     </div>
    </template>

    <template #status="{ item }">
     <span
      class="inv-tbl-badge"
      :class="(item as any).isAvailable ? 'inv-tbl-badge--green' : 'inv-tbl-badge--red'"
      @click.stop="quickToggleAvailability(item as any)"
     >
      {{ (item as any).isAvailable ? 'Available' : 'Unavailable' }}
     </span>
    </template>

    <template #actions="{ item }">
     <div class="inv-tbl-actions">
      <button class="inv-action-btn inv-action-btn--view" @click.stop="viewProductDetails(item as any)">
       <Eye class="w-3.5 h-3.5" /> View
      </button>
      <button class="inv-action-btn inv-action-btn--edit" @click.stop="editProduct(item as any)">
       <Edit2 class="w-3.5 h-3.5" /> Edit
      </button>
      <button class="inv-action-btn inv-action-btn--delete" @click.stop="confirmDelete(item as any)">
       <Trash2 class="w-3.5 h-3.5" /> Delete
      </button>
     </div>
    </template>
   </UiTable>
  </div>

  <!-- ═══════════════════════════════════════════ -->
  <!-- COMBO PACKS TAB                            -->
  <!-- ═══════════════════════════════════════════ -->
  <div v-if="activeTab === 'packs'" class="inv-table-section">
   <UiTable
    :columns="[{ key: 'name', label: 'Pack Details' }, { key: 'price', label: 'Bundle Price' }, { key: 'items', label: 'Items' }]"
    :items="packs"
    :loading="loadingPacks"
    empty-title="No combo packs found"
    empty-subtitle="Create combo packs to bundle products together."
    :has-actions="true">
    <template #name="{ item }">
     <div>
      <p class="inv-tbl-product__name">{{ (item as any).name }}</p>
      <p class="inv-tbl-product__cat">{{ (item as any).description || '—' }}</p>
     </div>
    </template>
    <template #price="{ item }">
     <span class="inv-tbl-price">₦{{ ((item as any).bundlePrice || 0).toLocaleString() }}</span>
    </template>
    <template #items="{ item }">
     <span class="text-sm text-gray-500 font-semibold">{{ (item as any).items?.length || 0 }} items</span>
    </template>
    <template #actions="{ item }">
     <div class="inv-tbl-actions">
      <button class="inv-action-btn inv-action-btn--view" @click.stop="editPack(item)">
       <Eye class="w-3.5 h-3.5" /> View
      </button>
      <button class="inv-action-btn inv-action-btn--edit" @click.stop="editPack(item)">
       <Edit2 class="w-3.5 h-3.5" /> Edit
      </button>
      <button class="inv-action-btn inv-action-btn--delete" @click.stop="deletePack(item._id)">
       <Trash2 class="w-3.5 h-3.5" /> Delete
      </button>
     </div>
    </template>
   </UiTable>
  </div>

  <!-- ═══════════════════════════════════════════ -->
  <!-- ADD-ON GROUPS TAB                          -->
  <!-- ═══════════════════════════════════════════ -->
  <div v-if="activeTab === 'addons'" class="inv-table-section">
   <UiTable
    :columns="[{ key: 'name', label: 'Group Name' }, { key: 'type', label: 'Selection Type' }, { key: 'options', label: 'Options' }]"
    :items="addOnGroups"
    :loading="loadingAddOns"
    empty-title="No add-on groups found"
    empty-subtitle="Create add-on groups to offer optional extras."
    :has-actions="true">
    <template #name="{ item }">
     <p class="inv-tbl-product__name">{{ (item as any).name }}</p>
    </template>
    <template #type="{ item }">
     <span class="inv-tbl-badge inv-tbl-badge--neutral">
      {{ (item as any).selectionType === 'single' ? 'Select One' : 'Multi Select' }}
     </span>
    </template>
    <template #options="{ item }">
     <span class="text-sm text-gray-500 font-semibold">{{ (item as any).options?.length || 0 }} options</span>
    </template>
    <template #actions="{ item }">
     <div class="inv-tbl-actions">
      <button class="inv-action-btn inv-action-btn--view" @click.stop="editAddOn(item)">
       <Eye class="w-3.5 h-3.5" /> View
      </button>
      <button class="inv-action-btn inv-action-btn--edit" @click.stop="editAddOn(item)">
       <Edit2 class="w-3.5 h-3.5" /> Edit
      </button>
      <button class="inv-action-btn inv-action-btn--delete" @click.stop="deleteAddOnGroup(item._id)">
       <Trash2 class="w-3.5 h-3.5" /> Delete
      </button>
     </div>
    </template>
   </UiTable>
  </div>
 </div>

 <!-- ─── Drawers & Modals ─── -->
 <ProductDrawer
  :isOpen="isProductDrawerOpen"
  :usesMenuApi="isFoodVendor"
  :product="selectedProduct"
  :categories="categories"
  :addOnGroups="addOnGroups"
  :requiresPrepTime="profile?.requiresPrepTime"
  :requiresTakeawayPack="profile?.requiresTakeawayPack"
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
  title="Delete Product?"
  :message="`Are you sure you want to remove '${(productToDelete as any)?.name}'? This action cannot be undone.`"
  variant="danger"
  confirm-text="Delete Product"
  @confirm="handleDeleteProduct"
  @cancel="isDeleteModalOpen = false"
 />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import {
 Plus, Search, FolderPlus, X,
 Edit2, Trash2, CheckCircle, AlertTriangle,
 Package, Layers, ShoppingBag, Gift, Puzzle, Eye
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
useHead({ title: 'Products - Errander Vendor' });

const { products, loading: loadingProds, fetchProducts, createProduct, updateProduct, deleteProduct, toggleAvailability, isFoodVendor } = useVendorProducts();
const { categories, fetchCategories, createCategory } = useVendorCategories();
const { addOnGroups, loading: loadingAddOns, fetchAddOnGroups, deleteAddOnGroup } = useVendorAddOnGroups();
const { packs, loading: loadingPacks, fetchPacks, deletePack } = useVendorPacks();
const { profile } = useVendorProfile();

const activeTab = ref<'items' | 'packs' | 'addons'>('items');
const masterTabs = [
 { key: 'items' as const, label: 'Products', icon: ShoppingBag },
 { key: 'packs' as const, label: 'Combo Packs', icon: Gift },
 { key: 'addons' as const, label: 'Add-on Groups', icon: Puzzle },
];

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

// ─── Computed ───
const availableCount = computed(() => products.value.filter((p: any) => p.isAvailable).length);
const lowStockCount = computed(() => products.value.filter((p: any) => p.trackStock && p.stockQuantity !== undefined && p.stockQuantity >= 0 && p.stockQuantity < 5).length);

const filteredProducts = computed(() => {
 let list = products.value;
 if (activeCategory.value !== 'all') {
  list = list.filter((p: any) => {
   const catName = p.category?.name || p.categoryId?.name || p.category;
   return catName === activeCategory.value;
  });
 }
 if (searchQuery.value) {
  const q = searchQuery.value.toLowerCase();
  list = list.filter((p: any) => {
   const catName = p.category?.name || p.categoryId?.name || p.category;
   return (
    p.name?.toLowerCase().includes(q) ||
    p.description?.toLowerCase().includes(q) ||
    catName?.toLowerCase().includes(q)
   );
  });
 }
 return list;
});

// ─── Stock helpers ───
const stockLabel = (item: any) => {
 if (!item.trackStock) return 'Unlimited';
 if (item.stockQuantity === 0) return 'Out of stock';
 return `${item.stockQuantity} left`;
};

const stockClass = (item: any) => {
 if (!item.trackStock) return '';
 if (item.stockQuantity === 0) return 'inv-product-card__stock--danger';
 if (item.stockQuantity < 5) return 'inv-product-card__stock--warn';
 return '';
};

const stockDotClass = (item: any) => {
 if (!item.trackStock) return 'bg-emerald-400';
 if (item.stockQuantity === 0) return 'bg-red-500';
 if (item.stockQuantity < 5) return 'bg-amber-400';
 return 'bg-emerald-400';
};

const stockTextClass = (item: any) => {
 if (!item.trackStock) return 'text-gray-600';
 if (item.stockQuantity === 0) return 'text-red-600';
 if (item.stockQuantity < 5) return 'text-amber-600';
 return 'text-emerald-600';
};

// ─── Columns ───
const productColumns = [
 { key: 'name', label: 'Product' },
 { key: 'price', label: 'Price' },
 { key: 'stock', label: 'Stock' },
 { key: 'status', label: 'Status' }
];

// ─── Actions ───
const openAddProduct = () => { selectedProduct.value = null; isProductDrawerOpen.value = true; };
const viewProductDetails = (product: any) => { selectedProduct.value = { ...product }; isProductDrawerOpen.value = true; }; // Re-using drawer for viewing
const editProduct = (product: any) => { selectedProduct.value = { ...product }; isProductDrawerOpen.value = true; };
const closeProductDrawer = () => { isProductDrawerOpen.value = false; selectedProduct.value = null; };

const handleSaveProduct = async (formData: any) => {
 if (selectedProduct.value) {
  await updateProduct((selectedProduct.value as any)._id, formData);
 } else {
  await createProduct(formData);
 }
 closeProductDrawer();
};

const confirmDelete = (product: any) => { productToDelete.value = product; isDeleteModalOpen.value = true; };
const handleDeleteProduct = async () => {
 if (productToDelete.value) {
  await deleteProduct((productToDelete.value as any)._id);
  isDeleteModalOpen.value = false;
  productToDelete.value = null;
 }
};

const handleSaveCategory = async (catData: any) => { await createCategory(catData); isCategoryDrawerOpen.value = false; };
const openAddPack = () => { selectedPack.value = null; isPackDrawerOpen.value = true; };
const editPack = (pack: any) => { selectedPack.value = { ...pack }; isPackDrawerOpen.value = true; };
const openAddAddOn = () => { selectedAddOn.value = null; isAddOnDrawerOpen.value = true; };
const editAddOn = (addon: any) => { selectedAddOn.value = { ...addon }; isAddOnDrawerOpen.value = true; };
const quickToggleAvailability = async (product: any) => { await toggleAvailability(product._id); };

// ─── Data Loading ───
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
/* ─── Page ─── */
.inv-page {
 padding: 24px 28px 80px;
 max-width: 1280px;
 margin: 0 auto;
 animation: invFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes invFadeIn {
 from { opacity: 0; transform: translateY(12px); }
 to { opacity: 1; transform: translateY(0); }
}

/* ─── Header ─── */
.inv-header {
 display: flex;
 align-items: flex-end;
 justify-content: space-between;
 gap: 16px;
 flex-wrap: wrap;
 margin-bottom: 24px;
}
.inv-header__title {
 font-size: 26px;
 font-weight: 800;
 color: #111;
 letter-spacing: -0.5px;
}
.inv-header__sub {
 font-size: 14px;
 color: #999;
 font-weight: 500;
 margin-top: 4px;
}
.inv-header__actions {
 display: flex;
 align-items: center;
 gap: 10px;
 flex-wrap: wrap;
}

/* ─── Buttons ─── */
.inv-btn {
 display: inline-flex;
 align-items: center;
 gap: 6px;
 padding: 10px 20px;
 border-radius: 10px;
 font-size: 13px;
 font-weight: 700;
 cursor: pointer;
 border: none;
 transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.inv-btn__icon { width: 16px; height: 16px; }

.inv-btn--primary {
 background: #111;
 color: #fff;
}
.inv-btn--primary:hover { background: #000; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.inv-btn--primary:active { transform: scale(0.97); }

.inv-btn--outline {
 background: #fff;
 color: #555;
 border: 1.5px solid #e5e5e5;
}
.inv-btn--outline:hover { border-color: #ccc; background: #fafafa; }

.inv-icon-btn {
 width: 32px;
 height: 32px;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 border-radius: 8px;
 border: none;
 background: transparent;
 color: #bbb;
 cursor: pointer;
 transition: all 0.15s;
}
.inv-icon-btn:hover { background: #f5f5f5; color: #333; }
.inv-icon-btn--danger:hover { background: #fef2f2; color: #ef4444; }

/* ─── Stats Row ─── */
.inv-stats {
 display: grid;
 grid-template-columns: repeat(4, 1fr);
 gap: 14px;
 margin-bottom: 24px;
}
@media (max-width: 768px) {
 .inv-stats { grid-template-columns: repeat(2, 1fr); }
}
.inv-stat-card {
 background: #fff;
 border: 1px solid #f0f0f0;
 border-radius: 14px;
 padding: 18px 20px;
 display: flex;
 align-items: center;
 gap: 14px;
 transition: all 0.2s;
}
.inv-stat-card:hover { border-color: #e0e0e0; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.inv-stat-card__icon {
 width: 42px;
 height: 42px;
 border-radius: 12px;
 display: flex;
 align-items: center;
 justify-content: center;
 flex-shrink: 0;
}
.inv-stat-card__icon--blue { background: #eff6ff; color: #3b82f6; }
.inv-stat-card__icon--green { background: #f0fdf4; color: #22c55e; }
.inv-stat-card__icon--amber { background: #fffbeb; color: #f59e0b; }
.inv-stat-card__icon--purple { background: #faf5ff; color: #a855f7; }

.inv-stat-card__value {
 font-size: 22px;
 font-weight: 800;
 color: #111;
 line-height: 1;
}
.inv-stat-card__label {
 font-size: 12px;
 color: #999;
 font-weight: 600;
 margin-top: 3px;
}

/* ─── Master Tabs ─── */
.inv-master-tabs {
 display: flex;
 gap: 6px;
 background: #f8f8f8;
 border-radius: 12px;
 padding: 4px;
 margin-bottom: 20px;
 width: fit-content;
}
.inv-master-tab {
 display: flex;
 align-items: center;
 gap: 6px;
 padding: 10px 18px;
 border-radius: 9px;
 font-size: 13px;
 font-weight: 700;
 color: #888;
 border: none;
 background: transparent;
 cursor: pointer;
 transition: all 0.2s;
}
.inv-master-tab:hover { color: #555; }
.inv-master-tab--active {
 background: #fff;
 color: #111;
 box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

/* ─── Toolbar ─── */
.inv-toolbar {
 display: flex;
 align-items: center;
 gap: 16px;
 margin-bottom: 20px;
 flex-wrap: wrap;
}

/* ─── Search ─── */
.inv-search {
 position: relative;
 flex: 1;
 min-width: 220px;
 max-width: 360px;
}
.inv-search__icon {
 position: absolute;
 left: 14px;
 top: 50%;
 transform: translateY(-50%);
 width: 16px;
 height: 16px;
 color: #ccc;
 pointer-events: none;
}
.inv-search__input {
 width: 100%;
 padding: 11px 36px 11px 40px;
 border: 1.5px solid #f0f0f0;
 border-radius: 10px;
 font-size: 13px;
 font-weight: 500;
 color: #333;
 background: #fff;
 outline: none;
 transition: all 0.2s;
}
.inv-search__input::placeholder { color: #ccc; }
.inv-search__input:focus { border-color: #111; box-shadow: 0 0 0 3px rgba(0,0,0,0.04); }
.inv-search__clear {
 position: absolute;
 right: 10px;
 top: 50%;
 transform: translateY(-50%);
 width: 24px;
 height: 24px;
 display: flex;
 align-items: center;
 justify-content: center;
 border-radius: 6px;
 border: none;
 background: #f5f5f5;
 color: #999;
 cursor: pointer;
}
.inv-search__clear:hover { background: #eee; color: #555; }

/* ─── Category Pills ─── */
.inv-category-pills {
 display: flex;
 gap: 6px;
 overflow-x: auto;
 flex: 1;
 -ms-overflow-style: none;
 scrollbar-width: none;
}
.inv-category-pills::-webkit-scrollbar { display: none; }

.inv-pill {
 flex-shrink: 0;
 padding: 8px 16px;
 border-radius: 20px;
 font-size: 12px;
 font-weight: 700;
 border: 1.5px solid #eee;
 background: #fff;
 color: #888;
 cursor: pointer;
 transition: all 0.2s;
 white-space: nowrap;
}
.inv-pill:hover { border-color: #ccc; color: #555; }
.inv-pill--active {
 background: #111;
 color: #fff;
 border-color: #111;
}

/* ─── Product Grid ─── */
.inv-grid {
 display: grid;
 grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
 gap: 16px;
}

/* ─── Product Card ─── */
.inv-product-card {
 background: #fff;
 border: 1px solid #f0f0f0;
 border-radius: 14px;
 overflow: hidden;
 cursor: pointer;
 transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.inv-product-card:hover {
 border-color: #e0e0e0;
 box-shadow: 0 8px 24px rgba(0,0,0,0.06);
 transform: translateY(-2px);
}

.inv-product-card__img-wrap {
 position: relative;
 width: 100%;
 aspect-ratio: 16 / 10;
 background: #f8f8f8;
 overflow: hidden;
}
.inv-product-card__img {
 width: 100%;
 height: 100%;
 object-fit: cover;
 transition: transform 0.4s ease;
}
.inv-product-card:hover .inv-product-card__img { transform: scale(1.04); }

.inv-product-card__badge {
 position: absolute;
 top: 10px;
 left: 10px;
 padding: 4px 10px;
 border-radius: 6px;
 font-size: 10px;
 font-weight: 800;
 text-transform: uppercase;
 letter-spacing: 0.5px;
 cursor: pointer;
 backdrop-filter: blur(8px);
 transition: all 0.15s;
}
.inv-product-card__badge--available {
 background: rgba(34, 197, 94, 0.15);
 color: #16a34a;
 border: 1px solid rgba(34, 197, 94, 0.2);
}
.inv-product-card__badge--unavailable {
 background: rgba(239, 68, 68, 0.15);
 color: #dc2626;
 border: 1px solid rgba(239, 68, 68, 0.2);
}

.inv-product-card__body {
 padding: 14px 16px 16px;
}
.inv-product-card__top {
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin-bottom: 6px;
}
.inv-product-card__category {
 font-size: 11px;
 font-weight: 700;
 color: #aaa;
 text-transform: uppercase;
 letter-spacing: 0.5px;
}
.inv-product-card__menu {
 display: flex;
 gap: 2px;
 opacity: 0;
 transition: opacity 0.2s;
}
.inv-product-card:hover .inv-product-card__menu { opacity: 1; }

.inv-product-card__name {
 font-size: 15px;
 font-weight: 700;
 color: #111;
 margin-bottom: 4px;
 display: -webkit-box;
 -webkit-line-clamp: 1;
 -webkit-box-orient: vertical;
 overflow: hidden;
}
.inv-product-card__desc {
 font-size: 12px;
 color: #999;
 font-weight: 500;
 margin-bottom: 12px;
 display: -webkit-box;
 -webkit-line-clamp: 2;
 -webkit-box-orient: vertical;
 overflow: hidden;
}

.inv-product-card__footer {
 display: flex;
 align-items: center;
 justify-content: space-between;
 padding-top: 12px;
 border-top: 1px solid #f5f5f5;
}
.inv-product-card__price {
 font-size: 16px;
 font-weight: 800;
 color: #111;
}
.inv-product-card__stock {
 font-size: 11px;
 font-weight: 700;
 color: #888;
 display: flex;
 align-items: center;
 gap: 5px;
}
.inv-product-card__stock--warn { color: #d97706; }
.inv-product-card__stock--danger { color: #ef4444; }
.inv-product-card__stock-dot {
 width: 6px;
 height: 6px;
 border-radius: 50%;
}

/* ─── Empty State ─── */
.inv-empty {
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 padding: 80px 20px;
 text-align: center;
}
.inv-empty__icon-wrap {
 width: 72px;
 height: 72px;
 border-radius: 20px;
 background: #f8f8f8;
 display: flex;
 align-items: center;
 justify-content: center;
 margin-bottom: 16px;
 border: 1px solid #f0f0f0;
}
.inv-empty__icon { width: 32px; height: 32px; color: #ccc; }
.inv-empty__title { font-size: 18px; font-weight: 800; color: #111; }
.inv-empty__sub { font-size: 13px; color: #999; font-weight: 500; margin-top: 4px; }

/* ─── Skeleton ─── */
.inv-product-skeleton {
 background: #fff;
 border: 1px solid #f0f0f0;
 border-radius: 14px;
 overflow: hidden;
}
.inv-product-skeleton__img {
 width: 100%;
 aspect-ratio: 16 / 10;
 background: linear-gradient(110deg, #f5f5f5 30%, #ebebeb 50%, #f5f5f5 70%);
 background-size: 200% 100%;
 animation: shimmer 1.5s infinite;
}
.inv-product-skeleton__body { padding: 16px; }
.inv-product-skeleton__line {
 height: 12px;
 border-radius: 6px;
 background: linear-gradient(110deg, #f5f5f5 30%, #ebebeb 50%, #f5f5f5 70%);
 background-size: 200% 100%;
 animation: shimmer 1.5s infinite;
 margin-bottom: 10px;
}
.inv-product-skeleton__line--lg { width: 70%; height: 14px; }
.inv-product-skeleton__line--sm { width: 40%; }
.inv-product-skeleton__line--md { width: 55%; margin-bottom: 0; }
@keyframes shimmer {
 0% { background-position: 200% 0; }
 100% { background-position: -200% 0; }
}

/* ─── Table Layout ─── */
.inv-table-section {
 background: #fff;
 border: 1px solid #f0f0f0;
 border-radius: 14px;
 overflow: hidden;
 margin-top: 20px;
}
.inv-tbl-product {
 display: flex;
 align-items: center;
 gap: 12px;
}
.inv-tbl-product__img {
 width: 44px;
 height: 44px;
 border-radius: 8px;
 overflow: hidden;
 background: #f8f8f8;
 flex-shrink: 0;
}
.inv-tbl-product__img img {
 width: 100%;
 height: 100%;
 object-fit: cover;
}
.inv-tbl-product__info {
 display: flex;
 flex-direction: column;
}
.inv-tbl-product__name {
 font-size: 14px;
 font-weight: 700;
 color: #111;
 margin-bottom: 2px;
}
.inv-tbl-product__cat {
 font-size: 11px;
 font-weight: 600;
 color: #999;
 text-transform: uppercase;
}
.inv-tbl-price {
 font-size: 14px;
 font-weight: 700;
 color: #111;
}
.inv-tbl-stock {
 display: flex;
 align-items: center;
 gap: 6px;
 font-size: 13px;
 font-weight: 600;
}
.inv-tbl-stock__dot {
 width: 6px;
 height: 6px;
 border-radius: 50%;
}
.inv-tbl-badge {
 padding: 4px 10px;
 border-radius: 6px;
 font-size: 11px;
 font-weight: 700;
 text-transform: uppercase;
 cursor: pointer;
 display: inline-flex;
 align-items: center;
}
.inv-tbl-badge--green {
 background: #ecfdf5;
 color: #10b981;
}
.inv-tbl-badge--red {
 background: #fef2f2;
 color: #ef4444;
}
.inv-tbl-badge--neutral {
 background: #f3f4f6;
 color: #4b5563;
}
.inv-tbl-actions {
 display: flex;
 align-items: center;
 gap: 6px;
}
.inv-action-btn {
 display: flex;
 align-items: center;
 gap: 4px;
 padding: 6px 10px;
 border-radius: 6px;
 font-size: 12px;
 font-weight: 600;
 border: 1px solid transparent;
 cursor: pointer;
 transition: all 0.2s;
}
.inv-action-btn--view {
 background: #f9fafb;
 color: #374151;
 border-color: #e5e7eb;
}
.inv-action-btn--view:hover { background: #f3f4f6; }
.inv-action-btn--edit {
 background: #eff6ff;
 color: #3b82f6;
 border-color: #bfdbfe;
}
.inv-action-btn--edit:hover { background: #dbeafe; }
.inv-action-btn--delete {
 background: #fef2f2;
 color: #ef4444;
 border-color: #fecaca;
}
.inv-action-btn--delete:hover { background: #fee2e2; }

/* ─── Responsive ─── */
@media (max-width: 640px) {
 .inv-page { padding: 16px 16px 80px; }
 .inv-header { flex-direction: column; align-items: flex-start; }
 .inv-header__title { font-size: 22px; }
 .inv-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
 .inv-toolbar { flex-direction: column; align-items: stretch; }
 .inv-search { max-width: none; }
}
</style>
