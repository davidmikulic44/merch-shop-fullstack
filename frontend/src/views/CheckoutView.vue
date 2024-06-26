<template>
    <Header></Header>
    <div class="cart-checkout-container">
        <Cart></Cart>
        <Checkout></Checkout>
    </div>

<Footer></Footer>
</template>

<script setup>
import Header from '../components/Header/Header.vue';
import Checkout from '../components/Checkout/Checkout.vue';
import Cart from '../components/Cart/Cart.vue';
import Footer from '../components/Footer/Footer.vue';
</script>