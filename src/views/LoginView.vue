<template>
  <div class="flex flex-col">
    <div class="p-5"><h1 class="font-bold">BANK</h1></div>

    <div class="flex items-center justify-center">
      <div class="p-10 flex flex-col gap-5 w-3/4">
        <h2 class="font-bold text-2xl">Login</h2>
        <form class="flex flex-col gap-3">
          <div class="flex flex-col">
            <label>User ID</label>
            <input type="text" class="border rounded-md h-10" />
            <p class="text-sm text-red-500">*Please enter your User ID</p>
          </div>
          <div class="flex flex-col">
            <label>Password</label>
            <input type="password" class="border rounded-md h-10" />
            <p class="text-sm text-red-500">*Please enter your password</p>
          </div>
          <p
            class="text-blue-500 font-semibold text-sm self-end cursor-pointer hover:text-blue-400"
          >
            Forget password
          </p>
          <button class="bg-blue-500 rounded-md p-2 mt-4 text-white">
            Login
          </button>
        </form>
        <p>
          Don't have an account?
          <span
            class="text-blue-500 cursor-pointer font-semibold hover:text-blue-400 hover:underline"
            >Sign up</span
          >
        </p>
      </div>
    </div>
  </div>
</template>