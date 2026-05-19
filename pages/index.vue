<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 scroll-smooth selection:bg-parentPrimary selection:text-white">
    <!-- Navbar -->
    <LandingNavbar />

    <!-- Hero Section with Background Carousel & Continuous Marquee -->
<!-- Hero Section with Background Carousel & Continuous Marquee -->
<section class="relative pt-32 lg:pt-48 pb-10 overflow-hidden bg-gray-900">
  <!-- Background Image Carousel -->
  <transition-group name="fade" tag="div" class="absolute inset-0 z-0">
    <div 
      v-for="(img, idx) in heroImages" 
      :key="img" 
      v-show="currentHeroImage === idx"
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${img})` }"
    >
      <!-- Dark Overlay for Readability -->
      <div class="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90"></div>
    </div>
  </transition-group>
  
  <div class="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 text-center flex flex-col items-center">
    <!-- <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-black mb-8 shadow-sm">
      <Sparkles class="w-4 h-4 text-parentPrimary" />
      Trusted by 500+ Campus Vendors Across Nigeria
    </div> -->
    
    <h1 class="text-4xl sm:text-5xl lg:text-[7rem] font-black tracking-tighter leading-[0.95] lg:leading-[0.9] mb-6 lg:mb-8 text-white max-w-5xl mx-auto drop-shadow-2xl">
      Feed the <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-parentPrimary drop-shadow-sm">Campus.</span><br />
      Grow Your Bag.
    </h1>
    
    <p class="text-base sm:text-lg text-gray-200 font-medium mb-10 leading-relaxed max-w-xl mx-auto drop-shadow-md">
      Erranders puts your food business right in the pocket of every student — from the hostel block to the lecture hall. Set up your store and start receiving orders today.
    </p>
    
    <div class="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
      <NuxtLink to="/auth/register" class="w-full sm:w-auto px-10 py-4 bg-white text-gray-900 rounded-[2rem] font-black text-base shadow-2xl hover:bg-gray-100 hover:shadow-white/30 transition-all text-center flex items-center justify-center gap-3 group active:scale-95">
        Launch My Store
        <Rocket class="w-5 h-5 text-parentPrimary group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
      </NuxtLink>
      <a href="#features" class="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white/30 text-white rounded-[2rem] font-black text-base hover:border-white hover:bg-white/10 transition-all text-center flex items-center justify-center gap-3 active:scale-95">
        <PlayCircle class="w-5 h-5 text-white" />
        See How It Works
      </a>
    </div>
  </div>

  <!-- Marquee Row 1 -->
  <div class="mt-24 relative bg-parentPrimary overflow-hidden py-4 transform -rotate-1 shadow-2xl shadow-parentPrimary/20 border-y-4 border-gray-900">
    <div class="flex animate-marquee-fast w-max items-center">
      <div class="flex items-center gap-12 px-6" v-for="i in 6" :key="i">
        <span class="text-3xl font-black text-white tracking-tight">10,000+ Students on Campus</span>
        <Star class="w-8 h-8 text-yellow-300 fill-current" />
        <span class="text-3xl font-black text-white tracking-tight outline-text">Fast & Reliable Payouts</span>
        <Zap class="w-8 h-8 text-yellow-300 fill-current" />
        <span class="text-3xl font-black text-white tracking-tight">Orders Coming In, Sharp Sharp</span>
        <TrendingUp class="w-8 h-8 text-yellow-300 stroke-[3]" />
      </div>
    </div>
  </div>

  <!-- Marquee Row 2 -->
  <div class="relative bg-white overflow-hidden py-3 transform rotate-1 shadow-xl -mt-4 border-y-2 border-parentPrimary">
    <div class="flex animate-marquee-reverse w-max items-center">
      <div class="flex items-center gap-12 px-6" v-for="i in 6" :key="`rev-${i}`">
        <span class="text-xl font-black text-gray-900">Delivered Across Campus</span>
        <Bike class="w-6 h-6 text-emerald-500" />
        <span class="text-xl font-black text-gray-900">Zero Commission on Your First 50 Orders</span>
        <Utensils class="w-6 h-6 text-parentPrimary" />
      </div>
    </div>
  </div>
</section>

    <!-- Features Section -->
    <section id="features" class="py-32 bg-gray-50/50">
      <div class="max-w-7xl mx-auto px-6 sm:px-10">
        <div class="text-center mb-20 max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-600 text-sm font-black  mb-6">
            <Zap class="w-4 h-4" /> The Vendor Toolkit
          </div>
          <h2 class="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-tight mb-6">
            Everything you need to <br/><span class="text-parentPrimary">dominate campus food delivery.</span>
          </h2>
          <p class="text-gray-500 font-bold text-lg leading-relaxed">
            We built Errandr strictly for the chaos of a busy kitchen. Accept orders, analyze sales, and manage your menu in seconds.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature 1 -->
          <div class="group bg-white p-10 rounded-[3rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-parentPrimary/40 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div class="absolute -right-6 -top-6 w-32 h-32 bg-parentPrimary/5 rounded-full blur-2xl group-hover:bg-parentPrimary/20 transition-all duration-500"></div>
            <div class="w-16 h-16 bg-parentPrimary/10 rounded-2xl flex items-center justify-center text-parentPrimary mb-8 group-hover:scale-110 group-hover:bg-parentPrimary group-hover:text-white transition-all duration-500 relative z-10">
              <ClipboardList class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-black text-gray-900 tracking-tight mb-3 relative z-10">Menu Management</h3>
            <p class="text-gray-500 font-medium leading-relaxed text-sm relative z-10">Upload delicious dishes, manage variations, set prices, and toggle availability instantly when you run out of stock.</p>
          </div>
          
          <!-- Feature 2 -->
          <div class="group bg-white p-10 rounded-[3rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-emerald-400 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
             <div class="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
            <div class="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 relative z-10">
              <Activity class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-black text-gray-900 tracking-tight mb-3 relative z-10">Live Orders</h3>
            <p class="text-gray-500 font-medium leading-relaxed text-sm relative z-10">Accept, prepare, and dispatch orders in real-time. Hear loud ringtones for new orders so you never miss a sale.</p>
          </div>

          <!-- Feature 3 -->
          <div class="group bg-white p-10 rounded-[3rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-purple-400 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
             <div class="absolute -right-6 -top-6 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
            <div class="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-8 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 relative z-10">
              <PieChart class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-black text-gray-900 tracking-tight mb-3 relative z-10">Analytics Dashboard</h3>
            <p class="text-gray-500 font-medium leading-relaxed text-sm relative z-10">Track daily revenue, identify your top-selling meals, and view order success rates to scale your business smartly.</p>
          </div>

          <!-- Feature 4 -->
          <div class="group bg-white p-10 rounded-[3rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-blue-400 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
             <div class="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
            <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 relative z-10">
              <Store class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-black text-gray-900 tracking-tight mb-3 relative z-10">Instant Setup</h3>
            <p class="text-gray-500 font-medium leading-relaxed text-sm relative z-10">Create your vendor profile, add your payout bank account, and start receiving orders from students in under 5 minutes.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Carousel: Success Stories / Testimonials -->
    <section id="success" class="py-32 bg-gray-900 overflow-hidden border-t border-gray-800 relative">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div class="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 mb-20 text-center">
        <h2 class="text-4xl lg:text-5xl font-black text-white tracking-tighter">Trusted by top campus brands.</h2>
        <p class="text-gray-400 font-medium mt-4">Hear from vendors who scaled their kitchens with Errandr.</p>
      </div>
      
      <!-- Continuously Scrolling Testimonials -->
      <div class="relative w-full overflow-hidden pb-10 flex">
        <!-- Mask for fading edges -->
        <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-20"></div>
        <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-20"></div>

        <div class="flex animate-marquee-slow w-max hover:[animation-play-state:paused] transition-all cursor-grab active:cursor-grabbing">
          <!-- Repeat the cards twice for seamless looping -->
          <div class="flex gap-8 px-4" v-for="loop in 2" :key="`loop-${loop}`">
            <div v-for="(story, idx) in successStories" :key="`${loop}-${idx}`" 
                 class="w-[450px] flex-shrink-0 bg-gray-800/50 backdrop-blur-md p-10 rounded-[3rem] border border-gray-700 hover:bg-gray-800 hover:border-parentPrimary/50 transition-all duration-500 flex flex-col justify-between">
              <div>
                <Quote class="w-10 h-10 text-parentPrimary/40 mb-6" />
                <!-- Static User-Friendly Text -->
                <p class="text-lg text-gray-200 font-medium leading-relaxed mb-10">"{{ story.quote }}"</p>
              </div>
              <div class="flex items-center gap-5 mt-auto">
                <img :src="story.image" class="w-14 h-14 rounded-full object-cover border-2 border-gray-700" alt="Vendor Owner" />
                <div>
                  <h4 class="text-base font-black text-white">{{ story.name }}</h4>
                  <p class="text-sm font-bold text-parentPrimary  mt-0.5 flex items-center gap-1.5">
                    <Store class="w-3.5 h-3.5" /> {{ story.restaurant }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Banner -->
    <section class="py-24 bg-parentPrimary overflow-hidden relative">
      <div class="absolute inset-0 z-0 flex whitespace-nowrap opacity-10 font-black text-[12rem] leading-none text-white overflow-hidden items-center pointer-events-none gap-8 select-none tracking-tight">
        Start Selling • Start Selling • Start Selling
      </div>
      <div class="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
        <h2 class="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-tight">
          Ready to digitize your <br/> campus restaurant?
        </h2>
        <p class="text-white/80 font-medium text-lg mb-10 max-w-xl">
          Join hundreds of successful vendors on Errandr today and watch your order volume explode.
        </p>
        <NuxtLink to="/auth/register" class="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-white text-parentPrimary rounded-full font-black shadow-2xl hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] transition-all duration-300 text-base  group">
          Create Free Profile <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
        </NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  ArrowRight, Twitter, Instagram, Facebook,
  LogIn, Store, TrendingUp, Zap, Rocket, Activity, ClipboardList, PieChart, Star,
  PlayCircle, Quote, Utensils, Bike, Sparkles
} from 'lucide-vue-next'
import hero3 from '@/assets/img/hero3.jpg'
import hero4 from '@/assets/img/hero4.jpg'
import hero6 from '@/assets/img/hero6.jpg'
import hero7 from '@/assets/img/hero7.jpg'
import hero8 from '@/assets/img/hero8.jpg'
import hero9 from '@/assets/img/hero9.jpg'
import hero10 from '@/assets/img/hero10.jpg'
import hero11 from '@/assets/img/hero11.jpg'
import hero12 from '@/assets/img/hero12.jpg'
import hero13 from '@/assets/img/hero13.jpg'
import hero15 from '@/assets/img/hero15.jpg'
import hero16 from '@/assets/img/hero16.jpg'

const router = useRouter()
const scrolled = ref(false)

// Background Carousel State
const currentHeroImage = ref(0)
const heroImages = [
  hero3, hero4, hero6, hero7, hero8, hero9, hero10, hero11, hero12, hero13, hero15, hero16
]

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

let imageInterval: NodeJS.Timeout

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Start Hero Image Carousel
  imageInterval = setInterval(() => {
    currentHeroImage.value = (currentHeroImage.value + 1) % heroImages.length
  }, 5000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (imageInterval) clearInterval(imageInterval)
})

// Data for Testimonials
const successStories = [
  { id: 1, quote: 'Joining Errandr doubled our daily orders. Reaching students directly in their hostels was a game changer for our weekend sales.', name: 'Chef Tunde', restaurant: 'Campus Grill House', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop' },
  { id: 2, quote: 'The instant payout feature is incredible. Cash flow is crucial for our inventory, and Errandr makes it seamless.', name: 'Sarah', restaurant: 'Fresh Bites Bakery', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=150&fit=crop' },
  { id: 3, quote: 'The analytics dashboard helps us understand peak hours. We now prep earlier for the dinner rush and zero out waste.', name: 'Mr. John', restaurant: 'Pizza Hub', image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=150&h=150&fit=crop' },
  { id: 4, quote: 'Menu management is so easy. If we run out of chicken, I just toggle it off on my phone in 2 seconds.', name: 'Mama Nkechi', restaurant: 'Nkechi Foods', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&h=150&fit=crop' },
]
</script>

<style scoped>
.outline-text {
  -webkit-text-stroke: 1px white;
  color: transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
