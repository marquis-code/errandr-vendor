<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 scroll-smooth selection:bg-parentPrimary selection:text-white">
    <!-- Navbar -->
    <LandingNavbar />

    <!-- Hero Section with Background Carousel & Continuous Marquee -->
<!-- Hero Section with Background Carousel & Continuous Marquee -->
<section class="relative pt-36 lg:pt-48 pb-24 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-100">
  <!-- Soft Minimalist Grid Dot Overlay -->
  <div class="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 z-0 pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <!-- Left Column: Elegant, Balanced Content -->
      <div class="lg:col-span-7 text-left flex flex-col items-start space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold tracking-wide shadow-sm">
          <Sparkles class="w-3.5 h-3.5 text-[#FF5C1A]" />
          Active at UNILAG, LASU & YABATECH
        </div>
        
        <h1 class="text-4xl sm:text-5xl lg:text-[4.5rem] font-medium tracking-tight leading-[1.05] text-slate-900">
          Feed the <span class="text-[#FF5C1A]">Campus.</span><br />
          Style the Students.<br />
          Grow Your Business.
        </h1>
        
        <p class="text-base sm:text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
          Erranders puts your restaurant, salon, or service right in the pocket of thousands of students. Accept orders, manage service appointments, track payout streams, and deliver directly to lecture halls & hostels.
        </p>
        
        <div class="flex flex-row items-center gap-4 w-full sm:w-auto">
          <NuxtLink to="/auth/register" class="px-6 py-3 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-full font-extrabold text-sm shadow-md shadow-[#FF5C1A]/10 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer">
            Launch My Store
            <Rocket class="w-4 h-4 text-white" />
          </NuxtLink>
          <!-- <a href="#features" class="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer">
            <PlayCircle class="w-4 h-4 text-slate-400" />
            See How It Works
          </a> -->
        </div>
      </div>

      <!-- Right Column: Minimalist Light Live Store Simulator -->
      <div class="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
        <!-- The Main Light Glass Console -->
        <div class="w-full max-w-[380px] bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <!-- Mockup Header -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-5 mb-5">
            <div class="flex items-center gap-3">
              <!-- Live Profile Avatar -->
              <div class="w-11 h-11 rounded-xl overflow-hidden border border-slate-200 shadow-inner relative bg-slate-50">
                <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=150" class="w-full h-full object-cover" alt="Student Vendor" />
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900">Mavis Kitchen</h3>
                <p class="text-[11px] text-emerald-500 font-bold flex items-center gap-1 mt-0.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Store Online
                </p>
              </div>
            </div>
            <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <Store class="w-4 h-4" />
            </div>
          </div>

          <!-- Total Sales Widget -->
          <div class="bg-slate-50/60 rounded-3xl p-5 border border-slate-100 space-y-1 mb-5">
            <div class="flex justify-between items-center text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              <span>Today's Sales</span>
              <span class="text-emerald-600 font-medium flex items-center gap-0.5 text-[11px]">
                <TrendingUp class="w-3 h-3" /> +28.4%
              </span>
            </div>
            <h4 class="text-3xl font-medium text-slate-950 tracking-tight">₦148,250</h4>
            <p class="text-[10px] text-slate-400 font-medium">Updated real-time from active checkout terminals</p>
          </div>

          <!-- Live Order Queue (Clean Light rows) -->
          <div class="space-y-3">
            <div class="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center font-bold text-sm">🍹</div>
                <div>
                  <p class="text-xs font-extrabold text-slate-900">Smoothie Daddy</p>
                  <p class="text-[11px] text-slate-500">2x Berry Boost, Extra Ice</p>
                </div>
              </div>
              <span class="px-2 py-0.5 bg-[#FF5C1A]/10 text-[#FF5C1A] border border-[#FF5C1A]/10 rounded-md text-[9px] font-extrabold uppercase">PREPARE</span>
            </div>

            <div class="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-green-50 text-emerald-500 flex items-center justify-center font-bold text-sm">🍲</div>
                <div>
                  <p class="text-xs font-extrabold text-slate-900">Iya Tinu Foods</p>
                  <p class="text-[11px] text-slate-500">Jollof Rice & Beef (Jaja Hall)</p>
                </div>
              </div>
              <span class="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md text-[9px] font-extrabold uppercase">TRANSIT</span>
            </div>
          </div>

          <!-- Decorative Floating Widgets -->
          <!-- Widget 1: Floating Rating -->
          <div class="absolute -top-4 -right-4 bg-white border border-slate-100 rounded-2xl p-2.5 shadow-md flex items-center gap-2 animate-bounce [animation-duration:4s]">
            <div class="w-7 h-7 rounded-lg bg-yellow-50 text-yellow-500 flex items-center justify-center font-medium text-xs">⭐</div>
            <div>
              <p class="text-[11px] font-medium text-slate-900">Iya Tinu Foods</p>
              <p class="text-[9px] font-bold text-slate-400">4.9 Star Average</p>
            </div>
          </div>

          <!-- Widget 2: Floating Instant Payouts -->
          <div class="absolute -bottom-4 -left-4 bg-white border border-slate-100 rounded-2xl p-2.5 shadow-md flex items-center gap-2.5 animate-bounce [animation-duration:5s]">
            <div class="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center font-medium text-xs">⚡</div>
            <div>
              <p class="text-[11px] font-medium text-slate-900">Iya Warris</p>
              <p class="text-[9px] font-bold text-slate-400">Payout settled instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Marquee Row 1 -->
  <div class="mt-24 relative bg-slate-900 overflow-hidden py-3 transform -rotate-1 shadow-md border-y border-slate-800 z-10">
    <div class="flex animate-marquee-fast w-max items-center">
      <div class="flex items-center gap-12 px-6" v-for="i in 6" :key="i">
        <span class="text-2xl font-medium text-white tracking-tight">10,000+ Students on Campus</span>
        <Star class="w-6 h-6 text-yellow-300 fill-current" />
        <span class="text-2xl font-medium text-white tracking-tight outline-text">Fast & Reliable Payouts</span>
        <Zap class="w-6 h-6 text-yellow-300 fill-current" />
        <span class="text-2xl font-medium text-white tracking-tight">Orders Coming In, Sharp Sharp</span>
        <TrendingUp class="w-6 h-6 text-yellow-300 stroke-[3]" />
      </div>
    </div>
  </div>

  <!-- Marquee Row 2 -->
  <div class="relative bg-white overflow-hidden py-2 transform rotate-1 shadow-sm -mt-3 border-y border-slate-100 z-10">
    <div class="flex animate-marquee-reverse w-max items-center">
      <div class="flex items-center gap-12 px-6" v-for="i in 6" :key="`rev-${i}`">
        <span class="text-base font-bold text-slate-700">Delivered Across Campus</span>
        <Bike class="w-5 h-5 text-emerald-500" />
        <span class="text-base font-bold text-slate-700">Zero Commission on Your First 50 Orders</span>
        <Utensils class="w-5 h-5 text-[#FF5C1A]" />
      </div>
    </div>
  </div>
