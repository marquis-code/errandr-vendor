<template>
 <div class="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-6 pb-24">
 <div class="max-w-xl w-full space-y-8">
 <!-- Progress Bar -->
 <div class="flex gap-2">
 <div v-for="i in 3" :key="i" 
 class="h-1 flex-1 rounded-full transition-all duration-500"
 :class="step >= i ? 'bg-primary-500 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]' : 'bg-white/10'"
 />
 </div>

 <!-- Step Content -->
 <div class="glass p-8 rounded-3xl border-white/5 relative overflow-hidden">
 <div class="absolute -top-20 -left-20 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
 
 <!-- Step 1: Basic Info -->
 <div v-if="step === 1" class="space-y-6 animate-fade-in">
 <div class="text-center space-y-2 mb-8">
 <div class="w-16 h-16 bg-primary-500/20 text-primary-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
 <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
 </div>
 <h2 class="text-2xl font-black text-white">Let's set up your store</h2>
 <p class="text-dark-400 text-sm">Every student business starts with a great profile.</p>
 </div>

 <div class="space-y-4">
 <div>
 <label class="block text-[10px] font-bold text-dark-500 tracking-widest mb-2">Store Name</label>
 <input v-model="form.storeName" type="text" class="glass-input w-full p-4" placeholder="e.g. Tunde's Tasty Treats" />
 </div>
 <div>
 <label class="block text-[10px] font-bold text-dark-500 tracking-widest mb-2">Store Description</label>
 <textarea v-model="form.description" rows="3" class="glass-input w-full p-4 resize-none" placeholder="What do you sell? Tell your customers..."></textarea>
 </div>
 </div>
 </div>

 <!-- Step 2: Product & Type -->
 <div v-if="step === 2" class="space-y-6 animate-fade-in">
 <div class="text-center space-y-2 mb-8">
 <div class="w-16 h-16 bg-accent-500/20 text-accent-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
 <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
 </div>
 <h2 class="text-2xl font-black text-white">Pre-order Setup</h2>
 <p class="text-dark-400 text-sm">Do you need time to prepare your items?</p>
 </div>

 <div class="space-y-6">
 <div class="flex items-center justify-between p-4 glass rounded-2xl border-white/5 cursor-pointer hover:border-primary-500/30 transition-all" @click="form.preOrderOnly = !form.preOrderOnly">
 <div>
 <p class="text-sm font-bold text-white">Pre-order Only</p>
 <p class="text-xs text-dark-500">Customers must order in advance.</p>
 </div>
 <div class="w-12 h-6 rounded-full relative transition-colors duration-300" :class="form.preOrderOnly ? 'bg-primary-500' : 'bg-dark-800'">
 <div class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300" :class="form.preOrderOnly ? 'translate-x-6' : ''" />
 </div>
 </div>

 <div v-if="form.preOrderOnly">
 <label class="block text-[10px] font-bold text-dark-500 tracking-widest mb-2">Preparation Lead Time (Hours)</label>
 <input v-model="form.preOrderLeadTime" type="number" class="glass-input w-full p-4" placeholder="e.g. 24" />
 </div>
 </div>
 </div>

 <!-- Step 3: Identity -->
 <div v-if="step === 3" class="space-y-6 animate-fade-in">
 <div class="text-center space-y-2 mb-8">
 <div class="w-16 h-16 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
 <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
 </div>
 <h2 class="text-2xl font-black text-white">Final Touch</h2>
 <p class="text-dark-400 text-sm">You're almost there! Let's verify your student status.</p>
 </div>

 <div class="space-y-4">
 <div class="p-6 border-2 border-dashed border-white/10 rounded-2xl text-center hover:border-primary-500/30 transition-all cursor-pointer">
 <p class="text-xs text-dark-400 mb-2">Upload Student ID (Optional)</p>
 <p class="text-[10px] text-dark-600">Helps build trust with customers</p>
 </div>
 
 <div class="flex items-center gap-3 p-4 bg-primary-500/5 rounded-2xl border border-primary-500/10">
 <span class="text-xl">🎓</span>
 <p class="text-[10px] text-primary-400 font-bold leading-tight tracking-wider">You are joining as a Student Entrepreneur. Listing is 100% free.</p>
 </div>
 </div>
 </div>

 <!-- Nav Buttons -->
 <div class="flex gap-4 mt-8">
 <button v-if="step > 1" @click="step--" class="flex-1 py-4 glass rounded-xl text-sm font-bold text-dark-400 hover:text-white transition-all">Back</button>
 <button @click="nextStep" class="flex-[2] btn-primary py-4 rounded-xl text-sm font-bold tracking-widest">
 {{ step === 3 ? 'Launch My Store' : 'Continue' }}
 </button>
 </div>
 </div>
 </div>
 </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useHead } from '#imports';

const router = useRouter();
import { GATEWAY_ENDPOINT_WITH_AUTH as api } from '@/api_factory/axios.config';
const step = ref(1);

const form = ref({
 storeName: '',
 description: '',
 preOrderOnly: false,
 preOrderLeadTime: 24,
 isStudentBusiness: true
});

const nextStep = async () => {
 if (step.value < 3) {
 step.value++;
 } else {
 try {
 await api.put('/vendors/profile', form.value);
 router.push('/dashboard');
 } catch (e) {
 console.error(e);
 }
 }
};

useHead({ title: 'Vendor Onboarding - Errandr' });
</script>
