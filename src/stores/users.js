import { defineStore } from 'pinia';
import axios from 'axios';

export const useUsersStore = defineStore('users', {
  state: () => {
    return { users: [] };
  },
  getters: {
    getUser(state) {
      return state.users;
    },
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId);
    },
  },
  actions: {
    fetchUser() {
      return axios.get('http://localhost:8000/users').then((response) => {
        this.users = response.data;
      });
    },
    loginUser(userId, password) {
      const index = this.users.findIndex((user) => user.userId == userId);

      if (index == -1) return 'wrong user';
      if (this.users[index].password !== password) return 'wrong password';

      return this.users[index].id;
    },
    forgotUser(cardNumber, pin) {
      const index = this.users.findIndex(
        (user) => user.cardNumber == cardNumber
      );

      if (index == -1) return 'wrong card number';
      if (this.users[index].pin !== pin) return 'wrong pin';

      return this.users[index].id;
    },
    updatePassword(id, newPassword) {
      const status = axios
        .patch('http://localhost:8000/users/' + id, {
          password: newPassword,
        })
        .then((response) => response.status)
        .catch((err) => err.response.status);

      return status;
    },
    addNewUser(user) {
      const status = axios
        .post('http://localhost:8000/users', user)
        .then((response) => response.status)
        .catch((err) => err.response.status);

      return status;
    },
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
  },
});
