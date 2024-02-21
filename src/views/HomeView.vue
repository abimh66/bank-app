<script setup>
// import component
import Header from '../components/Header.vue';
import Cards from '../components/Cards.vue';
import Loading from '../components/Loading.vue';
import Transaction from '../components/Transaction.vue';
import { getFilterDate } from '../helpers/helpers';
import { ref, watch, onMounted } from 'vue';
import { useUsersStore } from '@/stores/users';

const usersStore = useUsersStore();
onMounted(() => {
  usersStore
    .fetchUser()
    .then(() => (user.value = usersStore.users.find((u) => u.id == id)))
    .then(() => {
      transactionData.value = user.value.transactions
        .filter(
          (t) => new Date(t.date).getTime() >= getFilterDate(filter.value)
        )
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    });
});

const user = ref(null);
const transactionData = ref(null);
const filter = ref(7);
const id = localStorage.getItem('storedDataId');

function setFilter(dataFilter) {
  filter.value = dataFilter;
}

watch(filter, () => {
  transactionData.value = user.value.transactions
    .filter((t) => new Date(t.date).getTime() >= getFilterDate(filter.value))
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