</section>

    <!-- Features Section -->
    <section id="features" class="py-32 bg-gray-50/50">
      <div class="max-w-7xl mx-auto px-6 sm:px-10">
        <div class="text-center mb-20 max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-600 text-sm font-medium  mb-6">
            <Zap class="w-4 h-4" /> The Vendor Toolkit
          </div>
          <h2 class="text-4xl lg:text-5xl font-medium text-gray-900 tracking-tighter leading-tight mb-6">
            Everything you need to <br/><span class="text-parentPrimary">dominate campus commerce.</span>
          </h2>
          <p class="text-gray-500 font-bold text-lg leading-relaxed">
            We built Errander strictly for the chaos of a busy campus. Accept orders, manage bookings, analyze sales, and update your offerings in seconds.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(feature, idx) in toolkitFeatures" :key="idx" 
               class="group bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-[#FF5C1A]/30 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden flex flex-col items-start">
            <div class="absolute -right-6 -top-6 w-32 h-32 bg-slate-50 rounded-full blur-2xl group-hover:bg-[#FF5C1A]/5 transition-all duration-500"></div>
            <div class="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 group-hover:bg-[#FF5C1A] group-hover:text-white group-hover:border-[#FF5C1A] transition-all duration-300 relative z-10">
              <component :is="feature.icon" class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-extrabold text-slate-900 tracking-tight mb-2 relative z-10">{{ feature.title }}</h3>
            <p class="text-slate-500 font-medium leading-relaxed text-sm relative z-10">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Map Section -->
    <section id="categories" class="py-24 bg-white border-y border-slate-100">
      <div class="max-w-7xl mx-auto px-6 sm:px-10">
        <div class="text-center mb-16 max-w-2xl mx-auto">
          <h2 class="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tighter mb-4">
            Built for your business type
          </h2>
          <p class="text-slate-500 font-medium text-lg leading-relaxed">
            Join the hundreds of top-rated campus businesses across various categories already scaling with Errander.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <!-- Category Tabs -->
          <div class="lg:col-span-4 flex flex-col gap-3">
            <button 
              v-for="cat in vendorCategories" 
              :key="cat.key"
              @click="fetchCategoryVendors(cat.key)"
              class="flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 group active:scale-95"
              :class="activeCategory === cat.key ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10' : 'bg-white border-slate-100 text-slate-700 hover:border-[#FF5C1A]/30 hover:bg-slate-50'"
            >
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-colors"
                   :class="activeCategory === cat.key ? 'bg-white/10' : 'bg-slate-100 group-hover:bg-[#FF5C1A]/10'">
                {{ cat.icon }}
              </div>
              <div>
                <h4 class="font-bold text-base" :class="activeCategory === cat.key ? 'text-white' : 'text-slate-900 group-hover:text-[#FF5C1A]'">{{ cat.label }}</h4>
                <p class="text-xs font-medium mt-1" :class="activeCategory === cat.key ? 'text-slate-300' : 'text-slate-500'">{{ cat.description }}</p>
              </div>
            </button>
          </div>

          <!-- Vendors Grid Display -->
          <div class="lg:col-span-8">
            <div v-if="loadingCategory" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div v-for="i in 4" :key="i" class="animate-pulse bg-slate-50 rounded-[2rem] h-48 border border-slate-100"></div>
            </div>
            
            <div v-else-if="categoryVendors.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div v-for="vendor in categoryVendors.slice(0, 4)" :key="vendor._id" 
                   class="bg-white border border-slate-100 rounded-[2rem] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all flex items-start gap-4">
                <div class="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                  <img :src="vendor.image || vendor.logo || vendor.banner || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&q=80'" class="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 class="font-extrabold text-slate-900 text-lg mb-1 tracking-tight truncate">{{ vendor.storeName }}</h4>
                  <div class="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-2">
                    <span class="px-2 py-0.5 rounded-md bg-slate-100 uppercase tracking-wider text-[9px]">{{ vendor.category || activeCategory }}</span>
                  </div>
                  <div class="flex items-center gap-1 text-yellow-500">
                    <Star class="w-3.5 h-3.5 fill-current" />
                    <span class="text-xs font-bold text-slate-700">{{ vendor.rating?.toFixed(1) || '5.0' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State for Category -->
            <div v-else class="h-full flex flex-col items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] p-10 text-center">
              <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm mb-4 mb-4">
                {{ vendorCategories.find(c => c.key === activeCategory)?.icon }}
              </div>
              <h4 class="text-lg font-bold text-slate-900">Be the first!</h4>
              <p class="text-sm text-slate-500 font-medium max-w-sm mt-2">
                We're expanding into this category. Claim your spot now and dominate the campus market.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Carousel: Success Stories / Testimonials -->
    <section id="success" class="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden border-y border-slate-100 relative">
      <!-- Soft Minimalist Grid Dot Overlay -->
      <div class="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 z-0 pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 mb-12 text-center">
        <h2 class="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tighter">Trusted by top campus brands.</h2>
        <p class="text-slate-500 font-medium mt-3 text-sm">Hear from vendors who scaled their kitchens with Errander.</p>
      </div>
      
      <!-- Continuously Scrolling Testimonials -->
      <div class="relative w-full overflow-hidden pb-6 flex">
        <!-- Mask for fading edges -->
        <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-20"></div>
        <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-20"></div>

        <div class="flex animate-marquee-slow w-max hover:[animation-play-state:paused] transition-all cursor-grab active:cursor-grabbing">
          <!-- Repeat the cards twice for seamless looping -->
          <div class="flex gap-6 px-4" v-for="loop in 2" :key="`loop-${loop}`">
            <div v-for="(story, idx) in successStories" :key="`${loop}-${idx}`" 
                 class="w-[340px] flex-shrink-0 bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:border-[#FF5C1A]/30 transition-all duration-500 flex flex-col justify-between">
              <div>
                <Quote class="w-7 h-7 text-[#FF5C1A]/20 mb-4" />
                <!-- Static User-Friendly Text -->
                <p class="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6">"{{ story.quote }}"</p>
              </div>
              <div class="flex items-center gap-3 mt-auto">
                <img :src="story.image" class="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm" alt="Vendor Owner" />
                <div>
                  <h4 class="text-xs font-extrabold text-slate-900">{{ story.name }}</h4>
                  <p class="text-[11px] font-bold text-[#FF5C1A] mt-0.5 flex items-center gap-1">
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
    <section class="py-24 bg-gradient-to-b from-white to-slate-50/50 overflow-hidden relative border-b border-slate-100">
      <!-- Soft Minimalist Grid Dot Overlay -->
      <div class="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 z-0 pointer-events-none"></div>

      <div class="absolute inset-0 z-0 flex whitespace-nowrap opacity-[0.03] font-medium text-[12rem] leading-none text-slate-950 overflow-hidden items-center pointer-events-none gap-8 select-none tracking-tight">
        Start Selling • Start Selling • Start Selling
      </div>
      <div class="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
        <h2 class="text-4xl md:text-6xl font-medium text-slate-950 tracking-tighter mb-8 leading-tight">
          Ready to digitize your <br/> campus restaurant?
        </h2>
        <p class="text-slate-500 font-medium text-lg mb-10 max-w-xl">
          Join hundreds of successful vendors on Errander today and watch your order volume explode.
        </p>
        <NuxtLink to="/auth/register" class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF5C1A] hover:bg-[#E54D12] text-white rounded-full font-bold shadow-md shadow-[#FF5C1A]/10 transition-all text-sm group cursor-pointer active:scale-95">
          Create Free Profile <ArrowRight class="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform"/>
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
import { vendors_api } from '@/api_factory/modules/vendors'

const router = useRouter()
const scrolled = ref(false)

definePageMeta({
  layout: false
})

useHead({
  title: 'Errander for Vendors | Grow Your Campus Business',
  meta: [
    { name: 'description', content: 'Turn campus cravings into profit. Setup your digital store, reach students, and manage orders with Errander.' }
  ]
})

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

const activeCategory = ref('restaurant')
const categoryVendors = ref<any[]>([])
const loadingCategory = ref(false)

const vendorCategories = [
  { key: 'restaurant', label: 'Restaurants', icon: '🍽️', description: 'Join the top campus kitchens' },
  { key: 'salon', label: 'Salons & Spas', icon: '💇‍♀️', description: 'Schedule more styling appointments' },
  { key: 'groceries', label: 'Groceries & Marts', icon: '🛒', description: 'Deliver daily essentials fast' },
  { key: 'services', label: 'Tutors & Services', icon: '🎓', description: 'Offer your professional skills' },
]

const fetchCategoryVendors = async (category: string) => {
  loadingCategory.value = true
  activeCategory.value = category
  try {
    const res = await vendors_api.getAll({ category, limit: 4 })
    const fetched = res.data?.vendors || res.data?.data?.vendors || res.data || []
    categoryVendors.value = fetched
  } catch (e) {
    console.error('Failed to fetch vendors by category:', e)
  } finally {
    loadingCategory.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  fetchCategoryVendors(activeCategory.value)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Data for Features Grid
const toolkitFeatures = [
  {
    title: 'Product & Service Management',
    description: 'Upload delicious dishes or list your services, manage variations, set prices, and configure your availability calendar instantly.',
    icon: ClipboardList
  },
  {
    title: 'Live Orders & Appointments',
    description: 'Accept, prepare, and dispatch orders or manage bookings in real-time. Hear loud ringtones for new requests so you never miss a sale.',
    icon: Activity
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track daily revenue, identify your top-selling items or services, and view success rates to scale your business smartly.',
    icon: PieChart
  },
  {
    title: 'Instant Setup',
    description: 'Create your vendor profile, add your payout bank account, and start receiving orders and appointments from students in under 5 minutes.',
    icon: Store
  }
]

// Data for Testimonials
const successStories = [
  { id: 1, quote: 'Joining Errander doubled our daily orders. Reaching students directly in their hostels was a game changer for our weekend sales.', name: 'Chef Tunde', restaurant: 'Campus Grill House', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop' },
  { id: 2, quote: 'The instant payout feature is incredible. Cash flow is crucial for our inventory, and Errander makes it seamless.', name: 'Sarah', restaurant: 'Fresh Bites Bakery', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=150&fit=crop' },
  { id: 3, quote: 'The calendar system is a lifesaver. Students now book their hair appointments ahead of time, and my salon is never overcrowded.', name: 'Adeola', restaurant: 'Glow Beauty Studio', image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&h=150&fit=crop' },
  { id: 4, quote: 'Managing services and physical products in one place is so easy. If we are fully booked, I just toggle it off on my phone in 2 seconds.', name: 'Mama Nkechi', restaurant: 'Nkechi Foods & Spa', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&h=150&fit=crop' },
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
