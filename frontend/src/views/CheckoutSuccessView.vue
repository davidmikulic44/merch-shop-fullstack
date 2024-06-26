<template>
    <Header></Header>
    <div class="checkout-success-container">
        <h1>Narudžba zaprimljena.</h1>
        <div class="return-button-container">
            <RouterLink to="/" class="submit-button"
                >Vrati se na početnu stranicu</RouterLink
            >
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup>
import Header from "../components/Header/Header.vue";
import Footer from "../components/Footer/Footer.vue";
</script>
