<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductCarousel from './ProductCarousel.vue';
import ProductRender from '../ProductRender/ProductRender.vue';
import ProductInfo from './ProductInfo.vue';
import axios from 'axios';

const route = useRoute();
const item = ref(null);
const images = ref([]);
const modelPath = ref('');

const fetchItem = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/items/${route.params.id}`);
    item.value = response.data;
    images.value = response.data.images;
    modelPath.value = response.data.models[0];

    document.title = response.data.name;
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
