<script setup>

</script>

<template>
    <div class="product-info-container">
        <div class="product-info">
            <h1 class="product-title">HOĆEMO JOŠ!</h1>
            <h6 class="product-category">Majica kratkih rukava</h6>
            <h3 class="product-price">25&euro;</h3>
            <p class="product-description">Majica kratkih rukava s DTG printom. 100% pamuk.</p>
        </div>
        <section class="product-action">
            <form action="" method="POST">
                <input type="radio" name="s" id="s">
                <input type="radio" name="s" id="s">
                <input type="radio" name="s" id="s">
                <input type="radio" name="s" id="s">
                <input type="number" name="qty" id="qty" min="1" max="5">
                <button type="submit">Dodaj u košaricu</button>
            </form>
        </section>
    </div>
</template>