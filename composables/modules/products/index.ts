import { ref, reactive } from 'vue';
import { products_api } from "@/api_factory/modules/products";
import { menu_items_api } from "@/api_factory/modules/menu-items";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useLoader } from "@/composables/core/useLoader";
import { useUser } from "@/composables/modules/auth/user";
import { useVendorProfile } from "@/composables/modules/vendors";

export const useVendorProducts = () => {
  const { showToast } = useCustomToast();
  const { startLoading, stopLoading } = useLoader();
  const { profile } = useVendorProfile();
  const products = ref<any[]>([]);
  const loading = ref(false);

  const isFoodVendor = computed(() => {
    const vendorType = (profile.value?.vendorType || '').toLowerCase();
    if (vendorType === 'restaurant' || vendorType === 'mini-mart') return true;
    if (vendorType === 'single-category') return false;
    // Fallback: check legacy fields
    const type = (profile.value?.businessType || profile.value?.storeType || '').toLowerCase();
    const category = (profile.value?.category || '').toLowerCase();
    const foodCategories = ['restaurant', 'eatery', 'snacks', 'drinks', 'bakery', 'food', 'mini-mart'];
    return foodCategories.includes(category) || type === 'food' || type === 'restaurant' || type === 'mini-mart';
  });

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const api = isFoodVendor.value ? menu_items_api : products_api;
      const res = await api.getProducts();
      products.value = res.data;
    } catch (e) { /* Error handled by axios */ }
    finally {
      loading.value = false;
    }
  };

  const createProduct = async (payload: any) => {
    startLoading('Adding your meal to the menu... 🥘');
    try {
      const api = isFoodVendor.value ? menu_items_api : products_api;
      const res = await api.createProduct(payload);
      if (res.data) {
        showToast({
          title: "Product Added! 🎉",
          message: `${payload.name} is now live and hungry students are watching!`,
          toastType: "success",
        });
        await fetchProducts();
        return res.data;
      }
    } finally {
      stopLoading();
    }
  };

  const updateProduct = async (id: string, payload: any) => {
    startLoading('Updating your menu item... 🔄');
    try {
      const api = isFoodVendor.value ? menu_items_api : products_api;
      const res = await api.updateProduct(id, payload);
      showToast({
        title: "Product Updated",
        message: "Your menu changes have been saved successfully.",
        toastType: "success",
      });
      await fetchProducts();
      return true;
    } finally {
      stopLoading();
    }
  };

  const deleteProduct = async (id: string) => {
    startLoading('Removing item from menu... 🗑️');
    try {
      const api = isFoodVendor.value ? menu_items_api : products_api;
      const res = await api.deleteProduct(id);
      showToast({
        title: "Product Deleted",
        message: "The item has been removed from your store.",
        toastType: "success",
      });
      await fetchProducts();
      return true;
    } finally {
      stopLoading();
    }
  };

  const toggleAvailability = async (id: string) => {
    try {
      const api = isFoodVendor.value ? menu_items_api : products_api;
      await api.toggleAvailability(id);
      await fetchProducts();
      return true;
    } catch (e) {
      return false;
    }
  };

  return { products, loading, isFoodVendor, fetchProducts, createProduct, updateProduct, deleteProduct, toggleAvailability };
};

export const useVendorCategories = () => {
  const { showToast } = useCustomToast();
  const { startLoading, stopLoading } = useLoader();
  const { profile } = useVendorProfile();
  const categories = ref<any[]>([]);
  const loading = ref(false);

  const isFoodVendor = computed(() => {
    const vendorType = (profile.value?.vendorType || '').toLowerCase();
    if (vendorType === 'restaurant' || vendorType === 'mini-mart') return true;
    if (vendorType === 'single-category') return false;
    // Fallback: check legacy fields
    const type = (profile.value?.businessType || profile.value?.storeType || '').toLowerCase();
    const category = (profile.value?.category || '').toLowerCase();
    const foodCategories = ['restaurant', 'eatery', 'snacks', 'drinks', 'bakery', 'food', 'mini-mart'];
    return foodCategories.includes(category) || type === 'food' || type === 'restaurant' || type === 'mini-mart';
  });

  const fetchCategories = async () => {
    loading.value = true;
    try {
      const api = isFoodVendor.value ? menu_items_api : products_api;
      const res = await api.getCategories();
      categories.value = res.data;
    } catch (e) { /* Error handled by axios */ }
    finally {
      loading.value = false;
    }
  };

  const createCategory = async (payload: any) => {
    startLoading('Creating category...');
    try {
      const api = isFoodVendor.value ? menu_items_api : products_api;
      const res = await api.createCategory(payload);
      showToast({
        title: "Category Created",
        message: `"${payload.name}" is now available to organize your menu.`,
        toastType: "success",
      });
      await fetchCategories();
      return res.data;
    } finally {
      stopLoading();
    }
  };

  const updateCategory = async (id: string, payload: any) => {
    startLoading('Saving category...');
    try {
      const api = isFoodVendor.value ? menu_items_api : products_api;
      const res = await api.updateCategory(id, payload);
      await fetchCategories();
      return true;
    } finally {
      stopLoading();
    }
  };

  const deleteCategory = async (id: string) => {
    startLoading('Deleting category...');
    try {
      const api = isFoodVendor.value ? menu_items_api : products_api;
      await api.deleteCategory(id);
      await fetchCategories();
      return true;
    } finally {
      stopLoading();
    }
  };

  return { categories, loading, fetchCategories, createCategory, updateCategory, deleteCategory };
};

