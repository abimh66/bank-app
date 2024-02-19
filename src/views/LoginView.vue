<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToggle } from '@vueuse/core';
import Notification from '../components/Notification.vue';
import data from '../data/data.json';

// Get data userId and password from json object
const user = data[0];
const dataUserId = user.userId;
const dataPassword = user.password;

const router = useRouter();
const userId = reactive({ status: true, value: null });
const password = reactive({ status: true, value: null });

const [notif, setNotif] = useToggle('');

function submitHandler() {
  userId.status = true;
  password.status = true;

  if (userId.value !== dataUserId) {
    userId.status = false;
    setNotif('failed');
    setTimeout(() => {
      setNotif('');
    }, 2000);
    return;
  }

  if (password.value !== dataPassword) {
    password.status = false;
    setNotif('failed');
    setTimeout(() => {
      setNotif('');
    }, 2000);
    return;
  }

  localStorage.setItem('storedDataId', user.id);
  router.push('/home');
}
</script>

<template>
  <div class="flex flex-col">
    <div class="p-5"><h1 class="font-bold">BANK</h1></div>

    <div
      class="flex items-center w-full self-center justify-center sm:max-w-2xl"
    >
      <div class="p-10 flex flex-col gap-5 w-3/4">
        <h2 class="font-bold text-2xl">Login</h2>
        <form @submit.prevent="submitHandler" class="flex flex-col gap-3">
          <div class="flex flex-col">
            <label>User ID</label>
            <input
              v-model="userId.value"
              type="text"
              class="border rounded-md h-10 px-2"
              placeholder="Enter your user ID here"
            />
            <p v-if="!userId.status" class="text-sm text-red-500">
              *Please enter your User ID
            </p>
          </div>
          <div class="flex flex-col">
            <label>Password</label>
            <input
              v-model="password.value"
              type="password"
              class="border rounded-md h-10 px-2"
              placeholder="Enter your correct password"
            />
            <p v-if="!password.status" class="text-sm text-red-500">
              *Please enter your password
            </p>
          </div>
          <p
            @click="router.push('/forgotpassword')"
            class="text-blue-500 font-semibold text-sm self-end cursor-pointer hover:text-blue-400"
          >
            Forget password?
          </p>
          <button class="bg-blue-500 rounded-md p-2 mt-4 text-white">
            Login
          </button>
        </form>
        <p>
          Don't have an account?
          <span
            @click="() => router.push('/signup')"
            class="text-blue-500 cursor-pointer font-semibold hover:text-blue-400 hover:underline"
            >Sign up</span
          >
        </p>
      </div>
    </div>
  </div>

  <Notification :status="notif" />
</template>
