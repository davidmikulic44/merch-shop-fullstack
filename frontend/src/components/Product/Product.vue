<script setup>
    import ProductCarousel from './ProductCarousel.vue';
    import ProductRender from '../ProductRender/ProductRender.vue';
    import ProductInfo from './ProductInfo.vue';
</script>

<template>
    <div class="single-product-container">
        <article class="product-view-container">
            <section class="product-visuals-container">
                <ProductRender></ProductRender>
                <ProductCarousel></ProductCarousel>
            </section>
            <ProductInfo></ProductInfo>
        </article>
    </div>
</template>