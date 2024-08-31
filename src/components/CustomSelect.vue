<template>
  <div class="relative inline-block w-full">
    <div
      class="border p-2 bg-white rounded cursor-pointer flex justify-between items-center"
      @click="toggleDropdown"
    >
      <span>{{ selectedOption }}</span>
      <svg
        :class="{ 'transform rotate-180': isOpen }"
        class="w-4 h-4 ml-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
    <ul
      v-if="isOpen"
      class="absolute left-0 top-full mt-2 w-full bg-white border rounded shadow-md z-10"
    >
      <li
        v-for="option in options"
        :key="option"
        class="p-2 hover:bg-gray-200 cursor-pointer"
        @click="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ modelValue: string, options: string[] }>();
const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedOption = ref(props.modelValue);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: string) => {
  selectedOption.value = option;
  emit('update:modelValue', option);
  isOpen.value = false;
};

watch(() => props.modelValue, (newValue) => {
  selectedOption.value = newValue;
});
</script>