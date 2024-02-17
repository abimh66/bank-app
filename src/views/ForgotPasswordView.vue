<template>
  <div class="flex flex-col">
    <div class="p-5"><h1 class="font-bold">BANK</h1></div>
    <!-- flex items-center w-full self-center justify-center sm:max-w-2xl -->
    <div
      class="flex items-center w-full self-center justify-center sm:max-w-2xl"
    >
      <div class="p-10 flex flex-col gap-5 w-3/4">
        <h2 class="font-bold text-2xl">Forgot Password</h2>
        <form class="flex flex-col gap-3">
          <div class="flex flex-col">
            <label>ATM Card Number</label>
            <input type="text" class="border rounded-md h-10" />
          </div>
          <div class="flex flex-col">
            <label>ATM PIN</label>
            <input type="password" class="border rounded-md h-10" />
          </div>
          <button class="bg-blue-500 rounded-md p-2 mt-4 text-white">
            Input
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
