<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useUser, clearUser } from "../../store/auth.js";
import Heart from "../../assets/icons/Heart.vue";
import CartIcon from "../../assets/icons/CartIcon.vue";
import LogOutIcon from "../../assets/icons/LogOutIcon.vue";
import { useRouter } from "vue-router";
import { cartItemCount, sum, fetchCartItemCount } from "../../store/cart.js";

const router = useRouter();

const { user } = useUser();

const fetchCartItemCountForUser = async () => {
    if (user.value) {
        await fetchCartItemCount(user.value.ID);
    }
};

onMounted(() => {
    fetchCartItemCountForUser();
});

watch(user, () => {
    fetchCartItemCountForUser();
});

const logout = () => {
    clearUser();
    fetchCartItemCountForUser();
    router.push("/");
};

const hasItemsInCart = computed(() => cartItemCount.value > 0);
</script>

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
            <section v-if="user" class="header-user">
                <RouterLink to="/profile" class="header-text">Pozdrav, {{ user.firstname }}!</RouterLink>
                <span @click="logout()" class="header-action-btn">
                    <LogOutIcon></LogOutIcon> Odjava
                </span>
            </section>
            <section v-else class="header-user">
                <RouterLink to="/login" class="header-action-btn">PRIJAVA</RouterLink>
                <RouterLink to="/register" class="header-action-btn">REGISTRACIJA</RouterLink>
            </section>
        </div>
    </header>
</template>
