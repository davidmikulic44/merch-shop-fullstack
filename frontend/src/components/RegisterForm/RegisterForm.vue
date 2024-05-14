<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="firstname">Firstname:</label>
        <input type="text" id="firstname" v-model="firstname" required>
      </div>
      <div>
        <label for="lastname">Lastname:</label>
        <input type="text" id="lastname" v-model="lastname" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');

const register = async () => {
  try {
    await axios.post('/auth/register', {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value
    }, { timeout: 5000 });
    console.log('Registered successfully!');
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
</script>
