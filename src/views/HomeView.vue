<script setup>
// Dataset dibuat dengan @faker-js/faker (https://fakerjs.dev/)
// Data terdiri dari 1 user dengan total 300 transaksi
import data from '../data/data.json';

// import component
import Header from '../components/Header.vue';
import Cards from '../components/Cards.vue';
import Transaction from '../components/Transaction.vue';
import { getFilterDate } from '../helpers/helpers';

import { ref, watch, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const user = data[0];
const router = useRouter();
const filter = ref(7);

function setFilter(dataFilter) {
  filter.value = dataFilter;
}

const transactionData = ref(
  user.transactions.filter(
    (t) => new Date(t.date).getTime() >= getFilterDate(filter.value)
  )
);
watch(filter, () => {
  transactionData.value = user.transactions.filter(
    (t) => new Date(t.date).getTime() >= getFilterDate(filter.value)
  );
});
</script>

<template>
  <div v-if="user">
    <!-- header -->
    <Header :user="user" />

    <!-- Main content -->
    <main class="p-5">
      <!-- Cards Container -->
      <Cards :user="user" :filter="filter" :transactionData="transactionData" />

      <!-- Transaction Container-->
      <Transaction
        :user="user"
        :transactionData="transactionData"
        :filter="filter"
        @setFilter="setFilter"
      />
    </main>
  </div>
</template>
