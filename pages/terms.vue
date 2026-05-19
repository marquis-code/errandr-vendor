<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 scroll-smooth">
    <!-- Navbar -->
    <LandingNavbar />

    <!-- Hero Section -->
    <section class="relative pt-40 pb-20 overflow-hidden bg-gray-900">
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-parentPrimary/20 rounded-full blur-[120px] translate-x-1/4"></div>
      </div>

      <div class="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-sm font-medium text-gray-300 mb-8 shadow-sm">
          <Gavel class="w-4 h-4 text-parentPrimary" />
          Merchant Agreement
        </div>
        <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white mb-6 max-w-4xl mx-auto">
          Vendor <span class="text-parentPrimary ">Framework.</span>
        </h1>
        <p class="text-sm font-medium text-gray-400">Last Updated: January 26, 2026</p>
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
                <div class="text-lg text-gray-600 font-medium leading-relaxed tracking-tight" v-html="section.content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
import { Gavel } from 'lucide-vue-next'
definePageMeta({ layout: false })
useHead({ 
  title: 'Vendor Agreement - Erranders Business',
  meta: [{ name: 'description', content: 'Legal framework and guidelines for merchants on the Erranders campus delivery platform.' }] 
})

const termsSections = [
  {
    title: "Merchant Relationship",
    content: "By registering as a Vendor, you enter into a service agreement with Erranders Technologies Ltd. You operate as an independent merchant, retaining full control over your menu, pricing, and operating hours."
  },
  {
    title: "Safety & Quality",
    content: "Vendors are solely responsible for ensuring all products meet health and safety standards. Maintain proper handling and storage. Erranders reserves the right to suspend accounts based on consistent quality reports."
  },
  {
    title: "Commissions & Fees",
    content: "Erranders charges a standard commission on completed orders. Rates are communicated during registration and may be updated with 30 days written notice to the merchant."
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
    content: "For legal inquiries or account disputes, contact <a href='mailto:legal@erranders.org' class='text-parentPrimary hover:underline'>legal@erranders.org</a>."
  }
]
</script>

