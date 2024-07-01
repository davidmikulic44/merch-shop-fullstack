<template>
  <RouterLink :to="{ name: 'ItemDetail', params: { id: item.ID } }">
    <article class="item-card">
      <img class="item-card-image" :src="getImageUrl(item.images)" alt="Item Image" />
      <section class="item-card-info">
        <div class="item-card-text">
          <h3 class="item-card-title">{{ item.name }}</h3>
        </div>
        <h3 class="item-card-price">{{ item.price }}&euro;</h3>
      </section>
    </article>
  </RouterLink>
</template>


<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});


const getImageUrl = (images) => {
  return images && images.length > 0 ? images[0] : 'assets/images/placeholder.png';
};
</script>

