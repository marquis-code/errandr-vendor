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
      <h1 class="text-4xl font-black text-gray-900 tracking-tight mb-2">Vendor Agreement</h1>
      <p class="text-sm text-gray-400 mb-10">Last updated: January 15, 2026</p>
      <div class="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-8">
        <section>
          <h2 class="text-xl font-bold text-gray-900">1. Vendor Relationship</h2>
          <p>By registering as a Vendor on the Errandr platform, you enter into a service agreement with Errandr Technologies Ltd. Vendors operate as independent merchants, not as employees, agents, or franchisees of Errandr. You retain full control over your menu, pricing, and operating hours.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-gray-900">2. Food Safety & Quality</h2>
          <p>Vendors are solely responsible for ensuring that all food products meet applicable health and safety standards. You must maintain proper food handling, storage, and preparation practices. Errandr reserves the right to suspend any Vendor found to be in violation of food safety regulations or whose food quality falls below acceptable standards as determined by customer reviews and reports.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-gray-900">3. Commissions & Fees</h2>
          <p>Errandr charges a commission on each completed order. The standard commission rate is communicated during registration and may vary based on vendor category and promotional agreements. Commission rates may be updated with 30 days written notice.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-gray-900">4. Payouts</h2>
          <p>Vendor earnings (order revenue minus commission) are settled automatically on a rolling 24-hour basis to the bank account provided during registration. Errandr is not liable for delays caused by banking institutions. Vendors may view detailed settlement reports from their merchant dashboard.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-gray-900">5. Menu Accuracy</h2>
          <p>You agree to keep your menu listings accurate and up to date. This includes prices, descriptions, portion sizes, allergen information, and item availability. Misleading listings may result in account warnings or suspension.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-gray-900">6. Order Fulfillment</h2>
          <p>Upon accepting an order, you agree to prepare it within the estimated preparation time. Consistently failing to meet preparation times or canceling accepted orders may negatively impact your store's visibility and rating on the platform.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-gray-900">7. Termination</h2>
          <p>Either party may terminate this agreement at any time with 7 days written notice. Errandr reserves the right to immediately suspend or terminate a Vendor account for serious violations including food safety breaches, fraudulent activity, or sustained poor customer ratings. Outstanding payouts will be settled within 14 business days of termination.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-gray-900">8. Contact</h2>
          <p>For questions about this agreement, please contact <a href="mailto:legal@errandr.com" class="text-[#065fdb] font-bold hover:underline">legal@errandr.com</a>.</p>
        </section>
      </div>
    </main>
    <footer class="bg-gray-50 border-t border-gray-200 py-8"><div class="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 font-medium"><p>&copy; {{ new Date().getFullYear() }} Errandr Inc.</p><div class="flex items-center gap-6"><NuxtLink to="/about" class="hover:text-gray-600">About</NuxtLink><NuxtLink to="/contact" class="hover:text-gray-600">Contact</NuxtLink><NuxtLink to="/faq" class="hover:text-gray-600">FAQ</NuxtLink><NuxtLink to="/terms" class="hover:text-gray-600">Terms</NuxtLink></div></div></footer>
  </div>
</template>
<script setup lang="ts">
import { Store } from 'lucide-vue-next'
definePageMeta({ layout: false })
useHead({ title: 'Vendor Agreement - Errandr' })
</script>
