<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { setUser } from "../../store/auth.js"; // Adjust the path as needed
import  EnvelopeIcon  from '../../assets/icons/EnvelopeIcon.vue'
import KeyIcon from "../../assets/icons/KeyIcon.vue";
const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
    try {
        const response = await axios.post("http://localhost:3000/auth/login", {
            email: email.value,
            password: password.value,
        });

        // Check if response status is ok
        if (response.status !== 200) {
            throw new Error("Login failed: Invalid response");
        }

        const token = response.data.token;
        localStorage.setItem("token", token);

        // Fetch user information after successful login
        const userInfoResponse = await axios.get(
            `http://localhost:3000/auth/user/${email.value}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Check if user info response status is ok
        if (userInfoResponse.status !== 200) {
            throw new Error("Login failed: Invalid user info response");
        }

        const userInfo = userInfoResponse.data;
        setUser(userInfo);

        console.log("Logged in successfully!");
        router.push("/");
    } catch (error) {
        console.error("Login failed:", error.message);
    }
};
</script>

<template>
    <div class="auth-container">
        <video class="background-video" autoplay loop muted>
            <source src="../../assets/images/videoautoplay.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <form @submit.prevent="login" class="auth-form">
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
            <button type="submit" class="auth-submit">LOGIN</button>
        </form>
    </div>
</template>
