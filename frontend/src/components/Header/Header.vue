<template>
    <header class="header">
        <RouterLink to="/">
            <h1 class="header-title"><Heart></Heart> SBL SHOP®</h1>
        </RouterLink>
        <div class="user-actions">
            <RouterLink to="/cart" class="cart-header-icon">
                <CartIcon class="header-action-btn"></CartIcon>
                <p v-if="hasItemsInCart" class="cart-amount">{{ sum }}</p>
            </RouterLink>
            <template v-if="user">
                <RouterLink to="/profile" class="header-action-btn">Hello, {{ user.firstname }}!</RouterLink>
                <button @click="logout()" class="header-action-btn">
                    Logout
                </button>
            </template>
            <template v-else>
                <RouterLink to="/login" class="header-action-btn">LOGIN</RouterLink>
                <RouterLink to="/register" class="header-action-btn">REGISTER</RouterLink>
            </template>
        </div>
    </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUser, clearUser } from "../../store/auth.js";
import Heart from "../../assets/icons/Heart.vue";
import CartIcon from "../../assets/icons/CartIcon.vue";
import { useRouter } from "vue-router";
import axios from "axios"; // Import axios

const router = useRouter();

const { user } = useUser();
const cartItemCount = ref(0);
const sum = ref(0); // Corrected sum definition

const fetchCartItemCount = async () => {
    try {
        const response = await axios.get(`/cart/active-cart/${user.value.ID}`);
        cartItemCount.value = response.data.length;
        sum.value = 0; // Reset sum before calculating
        for (let i = 0; i < response.data.length; i++) {
            sum.value += response.data[i].quantity; // Corrected typo and updated sum value
        }
        console.log("item amount: ", response.data[1].quantity);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            cartItemCount.value = 0; // No active cart found
        } else {
            console.error("Failed to fetch cart item count:", error);
        }
    }
};

onMounted(() => {
    if (user.value) {
        fetchCartItemCount();
    }
});

const logout = () => {
    clearUser();
    router.push("/");
};

const hasItemsInCart = computed(() => cartItemCount.value > 0);
</script>


