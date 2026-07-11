<template>
  <FullScreenLoader />
  <div class="min-h-screen bg-white">
    <aside class="hidden lg:flex flex-col bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0 transition-all duration-300 z-50" :class="isSidebarMinimized ? 'w-20' : 'w-64'">
      <!-- Logo -->
      <div class="p-4 border-b border-gray-50/50 flex items-center gap-3 relative h-[73px]">
        <video v-if="profile?.logo && profile.logo.match(/\.(mp4|webm|ogg|mov)$/i)" :src="profile.logo" class="w-10 h-10 rounded-md object-cover flex-shrink-0" autoplay loop muted playsinline></video>
        <img v-else-if="profile?.logo" :src="profile.logo" alt="Store Logo" class="w-10 h-10 rounded-md object-cover flex-shrink-0" />
        <div v-else class="w-10 h-10 bg-parentPrimary rounded-md flex items-center justify-center text-white font-bold text-xl uppercase flex-shrink-0">
          {{ profile?.storeName ? profile.storeName.charAt(0) : 'E' }}
        </div>
        <span v-if="!isSidebarMinimized" class="text-xl font-medium text-parentPrimary tracking-tighter truncate">{{ profile?.storeName || 'Errander' }}</span>
        
        <!-- Toggle Button -->
        <button 
          @click="isSidebarMinimized = !isSidebarMinimized"
          class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-parentPrimary hover:border-parentPrimary z-50 transition-colors"
        >
          <ChevronLeft v-if="!isSidebarMinimized" class="w-4 h-4" />
          <ChevronRight v-else class="w-4 h-4" />
        </button>
      </div>
      
      <!-- Navigation -->
      <nav class="p-4 space-y-1 flex-1 overflow-y-auto hide-scrollbar">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all group relative"
          :class="isActive(item.path) ? 'bg-parentPrimary text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-parentPrimary'"
          :title="isSidebarMinimized ? item.label : ''"
        >
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0" :class="isSidebarMinimized ? 'mx-auto' : 'mr-3'" />
          <span v-if="!isSidebarMinimized" class="truncate">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Logout Button -->
      <div class="p-4 border-t border-gray-50/50 mt-auto">
        <button
          @click="handleLogoutClick"
          class="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-all"
          :class="isSidebarMinimized ? 'w-full justify-center' : 'w-full'"
          :title="isSidebarMinimized ? 'Logout' : ''"
        >
          <LogOut class="w-5 h-5 flex-shrink-0" :class="isSidebarMinimized ? '' : 'mr-3'" />
          <span v-if="!isSidebarMinimized">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Mobile Header -->
    <header class="lg:hidden bg-white border-b border-gray-100 sticky top-0 z-40">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center gap-2 overflow-hidden">
          <video v-if="profile?.logo && profile.logo.match(/\\.(mp4|webm|ogg|mov)$/i)" :src="profile.logo" class="w-8 h-8 rounded-lg object-cover flex-shrink-0" autoplay loop muted playsinline></video>
          <img v-else-if="profile?.logo" :src="profile.logo" alt="Store Logo" class="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
          <div v-else class="w-8 h-8 bg-parentPrimary rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0 uppercase">
            {{ profile?.storeName ? profile.storeName.charAt(0) : 'E' }}
          </div>
          <span class="font-medium text-parentPrimary tracking-tighter truncate">{{ profile?.storeName || 'Errander' }}</span>
        </div>

        <div class="flex items-center gap-2">
          <NuxtLink to="/dashboard/notifications" class="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400">
            <Bell class="w-6 h-6" />
          </NuxtLink>
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu class="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <Transition name="overlay">
      <div
        v-if="showMobileMenu"
        class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
        @click="showMobileMenu = false"
      ></div>
    </Transition>

    <Transition name="slide">
      <aside
        v-if="showMobileMenu"
        class="lg:hidden w-72 bg-white min-h-screen fixed left-0 top-0 z-50"
      >
        <!-- Mobile Header -->
        <div class="p-4 border-b border-gray-50/50 flex items-center justify-between">
          <div class="flex items-center gap-2 overflow-hidden">
            <video v-if="profile?.logo && profile.logo.match(/\\.(mp4|webm|ogg|mov)$/i)" :src="profile.logo" class="w-8 h-8 rounded-lg object-cover flex-shrink-0" autoplay loop muted playsinline></video>
            <img v-else-if="profile?.logo" :src="profile.logo" alt="Store Logo" class="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
            <div v-else class="w-8 h-8 bg-parentPrimary rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0 uppercase">
              {{ profile?.storeName ? profile.storeName.charAt(0) : 'E' }}
            </div>
            <span class="font-medium text-parentPrimary tracking-tighter truncate">{{ profile?.storeName || 'Errander' }}</span>
          </div>
          <button
            @click="showMobileMenu = false"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X class="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <!-- User Info -->
        <div class="p-4 bg-gradient-to-br from-parentPrimary/5 to-parentPrimary/10 border-b border-gray-50/50">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-md bg-parentPrimary text-white flex items-center justify-center font-semibold text-lg">
              {{ userInitials }}
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900 truncate">{{ userDisplayName }}</h3>
              <p class="text-sm text-gray-500 truncate">{{ user?.email }}</p>
            </div>
          </div>
        </div>
        
        <!-- Mobile Navigation -->
        <nav class="p-4 space-y-1 max-h-[calc(100vh-240px)] overflow-y-auto">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all"
            :class="isActive(item.path) ? 'bg-parentPrimary text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-parentPrimary'"
            @click="showMobileMenu = false"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3 flex-shrink-0" />
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Mobile Logout -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-50/50 bg-white">
          <button
            @click="handleLogoutClick"
            class="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-all"
          >
            <LogOut class="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </Transition>

    <!-- Main Content -->
    <main class="flex-1 transition-all duration-300" :class="isSidebarMinimized ? 'lg:ml-20' : 'lg:ml-64'">
      <!-- Dashboard Header -->
      <div class="bg-white border-b border-gray-100 sticky top-0 z-30 hidden lg:block">
        <div class="px-6 py-1.5">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-xl font-bold text-gray-900">{{ pageTitle }}</h1>
              <p class="text-sm text-gray-500">{{ pageDescription }}</p>
            </div>
            <div class="flex items-center gap-4">
              <!-- Notifications Bell -->
              <NuxtLink to="/dashboard/notifications" class="w-10 h-10 rounded-md bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-parentPrimary hover:text-white transition-all">
                <Bell class="w-5 h-5" />
              </NuxtLink>

              <!-- User Profile -->
              <div class="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-md">
                <div class="w-10 h-10 rounded-md bg-parentPrimary text-white flex items-center justify-center font-semibold">
                  {{ userInitials }}
                </div>
                <div class="text-left">
                  <p class="text-sm font-semibold text-gray-900">{{ userDisplayName }}</p>
                  <p class="text-sm text-gray-500">{{ user?.email }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <div class="bg-white py-6">
        <slot />
      </div>
    </main>

     <Transition
  enter-active-class="transition ease-out duration-300"
  enter-from-class="opacity-0"
  enter-to-class="opacity-100"
  leave-active-class="transition ease-in duration-200"
  leave-from-class="opacity-100"
  leave-to-class="opacity-0"
>
  <div
    v-if="logoutModalOpen"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
    @click.self="logoutModalOpen = false"
  >
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="logoutModalOpen"
        class="bg-white rounded-md max-w-sm w-full p-6 sm:p-7 flex flex-col items-center text-center space-y-5"
      >
        <!-- Icon -->
        <div class="w-14 h-14 rounded-md bg-rose-50 flex items-center justify-center">
          <LogOut class="w-7 h-7 text-rose-500" />
        </div>

        <!-- Content -->
        <div class="space-y-1">
          <h3 class="text-xl font-semibold text-gray-900">
            Leaving already?
          </h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            You’ll be signed out of your account.  
            Don’t worry — your store data will be waiting for you ✨
          </p>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 w-full pt-2">
          <button
            @click="logoutModalOpen = false"
            class="w-full px-4 py-2 rounded-md text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Stay logged in
          </button>

          <button
            @click="confirmLogout"
            class="w-full px-4 py-2 rounded-md text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </Transition>
  </div>
</Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useUser } from '@/composables/modules/auth/user'
import { useVendorProfile } from '@/composables/modules/vendors'
import { useRouter, useRoute } from 'vue-router'
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  Wallet, 
  Settings, 
  LogOut, 
  X,
  Bell,
  Megaphone,
  Clock,
  Menu,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'
