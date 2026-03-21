<template>
  <div class="min-h-screen bg-white">
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2"><div class="w-8 h-8 rounded-lg bg-[#065fdb] flex items-center justify-center"><Store class="w-4 h-4 text-white" /></div><span class="text-lg font-black text-gray-900 tracking-tight">Errandr <span class="text-gray-400 font-medium text-sm">Vendors</span></span></NuxtLink>
        <div class="flex items-center gap-6 text-sm font-semibold text-gray-500">
          <NuxtLink to="/about" class="hover:text-[#065fdb]">About</NuxtLink><NuxtLink to="/contact" class="hover:text-[#065fdb]">Contact</NuxtLink><NuxtLink to="/faq" class="hover:text-[#065fdb]">FAQ</NuxtLink><NuxtLink to="/terms" class="hover:text-[#065fdb]">Terms</NuxtLink>
        </div>
      </div>
    </nav>
    <main class="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 class="text-4xl font-black text-gray-900 tracking-tight mb-2">Vendor FAQ</h1>
      <p class="text-lg text-gray-500 mb-10">Common questions about selling on Errandr.</p>
      <div class="space-y-6">
        <div v-for="(faq, i) in faqs" :key="i" class="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
          <button @click="openIndex = openIndex === i ? -1 : i" class="w-full flex items-center justify-between p-6 text-left">
            <span class="font-bold text-gray-900">{{ faq.q }}</span>
            <ChevronDown class="w-5 h-5 text-gray-400 transition-transform" :class="{ 'rotate-180': openIndex === i }" />
          </button>
          <div v-show="openIndex === i" class="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{{ faq.a }}</div>
        </div>
      </div>
    </main>
    <footer class="bg-gray-50 border-t border-gray-200 py-8"><div class="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 font-medium"><p>&copy; {{ new Date().getFullYear() }} Errandr Inc.</p><div class="flex items-center gap-6"><NuxtLink to="/about" class="hover:text-gray-600">About</NuxtLink><NuxtLink to="/contact" class="hover:text-gray-600">Contact</NuxtLink><NuxtLink to="/faq" class="hover:text-gray-600">FAQ</NuxtLink><NuxtLink to="/terms" class="hover:text-gray-600">Terms</NuxtLink></div></div></footer>
  </div>
</template>
<script setup lang="ts">
import { Store, ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'
definePageMeta({ layout: false })
useHead({ title: 'Vendor FAQ - Errandr' })
const openIndex = ref(0)
const faqs = [
  { q: 'How do I register my store on Errandr?', a: 'Click "Open Your Store" and complete our 3-step registration process. You will provide your personal details, business information (name, category, address), and upload your store logo. Your store will be reviewed and approved within 24–48 hours.' },
  { q: 'Is there a fee to list my store?', a: 'No, listing your store is completely free. Errandr charges a small commission (typically 5–10%) on each successful order to cover platform and payment processing costs.' },
  { q: 'How do I manage my menu?', a: 'Once approved, log into your merchant dashboard. Navigate to the Products section to add, edit, or remove menu items. You can upload photos, set prices, mark items as available/unavailable, and organize by categories.' },
  { q: 'When do I receive payouts?', a: 'Payouts are processed automatically every 24 hours for completed orders. Funds are transferred to the bank account you registered during signup. You can track all payouts from your Wallet page.' },
  { q: 'What happens if a rider does not pick up my order?', a: 'If a rider does not arrive within the expected timeframe, the order is automatically reassigned. You can also contact our Vendor Help Desk for immediate assistance with stuck orders.' },
  { q: 'Can I set my own operating hours?', a: 'Yes, you have full control over your operating hours. Set your opening and closing times from your dashboard settings. Orders will only be accepted during your active hours.' },
  { q: 'Can I offer pre-orders?', a: 'Absolutely. Enable pre-order mode from your settings to accept orders in advance. You can set lead time requirements and specify which days you accept pre-orders.' },
  { q: 'How do I handle customer complaints?', a: 'Customer complaints are routed through our support system. You will be notified of any complaint related to your store and given the opportunity to respond. Repeated complaints may affect your store rating.' },
]
</script>