export const useVendorAddOnGroups = () => {
  const { showToast } = useCustomToast();
  const { startLoading, stopLoading } = useLoader();
  const addOnGroups = ref<any[]>([]);
  const loading = ref(false);

  const fetchAddOnGroups = async () => {
    loading.value = true;
    try {
      const res = await menu_items_api.getAddOns();
      addOnGroups.value = res.data;
    } catch (e) { /* Error handled by axios */ }
    finally {
      loading.value = false;
    }
  };

  const createAddOnGroup = async (payload: any) => {
    startLoading('Adding your add-on group... ➕');
    try {
      const res = await menu_items_api.createAddOn(payload);
      if (res.data) {
        showToast({ title: "Add-On Group Added!", message: "Your add-on group is now live.", toastType: "success" });
        await fetchAddOnGroups();
        return res.data;
      }
    } finally { stopLoading(); }
  };

  const updateAddOnGroup = async (id: string, payload: any) => {
    startLoading('Updating add-on group... 🔄');
    try {
      await menu_items_api.updateAddOn(id, payload);
      showToast({ title: "Add-On Group Updated", message: "Changes saved.", toastType: "success" });
      await fetchAddOnGroups();
      return true;
    } finally { stopLoading(); }
  };

  const deleteAddOnGroup = async (id: string) => {
    startLoading('Removing add-on group... 🗑️');
    try {
      await menu_items_api.deleteAddOn(id);
      showToast({ title: "Add-On Group Deleted", message: "The group has been removed.", toastType: "success" });
      await fetchAddOnGroups();
      return true;
    } finally { stopLoading(); }
  };

  return { addOnGroups, loading, fetchAddOnGroups, createAddOnGroup, updateAddOnGroup, deleteAddOnGroup };
};

export const useVendorPacks = () => {
  const { showToast } = useCustomToast();
  const { startLoading, stopLoading } = useLoader();
  const packs = ref<any[]>([]);
  const loading = ref(false);

  const fetchPacks = async () => {
    loading.value = true;
    try {
      const res = await menu_items_api.getPacks();
      packs.value = res.data;
    } catch (e) { /* Error handled by axios */ }
    finally { loading.value = false; }
  };

  const createPack = async (payload: any) => {
    startLoading('Creating combo pack... 🎁');
    try {
      const res = await menu_items_api.createPack(payload);
      if (res.data) {
        showToast({ title: "Combo Pack Created!", message: "Your combo pack is ready.", toastType: "success" });
        await fetchPacks();
        return res.data;
      }
    } finally { stopLoading(); }
  };

  const updatePack = async (id: string, payload: any) => {
    startLoading('Updating combo pack... 🔄');
    try {
      await menu_items_api.updatePack(id, payload);
      showToast({ title: "Combo Pack Updated", message: "Changes saved.", toastType: "success" });
      await fetchPacks();
      return true;
    } finally { stopLoading(); }
  };

  const deletePack = async (id: string) => {
    startLoading('Removing combo pack... 🗑️');
    try {
      await menu_items_api.deletePack(id);
      showToast({ title: "Combo Pack Deleted", message: "The pack has been removed.", toastType: "success" });
      await fetchPacks();
      return true;
    } finally { stopLoading(); }
  };

  return { packs, loading, fetchPacks, createPack, updatePack, deletePack };
};

