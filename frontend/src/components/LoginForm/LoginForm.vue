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
import { useRouter } from 'vue-router';
import axios from 'axios';
import { setUser } from '../../store/auth.js'; // Adjust the path as needed

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', { email: email.value, password: password.value });
    
    // Check if response status is ok
    if (response.status !== 200) {
      throw new Error('Login failed: Invalid response');
    }

    const token = response.data.token;

    // Fetch user information after successful login
    const userInfoResponse = await axios.get(`http://localhost:3000/auth/user/${email.value}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Check if user info response status is ok
    if (userInfoResponse.status !== 200) {
      throw new Error('Login failed: Invalid user info response');
    }

    const userInfo = userInfoResponse.data;
    setUser(userInfo);

    console.log('Logged in successfully!');
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

</script>

<style scoped>
/* Add your component-specific styles here */
</style>
