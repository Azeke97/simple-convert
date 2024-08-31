<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">
      Курсы валют
    </h1>
    <div
      v-if="loading"
      class="flex justify-center items-center"
    >
      <div class="loader" />
    </div>
    <ul
      v-else
      class="space-y-2"
    >
      <li
        v-for="(rate, currency) in rates"
        :key="currency"
        class="text-lg"
      >
        1 {{ baseCurrency }} = {{ rate.toFixed(2) }} {{ currency }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{ baseCurrency: string }>();
const rates = ref<{ [key: string]: number }>({});
const loading = ref(true);

const getCurrency = async () => {
  loading.value = true;
  try {
    const response = await fetch(`https://status.neuralgeneration.com/api/currency`);
    const data = await response.json();
    const base = props.baseCurrency.toLowerCase();

    rates.value = {
      USD: base === 'usd' ? 1 : (data[`${base}-usd`] || 1 / data[`usd-${base}`]),
      EUR: base === 'eur' ? 1 : (data[`${base}-eur`] || 1 / data[`eur-${base}`]),
      RUB: base === 'rub' ? 1 : (data[`${base}-rub`] || 1 / data[`rub-${base}`])
    };
  } catch (error) {
    console.error("Ошибка загрузки данных: ", error);
  } finally {
    loading.value = false;
  }
};

watch(() => props.baseCurrency, getCurrency);

onMounted(getCurrency);
</script>
