<script setup>
import { faker } from '@faker-js/faker';

function getData() {
  const hello = faker.helpers.fake(
    'Hi, my name is {{person.firstName}} {{person.lastName}}!'
  );
  console.log(hello);
}
</script>

<template>
  <div class="flex flex-col">
    <div class="p-5"><h1 class="font-bold">BANK</h1></div>

    <div class="flex items-center justify-center">
      <div class="p-10 flex flex-col gap-5 w-3/4">
        <h2 class="font-bold text-2xl">Sign Up</h2>
        <form class="flex flex-col gap-3">
          <div class="flex flex-col">
            <label>ATM Card Number</label>
            <input type="text" class="border rounded-md h-10" />
            <p class="text-sm text-red-500">*Please enter your User ID</p>
          </div>
          <div class="flex flex-col">
            <label>User ID</label>
            <input type="text" class="border rounded-md h-10" />
            <p class="text-sm text-red-500">*Please enter your password</p>
          </div>
          <div class="flex flex-col">
            <label>Password</label>
            <input type="password" class="border rounded-md h-10" />
            <p class="text-sm text-red-500">*Please enter your password</p>
          </div>

          <button
            @click.prevent="getData"
            class="bg-blue-500 rounded-md p-2 mt-4 text-white"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
