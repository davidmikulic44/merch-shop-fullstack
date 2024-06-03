<template>
    <div>
        
        <div v-if="totalCost === 0">
            <h1>Your cart is empty</h1>
        </div>
        <ul v-else>
            <h1>Your cart</h1>
            <li v-for="item in cartItems" :key="item.ID">
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
                <p>Size: {{ item.size }}</p>
                <p>Quantity: {{ item.quantity }}</p>
                <p>Price: {{ item.price }} &euro;</p>
                <button @click="removeItemFromCart(item.ID)">
                    Remove from Cart
                </button>
            </li>
        </ul>
        <div v-if="totalCost !== 0">
            <p>Total Cost: {{ totalCost }} &euro;</p>
            <RouterLink to="/checkout">Proceed to Checkout</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useUser } from "../../store/auth.js";
import { useRouter } from "vue-router";

const { user } = useUser();
const router = useRouter();

const cartItems = ref([]);
const totalCost = ref(0);

const fetchActiveCart = async () => {
    try {
        const response = await axios.get(`/cart/active-cart/${user.value.ID}`);
        if (response.data.length === 0) {
            // Handle case where the cart is empty or does not exist
            cartItems.value = [];
            totalCost.value = 0;
        } else {
            cartItems.value = response.data;
            totalCost.value = cartItems.value[0].cost;
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // Handle 404 error when the cart is not found
            cartItems.value = [];
            totalCost.value = 0;
        } else {
            console.error("Failed to fetch active cart:", error);
        }
    }
};

onMounted(() => {
    fetchActiveCart();
});

const removeItemFromCart = async (cartItemId) => {
    try {
        await axios.delete(`/cart/remove-item/${cartItemId}`);
        await fetchActiveCart(); // Refresh the cart items after removing an item
    } catch (error) {
        console.error("Failed to remove item from cart:", error);
    }
};

</script>
