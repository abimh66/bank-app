<script setup>
import Profile from './Profile.vue';
import { defineProps, watch } from 'vue';
import { useToggle } from '@vueuse/core';
import Navbar from '../components/Navbar.vue';

// Get props user from parent component
const { user } = defineProps(['user']);

// Toggling navbar view
const [showNav, toggleNav] = useToggle();

// Menambahkan style overflow pada body sesuai dengan nilai showNav
watch(showNav, () => {
  document.querySelector('body').style.overflow = showNav.value
    ? 'hidden'
    : 'auto';
});
</script>

<template>
  <header class="flex justify-between items-center p-3 border-b-[1px]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 cursor-pointer"
      @click="toggleNav()"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
    <div class="flex gap-4 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5 cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5 cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
        />
      </svg>

      <Profile
        :abbreviation="user.firstName.charAt(0) + user.lastName.charAt(0)"
      />
    </div>
  </header>
  <Navbar @clickToggle="toggleNav()" :showNav="showNav" :user="user" />
</template>
