import { ref } from 'vue';
import { wallets_api } from "@/api_factory/modules/wallets";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useLoader } from "@/composables/core/useLoader";

export const useWallet = () => {
  const { showToast } = useCustomToast();
  const { startLoading, stopLoading } = useLoader();
  const balance = ref(0);
  const wallet = ref<any>(null);
  const transactions = ref<any[]>([]);
  const loading = ref(false);

  const fetchWallet = async () => {
    loading.value = true;
    try {
      const res = await wallets_api.getWallet();
      wallet.value = res.data;
      balance.value = res.data.balance;
    } catch (e) { /* Error handled by axios */ }
    finally { loading.value = false; }
  };

  const fetchTransactions = async () => {
    loading.value = true;
    try {
      const res = await wallets_api.getTransactions();
      transactions.value = res.data;
    } catch (e) { /* Error handled by axios */ }
    finally { loading.value = false; }
  };

  const withdrawFunds = async (amount: number) => {
    startLoading('Processing withdrawal...');
    try {
      const res = await wallets_api.withdraw(amount);
      if (res.data) {
        showToast({
          title: "Withdrawal Successful",
          message: `₦${amount} has been queued for payout.`,
          toastType: "success",
        });
        await fetchWallet();
      }
    } finally {
      stopLoading();
    }
  };

  const updatePreferences = async (payload: any) => {
    startLoading('Saving preferences...');
    try {
      const res = await wallets_api.updatePreferences(payload);
      wallet.value = res.data;
      showToast({
        title: "Settings Updated",
        message: "Your payout preferences have been saved.",
        toastType: "success",
      });
      return res.data;
    } finally {
      stopLoading();
    }
  };

  return { balance, wallet, transactions, loading, fetchWallet, fetchTransactions, withdrawFunds, updatePreferences };
};
