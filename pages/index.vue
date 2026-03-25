<template>
 <div class="min-h-screen bg-white font-sans text-gray-900 scroll-smooth">
 <!-- Navbar -->
 <nav class="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300" :class="{'py-4': !scrolled, 'py-3 shadow-sm': scrolled}">
 <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div class="flex justify-between items-center">
  <div class="flex items-center gap-4 group cursor-pointer" @click="router.push('/')">
  <img src="@/assets/img/logo.png" alt="Errandr Logo" class="h-10 lg:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
  <span class="text-2xl font-black text-parentPrimary tracking-tighter">For Vendors</span>
  </div>
 
 <div class="hidden md:flex items-center gap-8">
 <a href="#features" class="text-sm font-semibold text-gray-600 hover:text-parentPrimary transition-colors">Features</a>
 <a href="#success" class="text-sm font-semibold text-gray-600 hover:text-parentPrimary transition-colors">Success Stories</a>
 <a href="#growth" class="text-sm font-semibold text-gray-600 hover:text-parentPrimary transition-colors">Growth</a>
 </div>

 <div class="flex items-center gap-4">
 <NuxtLink to="/auth/login" class="hidden md:flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-parentPrimary transition-colors">
 <LogIn class="w-4 h-4" /> Log in
 </NuxtLink>
 <NuxtLink to="/auth/register" class="px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2">
 Open Store <ArrowRight class="w-4 h-4" />
 </NuxtLink>
 </div>
 </div>
 </div>
 </nav>

 <!-- Hero Section -->
 <section class="relative pt-32 pb-24 lg:pt-56 lg:pb-40 overflow-hidden bg-white">
  <!-- Ambient Background -->
  <div class="absolute inset-0 z-0">
  <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-parentPrimary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
  <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
  </div>
  
  <div class="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
  <div class="max-w-3xl">
  <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-parentPrimary/5 border border-parentPrimary/10 text-parentPrimary text-[11px] font-black tracking-widest uppercase mb-10 shadow-sm">
  <Sparkles class="w-4 h-4" />
  Empowering 500+ Campus Businesses
  </div>
  <h1 class="text-6xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] mb-10 text-gray-900">
  Fuel the <br />
  <span class="text-parentPrimary relative inline-block">
  Campus.
  <svg class="absolute -bottom-2 left-0 w-full h-4 text-parentPrimary/20" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 Q50 20 100 10" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/></svg>
  </span>
  <br />
  Earn More.
  </h1>
  <p class="text-[19px] text-gray-500 font-bold mb-12 leading-relaxed max-w-xl">
  Join the most powerful commerce network on campus. Reach thousands of students, manage orders in real-time, and scale your kitchen with Errandr.
  </p>
  
  <div class="flex flex-col sm:flex-row items-center gap-6">
  <NuxtLink to="/auth/register" class="w-full sm:w-auto px-12 py-6 bg-gray-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-parentPrimary transition-all text-center flex items-center justify-center gap-3 group active:scale-95">
  Launch My Store
  <ArrowRight class="w-5 h-5 group-hover:translate-x-2 transition-transform" />
  </NuxtLink>
  <a href="#features" class="w-full sm:w-auto px-10 py-6 bg-white border border-gray-100 text-gray-700 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-sm hover:border-parentPrimary/30 transition-all text-center flex items-center justify-center gap-3 active:scale-95">
  <PlayCircle class="w-5 h-5 text-gray-400" />
  How It Works
  </a>
  </div>
  
  <div class="mt-16 flex items-center gap-10 border-t border-gray-100 pt-10">
  <div class="group/stat">
  <p class="text-4xl font-black text-gray-900 mb-1 group-hover/stat:text-parentPrimary transition-colors">50+</p>
  <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 pt-1 border-t-2 border-transparent group-hover/stat:border-parentPrimary transition-all">
  <Store class="w-3 h-3 text-parentPrimary"/> Active Hubs
  </p>
  </div>
  <div class="w-px h-12 bg-gray-100"></div>
  <div class="group/stat">
  <p class="text-4xl font-black text-gray-900 mb-1 group-hover/stat:text-emerald-500 transition-colors">10k+</p>
  <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 pt-1 border-t-2 border-transparent group-hover/stat:border-emerald-500 transition-all">
  <TrendingUp class="w-3 h-3 text-emerald-500"/> Orders Monthly
  </p>
  </div>
  </div>
  </div>
  
  <div class="relative hidden lg:block py-10">
  <div class="absolute -inset-10 bg-parentPrimary/10 blur-[100px] rounded-full animate-pulse-slow"></div>
  <div class="relative z-10 bg-white rounded-[4rem] shadow-[0_48px_96px_-16px_rgba(0,0,0,0.15)] border border-gray-50 p-3 transform perspective-[1000px] rotate-y-2 hover:rotate-0 transition-all duration-1000 group">
  <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=800&fit=crop" alt="Restaurant Kitchen" class="rounded-[3.5rem] object-cover h-[650px] w-full" />
  
  <!-- Real-time Order Overlay -->
  <div class="absolute -left-16 bottom-32 bg-white/90 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50 max-w-[280px] z-20 animate-float">
  <div class="flex items-center gap-5 mb-6">
  <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner border border-emerald-100/50">
  <Wallet class="w-7 h-7" />
  </div>
  <div>
  <p class="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">Live Profit</p>
  <p class="text-2xl font-black text-gray-900 tracking-tight">₦ 42,500</p>
  </div>
  </div>
  <div class="space-y-3 pt-4 border-t border-gray-50">
  <div class="flex items-center justify-between">
  <span class="text-[9px] font-black text-gray-400 uppercase">Success Rate</span>
  <span class="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">98%</span>
  </div>
  </div>
  </div>

  <!-- Floating Dashboard Tooltip -->
  <div class="absolute -right-10 top-20 bg-gray-900 p-6 rounded-[2rem] shadow-2xl border border-white/10 max-w-[220px] z-20 animate-float-slow">
  <div class="flex items-center gap-3 mb-3">
  <div class="w-2 h-2 rounded-full bg-parentPrimary animate-ping"></div>
  <p class="text-[10px] font-black text-white uppercase tracking-widest">New Order</p>
  </div>
  <p class="text-xs font-bold text-gray-400 leading-tight">Mavise Jollof <br />(Hostel B Drop-off)</p>
  </div>
  </div>
  </div>
  </div>
  </div>
 </section>

 <!-- Interactive Carousel: Success Stories / Testimonials -->
 <section id="success" class="py-32 bg-white overflow-hidden border-t border-gray-100">
 <div class="max-w-7xl mx-auto px-6 sm:px-10">
 <div class="flex items-center gap-4 mb-20">
 <div class="h-px flex-1 bg-gray-100"></div>
 <h2 class="text-xs font-black text-gray-400 tracking-[0.4em] uppercase">Trusted by the best</h2>
 <div class="h-px flex-1 bg-gray-100"></div>
 </div>
 
 <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
 <div v-for="(story, idx) in successStories" :key="idx" class="group relative">
 <div class="absolute -inset-4 bg-parentPrimary opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-700"></div>
 <div class="relative bg-gray-50 p-12 rounded-[4rem] border border-gray-100 group-hover:bg-white group-hover:border-parentPrimary/20 transition-all duration-700 h-full flex flex-col justify-between shadow-sm hover:shadow-2xl hover:shadow-parentPrimary/5">
 <div>
 <Quote class="w-16 h-16 text-parentPrimary/10 mb-10 group-hover:text-parentPrimary/20 transition-colors" />
 <p class="text-2xl text-gray-900 font-black leading-[1.3] mb-12 tracking-tight italic">"{{ story.quote }}"</p>
 </div>
 <div class="flex items-center gap-6 mt-auto">
 <img :src="story.image" class="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500" alt="Vendor Owner" />
 <div>
 <h4 class="text-lg font-black text-gray-900">{{ story.name }}</h4>
 <p class="text-[10px] font-black text-parentPrimary uppercase tracking-widest mt-1 flex items-center gap-2">
 <Store class="w-3.5 h-3.5" /> {{ story.restaurant }}
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 <!-- Features Section -->
 <section id="features" class="py-32 bg-gray-50 border-y border-gray-100">
 <div class="max-w-7xl mx-auto px-6 sm:px-10">
 <div class="flex flex-col md:flex-row items-end justify-between mb-24 gap-10 text-center md:text-left">
 <div class="max-w-2xl">
 <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-600 text-[10px] font-black tracking-widest uppercase mb-8 shadow-sm">
 <Zap class="w-4 h-4" /> Professional Grade
 </div>
 <h2 class="text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-[0.95]">Built specifically for <br /><span class="text-parentPrimary italic">campus kitchens.</span></h2>
 </div>
 <p class="text-gray-500 font-bold text-lg max-w-sm mb-2 leading-relaxed">Every tool you need to scale your student food business from zero to 1,000 orders.</p>
 </div>
 
 <div class="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
 <div class="group bg-white p-12 rounded-[4rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-parentPrimary/30 transition-all duration-500 hover:-translate-y-3">
 <div class="w-24 h-24 bg-parentPrimary/10 rounded-[2rem] flex items-center justify-center text-parentPrimary border border-parentPrimary/20 mb-12 group-hover:scale-110 group-hover:bg-parentPrimary group-hover:text-white group-hover:rotate-6 transition-all duration-700 shadow-xl shadow-parentPrimary/5">
 <LineChart class="w-12 h-12" />
 </div>
 <h3 class="text-2xl font-black text-gray-900 tracking-tighter mb-5">Order Engine</h3>
 <p class="text-gray-500 font-bold leading-relaxed tracking-tight">Accept, prepare, and dispatch orders with a single tap. High-contrast dashboard designed for the heat of the kitchen.</p>
 </div>
 
 <div class="group bg-white p-12 rounded-[4rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-emerald-400 transition-all duration-500 hover:-translate-y-3">
 <div class="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 border border-emerald-100 mb-12 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white group-hover:-rotate-6 transition-all duration-700 shadow-xl shadow-emerald-500/5">
 <Wallet class="w-12 h-12" />
 </div>
 <h3 class="text-2xl font-black text-gray-900 tracking-tighter mb-5">Instant Payouts</h3>
 <p class="text-gray-500 font-bold leading-relaxed tracking-tight">Withdraw your profit instantly to any local bank account. No waiting periods, just pure revenue in your pocket.</p>
 </div>

 <div class="group bg-white p-12 rounded-[4rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-blue-400 transition-all duration-500 hover:-translate-y-3">
 <div class="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 border border-blue-100 mb-12 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 shadow-xl shadow-blue-600/5">
 <TrendingUp class="w-12 h-12" />
 </div>
 <h3 class="text-2xl font-black text-gray-900 tracking-tighter mb-5">Growth Shield</h3>
 <p class="text-gray-500 font-bold leading-relaxed tracking-tight">Identify peak hours and top-selling meals. Our analytics help you zero out waste and double your daily revenue.</p>
 </div>
 </div>
 </div>
 </section>

 <!-- Banner -->
 <section class="py-16 bg-gray-900 overflow-hidden relative">
 <div class="absolute inset-0 z-0 flex whitespace-nowrap opacity-[0.03] font-black text-8xl text-white overflow-hidden items-center pointer-events-none gap-8">
 SELL MORE WITH ERRANDR • SELL MORE WITH ERRANDR • SELL MORE WITH ERRANDR
 </div>
 <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
 <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
 <Rocket class="w-8 h-8 text-white" />
 </div>
 <h2 class="text-3xl md:text-5xl font-black text-white tracking-tighter mb-8 max-w-2xl">Ready to bring your menu to the digital campus?</h2>
 <NuxtLink to="/auth/register" class="inline-flex items-center gap-2 px-10 py-5 bg-white text-gray-900 rounded-2xl font-black shadow-xl hover:-translate-y-1 transition-all text-lg">
 Setup Your Store in 5 Mins <ArrowRight class="w-5 h-5"/>
 </NuxtLink>
 </div>
 </section>

 <!-- Footer -->
 <footer class="bg-white border-t border-gray-100 py-16">
 <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
 <div class="md:col-span-1">
  <NuxtLink to="/" class="flex items-center gap-4 mb-8 group cursor-pointer">
  <img src="@/assets/img/logo.png" alt="Errandr Logo" class="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
  <span class="text-xl font-black text-parentPrimary tracking-tighter">For Vendors</span>
  </NuxtLink>
  <p class="text-gray-500 text-[13px] font-bold leading-relaxed mb-10 max-w-xs">Empowering campus kitchens with powerful technology and access to a massive student audience.</p>
 <div class="flex items-center gap-4">
 <a href="#" class="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-parentPrimary hover:border-parentPrimary transition-colors shadow-sm">
 <Twitter class="w-4 h-4"/>
 </a>
 <a href="#" class="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-parentPrimary hover:border-parentPrimary transition-colors shadow-sm">
 <Instagram class="w-4 h-4"/>
 </a>
 <a href="#" class="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-parentPrimary hover:border-parentPrimary transition-colors shadow-sm">
 <Facebook class="w-4 h-4"/>
 </a>
 </div>
 </div>
 
 <div>
 <h4 class="font-bold text-gray-900 mb-6 tracking-wider text-xs">Platform</h4>
 <ul class="space-y-4 text-sm font-medium text-gray-500">
 <li><NuxtLink to="/about" class="hover:text-parentPrimary transition-colors">About Us</NuxtLink></li>
 <li><NuxtLink to="/contact" class="hover:text-parentPrimary transition-colors">Contact Sales</NuxtLink></li>
 <li><NuxtLink to="/faq" class="hover:text-parentPrimary transition-colors">Vendor FAQ</NuxtLink></li>
 </ul>
 </div>

 <div>
 <h4 class="font-bold text-gray-900 mb-6 tracking-wider text-xs">Legal</h4>
 <ul class="space-y-4 text-sm font-medium text-gray-500">
 <li><NuxtLink to="/terms" class="hover:text-parentPrimary transition-colors">Merchant Agreement</NuxtLink></li>
 <li><NuxtLink to="/terms" class="hover:text-parentPrimary transition-colors">Privacy Policy</NuxtLink></li>
 </ul>
 </div>
 
 <div>
 <h4 class="font-bold text-gray-900 mb-6 tracking-wider text-xs">Errandr Network</h4>
 <ul class="space-y-4 text-sm font-medium text-gray-500">
 <li><a href="http://errandr.shop" class="hover:text-parentPrimary transition-colors flex items-center gap-2"><Utensils class="w-4 h-4" /> Order Food</a></li>
 <li><a href="http://dispatch.errandr.shop" class="hover:text-parentPrimary transition-colors flex items-center gap-2"><Bike class="w-4 h-4" /> Become a Rider</a></li>
 </ul>
 </div>
 </div>
 
 <div class="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
 <p class="text-sm font-medium text-gray-400">
 &copy; {{ new Date().getFullYear() }} Errandr Inc. All rights reserved. For Vendors.
 </p>
 </div>
 </div>
 </footer>
 </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
 ArrowRight, Twitter, Instagram, Facebook,
 LogIn, Store, TrendingUp, Wallet, LineChart, Rocket,
 PlayCircle, ChevronLeft, ChevronRight, Award, Quote, Utensils, Bike, Sparkles
} from 'lucide-vue-next'

