<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');

const login = async () => {
  try {
    const response = await axios.post('/auth/login', { email: email.value, password: password.value });
    const token = response.data.token;
    console.log('Logged in successfully!');
  } catch (error) {
    console.error('Login failed:', error.response.data);
  }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
