<script setup>
import Chart from '../components/Chart.vue';
import Loading from '../components/Loading.vue';
import Header from '../components/Header.vue';
import Transaction from '../components/Transaction.vue';

import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users';

const usersStore = useUsersStore(); //Menggunakan pinia user store yang telah dibuat
const storedId = localStorage.getItem('storedDataId'); // Mengambil storedDataId dari web local storage
const router = useRouter(); // Menginisiasi router

// Membuat variabel reactive untuk user, transactionData, inflowTotal, filter
const user = ref(null);
const transactionData = ref([]);
const inflowTotal = ref(null);
const filter = ref(7);

// OnMounted akan menjalankan callback function saat components telah di-mount
onMounted(() => {
  // Cek apakah local storage menyimpan id user aktif
  // Jika tidak, maka router akan diarahkan kembali ke halaman login
  if (!storedId) return router.push('/login');

  // Fetching data, kemudian assign data ke
  // variabel user, transactionData, dan inflowTotal
  usersStore
    .fetchUser()
    .then(() => (user.value = usersStore.users.find((u) => u.id == storedId)))
    .then(() => {
      // filter transactionData sesuai dengan date dan amount
      transactionData.value = user.value.transactions
        .filter(
          (t) =>
            new Date(t.date).getTime() >=
              usersStore.getFilterDate(filter.value) && t.amount > 0
        )
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    })
    .then(() => {
      inflowTotal.value = transactionData.value
        .map((data) => +data.amount)
        .reduce((acc, curr) => acc + curr, 0)
        .toFixed(2);
    });
});

// Fungsi untuk menetapkan nilai filter
function setFilter(dataFilter) {
  filter.value = dataFilter;
}

// Jika nilai filter berubah maka transactionData dan inflowTotal
// juga berubah sesuai dengan nilai filter terbaru
watch(filter, () => {
  transactionData.value = user.value.transactions
    .filter(
      (t) =>
        new Date(t.date).getTime() >= usersStore.getFilterDate(filter.value) &&
        t.amount > 0
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  inflowTotal.value = transactionData.value
    .map((data) => +data.amount)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);
});
</script>

<template>
  <div v-if="user">
    <Header :user="user" />
    <div class="flex flex-col gap-5 p-5">
      <!-- title -->
      <div class="flex w-full justify-between">
        <h2 class="font-bold text-2xl">Inflows</h2>
        <div class="flex gap-1 items-end">
          <p class="font-semibold text-sm text-gray-500">Total inflows</p>
          <p class="font-bold text-2xl">
            {{ usersStore.formatCurrency(inflowTotal) }}
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
  </div>
  <Loading v-else />
</template>
