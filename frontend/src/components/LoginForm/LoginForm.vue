<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { loginUser } from "../../store/auth.js";
import EnvelopeIcon from '../../assets/icons/EnvelopeIcon.vue';
import KeyIcon from '../../assets/icons/KeyIcon.vue';

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    await loginUser(email.value, password.value, router);
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};
</script>

<template>
  <div class="auth-container">
    <form @submit.prevent="login" class="auth-form">
      <h4>Prijavi se</h4>
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
          placeholder="password"
          required
        />
        <KeyIcon class="auth-icon" />
      </div>
      <button type="submit" class="auth-submit">LOGIN</button>
    </form>
  </div>
</template>
