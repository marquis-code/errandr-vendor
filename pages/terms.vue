<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 scroll-smooth">
    <!-- Navbar -->
    <nav class="fixed w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100 py-4">
      <div class="max-w-7xl mx-auto px-6 sm:px-10 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <img src="@/assets/img/logo.png" alt="Errandr Logo" class="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-110" />
          <span class="text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">Vendors</span>
        </NuxtLink>
        <div class="flex items-center gap-8 text-[11px] font-black tracking-widest uppercase">
          <NuxtLink to="/about" class="text-gray-400 hover:text-parentPrimary transition-colors">About</NuxtLink>
          <NuxtLink to="/terms" class="text-parentPrimary border-b-2 border-parentPrimary pb-1">Terms</NuxtLink>
          <NuxtLink to="/auth/login" class="px-8 py-3 bg-gray-900 text-white rounded-2xl hover:bg-parentPrimary transition-all shadow-xl shadow-black/5">Sign In</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-40 pb-20 overflow-hidden bg-gray-50/30">
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-parentPrimary/5 rounded-full blur-[120px] translate-x-1/4"></div>
      </div>

      <div class="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-gray-100 text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 mb-8 shadow-sm">
          <Gavel class="w-3.5 h-3.5 text-parentPrimary" />
          Merchant Agreement
        </div>
        <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-gray-900 mb-6 max-w-4xl mx-auto">
          Vendor <span class="text-parentPrimary italic">Framework.</span>
        </h1>
        <p class="text-[11px] font-black text-gray-400 tracking-[0.2em] uppercase">Last updated: January 26, 2026</p>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 sm:px-10">
        <div class="space-y-16">
          <div v-for="(section, index) in termsSections" :key="index" class="group">
            <div class="flex gap-8">
              <span class="text-4xl font-black text-parentPrimary/10 group-hover:text-parentPrimary/20 transition-colors tabular-nums">
                {{ (index + 1).toString().padStart(2, '0') }}
              </span>
              <div class="space-y-4 text-left">
                <h2 class="text-2xl font-black text-gray-900 tracking-tight">{{ section.title }}</h2>
                <div class="text-lg text-gray-500 font-bold leading-relaxed tracking-tight" v-html="section.content"></div>
              </div>
            </div>
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
          <NuxtLink to="/terms" class="text-parentPrimary font-black">Terms</NuxtLink>
          <NuxtLink to="/faq" class="hover:text-gray-900 transition-colors">FAQ</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-gray-900 transition-colors">Contact</NuxtLink>
        </div>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© {{ new Date().getFullYear() }} Errandr Ltd • Join the Movement</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Gavel } from 'lucide-vue-next'
definePageMeta({ layout: false })
useHead({ 
  title: 'Vendor Agreement - Errandr Business',
  meta: [{ name: 'description', content: 'Legal framework and guidelines for merchants on the Errandr campus delivery platform.' }] 
})

const termsSections = [
  {
    title: "Merchant Relationship",
    content: "By registering as a Vendor, you enter into a service agreement with Errandr Technologies Ltd. You operate as an independent merchant, retaining full control over your menu, pricing, and operating hours."
  },
  {
    title: "Safety & Quality",
    content: "Vendors are solely responsible for ensuring all products meet health and safety standards. Maintain proper handling and storage. Errandr reserves the right to suspend accounts based on consistent quality reports."
  },
  {
    title: "Commissions & Fees",
    content: "Errandr charges a standard commission on completed orders. Rates are communicated during registration and may be updated with 30 days written notice to the merchant."
  },
  {
    title: "Payout Workflow",
    content: "Earnings (revenue minus commission) are settled automatically on a rolling 24-hour basis to your verified bank account. Data transparency is available via the merchant dashboard."
  },
  {
    title: "Menu Accuracy",
    content: "You agree to keep listings current. This includes pricing, descriptions, allergens, and availability. Misleading data may result in temporary store suspension."
  },
  {
    title: "Order Fulfillment",
    content: "Once an order is accepted, preparation must occur within the estimated window. Consistent delays or cancellations impact store visibility and rating."
  },
  {
    title: "Termination Clause",
    content: "Either party may terminate this agreement with 7 days written notice. Serious violations including health breaches or fraud result in immediate account termination."
  },
  {
    title: "Merchant Contact",
    content: "For legal inquiries or account disputes, contact <a href='mailto:legal@errandr.shop' class='text-parentPrimary hover:underline'>legal@errandr.shop</a>."
  }
]
</script>

