<script setup>
import Chart from './Chart.vue';
import { defineProps, ref, watch } from 'vue';
import { useToggle } from '@vueuse/core';
import { formatCurrency } from '../helpers/helpers';
import { useRouter } from 'vue-router';

const router = useRouter();

// Toggling balance view
const [showBalance, toggleBalance] = useToggle(true);

// Get property 'user'
const props = defineProps(['user', 'transactionData', 'filter']);

// Calculate inflow and outflow helpers
function calculateTransaction(type) {
  return props.transactionData
    .map((t) => Number(t.amount))
    .filter((amount) => (type == 'inflow' ? amount > 0 : amount < 0))
    .reduce((prev, curr) => prev + curr, 0);
}

const inflow = ref(calculateTransaction('inflow'));
const outflow = ref(calculateTransaction('outflow'));

watch(
  () => props.transactionData,
  () => {
    inflow.value = calculateTransaction('inflow');
    outflow.value = calculateTransaction('outflow');
  }
);
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-3 w-full">
    <!-- 1st Card: Account Balance -->
    <div
      class="flex flex-col justify-between w-full flex-1 min-h-60 bg-gray-100 text-gray-500 rounded-xl shadow-sm p-5"
    >
      <div>
        <p class="font-bold text-sm border-b-[1px] pb-2">
          Account number
          <span class="text-blue-700">{{ user.cardNumber }}</span>
        </p>
        <p class="font-bold text-sm pt-2">
          IBAN <span class="text-blue-700">{{ user.iban }}</span>
        </p>
      </div>

      <div>
        <p class="font-bold text-sm">Account Balance</p>
        <div class="flex items-center gap-5">
          <p
            :class="`font-bold text-4xl text-gray-800 ${
              showBalance ? '' : 'blur-md'
            }`"
          >
            {{ formatCurrency(user.balance) }}
          </p>
          <svg
            v-if="showBalance"
            @click="toggleBalance()"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 stroke-blue-700 stroke-3 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <svg
            v-else
            @click="toggleBalance()"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 stroke-blue-700 stroke-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- 2nd Card: Chart Inflow-Outflow -->
    <div
      class="flex flex-col justify-between sm:flex-1 w-full sm:h-auto bg-gray-100 text-gray-500 rounded-xl shadow-sm p-5"
    >
      <p class="text-sm">Last {{ props.filter }} days</p>
      <Chart
        :key="transactionData"
        height="auto"
        width="100%"
        :chartData="transactionData"
      />
    </div>

    <!-- 3rd Card -->
    <div class="flex flex-col gap-3 flex-1">
      <div
        class="flex flex-1 flex-col justify-between gap-3 min-h-40 w-full bg-gray-100 text-gray-500 rounded-xl shadow-sm p-5"
      >
        <div class="flex justify-between border-b-[1px] pb-3">
          <p>Inflows</p>
          <span class="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            Last {{ props.filter }} days
          </span>
        </div>
        <div class="flex justify-between items-end">
          <p class="font-bold text-4xl text-gray-800">
            {{ formatCurrency(inflow) }}
          </p>
          <span
            @click="router.push('/inflow')"
            class="flex gap-2 text-sm items-center cursor-pointer text-blue-700 font-semibold"
            >See details

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </div>
      </div>
      <div
        class="flex flex-1 flex-col min-h-40 justify-between gap-3 w-full bg-gray-100 text-gray-500 rounded-xl shadow-sm p-5"
      >
        <div class="flex justify-between border-b-[1px] pb-3">
          <p>Outflows</p>
          <span class="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            Last {{ props.filter }} days
          </span>
        </div>
        <div class="flex justify-between items-end">
          <p class="font-bold text-4xl text-gray-800">
            {{ formatCurrency(outflow) }}
          </p>
          <span
            @click="router.push('/outflow')"
            class="flex gap-2 text-sm items-center cursor-pointer text-blue-700 font-semibold"
            >See details

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
