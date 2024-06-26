<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductCarousel from './ProductCarousel.vue';
import ProductRender from '../ProductRender/ProductRender.vue';
import ProductInfo from './ProductInfo.vue';

const route = useRoute();
const item = ref(null);
const images = ref([]);
const modelPath = ref('');

const fetchItem = async () => {
  try {
    const response = await fetch(`http://localhost:3000/items/${route.params.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch item');
    }
    const data = await response.json();
    item.value = data;
    images.value = data.images;
    modelPath.value = data.models[0];

    // Set the document title to the product name
    document.title = data.name;
  } catch (error) {
    console.error('Error fetching item:', error);
  }
};
onMounted(fetchItem);
</script>

<template>
  <div class="single-product-container" v-if="item">
    <article class="product-view-container">
      <section class="product-visuals-container">
        <ProductRender :modelPath="modelPath"></ProductRender>
        <ProductCarousel :images="images"></ProductCarousel>
      </section>
      <ProductInfo :item="item"></ProductInfo>
    </article>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
