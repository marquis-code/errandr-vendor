<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 scroll-smooth">
    <!-- Navbar -->
    <nav class="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300" :class="{'py-4': !scrolled, 'py-3 shadow-sm': scrolled}">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-parentPrimary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm shadow-parentPrimary/20">
              <Store class="w-5 h-5" />
            </div>
            <span class="text-2xl font-black text-parentPrimary tracking-tighter">Errandr <span class="text-gray-400 font-medium text-lg ml-1">For Vendors</span></span>
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
    <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-50 border-b border-gray-100">
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-parentPrimary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="max-w-2xl">
            <h1 class="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.1] mb-6 text-gray-900">
              Turn campus cravings into <br />
              <span class="text-parentPrimary line-through decoration-4 decoration-blue-300">orders</span>
              <span class="text-emerald-500"> profit.</span>
            </h1>
            <p class="text-xl text-gray-500 font-medium mb-10 leading-relaxed max-w-lg">
              Reach thousands of hungry students daily. Manage your menu, track analytics, and grow your campus food business with Errandr.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <NuxtLink to="/auth/register" class="w-full sm:w-auto px-8 py-4 bg-parentPrimary text-white rounded-2xl font-bold text-lg shadow-xl shadow-parentPrimary/20 hover:-translate-y-1 transition-all text-center flex items-center justify-center gap-2 group">
                <Store class="w-5 h-5" />
                Create Free Store
                <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
              <a href="#features" class="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold text-lg shadow-sm hover:border-parentPrimary/30 transition-all text-center flex items-center justify-center gap-2">
                <PlayCircle class="w-5 h-5 text-gray-400" />
                Explore Features
              </a>
            </div>
            
            <div class="mt-12 flex items-center gap-6 border-t border-gray-200 pt-8">
              <div>
                <p class="text-3xl font-black text-gray-900 mb-1">50+</p>
                <p class="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1"><Store class="w-3 h-3"/> Active Vendors</p>
              </div>
              <div class="w-px h-10 bg-gray-200"></div>
              <div>
                <p class="text-3xl font-black text-gray-900 mb-1">10k+</p>
                <p class="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1"><TrendingUp class="w-3 h-3"/> Orders/Month</p>
              </div>
            </div>
          </div>
          
          <div class="relative hidden py-10 lg:block">
            <div class="relative z-10 bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500">
               <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop" alt="Restaurant Kitchen" class="rounded-[2.5rem] object-cover h-[500px] w-full" />
            </div>
            <!-- Floating Elements -->
            <div class="absolute -left-12 bottom-20 bg-white p-5 rounded-3xl shadow-2xl border border-gray-100 flex items-center gap-4 z-20 animate-bounce" style="animation-duration: 4s;">
              <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shadow-inner">
                 <Wallet class="w-6 h-6" />
              </div>
              <div>
                <p class="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-0.5">Today's Sales</p>
                <p class="text-xl font-black text-gray-900 tracking-tight">₦ 42,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Carousel: Success Stories / Testimonials -->
    <section id="success" class="py-24 bg-white overflow-hidden border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div class="flex items-end justify-between">
          <div>
            <div class="inline-flex items-center gap-2 text-parentPrimary font-bold text-sm tracking-widest uppercase mb-3">
              <Award class="w-4 h-4" /> Success Stories
            </div>
            <h2 class="text-4xl font-black text-gray-900 tracking-tight">Hear from our Top Vendors</h2>
          </div>
          <div class="hidden sm:flex gap-2">
            <button @click="scrollCarousel('left', 'testimonial-carousel')" class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-parentPrimary transition-colors text-gray-600">
              <ChevronLeft class="w-6 h-6" />
            </button>
            <button @click="scrollCarousel('right', 'testimonial-carousel')" class="w-12 h-12 rounded-full bg-parentPrimary text-white flex items-center justify-center hover:bg-parentPrimary/90 transition-colors shadow-lg shadow-parentPrimary/20">
              <ChevronRight class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Carousel Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="testimonial-carousel" class="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div v-for="story in successStories" :key="story.id" class="snap-start flex-none w-[320px] sm:w-[400px]">
            <div class="bg-gray-50 p-8 rounded-3xl border border-gray-100 h-full flex flex-col justify-between">
              <div>
                 <Quote class="w-10 h-10 text-parentPrimary/20 mb-4" />
                 <p class="text-lg text-gray-700 font-medium leading-relaxed italic mb-8">"{{ story.quote }}"</p>
              </div>
              <div class="flex items-center gap-4">
                <img :src="story.image" class="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" alt="Vendor Owner" />
                <div>
                  <h4 class="font-bold text-gray-900">{{ story.name }}</h4>
                  <p class="text-sm text-gray-500 flex items-center gap-1.5"><Store class="w-3 h-3"/> {{ story.restaurant }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl font-black text-gray-900 tracking-tight mb-4">Built for Campus Restaurants</h2>
          <p class="text-gray-500 font-medium text-lg">Everything you need to run a high-volume digital kitchen.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:border-parentPrimary/30 transition-colors">
            <div class="w-16 h-16 bg-parentPrimary/10 rounded-2xl flex items-center justify-center text-parentPrimary border border-parentPrimary/20 mb-6 group-hover:scale-110 transition-transform">
              <LineChart class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 tracking-tight mb-3">Order Management</h3>
            <p class="text-gray-500 font-medium leading-relaxed">Accept, prepare, and dispatch orders with a single tap. Our dashboard gives you a real-time view of your kitchen's workload.</p>
          </div>
          
          <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:border-emerald-300 transition-colors">
            <div class="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100 mb-6 group-hover:scale-110 transition-transform">
              <Wallet class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 tracking-tight mb-3">Instant Payouts</h3>
            <p class="text-gray-500 font-medium leading-relaxed">Never wait for your money. Cash out your earnings instantly to your local bank account immediately after order fulfillment.</p>
          </div>

          <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:border-amber-300 transition-colors">
            <div class="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-100 mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 tracking-tight mb-3">Growth Analytics</h3>
            <p class="text-gray-500 font-medium leading-relaxed">Understand what students love. Track your top-selling items, peak hours, and customer retention metrics effortlessly.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Banner -->
    <section class="py-16 bg-gray-900 overflow-hidden relative">
      <div class="absolute inset-0 z-0 flex whitespace-nowrap opacity-[0.03] font-black text-8xl uppercase text-white overflow-hidden items-center pointer-events-none gap-8">
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
            <div class="flex items-center gap-2 mb-6">
              <div class="w-8 h-8 bg-parentPrimary rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                <Store class="w-4 h-4" />
              </div>
              <span class="text-xl font-black text-parentPrimary tracking-tighter">Errandr Vendors</span>
            </div>
            <p class="text-gray-500 text-sm leading-relaxed mb-6 font-medium">Empowering campus kitchens with powerful technology and access to a massive student audience.</p>
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
            <h4 class="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Platform</h4>
            <ul class="space-y-4 text-sm font-medium text-gray-500">
              <li><NuxtLink to="/about" class="hover:text-parentPrimary transition-colors">About Us</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-parentPrimary transition-colors">Contact Sales</NuxtLink></li>
              <li><NuxtLink to="/faq" class="hover:text-parentPrimary transition-colors">Vendor FAQ</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Legal</h4>
            <ul class="space-y-4 text-sm font-medium text-gray-500">
              <li><NuxtLink to="/terms" class="hover:text-parentPrimary transition-colors">Merchant Agreement</NuxtLink></li>
              <li><NuxtLink to="/terms" class="hover:text-parentPrimary transition-colors">Privacy Policy</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Errandr Network</h4>
            <ul class="space-y-4 text-sm font-medium text-gray-500">
              <li><a href="http://student.localhost:3000" class="hover:text-parentPrimary transition-colors flex items-center gap-2"><Utensils class="w-4 h-4" /> Order Food</a></li>
              <li><a href="http://errander.localhost:3000" class="hover:text-parentPrimary transition-colors flex items-center gap-2"><Bike class="w-4 h-4" /> Become a Rider</a></li>
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
  PlayCircle, ChevronLeft, ChevronRight, Award, Quote, Utensils, Bike
} from 'lucide-vue-next'

definePageMeta({
  layout: false
})

useHead({
  title: 'Errandr for Vendors | Grow Your Campus Business',
  meta: [
    { name: 'description', content: 'Turn campus cravings into profit. Setup your digital store, reach students, and manage orders with Errandr.' }
  ]
})

const scrolled = ref(false)

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
