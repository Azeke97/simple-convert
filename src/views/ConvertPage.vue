<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import CustomSelect from '@/components/CustomSelect.vue';

const currencies = ref(['USD', 'EUR', 'RUB']);
const currencyFrom = ref('RUB');
const currencyTo = ref('USD');
const amountFrom = ref(1);
const amountTo = ref(0);
const rates = ref<{ [key: string]: number }>({});

const amountFromError = ref<string | null>(null); // ошибка для amountFrom
const amountToError = ref<string | null>(null); // ошибка для amountTo

const getRates = async () => {
  try {
    const response = await fetch(`https://status.neuralgeneration.com/api/currency`);
    const data = await response.json();
    rates.value = {
      'USD': data['usd-rub'] ? 1 / data['usd-rub'] : 1,
      'EUR': data['eur-rub'] ? 1 / data['eur-rub'] : 1,
      'RUB': 1
    };
    convertTo();
  } catch (error) {
    console.error("Ошибка загрузки данных: ", error);
  }
};

const validateAndConvertTo = () => {
  if (isNaN(Number(amountFrom.value))) {
    amountFromError.value = "Введите числовое значение.";
  } else {
    amountFromError.value = null;
    convertTo();
  }
};

const validateAndConvertFrom = () => {
  if (isNaN(Number(amountTo.value))) {
    amountToError.value = "Введите числовое значение.";
  } else {
    amountToError.value = null;
    convertFrom();
  }
};

const convertTo = () => {
  if (rates.value[currencyTo.value]) {
    amountTo.value = parseFloat((amountFrom.value * rates.value[currencyTo.value] / rates.value[currencyFrom.value]).toFixed(2));
  }
};

const convertFrom = () => {
  if (rates.value[currencyFrom.value]) {
    amountFrom.value = parseFloat((amountTo.value * rates.value[currencyFrom.value] / rates.value[currencyTo.value]).toFixed(2));
  }
};

watch(currencyFrom, validateAndConvertTo);
watch(currencyTo, validateAndConvertTo);

onMounted(getRates);
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">
      Конвертация валют
    </h1>
    <div class="flex flex-col md:max-w-[40%] max-w-full gap-y-4">
      <div class="flex gap-4">
        <CustomSelect
          v-model="currencyFrom"
          class="max-w-24"
          :options="currencies"
        />
        <div class="w-full">
          <input
            v-model="amountFrom"
            type="text"
            class="border p-2 rounded w-full"
            @input="validateAndConvertTo"
          >
          <p
            v-if="amountFromError"
            class="text-red-500 text-sm"
          >
            {{ amountFromError }}
          </p>
        </div>
      </div>
      <div class="flex gap-4">
        <CustomSelect
          v-model="currencyTo"
          class="max-w-24"
          :options="currencies"
        />
        <div class="w-full">
          <input
            v-model="amountTo"
            type="text"
            class="border p-2 rounded w-full"
            @input="validateAndConvertFrom"
          >
          <p
            v-if="amountToError"
            class="text-red-500 text-sm"
          >
            {{ amountToError }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>