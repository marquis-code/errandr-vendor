<template>
  <div class="min-h-screen bg-white">
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2"><div class="w-8 h-8 rounded-lg bg-[#065fdb] flex items-center justify-center"><Store class="w-4 h-4 text-white" /></div><span class="text-lg font-black text-gray-900 tracking-tight">Errandr <span class="text-gray-400 font-medium text-sm">Vendors</span></span></NuxtLink>
        <div class="flex items-center gap-6 text-sm font-semibold text-gray-500">
          <NuxtLink to="/about" class="hover:text-[#065fdb]">About</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-[#065fdb]">Contact</NuxtLink>
          <NuxtLink to="/faq" class="hover:text-[#065fdb]">FAQ</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-[#065fdb]">Terms</NuxtLink>
          <NuxtLink to="/auth/login" class="text-[#065fdb] font-bold">Sign In</NuxtLink>
        </div>
      </div>
    </nav>
    <main class="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 class="text-4xl font-black text-gray-900 tracking-tight mb-2">About Errandr for Vendors</h1>
      <p class="text-lg text-gray-500 mb-10">The digital storefront platform connecting campus food businesses with thousands of hungry students.</p>
      <div class="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        <p>Errandr for Vendors is the merchant arm of the Errandr campus delivery ecosystem. We provide restaurants, eateries, bakeries, and student-run food businesses with a powerful, easy-to-use platform to reach students across campus — without the overhead of building your own delivery infrastructure.</p>
        <h2 class="text-xl font-bold text-gray-900 !mt-10">Why Vendors Choose Errandr</h2>
        <ul class="space-y-3 list-none pl-0">
          <li class="flex items-start gap-3"><CheckCircle class="w-5 h-5 text-[#065fdb] mt-0.5 shrink-0" /> <span><strong>Zero Setup Cost:</strong> Listing your store on Errandr is completely free. No monthly fees, no hidden charges.</span></li>
          <li class="flex items-start gap-3"><CheckCircle class="w-5 h-5 text-[#065fdb] mt-0.5 shrink-0" /> <span><strong>Instant Reach:</strong> Access thousands of students on campus who are actively looking for food and essentials.</span></li>
          <li class="flex items-start gap-3"><CheckCircle class="w-5 h-5 text-[#065fdb] mt-0.5 shrink-0" /> <span><strong>Delivery Handled:</strong> Our network of student riders handle all deliveries — you focus on making great food.</span></li>
          <li class="flex items-start gap-3"><CheckCircle class="w-5 h-5 text-[#065fdb] mt-0.5 shrink-0" /> <span><strong>Analytics Dashboard:</strong> Track orders, revenue, popular items, and customer reviews in real-time.</span></li>
          <li class="flex items-start gap-3"><CheckCircle class="w-5 h-5 text-[#065fdb] mt-0.5 shrink-0" /> <span><strong>Fast Payouts:</strong> Receive payments directly to your bank account with transparent settlement reports.</span></li>
        </ul>
        <h2 class="text-xl font-bold text-gray-900 !mt-10">Student Entrepreneurs Welcome</h2>
        <p>We especially support student-run businesses. If you're a student cooking from your hostel, baking cakes, or selling drinks — Errandr gives you a professional storefront and a delivery fleet without any investment. Apply for our Student Entrepreneur program during registration.</p>
      </div>
    </main>
    <footer class="bg-gray-50 border-t border-gray-200 py-8"><div class="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 font-medium"><p>&copy; {{ new Date().getFullYear() }} Errandr Inc.</p><div class="flex items-center gap-6"><NuxtLink to="/about" class="hover:text-gray-600">About</NuxtLink><NuxtLink to="/contact" class="hover:text-gray-600">Contact</NuxtLink><NuxtLink to="/faq" class="hover:text-gray-600">FAQ</NuxtLink><NuxtLink to="/terms" class="hover:text-gray-600">Terms</NuxtLink></div></div></footer>
  </div>
</template>
<script setup lang="ts">
import { Store, CheckCircle } from 'lucide-vue-next'
definePageMeta({ layout: false })
useHead({ title: 'About - Errandr Vendors', meta: [{ name: 'description', content: 'Learn how Errandr helps campus food vendors grow their business.' }] })
</script>
