<script setup>
import Notification from '../components/Notification.vue';

import { reactive, onMounted } from 'vue';
import { useToggle } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users';
import { fakerID_ID, faker } from '@faker-js/faker';

const usersStore = useUsersStore(); //Menggunakan pinia user store yang telah dibuat
const storedId = localStorage.getItem('storedDataId'); // Mengambil storedDataId dari web local storage
const router = useRouter(); // Menginisiasi router

// Membuat variabel reactive untuk cardNumber, pin, password
const cardNumber = reactive({ status: true, value: '' });
const userId = reactive({ status: true, value: '' });
const password = reactive({ status: true, value: '' });

const [notif, setNotif] = useToggle(''); //membuat toggle untuk notifikasi

// Cek apakah local storage masih menyimpan id user aktif
// Jika iya, maka router akan diarahkan kembali ke home
onMounted(() => (storedId ? router.push('/home') : usersStore.fetchUser()));

// Function yang akan dipanggil saat form disubmit
function submitHandler() {
  cardNumber.status = true;
  userId.status = true;
  password.status = true;

  // Validasi input, jika salah muncul message yang sesuai
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

  // Membuat random data user dengan fakerAPI
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

  // Membuat random data transaksi user
  for (let j = 0; j < 50; j++) {
    const tType = faker.finance.transactionType();
    const transaction = {
      idTransaction:
        '#' + faker.string.alphanumeric({ length: 8, casing: 'upper' }),
      transactionName: faker.helpers.fake([
        '{{company.name}} Corp.',
        '{{person.fullName}}',
      ]),
      transactionType: tType,
      amount:
        tType == 'deposit' || tType == 'payment'
          ? fakerID_ID.number.int({ min: 10, max: 100 })
          : fakerID_ID.number.int({ min: -100, max: -10 }),
      date: faker.date.between({
        from: '2023-11-01T00:00:00.000Z',
        to: '2024-02-25T00:00:00.000Z',
      }),
    };
    objDataUser.transactions.push(transaction);
  }

  // Menginputkan user baru dengan action addNewUser
  // Jika berhasil maka muncul notif sukses dan router mengarahkan ke halaman login
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
  <div v-if="!storedId" class="flex flex-col">
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
