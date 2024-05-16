<template>
    <div class="auth-container">
        <video class="background-video" autoplay loop muted>
            <source
                src="../../assets/images/videoautoplay.mp4"
                type="video/mp4"
            />
            Your browser does not support the video tag.
        </video>
        <form @submit.prevent="register" autocomplete="off" class="auth-form">
            <div>
                <input
                    type="text"
                    id="firstname"
                    v-model="firstname"
                    placeholder="First name"
                    class="auth-input"
                    required
                /><PersonIcon class="auth-icon"></PersonIcon>
            </div>
            <div>
                <input
                    type="text"
                    id="lastname"
                    v-model="lastname"
                    placeholder="Last name"
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
                >
				<EnvelopeIcon class="auth-icon"></EnvelopeIcon>
			</input>
    </div>
            <div>
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    class="auth-input"
                    placeholder="password"
                    required
                >
				<KeyIcon class="auth-icon"></KeyIcon>
			</input>
            </div>
            <button type="submit" class="auth-submit">SIGN UP</button>
        </form>
    </div>
</template>

<script setup>
import  EnvelopeIcon  from '../../assets/icons/EnvelopeIcon.vue'
import KeyIcon from "../../assets/icons/KeyIcon.vue";
import PersonIcon from '../../assets/icons/PersonIcon.vue';
import { ref } from "vue";
import axios from "axios";

const firstname = ref("");
const lastname = ref("");
const email = ref("");
const password = ref("");

const register = async () => {
    try {
        await axios.post("/auth/register", {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
        });
        console.log("Registered successfully!");
    } catch (error) {
        console.error("Registration failed:", error);
    }
};
</script>