import { useRealtimeNotifications } from '@/composables/core/useRealtimeNotifications'

import { useVendorNotifications } from '@/composables/useVendorNotifications'

useRealtimeNotifications() // Initialize listener

const route = useRoute()
const router = useRouter()
const { user, logOut } = useUser()
const { profile, fetchProfile } = useVendorProfile()
const { requestPermissionAndRegister, listenForOrders } = useVendorNotifications()
const showMobileMenu = ref(false)
const logoutModalOpen = ref(false)
const isSidebarMinimized = ref(false)

onMounted(() => {
  if (!profile.value) {
    fetchProfile()
  }
  
  // Setup push notifications
  requestPermissionAndRegister()
  listenForOrders()
})

const navItems = computed(() => {
  const isServiceProvider = profile.value?.businessType === 'service_provider';
  const isHybrid = profile.value?.businessType === 'hybrid';

  const items = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  if (isServiceProvider || isHybrid) {
    items.push({ path: '/dashboard/services', label: 'Services', icon: ClipboardList }); 
    items.push({ path: '/dashboard/appointments', label: 'Appointments', icon: Clock }); 
  }

  if (!isServiceProvider || isHybrid) {
    items.push({ path: '/dashboard/inventory', label: 'Inventory', icon: Package });
    items.push({ path: '/dashboard/pre-orders', label: 'Pre-Order Hub', icon: Clock });
    items.push({ path: '/dashboard/orders', label: 'Orders', icon: ClipboardList });
  }

  items.push({ path: '/dashboard/categories', label: 'Store Categories', icon: ClipboardList });

  items.push(
    { path: '/dashboard/promotions', label: 'Promotions', icon: Megaphone },
    { path: '/dashboard/chats', label: 'Chats', icon: MessageSquare },
    { path: '/dashboard/wallet', label: 'Wallet', icon: Wallet },
    { path: '/dashboard/notifications', label: 'Notifications', icon: Bell },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings }
  );

  return items;
})

