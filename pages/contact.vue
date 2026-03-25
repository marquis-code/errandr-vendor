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
          <NuxtLink to="/contact" class="text-parentPrimary border-b-2 border-parentPrimary pb-1">Contact</NuxtLink>
          <NuxtLink to="/auth/login" class="px-8 py-3 bg-gray-900 text-white rounded-2xl hover:bg-parentPrimary transition-all shadow-xl shadow-black/5">Sign In</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-40 pb-20 overflow-hidden">
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-parentPrimary/5 rounded-full blur-[100px] -translate-x-1/4"></div>
      </div>

      <div class="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-100 text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 mb-8">
          <span class="w-2 h-2 rounded-full bg-parentPrimary"></span>
          Merchant Success
        </div>
        <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-gray-900 mb-6 max-w-4xl mx-auto">
          We're here for <br />
          <span class="text-parentPrimary italic bg-parentPrimary/5 px-6 rounded-3xl">your growth.</span>
        </h1>
        <p class="text-xl text-gray-500 font-bold max-w-2xl mx-auto leading-relaxed tracking-tight">
          Dedicated support for our campus partners. From technical assistance to banking inquiries, we've got you covered.
        </p>
      </div>
    </section>

    <!-- Contact Cards -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 sm:px-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Support Card -->
          <div class="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
            <div class="w-14 h-14 bg-parentPrimary/10 rounded-2xl flex items-center justify-center text-parentPrimary mb-8 group-hover:scale-110 transition-transform">
              <Mail class="w-7 h-7" />
            </div>
            <h3 class="text-xl font-black text-gray-900 tracking-tight mb-3">Merchant Help</h3>
            <p class="text-[13px] text-gray-500 font-bold leading-relaxed mb-6">Menu updates and store configurations.</p>
            <a href="mailto:vendors@errandr.shop" class="text-sm font-black text-parentPrimary hover:underline">vendors@errandr.shop</a>
          </div>

          <!-- Payouts Card -->
          <div class="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
            <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:scale-110 transition-transform">
              <Banknote class="w-7 h-7" />
            </div>
            <h3 class="text-xl font-black text-gray-900 tracking-tight mb-3">Finance Ops</h3>
            <p class="text-[13px] text-gray-500 font-bold leading-relaxed mb-6">Payout inquiries and banking setup.</p>
            <a href="mailto:finance@errandr.shop" class="text-sm font-black text-emerald-600 hover:underline">finance@errandr.shop</a>
          </div>

          <!-- Hotline Card -->
          <div class="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
            <div class="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 transition-transform">
              <Phone class="w-7 h-7" />
            </div>
            <h3 class="text-xl font-black text-gray-900 tracking-tight mb-3">Urgent Hotline</h3>
            <p class="text-[13px] text-gray-500 font-bold leading-relaxed mb-6">Real-time order dispute resolution.</p>
            <a href="tel:+23412345678" class="text-sm font-black text-indigo-600 hover:underline">+234 (0) 901 234 567</a>
          </div>

          <!-- Partnership Card -->
          <div class="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
            <div class="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-8 group-hover:scale-110 transition-transform">
              <Handshake class="w-7 h-7" />
            </div>
            <h3 class="text-xl font-black text-gray-900 tracking-tight mb-3">Sponsorships</h3>
            <p class="text-[13px] text-gray-500 font-bold leading-relaxed mb-6">Bulk catering and featured listings.</p>
            <a href="mailto:partnerships@errandr.shop" class="text-sm font-black text-purple-600 hover:underline tracking-tight uppercase">Join Us</a>
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
          <NuxtLink to="/faq" class="hover:text-gray-900 transition-colors">FAQ</NuxtLink>
          <NuxtLink to="/contact" class="text-parentPrimary font-black">Contact</NuxtLink>
        </div>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© {{ new Date().getFullYear() }} Errandr Ltd • Scaling Entrepreneurs</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Mail, Phone, Banknote, Handshake } from 'lucide-vue-next'
definePageMeta({ layout: false })
useHead({ 
  title: 'Merchant Support - Partner with Errandr',
  meta: [{ name: 'description', content: 'Dedicated support for Errandr campus vendors. Get help with store management and payouts.' }] 
})
</script>

