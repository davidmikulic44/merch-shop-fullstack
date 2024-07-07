<template>
    <div class="container">
        <div class="cart-container">
            <h1 v-if="user && totalCost === 0" class="cart-title">Vaša košarica je prazna.</h1>

            <div v-else-if="user" class="cart-items-container">
                <h1 class="cart-title">Artikli u košarici:</h1>
                <section
                    class="cart-cost-container"
                    v-if="totalCost !== 0 && itemsInCartAmount > 3"
                >
                    <p class="total-cost">
                        Ukupno:
                        <span class="cart-item-price"
                            >{{ totalCost }} &euro;</span
                        >
                    </p>
                    <RouterLink
                        v-if="route.path !== '/checkout'"
                        class="submit-button checkout-btn"
                        to="/checkout"
                        >IDI NA NAPLATU</RouterLink
                    >
                </section>
                <CartItem
                    :view="view"
                    v-for="item in cartItems"
                    :key="item.ID"
                    :item="item"
                    @removeItem="removeItemFromCart"
                />
            </div>
                <h1 v-else class="cart-title">
                    Prijavite se ili izradite korisnički račun kako bi
                    pristupili košarici.
                </h1>
            <section class="cart-cost-container" v-if="totalCost !== 0">
                <p class="total-cost">
                    Ukupno:
                    <span class="cart-item-price">{{ totalCost }} &euro;</span>
                </p>
                <RouterLink
                    v-if="route.path !== '/checkout'"
                    class="submit-button checkout-btn"
                    to="/checkout"
                    >IDI NA NAPLATU</RouterLink
                >
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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

const emit = defineEmits(["removeItem"]);

const fetchActiveCart = async () => {
    try {
        const response = await axios.get(`/cart/active-cart/${user.value.ID}`);
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
    if (user.value) {
        fetchActiveCart();
    }
});
</script>
