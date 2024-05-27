<script setup>
import { ref, onMounted } from 'vue';
import ItemCard from './ItemCard.vue';

const items = ref([]);

const fetchItems = async () => {
  try {
    const response = await fetch('http://localhost:3000/items');
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    const data = await response.json();
    items.value = data;
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

onMounted(fetchItems);
</script>
<template>
    <div v-for="item in items" :key="item.id">
      <ItemCard :item="item" />
      
    </div>
    <section class="items-container">
      <RouterLink to="/product" class="item-card">
    <img class="item-card-image" src="../../assets/images/fucksbl.jpg" />
    <section class="item-card-info">
        <h3 class="item-card-title">Majica F*CK SBL</h3>
        
      <h3 class="item-card-price">25&euro;</h3>
    </section>
  </RouterLink>
  <article class="item-card">
    <img class="item-card-image" src="../../assets/images/fucksbl.jpg" />
    <section class="item-card-info">
      <div class="item-card-text">
        <h3 class="item-card-title">ime majice</h3>
        
      </div>
      <h3 class="item-card-price">100&euro;</h3>
    </section>
  </article>
  <article class="item-card">
    <img class="item-card-image" src="../../assets/images/fucksbl.jpg" />
    <section class="item-card-info">
      <div class="item-card-text">
        <h3 class="item-card-title">ime majice</h3>
        
      </div>
      <h3 class="item-card-price">100&euro;</h3>
    </section>
  </article>
  <article class="item-card">
    <img class="item-card-image" src="../../assets/images/fucksbl.jpg" />
    <section class="item-card-info">
      <div class="item-card-text">
        <h3 class="item-card-title">ime majice</h3>
        
      </div>
      <h3 class="item-card-price">100&euro;</h3>
    </section>
  </article>
    </section>
    
</template>