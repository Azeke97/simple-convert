<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/TheHeader.vue';

const selectedCurrency = ref('RUB');

const handleCurrencyChange = (newCurrency: string) => {
  selectedCurrency.value = newCurrency;
};
</script>

<template>
  <div id="app">
    <Header @currency-changed="handleCurrencyChange" />
    <router-view
      :key="selectedCurrency"
      :base-currency="selectedCurrency"
    />
  </div>
</template>