const pageTitles: Record<string, { title: string; description: string }> = {
  '/dashboard': { title: 'Vendor Dashboard', description: 'Monitor your sales and performance' },
  '/dashboard/inventory': { title: 'My Inventory', description: 'Manage your products and stock' },
  '/dashboard/pre-orders': { title: 'Pre-Order Hub', description: 'Manage student pre-order batches and campaigns' },
  '/dashboard/orders': { title: 'Order Management', description: 'Process and track customer orders' },
  '/dashboard/promotions': { title: 'Promotions', description: 'Create banners and special offers' },
  '/dashboard/wallet': { title: 'My Wallet', description: 'Manage your earnings and payouts' },
  '/dashboard/notifications': { title: 'Notifications', description: 'Your recent alerts and messages' },
  '/dashboard/settings': { title: 'Store Settings', description: 'Configure your merchant profile' }
}

const pageTitle = computed(() => pageTitles[route.path]?.title || 'Merchant Dashboard')
const pageDescription = computed(() => pageTitles[route.path]?.description || 'Grow your business with Errander')

const userDisplayName = computed(() => {
  if (!user.value) return 'Vendor'
  return `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim() || user.value.email || 'Vendor'
})

const userInitials = computed(() => {
  if (!user.value) return 'V'
  const first = user.value.firstName || ''
  const last = user.value.lastName || ''
  return (first[0] || last[0] || user.value.email?.[0] || 'V').toUpperCase()
})

const handleLogoutClick = () => {
  logoutModalOpen.value = true
}

const isActive = (path: string) => {
  if (path === '/dashboard') return route.path === '/dashboard' || route.path === '/dashboard/'
  return route.path.startsWith(path)
}

const confirmLogout = () => {
  logOut()
  logoutModalOpen.value = false
}

watch(() => route.path, () => showMobileMenu.value = false)
</script>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.25s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>


