<script setup>
import { defineProps } from 'vue';

const props = defineProps(['abbreviation']);
</script>

<template>
  <span
    class="rounded-full uppercase flex items-center justify-center font-semibold bg-blue-600 w-10 h-10 text-center text-white"
    >{{ props.abbreviation }}</span
  >
</template>
