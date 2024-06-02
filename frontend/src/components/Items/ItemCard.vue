<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

console.log('Item object:', props.item);
</script>

<template>
  <RouterLink :to="{ name: 'ItemDetail', params: { id: item.ID } }">
    <article class="item-card">
      <img class="item-card-image" :src="item.image" alt="Item Image" />
      <section class="item-card-info">
        <div class="item-card-text">
          <h3 class="item-card-title">{{ item.name }}</h3>
        </div>
        <h3 class="item-card-price">{{ item.price }}&euro;</h3>
      </section>
    </article>
  </RouterLink>
</template>
