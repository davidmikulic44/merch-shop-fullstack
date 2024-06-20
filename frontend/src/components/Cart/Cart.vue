<template>
  <div class="cart-container">
    <div v-if="user && totalCost === 0">
      <h1>Your cart is empty.</h1>
    </div>
    <div v-else-if="user" class="cart-items-container">
      <h1>Items in cart:</h1>
      <article class="cart-item" v-for="item in cartItems" :key="item.ID">
        <!-- Ensure item.image exists and is correctly handled -->
        <img class="cart-item-img" :src="getItemImage(item)" alt="Item Image" />
        <section class="cart-item-info">
          <div class="cart-item-info-primary">
            <h3 class="cart-item-name">{{ item.name }}</h3>
            <p class="cart-item-price">{{ item.price * item.quantity }} &euro;</p>
          </div>
          <div class="cart-item-info-secondary">
            <p class="cart-item-desc">{{ item.description }}</p>
            <p class="cart-item-size">Size: {{ item.size }}</p>
            <p class="cart-item-qty">Quantity: {{ item.quantity }}</p>
          </div>
        </section>
        <button class="remove-from-cart" @click="removeItemFromCart(item.ID)">
          <CloseIcon></CloseIcon>
        </button>
      </article>
    </div>
    <div v-else>
      <h1>Please log in or register.</h1>
    </div>
    <section class="cart-cost-container" v-if="totalCost !== 0">
      <p class="total-cost">Total: <p class="cart-item-price">{{ totalCost }} &euro;</p></p>
      <RouterLink class="submit-button checkout-btn" to="/checkout">Proceed to Checkout</RouterLink>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useUser } from "../../store/auth.js";
import CloseIcon from "../../assets/icons/CloseIcon.vue";

const { user } = useUser();

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
  if (user.value) {
    fetchActiveCart();
  }
});

const removeItemFromCart = async (cartItemId) => {
  try {
    await axios.delete(`/cart/remove-item/${cartItemId}`);
    await fetchActiveCart(); // Refresh the cart items after removing an item
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
  }
};

// Function to get item image URL or provide a placeholder if image URL is missing
const getItemImage = (item) => {
  return item.image ? item.image : '/src/assets/images/placeholder.jpg'; // Adjust placeholder image path as needed
};
</script>