const router = useRouter()
const scrolled = ref(false)

definePageMeta({
 layout: false
})

useHead({
 title: 'Errandr for Vendors | Grow Your Campus Business',
 meta: [
 { name: 'description', content: 'Turn campus cravings into profit. Setup your digital store, reach students, and manage orders with Errandr.' }
 ]
})

const handleScroll = () => {
 scrolled.value = window.scrollY > 50
}

onMounted(() => {
 window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
 window.removeEventListener('scroll', handleScroll)
})

const scrollCarousel = (direction: 'left' | 'right', id: string) => {
 const container = document.getElementById(id)
 if (container) {
 const scrollAmount = direction === 'left' ? -400 : 400
 container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
 }
}

// Data
const successStories = [
 { id: 1, quote: 'Joining Errandr doubled our daily orders. Reaching students directly in their hostels was a game changer for our weekend sales.', name: 'Chef Tunde', restaurant: 'Campus Grill House', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop' },
 { id: 2, quote: 'The instant payout feature is incredible. Cash flow is crucial for our inventory, and Errandr makes it seamless.', name: 'Sarah', restaurant: 'Fresh Bites Bakery', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=150&fit=crop' },
 { id: 3, quote: 'The analytics dashboard helps us understand peak hours. We now prep earlier for the 8 PM dinner rush and zero out waste.', name: 'Mr. John', restaurant: 'Pizza Hub', image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=150&h=150&fit=crop' },
]
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
 display: none;
}
.hide-scrollbar {
 -ms-overflow-style: none;
 scrollbar-width: none;
}
</style>
