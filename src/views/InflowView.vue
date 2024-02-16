<script setup>
// Dataset dibuat dengan @faker-js/faker (https://fakerjs.dev/)
// Data terdiri dari 1 user dengan total 300 transaksi
import data from '../data/data.json';
import Chart from '../components/Chart.vue';
import { getFilterDate } from '../helpers/helpers';
import Header from '../components/Header.vue';
import Transaction from '../components/Transaction.vue';
import { ref, watch } from 'vue';

const user = data[0];

const filter = ref(7);
function setFilter(dataFilter) {
  filter.value = dataFilter;
}

const transactionData = ref(
  user.transactions.filter(
    (t) =>
      new Date(t.date).getTime() >= getFilterDate(filter.value) && t.amount > 0
  )
);
const inflowTotal = ref(
  transactionData.value
    .map((data) => +data.amount)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2)
);

watch(filter, () => {
  transactionData.value = user.transactions.filter(
    (t) =>
      new Date(t.date).getTime() >= getFilterDate(filter.value) && t.amount > 0
  );

  inflowTotal.value = transactionData.value
    .map((data) => +data.amount)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);
});
</script>

<template>
  <Header :user="user" />
  <div class="flex flex-col gap-5 p-5">
    <!-- title -->
    <div class="flex w-full justify-between">
      <h2 class="font-bold text-2xl">Inflows</h2>
      <div class="flex gap-1 items-end">
        <p class="font-semibold text-sm text-gray-500">Total inflows</p>
        <p class="font-bold text-2xl">
          {{
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(inflowTotal)
          }}
        </p>
      </div>
    </div>

    <!-- inflow chart -->
    <div
      class="flex flex-col self-center justify-between w-full sm:max-w-2xl sm:h-auto bg-gray-100 text-gray-500 rounded-xl shadow-sm p-5"
    >
      <p class="text-sm">Last {{ filter }} days</p>
      <Chart :chartData="transactionData" :key="transactionData" />
    </div>

    <!-- transaction detail -->
    <div class="w-full">
      <Transaction
        :user="user"
        :filter="filter"
        :transactionData="transactionData"
        @setFilter="setFilter"
      />
    </div>
  </div>
</template>
