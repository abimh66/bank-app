<script setup>
import Header from '../components/Header.vue';
import Notification from '../components/Notification.vue';
import data from '../data/data.json';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { useToggle } from '@vueuse/core';
import { fakerID_ID, faker } from '@faker-js/faker';

const user = data[0];
const router = useRouter();

const cardNumber = reactive({ status: true, value: null });
const amountTransfer = reactive({ status: true, value: null });
const pin = reactive({ status: true, value: null });
const [notif, setNotif] = useToggle('');

function submitHandler() {
  cardNumber.status = true;
  amountTransfer.status = true;
  pin.status = true;

  if (
    !cardNumber.value ||
    cardNumber.value?.length < 9 ||
    cardNumber.value?.length > 13
  ) {
    cardNumber.status = false;
    setNotif('failed');
    setTimeout(() => {
      setNotif('');
    }, 2000);
    return;
  }

  // Check Amount transfer
  if (!amountTransfer.value || Number(amountTransfer) > user.balance) {
    amountTransfer.status = false;
    setNotif('failed');
    setTimeout(() => {
      setNotif('');
    }, 2000);
    return;
  }

  // check PIN
  if (pin.value !== user.pin) {
    pin.status = false;
    setNotif('failed');
    setTimeout(() => {
      setNotif('');
    }, 2000);
    return;
  }

  // const newTransaction = {
  //   idTransaction:
  //     '#' + faker.string.alphanumeric({ length: 8, casing: 'upper' }),
  //   transactionName: faker.helpers.fake([
  //     '{{company.name}} Corp.',
  //     '{{person.fullName}}',
  //   ]),
  //   transactionType: 'payment',
  //   amount: amountTransfer.value,
  //   date: new Date().toISOString(),
  // };

  // if Success show notification success and delete all the input
  setNotif('success');
  setTimeout(() => {
    setNotif('');
    router.push('/');
  }, 2000);
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
              class="border rounded-md h-10 px-2"
              placeholder="9 to 13 card number"
            />
            <p v-if="!cardNumber.status" class="text-sm text-red-500">
              *Please enter correct Card Number
            </p>
          </div>
          <div class="flex flex-col">
            <label>Amount</label>
            <input
              v-model="amountTransfer.value"
              type="number"
              class="border rounded-md h-10 px-2"
              placeholder="Input amount to transfer"
            />
            <p v-if="!amountTransfer.status" class="text-sm text-red-500">
              *Please enter amount of transfer
            </p>
          </div>
          <div class="flex flex-col">
            <label>PIN</label>
            <input
              v-model="pin.value"
              type="password"
              max="6"
              maxlength="6"
              class="border rounded-md h-10 px-2"
              placeholder="Enter your pin here"
            />
            <p v-if="!pin.status" class="text-sm text-red-500">
              *Please enter correct PIN
            </p>
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
