import { ref, reactive } from 'vue';
import { products_api } from "@/api_factory/modules/products";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useLoader } from "@/composables/core/useLoader";

export const useVendorProducts = () => {
  const { showToast } = useCustomToast();
  const { startLoading, stopLoading } = useLoader();
  const products = ref<any[]>([]);
  const loading = ref(false);

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const res = await products_api.getProducts();
      products.value = res.data;
    } catch (e) { /* Error handled by axios */ }
    finally {
      loading.value = false;
    }
  };

  const createProduct = async (payload: any) => {
    startLoading('Adding your meal to the menu... 🥘');
    try {
      const res = await products_api.createProduct(payload);
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
    startLoading('Saving changes... ✍️');
    try {
      await products_api.updateProduct(id, payload);
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
    startLoading('Removing item... 🗑️');
    try {
      await products_api.deleteProduct(id);
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
      await products_api.toggleAvailability(id);
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
  const categories = ref<any[]>([]);
  const loading = ref(false);

  const fetchCategories = async () => {
    loading.value = true;
    try {
      const res = await products_api.getCategories();
      categories.value = res.data;
    } catch (e) { /* Error handled by axios */ }
    finally {
      loading.value = false;
    }
  };

  const createCategory = async (payload: { name: string; description?: string; image?: string }) => {
    startLoading('Creating category... 📁');
    try {
      const res = await products_api.createCategory(payload);
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
    startLoading('Updating... 🔄');
    try {
      await products_api.updateCategory(id, payload);
      await fetchCategories();
      return true;
    } finally {
      stopLoading();
    }
  };

  const deleteCategory = async (id: string) => {
    startLoading('Deleting... 🗑️');
    try {
      await products_api.deleteCategory(id);
      await fetchCategories();
      return true;
    } finally {
      stopLoading();
    }
  };

  return { categories, loading, fetchCategories, createCategory, updateCategory, deleteCategory };
};
