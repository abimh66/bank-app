<script setup>
import Header from '../components/Header.vue';
import Notification from '../components/Notification.vue';
import data from '../data/data.json';
import { ref, reactive } from 'vue';
import { useToggle } from '@vueuse/core';

const user = data[0];
const cardNumber = reactive({ status: true, value: null });
const amountTransfer = reactive({ status: true, value: null });
const pin = reactive({ status: true, value: null });
const [notif, setNotif] = useToggle('');

function submitHandler() {
  console.log(cardNumber.value, amountTransfer.value);
  setNotif('show succes');
  setTimeout(() => {
    setNotif('');
  }, 2000);

  if (pin.value.length !== user.pin) console.log(user.pin);
  if (cardNumber.value.length < 9 || cardNumber.value.length > 13) return;

  router.push('/');
}
</script>
<template>
  <div class="flex flex-col">
    <Header :user="user" />
    <div class="flex items-top border w-full justify-between p-5 gap-2">
      <div class="flex-1 hidden md:flex">
        <img src="../assets/graphic-briguna.png" alt="" />
      </div>
      <div class="p-10 flex flex-1 flex-col gap-5 w-3/4">
        <h2 class="font-bold text-2xl">Transfer</h2>
        <form @submit.prevent="submitHandler" class="flex flex-col gap-3">
          <div class="flex flex-col">
            <label>Card Number</label>
            <input
              v-model="cardNumber.value"
              type="text"
              class="border rounded-md h-10"
            />
            <p class="text-sm text-red-500">
              *Please enter correct Card Number
            </p>
          </div>
          <div class="flex flex-col">
            <label>Amount</label>
            <input
              v-model="amountTransfer.value"
              type="number"
              class="border rounded-md h-10"
            />
            <p class="text-sm text-red-500">*Please enter amount of transfer</p>
          </div>
          <div class="flex flex-col">
            <label>PIN</label>
            <input
              v-model="pin.value"
              type="password"
              max="6"
              maxlength="6"
              class="border rounded-md h-10"
            />
            <p class="text-sm text-red-500">*Please enter correct PIN</p>
          </div>

          <button class="bg-blue-500 rounded-md p-2 mt-4 text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  </div>

  <Notification :status="notif" />
</template>
