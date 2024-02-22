import { defineStore } from 'pinia';
import axios from 'axios';

export const useUsersStore = defineStore('users', {
  // state, menyimpan data users
  state: () => {
    return { users: [] };
  },
  getters: {
    // untuk mendapatkan seluruh user
    getUser(state) {
      return state.users;
    },
    // untuk mendapatkan user berdasarkan id
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId);
    },
  },
  actions: {
    // fetch data user
    fetchUser() {
      return axios.get('http://localhost:8000/users').then((response) => {
        this.users = response.data;
      });
    },
    // cek validasi data login user
    loginUser(userId, password) {
      const index = this.users.findIndex((user) => user.userId == userId);

      if (index == -1) return 'wrong user';
      if (this.users[index].password !== password) return 'wrong password';

      return this.users[index].id;
    },
    // validasi data untuk forget password
    forgotUser(cardNumber, pin) {
      const index = this.users.findIndex(
        (user) => user.cardNumber == cardNumber
      );

      if (index == -1) return 'wrong card number';
      if (this.users[index].pin !== pin) return 'wrong pin';

      return this.users[index].id;
    },
    // update password
    updatePassword(id, newPassword) {
      const status = axios
        .patch('http://localhost:8000/users/' + id, {
          password: newPassword,
        })
        .then((response) => response.status)
        .catch((err) => err.response.status);

      return status;
    },
    // menambahkan user
    addNewUser(user) {
      const status = axios
        .post('http://localhost:8000/users', user)
        .then((response) => response.status)
        .catch((err) => err.response.status);

      return status;
    },
    // menambahkan transaksi baru
    addTransaction(id, newTransaction, newBalance) {
      const status = axios
        .patch('http://localhost:8000/users/' + id, {
          transactions: newTransaction,
          balance: newBalance,
        })
        .then((response) => response.status)
        .catch((err) => err.response.status);

      return status;
    },
    // format ke US style currency
    formatCurrency(number) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(number);
    },
    // mendapatkan data tanggal yang sesuai filter
    getFilterDate(filterInput) {
      const now = new Date();

      return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - filterInput
      ).getTime();
    },
  },
});
