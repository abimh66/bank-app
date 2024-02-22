<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users';

const usersStore = useUsersStore(); //Menggunakan pinia user store yang telah dibuat
const storedId = localStorage.getItem('storedDataId'); // Mengambil storedDataId dari web local storage

const router = useRouter(); // Menginisiasi router
const userId = reactive({ status: true, value: '' }); // Membuat variabel reactive userId
const password = reactive({ status: true, value: '' }); // Membuat variabel reactive password

// OnMounted akan menjalankan callback function saat components telah di-mount
onMounted(() => {
  // Cek apakah local storage masih menyimpan id user aktif
  // Jika iya, maka router akan diarahkan kembali ke home
  if (storedId) return router.push('/home');

  // Fetching data
  usersStore.fetchUser();
});

// Function yang akan dipanggil saat form disubmit
function submitHandler() {
  // Set variabel userId.status dan passwrord.status true
  // Status digunakan untuk memberi message kepada user apakah input sudah benar
  userId.status = true;
  password.status = true;

  // Validasi input user dengan actions 'loginUser'
  const loginStatus = usersStore.loginUser(userId.value, password.value);
  if (loginStatus == 'wrong user') return (userId.status = false);
  if (loginStatus == 'wrong password') return (password.status = false);

  // Jika validasi berhasil, set local storage dengan id user aktif
  // ubah router ke home
  localStorage.setItem('storedDataId', loginStatus);
  router.push('/home');
}
</script>

<template>
  <div v-if="!storedId" class="flex flex-col">
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
              *Please enter your correct User ID
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
              *Please enter your correct password
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
</template>
