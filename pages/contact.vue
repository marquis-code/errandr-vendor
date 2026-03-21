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
      <h1 class="text-4xl font-black text-gray-900 tracking-tight mb-2">Vendor Support</h1>
      <p class="text-lg text-gray-500 mb-10">Get help with your store, orders, payouts, or menu management.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <div class="w-12 h-12 bg-[#065fdb]/10 rounded-xl flex items-center justify-center text-[#065fdb] mb-4"><Mail class="w-6 h-6" /></div>
          <h3 class="font-bold text-gray-900 text-lg mb-2">Vendor Help Desk</h3>
          <p class="text-gray-500 text-sm mb-4">For menu updates, store settings, and general platform support.</p>
          <a href="mailto:vendors@errandr.com" class="text-[#065fdb] font-bold text-sm hover:underline">vendors@errandr.com</a>
        </div>
        <div class="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4"><Phone class="w-6 h-6" /></div>
          <h3 class="font-bold text-gray-900 text-lg mb-2">Urgent Order Issues</h3>
          <p class="text-gray-500 text-sm mb-4">For active order disputes, cancellations, or rider no-shows.</p>
          <a href="tel:+2341234567891" class="text-[#065fdb] font-bold text-sm hover:underline">+234 123 456 7891</a>
        </div>
        <div class="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-4"><Banknote class="w-6 h-6" /></div>
          <h3 class="font-bold text-gray-900 text-lg mb-2">Payout & Finance</h3>
          <p class="text-gray-500 text-sm mb-4">For payout delays, settlement discrepancies, or bank account changes.</p>
          <a href="mailto:finance@errandr.com" class="text-[#065fdb] font-bold text-sm hover:underline">finance@errandr.com</a>
        </div>
        <div class="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4"><Handshake class="w-6 h-6" /></div>
          <h3 class="font-bold text-gray-900 text-lg mb-2">Partnerships</h3>
          <p class="text-gray-500 text-sm mb-4">For bulk catering, sponsored listings, or featured store placements.</p>
          <a href="mailto:partnerships@errandr.com" class="text-[#065fdb] font-bold text-sm hover:underline">partnerships@errandr.com</a>
        </div>
      </div>
    </main>
    <footer class="bg-gray-50 border-t border-gray-200 py-8"><div class="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 font-medium"><p>&copy; {{ new Date().getFullYear() }} Errandr Inc.</p><div class="flex items-center gap-6"><NuxtLink to="/about" class="hover:text-gray-600">About</NuxtLink><NuxtLink to="/contact" class="hover:text-gray-600">Contact</NuxtLink><NuxtLink to="/faq" class="hover:text-gray-600">FAQ</NuxtLink><NuxtLink to="/terms" class="hover:text-gray-600">Terms</NuxtLink></div></div></footer>
  </div>
</template>
<script setup lang="ts">
import { Store, Mail, Phone, Banknote, Handshake } from 'lucide-vue-next'
definePageMeta({ layout: false })
useHead({ title: 'Contact Support - Errandr Vendors' })
</script>
