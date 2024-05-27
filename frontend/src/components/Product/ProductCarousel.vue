<script setup>
import ProductRender from "../ProductRender/ProductRender.vue";
import "@splidejs/vue-splide/css";

const mainOptions = {
    rewind: true,
    pagination: false,
    arrows: true,
    drag: false,
    dragAngleThreshold: 0,
};

const thumbsOptions = {
    type: "slide",
    rewind: true,
    gap: "1rem",
    pagination: false,
    fixedWidth: 110,
    fixedHeight: 70,
    cover: true,
    focus: "center",
    isNavigation: true,
    updateOnMove: true,
};


</script>

<template>
    <Splide :options="mainOptions" class="product-carousel-slide">
        <SplideSlide>
            <ProductRender></ProductRender>
        </SplideSlide>
        <SplideSlide class="product-carousel-slide">
            <img
                src="/src/assets/images/girlslovesbl.jpg"
                class="product-carousel-image"
            />
        </SplideSlide>
    </Splide>
</template>
