<script setup>
import Heart from '../../assets/icons/Heart.vue'
import Cart from '../../assets/icons/Cart.vue';
</script>

<template>
    <header class="header">
        <RouterLink to="/"><h1 class="header-title">GIRLS <Heart></Heart> SBL</h1>
        </RouterLink>
            <div class="user-actions">
                <Cart class="header-action-btn"></Cart>
                <RouterLink to="/login" class="header-action-btn">LOGIN</RouterLink>
                <h1 class="header-action-btn">REGISTER</h1>
            </div>
    </header>
</template>