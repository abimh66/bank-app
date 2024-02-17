<script setup>
import { defineProps } from 'vue';
const props = defineProps(['status']);
</script>
<template>
  <div
    v-if="status"
    :class="`flex items-center shadow-md z-50 ${
      status == 'success' ? 'bg-green-500' : 'bg-red-500'
    } w-1/2 rounded-sm absolute top-8 left-1/2 -translate-x-1/2 gap-2 p-3 text-white`"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8 stroke-white"
      v-if="status == 'success'"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8"
      v-else
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>

    <p class="font-semibold">
      Transfer {{ status == 'success' ? 'Success' : 'Failed' }}
    </p>
  </div>
</template>
