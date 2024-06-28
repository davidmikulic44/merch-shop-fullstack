<template>
  <div class="container">
    <div class="cart-container">
      <div v-if="user && totalCost === 0">
        <h1>Vaša košarica je prazna.</h1>
      </div>
      <div v-else-if="user" class="cart-items-container">
        <h1>Artikli u košarici:</h1>
        <section class="cart-cost-container" v-if="totalCost !== 0 && itemsInCartAmount > 3">
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
        <CartItem
          :view="view"
          v-for="item in cartItems"
          :key="item.ID"
          :item="item"
          @removeItem="removeItemFromCart"
        />
      </div>
      <div v-else>
        <h1>Prijavite se ili izradite korisnički račun kako bi pristupili košarici.</h1>
      </div>
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

// Destructure emit from the setup context
const emit = defineEmits(['removeItem']);

// Function to fetch active cart items
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

    // Update the itemsInCartAmount value
    itemsInCartAmount.value = cartItems.value.length;

    // Log cart items to debug
    console.log("Fetched cart items:", cartItems.value);
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

// Function to remove an item from the cart
const removeItemFromCart = async (cartItemId) => {
  try {
    await axios.delete(`/cart/remove-item/${cartItemId}`);
    await fetchActiveCart();
    await fetchCartItemCount(user.value.ID);
    emit('removeItem');
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