<script setup>
// Dataset dibuat dengan @faker-js/faker (https://fakerjs.dev/)
// Data terdiri dari 1 user dengan total 300 transaksi
import data from '../data/data.json';

// import component
import Header from '../components/Header.vue';
import Navbar from '../components/Navbar.vue';
import Cards from '../components/Cards.vue';
import Transaction from '../components/Transaction.vue';

// import { ref } from 'vue';
import { useToggle } from '@vueuse/core';

const user = data[0];

// Toggling navbar view
const [showNav, toggleNav] = useToggle();
</script>

<template>
  <div :class="`${showNav ? 'overflow-y-hidden' : ''}`">
    <!-- header -->
    <Header @clickToggle="toggleNav()" :user="user" />

    <!-- Navbar -->
    <Navbar @clickToggle="toggleNav()" :showNav="showNav" :user="user" />

    <!-- Main content -->
    <main class="p-5">
      <!-- Cards Container -->
      <Cards :user="user" />

      <!-- Transaction Container-->
      <Transaction :user="user" />
    </main>
  </div>
</template>
