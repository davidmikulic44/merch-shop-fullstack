<script setup>
import { ref, onMounted } from 'vue';
import ItemCard from './ItemCard.vue';

const items = ref([]);

const fetchItems = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/items');
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
</template>