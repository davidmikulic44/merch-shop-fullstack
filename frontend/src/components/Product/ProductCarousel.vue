<script setup>
import "@splidejs/vue-splide/css";
import { ref, onMounted } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

const props = defineProps({
  images: {
    type: Array,
    required: true,
  }
});

const mainOptions = {
  rewind: true,
  pagination: false,
  gap: "1rem",
};

const thumbsOptions = {
  type: "slide",
  rewind: true,
  gap: "1rem",
  pagination: false,
  fixedWidth: 100,
  fixedHeight: 110,
  cover: true,
  focus: "left",
  isNavigation: true,
  updateOnMove: true,
  arrows: false,
};

const main = ref(null);
const thumbs = ref(null);

onMounted(() => {
  if (main.value && thumbs.value) {
    main.value.sync(thumbs.value.splide);
    thumbs.value.sync(main.value.splide);
  }
});
</script>

<template>
  <div class="product-carousel">
    <Splide :options="mainOptions" class="product-carousel-slide" ref="main">
      <SplideSlide v-for="(image, index) in images" :key="index">
        <img :src="image" class="product-carousel-image" />
      </SplideSlide>
    </Splide>
    <Splide :options="thumbsOptions" class="carousel-thumbs" ref="thumbs">
      <SplideSlide v-for="(image, index) in images" :key="index">
        <img :src="image" class="product-carousel-image-small" />
      </SplideSlide>
    </Splide>
  </div>
</template>

