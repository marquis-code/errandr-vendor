<template>
  <footer class="bg-[#050505] text-white relative overflow-hidden">
    <!-- Ambient Background Glows -->
    <div class="absolute top-0 left-1/4 w-[800px] h-[400px] bg-parentPrimary/10 rounded-[100%] blur-[120px] pointer-events-none -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-[100%] blur-[150px] pointer-events-none translate-y-1/4"></div>

    <div class="max-w-7xl mx-auto px-6 sm:px-10 pt-32 pb-12 relative z-10">
      
      <!-- Massive CTA Section -->
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-32">
        <div class="max-w-3xl">
          <h2 class="text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.85] mb-6">
            Ready to <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Scale Up?</span>
          </h2>
          <p class="text-xl md:text-2xl text-gray-400 font-medium tracking-tight">
            Join the fastest-growing campus delivery network today.
          </p>
        </div>
        
        <NuxtLink to="/auth/register" class="group relative px-10 py-3 bg-white text-gray-950 rounded-full font-black text-lg overflow-hidden flex-shrink-0 transition-transform hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]">
          <span class="relative z-10 flex items-center gap-3">
            Open Storefront <ArrowUpRight class="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </span>
          <div class="absolute inset-0 bg-gray-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
        </NuxtLink>
      </div>

      <!-- Divider -->
      <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-20"></div>

      <!-- Main Footer Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
        
        <!-- Brand Column -->
        <div class="md:col-span-5 flex flex-col items-start">
          <NuxtLink to="/" class="flex items-center gap-4 mb-8 group cursor-pointer">
            <!-- <div class="bg-white/5 p-2 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors">
              <img src="@/assets/img/logo.png" alt="Erranders Logo" class="h-10 w-auto object-contain brightness-0 invert" />
            </div> -->
            <span class="text-2xl font-black tracking-tighter">Erranders Business</span>
          </NuxtLink>
          <p class="text-gray-400 text-base font-medium leading-relaxed mb-10 max-w-sm">
            Providing vendors with powerful digital infrastructure to dominate campus food delivery and logistics.
          </p>
          <div class="flex items-center gap-4">
            <a href="#" class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-parentPrimary hover:bg-parentPrimary/20 hover:shadow-[0_0_20px_rgba(6,95,219,0.4)] transition-all duration-300">
              <Twitter class="w-5 h-5"/>
            </a>
            <a href="#" class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-pink-500 hover:bg-pink-500/20 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300">
              <Instagram class="w-5 h-5"/>
            </a>
            <a href="#" class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
              <Facebook class="w-5 h-5"/>
            </a>
          </div>
        </div>
        
        <!-- Links Columns -->
        <div class="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
          <div>
            <h4 class="font-black text-white mb-8  text-sm uppercase opacity-50">Platform</h4>
            <ul class="space-y-5 text-base font-bold text-gray-400">
              <li><NuxtLink to="/about" class="hover:text-white transition-colors relative group w-fit"><span class="relative z-10">About Us</span><span class="absolute left-0 bottom-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span></NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-white transition-colors relative group w-fit"><span class="relative z-10">Contact Sales</span><span class="absolute left-0 bottom-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span></NuxtLink></li>
              <li><NuxtLink to="/faq" class="hover:text-white transition-colors relative group w-fit"><span class="relative z-10">Knowledge Base</span><span class="absolute left-0 bottom-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span></NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="font-black text-white mb-8  text-sm uppercase opacity-50">Legal</h4>
            <ul class="space-y-5 text-base font-bold text-gray-400">
              <li><NuxtLink to="/terms" class="hover:text-white transition-colors relative group w-fit"><span class="relative z-10">Vendor Agreement</span><span class="absolute left-0 bottom-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span></NuxtLink></li>
              <li><NuxtLink to="/terms" class="hover:text-white transition-colors relative group w-fit"><span class="relative z-10">Privacy Policy</span><span class="absolute left-0 bottom-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span></NuxtLink></li>
            </ul>
          </div>
          
          <div class="col-span-2 sm:col-span-1">
            <h4 class="font-black text-white mb-8  text-sm uppercase opacity-50">Ecosystem</h4>
            <ul class="space-y-5 text-base font-bold text-gray-400">
              <li>
                <a href="https://erranders.org" target="_blank" class="group flex items-center gap-3 hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 -ml-3">
                  <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors"><Utensils class="w-4 h-4" /></div>
                  Order Food
                </a>
              </li>
              <li>
                <a href="https://dispatch.erranders.org" target="_blank" class="group flex items-center gap-3 hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 -ml-3">
                  <div class="w-8 h-8 rounded-full bg-parentPrimary/20 flex items-center justify-center text-parentPrimary group-hover:bg-parentPrimary group-hover:text-white transition-colors"><Bike class="w-4 h-4" /></div>
                  Become a Rider
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p class="text-sm font-medium text-gray-500 ">
          &copy; {{ new Date().getFullYear() }} Erranders Inc. All rights reserved.
        </p>
        <div class="flex items-center gap-2 text-sm font-medium text-gray-500">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          All Systems Operational
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Twitter, Instagram, Facebook, Utensils, Bike, ArrowUpRight } from 'lucide-vue-next'
</script>
