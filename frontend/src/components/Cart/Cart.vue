<template>
    <div class="container">
        <div class="cart-container">
            <!-- Display empty cart message for logged-in users -->
            <h1 v-if="isUserLoggedIn && totalCost === 0" class="cart-title">Vaša košarica je prazna.</h1>

            <!-- Display empty cart message for guests -->
            <h1 v-else-if="isGuest && totalCost === 0" class="cart-title">Vaša košarica je prazna.</h1>

            <!-- Display cart items for logged-in users -->
            <div v-if="isUserLoggedIn" class="cart-items-container">
                <div v-if="totalCost !== 0 && itemsInCartAmount > 0" class="cart-cost-container">
                    <p class="total-cost">
                        Ukupno:
                        <span class="cart-item-price">{{ totalCost }} &euro;</span>
                    </p>
                    <RouterLink v-if="route.path !== '/checkout'" class="submit-button checkout-btn" to="/checkout">
                        IDI NA NAPLATU
                    </RouterLink>
                </div>
                <CartItem
                    :view="view"
                    v-for="item in cartItems"
                    :key="item.ID"
                    :item="item"
                    @removeItem="removeItemFromCart"
                />
            </div>

            <!-- Display cart items for guests -->
            <div v-else-if="isGuest" class="cart-items-container">
                <div v-if="totalCost !== 0 && itemsInCartAmount > 0" class="cart-cost-container">
                    <p class="total-cost">
                        Ukupno:
                        <span class="cart-item-price">{{ totalCost }} &euro;</span>
                    </p>
                    <RouterLink v-if="route.path !== '/checkout'" class="submit-button checkout-btn" to="/checkout">
                        IDI NA NAPLATU
                    </RouterLink>
                </div>
                <CartItem
                    :view="view"
                    v-for="item in cartItems"
                    :key="item.ID"
                    :item="item"
                    @removeItem="removeItemFromCart"
                />
            </div>

            <!-- Prompt to log in or create an account -->
            <h1 v-else class="cart-title">
                ???
            </h1>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useUser } from "../../store/auth.js";
import { fetchCartItemCount } from "../../store/cart.js";
import CartItem from "./CartItem.vue";

const { user } = useUser();
const route = useRoute();
const props = defineProps("cartView");
const cartItems = ref([]);
const totalCost = ref(0);
const itemsInCartAmount = ref(0);

// Compute if the user is logged in
const isUserLoggedIn = computed(() => user.value !== null && user.value.ID !== undefined);

// Compute if there is a guest ID
const guestId = ref(localStorage.getItem('guestId'));
const isGuest = computed(() => guestId.value !== null && guestId.value !== undefined);

const emit = defineEmits(["removeItem"]);

const fetchActiveCart = async () => {
    try {
        let url;
        if (isUserLoggedIn.value) {
            url = `/cart/active-cart/${user.value.ID}`;
        } else if (isGuest.value) {
            url = `/guest/active-cart/${guestId.value}`;
        }

        const response = await axios.get(url);
        if (response.data.length === 0) {
            cartItems.value = [];
            totalCost.value = 0;
        } else {
            cartItems.value = response.data;
            totalCost.value = cartItems.value[0].cost;
        }

        itemsInCartAmount.value = cartItems.value.length;
    } catch (error) {
        console.error("Error fetching active cart:", error);
        if (error.response && error.response.status === 404) {
            cartItems.value = [];
            totalCost.value = 0;
        } else {
            console.error("Failed to fetch active cart:", error);
        }
    }
};

const removeItemFromCart = async (cartItemId) => {
    try {
        await axios.delete(`/cart/remove-item/${cartItemId}`);
        await fetchActiveCart();
        await fetchCartItemCount(user.value.ID);
        emit("removeItem");
    } catch (error) {
        console.error("Failed to remove item from cart:", error);
    }
};

onMounted(() => {
    fetchActiveCart();
});
</script>
