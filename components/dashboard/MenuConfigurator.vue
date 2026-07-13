<template>
  <div class="space-y-4">
    <!-- List of Groups -->
    <div v-for="(group, groupIndex) in modelValue" :key="groupIndex" class="border border-gray-200 rounded-lg p-4 space-y-4 bg-white relative group">
      
      <!-- Group Header -->
      <div class="flex items-start justify-between">
        <div class="flex-1 space-y-3">
          <input 
            v-model="group.name" 
            placeholder="e.g. Choose Protein" 
            class="text-sm font-bold w-full bg-transparent border-b border-dashed border-gray-300 focus:border-parentPrimary outline-none py-1 placeholder:text-gray-400"
          />
          <div class="flex gap-4 text-xs font-medium text-gray-500">
            <label class="flex items-center gap-1">
              Min Selection: 
              <input type="number" v-model.number="group.minSelection" min="0" class="w-12 px-1 py-0.5 border rounded-sm outline-none" />
            </label>
            <label class="flex items-center gap-1">
              Max Selection: 
              <input type="number" v-model.number="group.maxSelection" min="1" class="w-12 px-1 py-0.5 border rounded-sm outline-none" />
            </label>
          </div>
        </div>
        <button type="button" @click="removeGroup(groupIndex)" class="text-rose-500 p-1 hover:bg-rose-50 rounded-md transition-colors opacity-0 group-hover:opacity-100">
          <Trash2 class="w-4 h-4" />
        </button>
      </div>

      <!-- Items in Group -->
      <div class="pl-2 border-l-2 border-gray-100 space-y-2">
        <div v-for="(item, itemIndex) in group.items" :key="itemIndex" class="flex gap-2 items-center">
          <input 
            v-model="item.name" 
            placeholder="Item name (e.g. Chicken)" 
            class="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded outline-none focus:border-parentPrimary"
          />
          <div class="relative">
            <span class="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">₦</span>
            <input 
              v-model.number="item.price" 
              type="number" 
              placeholder="0" 
              class="w-24 pl-6 pr-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded outline-none focus:border-parentPrimary"
            />
          </div>
          <button type="button" @click="removeItem(groupIndex, itemIndex)" class="text-gray-400 hover:text-rose-500 p-1">
            <X class="w-4 h-4" />
          </button>
        </div>
        <button type="button" @click="addItem(groupIndex)" class="text-xs font-bold text-parentPrimary flex items-center gap-1 mt-1 hover:underline">
          <Plus class="w-3 h-3" /> Add Option
        </button>
      </div>
    </div>

    <!-- Add Group Button -->
    <button type="button" @click="addGroup" class="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs font-bold text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
      <Plus class="w-4 h-4" /> Add {{ type === 'modifier' ? 'Required Group (Modifiers)' : 'Optional Group (Add-ons)' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { Trash2, Plus, X } from 'lucide-vue-next';
import { PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array as PropType<any[]>,
    required: true
  },
  type: {
    type: String,
    default: 'modifier'
  }
});

const emit = defineEmits(['update:modelValue']);

const addGroup = () => {
  const newGroup = {
    name: '',
    minSelection: props.type === 'modifier' ? 1 : 0,
    maxSelection: 1,
    items: [{ name: '', price: 0 }]
  };
  emit('update:modelValue', [...props.modelValue, newGroup]);
};

const removeGroup = (index: number) => {
  const updated = [...props.modelValue];
  updated.splice(index, 1);
  emit('update:modelValue', updated);
};

const addItem = (groupIndex: number) => {
  const updated = [...props.modelValue];
  updated[groupIndex].items.push({ name: '', price: 0 });
  emit('update:modelValue', updated);
};

const removeItem = (groupIndex: number, itemIndex: number) => {
  const updated = [...props.modelValue];
  updated[groupIndex].items.splice(itemIndex, 1);
  emit('update:modelValue', updated);
};
</script>
