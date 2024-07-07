<template>
    <div class="auth-container">
        <form @submit.prevent="register" autocomplete="off" class="auth-form">
            <h4>Izradi račun</h4>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            <div>
                <input
                    type="text"
                    id="firstname"
                    v-model="firstname"
                    placeholder="Ime"
                    class="auth-input"
                    required
                /><PersonIcon class="auth-icon"></PersonIcon>
            </div>
            <div>
                <input
                    type="text"
                    id="lastname"
                    v-model="lastname"
                    placeholder="Prezime"
                    class="auth-input"
                    required
                /><PersonIcon class="auth-icon"></PersonIcon>
            </div>
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
                    type="text"
                    id="address"
                    v-model="address"
                    class="auth-input"
                    placeholder="Adresa"
                    required
                />
                <EnvelopeIcon class="auth-icon" />
            </div>
            <div>
                <input
                    type="text"
                    id="city"
                    v-model="city"
                    class="auth-input"
                    placeholder="Grad"
                    required
                />
                <EnvelopeIcon class="auth-icon" />
            </div>
            <div>
                <input
                    type="text"
                    id="postal_code"
                    v-model="postal_code"
                    class="auth-input"
                    placeholder="Poštanski broj"
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
                    placeholder="Lozinka"
                    required
                />
                <KeyIcon class="auth-icon" />
            </div>
            <div>
                <input
                    type="password"
                    id="confirm_password"
                    v-model="confirmPassword"
                    class="auth-input"
                    placeholder="Potvrdi lozinku"
                    required
                />
                <KeyIcon class="auth-icon" />
            </div>
            <button type="submit" class="auth-submit">IZRADI RAČUN</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { loginUser } from "../../store/auth.js";
import axios from "axios";
import EnvelopeIcon from '../../assets/icons/EnvelopeIcon.vue';
import KeyIcon from '../../assets/icons/KeyIcon.vue';
import PersonIcon from '../../assets/icons/PersonIcon.vue';

const firstname = ref("");
const lastname = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const address = ref("");
const city = ref("");
const postal_code = ref("");
const errorMessage = ref("");
const router = useRouter();

const register = async () => {
    errorMessage.value = "";
    if (password.value !== confirmPassword.value) {
        errorMessage.value = "Lozinke se ne podudaraju";
        return;
    }

    try {
        await axios.post("/auth/register", {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
            address: address.value,
            city: city.value,
            postal_code: postal_code.value,
        });
        try {
            await loginUser(email.value, password.value, router);
        } catch (error) {
            errorMessage.value = "Prijava nije uspjela";
            console.error("Login failed:", error.message);
        }

    } catch (error) {
        errorMessage.value = "Registracija nije uspjela";
        console.error("Registration failed:", error);
    }
};
</script>
