<script setup>
import { ref, defineProps } from 'vue';

const { user } = defineProps(['user']);

// Helper function to filter date (a week/a month/a year)
function getLastWeeksDate(filterInput) {
  const now = new Date();

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - filterInput
  ).getTime();
}

const transactionData = ref([]);
transactionData.value = user.transactions.filter(
  (t) => new Date(t.date).getTime() >= getLastWeeksDate(7)
);
</script>

<template>
  <div class="mt-10 flex flex-col gap-5">
    <!-- Transaction filter-->
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold text-gray-800">Transactions</h2>
      <div class="flex gap-3 items-center">
        <span class="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 stroke-gray-800"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </span>
        <span
          class="flex gap-2 rounded-xl px-3 py-1 text-sm items-center cursor-pointer text-white bg-blue-700 font-semibold"
          >See all

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

    <!-- Transaction List -->
    <div
      class="flex flex-col gap-3 w-full bg-gray-100 text-gray-500 rounded-xl shadow-sm p-5"
    >
      <!-- Date -->
      <p class="font-semibold text-sm">Last 7 Days</p>
      <!-- List -->
      <div
        v-for="t in transactionData"
        class="flex border-t-[1px] items-start gap-3 py-2"
      >
        <!-- icon -->
        <div
          :class="`${
            t.amount >= 0 ? 'bg-blue-100' : 'bg-red-100'
          } h-fit w-fit rounded-full p-2`"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            :class="`w-6 h-6 ${
              t.amount >= 0 ? 'stroke-blue-800' : 'stroke-red-800'
            }`"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
        </div>
        <!-- Description -->
        <div>
          <p class="font-bold text-gray-800">{{ t.transactionName }}</p>
          <p class="text-sm">Transaction {{ t.idTransaction }}</p>
        </div>

        <p class="font-bold text-gray-800 flex-1 text-right">{{ t.amount }}</p>
      </div>
    </div>
  </div>
</template>
/* { "idTransaction": "#XK3ERCVX", "transactionName": "Lynn Stiedemann",
"transactionType": "payment", "amount": -482, "date": "2024-02-14T14:13:23.531Z"
}, */
