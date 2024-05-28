<script setup>

import "@splidejs/vue-splide/css";
import { defineComponent, onMounted, ref } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

const mainOptions = {
    rewind: true,
    pagination: false,
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
            <SplideSlide>
                <img
                    src="/src/assets/images/parking.jpg"
                    class="product-carousel-image"
                />
            </SplideSlide>
            <SplideSlide class="product-carousel-slide">
                <img
                    src="/src/assets/images/dvoriste.jpg"
                    class="product-carousel-image"
                />
            </SplideSlide>
            <SplideSlide class="product-carousel-slide">
                <img
                    src="/src/assets/images/kauc1.jpg"
                    class="product-carousel-image"
                />
            </SplideSlide>
        </Splide>
        <Splide :options="thumbsOptions" class="carousel-thumbs" ref="thumbs">
            <SplideSlide>
                <img
                    src="/src/assets/images/parking.jpg"
                    class="product-carousel-image-small"
                />
            </SplideSlide>
            <SplideSlide class="product-carousel-slide">
                <img
                    src="/src/assets/images/dvoriste.jpg"
                    class="product-carousel-image-small"
                />
            </SplideSlide>
            <SplideSlide class="product-carousel-slide">
                <img
                    src="/src/assets/images/kauc1.jpg"
                    class="product-carousel-image"
                />
            </SplideSlide>
        </Splide>
    </div>
</template>
