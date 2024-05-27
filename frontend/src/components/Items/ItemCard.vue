<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="item-card">
    <img class="item-card-image" :src="item.image" />
    <section class="item-card-info">
      <div class="item-card-text">
        <h3 class="item-card-title">{{ item.name }}</h3>
      </div>
      <h3 class="item-card-price">{{ item.price }}&euro;</h3>
    </section>
  </article>
  
</template>
