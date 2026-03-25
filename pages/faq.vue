<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 scroll-smooth">
    <!-- Navbar -->
    <nav class="fixed w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100 py-4">
      <div class="max-w-7xl mx-auto px-6 sm:px-10 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <img src="@/assets/img/logo.png" alt="Errandr Logo" class="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-110" />
          <span class="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">Vendors</span>
        </NuxtLink>
        <div class="flex items-center gap-8 text-[11px] font-black tracking-widest uppercase text-gray-400">
          <NuxtLink to="/about" class="hover:text-parentPrimary transition-colors">About</NuxtLink>
          <NuxtLink to="/faq" class="text-parentPrimary border-b-2 border-parentPrimary pb-1">FAQ</NuxtLink>
          <NuxtLink to="/auth/login" class="px-8 py-3 bg-gray-900 text-white rounded-2xl hover:bg-parentPrimary transition-all shadow-xl shadow-black/5">Sign In</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-40 pb-20 overflow-hidden bg-gray-50/20">
      <div class="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-gray-100 text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 mb-8 shadow-sm">
          <HelpCircle class="w-3.5 h-3.5 text-parentPrimary" />
          Merchant Knowledge Base
        </div>
        <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-gray-900 mb-6 max-w-4xl mx-auto">
          Partner <span class="text-parentPrimary italic">Insights.</span>
        </h1>
        <p class="text-xl text-gray-500 font-bold max-w-2xl mx-auto leading-relaxed tracking-tight">
          Everything you need to know about scaling your campus business with Errandr.
        </p>
      </div>
    </section>

    <!-- FAQ Accordion -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 sm:px-10">
        <div class="space-y-4">
          <div v-for="(faq, i) in faqs" :key="i" class="group border border-gray-100 rounded-[2rem] overflow-hidden transition-all duration-500" :class="{ 'bg-gray-50/50 border-parentPrimary/20 shadow-xl shadow-parentPrimary/5': openIndex === i }">
            <button @click="openIndex = openIndex === i ? -1 : i" class="w-full flex items-center justify-between p-8 text-left outline-none">
              <span class="text-xl font-black text-gray-900 tracking-tight group-hover:text-parentPrimary transition-colors">{{ faq.q }}</span>
              <div class="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-parentPrimary transition-all" :class="{ 'rotate-180 bg-parentPrimary text-white border-transparent': openIndex === i }">
                <ChevronDown class="w-5 h-5" />
              </div>
            </button>
            <transition name="fade">
              <div v-show="openIndex === i" class="px-8 pb-8">
                <div class="h-px bg-gray-200/50 mb-6"></div>
                <p class="text-lg text-gray-500 font-bold leading-relaxed tracking-tight">{{ faq.a }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-50 border-t border-gray-100 py-16 mt-20">
      <div class="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row justify-between items-center gap-10">
        <NuxtLink to="/" class="group">
           <img src="@/assets/img/logo.png" alt="Errandr Logo" class="h-10 w-auto object-contain transition-transform group-hover:scale-110" />
        </NuxtLink>
        <div class="flex items-center gap-10 text-[10px] font-black tracking-[0.15em] uppercase text-gray-400">
          <NuxtLink to="/about" class="hover:text-gray-900 transition-colors">About Us</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-gray-900 transition-colors">Terms</NuxtLink>
          <NuxtLink to="/faq" class="text-parentPrimary font-black">FAQ</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-gray-900 transition-colors">Contact</NuxtLink>
        </div>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© {{ new Date().getFullYear() }} Errandr Ltd • Join the Movement</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { HelpCircle, ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'
definePageMeta({ layout: false })
useHead({ 
  title: 'Merchant FAQ - Scale with Errandr',
  meta: [{ name: 'description', content: 'Frequently asked questions for vendors on the Errandr campus delivery platform.' }] 
})

const openIndex = ref(0)
const faqs = [
  { q: 'Registration & Activation', a: 'Join in 3 steps: Personal details, Store Profile, and Logo upload. Accounts are typically verified within 24 hours to ensure high-quality campus standards.' },
  { q: 'Service Fees & Commissions', a: 'Listing is free. We only succeed when you do — Errandr takes a small commission per order to fuel logistics and student marketing. No hidden monthly fees.' },
  { q: 'Automated 24h Payouts', a: 'Earnings are automatically settled every 24 hours. Track every Naira via your pro dashboard with transparent reporting across all campus locations.' },
  { q: 'Menu & Inventory Control', a: 'Total autonomy. Upload photos, set dynamic pricing, and toggle item availability in real-time. We even support bulk CSV uploads for large menus.' },
  { q: 'Rider & Logistics Flow', a: 'Zero overhead. When an order is ready, our network of student riders is instantly notified. We handle the 15-minute campus dash while you focus on the cooking.' },
  { q: 'Operating Hours', a: 'You set the schedule. Open and close your digital storefront manually or use the automated scheduler to match your kitchen operating times.' }
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

