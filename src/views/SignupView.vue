<script setup>
import { reactive, onMounted } from 'vue';
import Notification from '../components/Notification.vue';
import { useToggle } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users';
import { fakerID_ID, faker } from '@faker-js/faker';

const usersStore = useUsersStore();
onMounted(() => usersStore.fetchUser());

const router = useRouter();
const cardNumber = reactive({ status: true, value: '' });
const userId = reactive({ status: true, value: '' });
const password = reactive({ status: true, value: '' });
const [notif, setNotif] = useToggle('');

function submitHandler() {
  cardNumber.status = true;
  userId.status = true;
  password.status = true;

  if (
    !cardNumber.value ||
    cardNumber.value?.length < 9 ||
    cardNumber.value?.length > 13
  ) {
    return (cardNumber.status = false);
  }

  if (!userId.value || userId.value.length < 6) {
    return (userId.status = false);
  }

  if (!password.value || password.value.length < 6) {
    return (password.status = false);
  }

  const objDataUser = {
    id: faker.database.mongodbObjectId(),
    firstName: fakerID_ID.person.firstName(),
    lastName: fakerID_ID.person.lastName(),
    userId: userId.value,
    password: password.value,
    cardNumber: cardNumber.value,
    iban: fakerID_ID.finance.iban(),
    pin: faker.finance.pin(6),
    balance: fakerID_ID.finance.amount({ min: 100, max: 10000 }),
    transactions: [],
  };

  console.log(objDataUser);

  usersStore.addNewUser(objDataUser).then((responseStatus) => {
    if (responseStatus !== 404) {
      setNotif('success');
      setTimeout(() => {
        setNotif('');
        router.push('/login');
      }, 2000);
    } else {
      setNotif('failed');
      setTimeout(() => {
        setNotif('');
      }, 2000);
    }
  });
}
</script>

<template>
  <div class="flex flex-col">
    <div class="p-5"><h1 class="font-bold">BANK</h1></div>

    <div
      class="flex items-center w-full self-center justify-center sm:max-w-2xl"
    >
      <div class="p-10 flex flex-col gap-5 w-3/4">
        <h2 class="font-bold text-2xl">Sign Up</h2>
        <form @submit.prevent="submitHandler" class="flex flex-col gap-3">
          <div class="flex flex-col">
            <label>ATM Card Number</label>
            <input
              v-model="cardNumber.value"
              type="text"
              class="border rounded-md h-10 px-2"
              placeholder="9-13 your card number"
            />
            <p v-if="!cardNumber.status" class="text-sm text-red-500">
              *Please enter 9-13 length card number
            </p>
          </div>
          <div class="flex flex-col">
            <label>User ID</label>
            <input
              v-model="userId.value"
              type="text"
              class="border rounded-md h-10 px-2"
              placeholder="Create your user id"
            />
            <p v-if="!userId.status" class="text-sm text-red-500">
              *Please enter your user id
            </p>
          </div>
          <div class="flex flex-col">
            <label>Password</label>
            <input
              v-model="password.value"
              type="password"
              class="border rounded-md h-10 px-2"
              placeholder="Enter password"
            />
            <p v-if="!password.status" class="text-sm text-red-500">
              *Please enter your password
            </p>
          </div>

          <button class="bg-blue-500 rounded-md p-2 mt-4 text-white">
            Create Account
          </button>
        </form>
      </div>
    </div>
  </div>

  <Notification :status="notif" />
</template>
