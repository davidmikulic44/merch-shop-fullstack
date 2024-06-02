<script setup>
import { ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  }
});

// Define the quantity state
const qty = ref(1);

// Increment quantity
const incrementQty = () => {
  if (qty.value < 5) {
    qty.value++;
  }
};

// Decrement quantity
const decrementQty = () => {
  if (qty.value > 1) {
    qty.value--;
  }
};
</script>

<template>
  <article class="product-info-container">
    <div class="product-info">
      <h1 class="product-title">{{ item.name }}</h1>
      <h6 class="product-category">{{ item.category }}</h6>
      <h3 class="product-price">{{ item.price }}&euro;</h3>
      <p class="product-description">{{ item.description }}</p>
    </div>
    <section class="product-action">
      <form action="" method="POST">
        <div class="size-container">
          <p class="product-description">Odaberi veličinu:</p>
          <section class="size">
            <div class="single-size">
              <label for="s">S</label>
              <input type="radio" name="size" id="s" />
            </div>
            <div class="single-size">
              <label for="m">M</label>
              <input type="radio" name="size" id="m" />
            </div>
            <div class="single-size">
              <label for="l">L</label>
              <input type="radio" name="size" id="l" />
            </div>
            <div class="single-size">
              <label for="xl">XL</label>
              <input type="radio" name="size" id="xl" />
            </div>
          </section>
        </div>
        <section class="quantity">
          <label type="button" @click="incrementQty" for="qty" id="plus">+</label>
          <label type="button" @click="decrementQty" for="qty" id="minus">-</label>
          <input type="number" name="qty" id="qty" v-model="qty" min="1" max="5" />
        </section>
        <button type="submit" class="submit-button">Dodaj u košaricu</button>
      </form>
    </section>
  </article>
</template>
