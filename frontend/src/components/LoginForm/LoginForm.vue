<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const login = async () => {
  try {
    // Send login request to backend API
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    // Redirect to dashboard or update authentication state
    // For simplicity, let's assume the login was successful
    alert('Login successful! Redirecting...');
    // You can redirect or update authentication state here
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Failed to log in. Please try again.');
  }
};
</script>

<template>
    <form @submit.prevent="login">
    <div>
      <label for="username">email:</label>
      <input type="text" id="username" v-model="email" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
    </div>
    <button type="submit">Login</button>
  </form>
</template>