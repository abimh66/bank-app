<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToggle } from '@vueuse/core';
import Notification from '../components/Notification.vue';

const cardNumber = reactive({ status: true, value: null });
const pin = reactive({ status: true, value: null });
const password = reactive({ status: true, value: null });
const enterPasswordForm = ref(false);
const [notif, setNotif] = useToggle('');
const router = useRouter();

function verificationHandler() {
  cardNumber.status = true;
  pin.status = true;

  if (
    !cardNumber.value ||
    cardNumber.value?.length < 9 ||
    cardNumber.value?.length > 13
  ) {
    console.log(cardNumber.value?.length);
    cardNumber.status = false;
    setNotif('failed');
    setTimeout(() => {
      setNotif('');
    }, 2000);
    return;
  }

  if (!pin.value || pin.value.length < 6) {
    pin.status = false;
    setNotif('failed');
    setTimeout(() => {
      setNotif('');
    }, 2000);
    return;
  }

  enterPasswordForm.value = true;
}

function newPasswordHandler() {
  password.status = true;

  if (!password.value || password.value.length < 6) {
    password.status = false;
    setNotif('failed');
    setTimeout(() => {
      setNotif('');
    }, 2000);
    return;
  }

  setNotif('success');
  setTimeout(() => {
    setNotif('');
    router.push('/login');
  }, 2000);
}
</script>

<template>
  <div class="flex flex-col">
    <div class="p-5"><h1 class="font-bold">BANK</h1></div>
    <!-- flex items-center w-full self-center justify-center sm:max-w-2xl -->
    <div
      class="flex items-center w-full self-center justify-center sm:max-w-2xl"
    >
      <div class="p-10 flex flex-col gap-5 w-3/4">
        <h2 class="font-bold text-2xl">Forgot Password</h2>
        <form
          v-if="!enterPasswordForm"
          @submit.prevent="verificationHandler"
          class="flex flex-col gap-3"
        >
          <div class="flex flex-col">
            <label>ATM Card Number</label>
            <input
              v-model="cardNumber.value"
              type="text"
              class="border rounded-md h-10 px-2"
              placeholder="Enter your 9-13 card number"
            />
            <p v-if="!cardNumber.status" class="text-sm text-red-500">
              *Please enter your 9-13 long card number
            </p>
          </div>
          <div class="flex flex-col">
            <label>ATM PIN</label>
            <input
              v-model="pin.value"
              type="password"
              class="border rounded-md h-10 px-2"
              placeholder="Enter your PIN here"
            />
            <p v-if="!pin.status" class="text-sm text-red-500">
              *Please enter your correct PIN
            </p>
          </div>
          <button class="bg-blue-500 rounded-md p-2 mt-4 text-white">
            Input
          </button>
        </form>
        <form
          @submit.prevent="newPasswordHandler"
          v-else
          class="flex flex-col gap-3"
        >
          <div class="flex flex-col">
            <label>Password</label>
            <input
              v-model="password.value"
              type="password"
              class="border rounded-md h-10 px-2"
              placeholder="Enter your new password here"
            />
            <p v-if="!password.status" class="text-sm text-red-500">
              *Please enter minimum 6 characters
            </p>
          </div>
          <button class="bg-blue-500 rounded-md p-2 mt-4 text-white">
            Input
          </button>
        </form>
      </div>
    </div>
  </div>

  <Notification :status="notif" />
</template>
