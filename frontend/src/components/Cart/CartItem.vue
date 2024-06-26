<template>
  <div class="cart-item-container">
  <RouterLink :to="{ name: 'ItemDetail', params: { id: item.item_id } }" class="cart-item">
      <img
        class="cart-item-img"
        :src="getImageUrl(item.images)"
        alt="Item Image"
      />
    <section class="cart-item-info">
      <div class="cart-item-info-primary">
        <h3 class="cart-item-name">{{ item.name }}</h3>
        <p class="cart-item-size">Veličina: {{ item.size }}</p>
        <p class="cart-item-qty">Količina: {{ item.quantity }}</p>
      </div>
      <div class="cart-item-info-secondary">
        <p class="cart-item-price">{{ item.price * item.quantity }} &euro;</p>
      </div>
      </section>
  </RouterLink>
      <button
        class="remove-from-cart"
        @click="removeItemFromCart(item.ID)"
        aria-label="Remove item from cart"
      >
        <CloseIcon></CloseIcon>
      </button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import CloseIcon from "../../assets/icons/CloseIcon.vue";

const props = defineProps({
  item: Object,
});

const emit = defineEmits(['removeItem']);

const getImageUrl = (images) => {
  return images && images.length > 0
    ? images[0]
    : "/src/assets/images/placeholder.jpg"; // Adjust placeholder image path as needed
};

const removeItemFromCart = (cartItemId) => {
  // Emit an event to remove item from the cart
  emit('removeItem', cartItemId);
};
</script>
