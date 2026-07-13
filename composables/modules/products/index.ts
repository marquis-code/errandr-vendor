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
    const type = (profile.value?.businessType || profile.value?.storeType || '').toLowerCase();
    const category = (profile.value?.category || '').toLowerCase();
    const foodCategories = ['restaurant', 'eatery', 'snacks', 'drinks', 'bakery', 'food'];
    return foodCategories.includes(category) || type === 'food' || type === 'restaurant';
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

  return { products, loading, fetchProducts, createProduct, updateProduct, deleteProduct, toggleAvailability };
};

export const useVendorCategories = () => {
  const { showToast } = useCustomToast();
  const { startLoading, stopLoading } = useLoader();
  const { profile } = useVendorProfile();
  const categories = ref<any[]>([]);
  const loading = ref(false);

  const isFoodVendor = computed(() => {
    const type = (profile.value?.businessType || profile.value?.storeType || '').toLowerCase();
    const category = (profile.value?.category || '').toLowerCase();
    const foodCategories = ['restaurant', 'eatery', 'snacks', 'drinks', 'bakery', 'food'];
    return foodCategories.includes(category) || type === 'food' || type === 'restaurant';
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
