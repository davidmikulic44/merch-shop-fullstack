<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

import EnvelopeIcon from '../../assets/icons/EnvelopeIcon.vue';
import KeyIcon from '../../assets/icons/KeyIcon.vue';

import { loginUser } from "../../store/auth.js";
const email = ref("");
const password = ref("");
const router = useRouter();
const errorMessage = ref("");

const login = async () => {
  try {
    errorMessage.value = "";
    await loginUser(email.value, password.value, router);
  } catch (error) {
    console.error("Login failed:", error.message);
    errorMessage.value = "Invalid email or password";
  }
};
</script>

<template>
  <div class="auth-container login-container">
    <form @submit.prevent="login" class="auth-form">
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div>
        <input
          type="email"
          id="email"
          v-model="email"
          class="auth-input"
          placeholder="e-mail"
          required
        />
        <EnvelopeIcon class="auth-icon" />
      </div>
      <div>
        <input
          type="password"
          id="password"
          v-model="password"
          class="auth-input"
          placeholder="lozinka"
          required
        />
        <KeyIcon class="auth-icon" />
      </div>
      <button type="submit" class="auth-submit">PRIJAVI SE</button>
    </form>
  </div>
</template>
