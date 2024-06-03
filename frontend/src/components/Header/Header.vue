<script setup>
import { computed } from "vue";
import { useUser, clearUser } from "../../store/auth.js";
import Heart from "../../assets/icons/Heart.vue";
import CartIcon from "../../assets/icons/CartIcon.vue";
import { useRouter } from "vue-router"; // Import useRouter from vue-router

const router = useRouter();

const { user } = useUser();

const logout = () => {
    // Clear user data from store and perform any additional logout actions
    clearUser();
    // Redirect to the login page or another appropriate page
    router.push("/");
};
</script>

<template>
    <header class="header">
        <RouterLink to="/"
            ><h1 class="header-title">GIRLS <Heart></Heart> SBL</h1></RouterLink
        >
        <div class="user-actions">
            <RouterLink to="/cart">
                <CartIcon class="header-action-btn"></CartIcon>
            </RouterLink>
            <template v-if="user">
                <span class="header-action-btn"
                    >Hello, {{ user.firstname }}!</span
                >
                <button @click="logout()" class="header-action-btn">
                    Logout
                </button>
            </template>
            <template v-else>
                <RouterLink to="/login" class="header-action-btn"
                    >LOGIN</RouterLink
                >
                <RouterLink to="/register" class="header-action-btn"
                    >REGISTER</RouterLink
                >
            </template>
        </div>
    </header>
</template>
