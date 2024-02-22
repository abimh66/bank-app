<script setup>
// import component
import Header from '../components/Header.vue';
import Cards from '../components/Cards.vue';
import Loading from '../components/Loading.vue';
import Transaction from '../components/Transaction.vue';

import { ref, watch, onMounted } from 'vue';
import { useUsersStore } from '@/stores/users';
import { useRouter } from 'vue-router';

const usersStore = useUsersStore(); //Menggunakan pinia user store yang telah dibuat
const storedId = localStorage.getItem('storedDataId'); // Mengambil storedDataId dari web local storage
const router = useRouter(); // Menginisiasi router

// Membuat variabel reactive untuk user, transactionData, filter
const user = ref(null);
const transactionData = ref(null);
const filter = ref(7);

// OnMounted akan menjalankan callback function saat components telah di-mount
onMounted(() => {
  // Cek apakah local storage menyimpan id user aktif
  // Jika tidak, maka router akan diarahkan kembali ke halaman login
  if (!storedId) return router.push('/login');

  // Fetching data, kemudian assign data ke variabel user dan transactionData
  usersStore
    .fetchUser()
    .then(() => (user.value = usersStore.users.find((u) => u.id == storedId)))
    .then(() => {
      // filter transactionData sesuai dengan date
      transactionData.value = user.value.transactions
        .filter(
          (t) =>
            new Date(t.date).getTime() >= usersStore.getFilterDate(filter.value)
        )
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    });
});

// Fungsi untuk menetapkan nilai filter
function setFilter(dataFilter) {
  filter.value = dataFilter;
}

// Jika nilai filter berubah maka
// transactionData juga berubah sesuai dengan nilai filter terbaru
watch(filter, () => {
  transactionData.value = user.value.transactions
    .filter(
      (t) =>
        new Date(t.date).getTime() >= usersStore.getFilterDate(filter.value)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});
</script>

<template>
  <div v-if="user && transactionData">
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
  <Loading v-else />
</template>
