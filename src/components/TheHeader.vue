<script setup lang="ts">
import { ref } from 'vue';
import CustomSelect from '@/components/CustomSelect.vue';

const baseCurrency = ref('RUB');
const currencies = ref(['USD', 'EUR', 'RUB']);
const emit = defineEmits(['currency-changed']);

const changeCurrency = (newCurrency: string) => {
  baseCurrency.value = newCurrency;
  emit('currency-changed', baseCurrency.value);
};
</script>

<template>
  <header class="p-4 bg-[#0D2533] text-white shadow-md">
    <div class="container mx-auto px-6 flex justify-between items-center">
      <nav class="flex space-x-4">
        <router-link
          to="/"
          class="hover:text-gray-300"
        >
          Главная
        </router-link>
        <router-link
          to="/convert"
          class="hover:text-gray-300"
        >
          Конвертация
        </router-link>
      </nav>
      <CustomSelect
        v-model="baseCurrency"
        class="max-w-[100px] text-[#0D2533]"
        :options="currencies"
        @update:model-value="changeCurrency"
      />
    </div>
  </header>
</template>