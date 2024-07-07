<script setup>
import axios from "axios";
import { ref } from "vue";
import { useUser } from "../../store/auth.js";
import { cartItemCount, sum, updateCart } from "../../store/cart.js"; // Import cart store

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const qty = ref(1);
const selectedSize = ref("M");
const incrementQty = () => {
    if (qty.value < 5) {
        qty.value++;
    }
};

// Decrement quantity
const decrementQty = () => {
    if (qty.value > 1) {
        qty.value--;
    }
};

const { user } = useUser();

const addToCart = async () => {
    const itemId = props.item.ID;
    const size = selectedSize.value;
    const quantity = qty.value;
    const userId = user.value.ID;
    try {
        await axios.post("/cart/add-to-cart", {
            itemId: itemId,
            size: size,
            quantity: quantity,
            userId: userId,
        });

        const response = await axios.get(`/cart/active-cart/${userId}`);
        const itemCount = response.data.length;
        let totalQuantity = 0;
        for (let i = 0; i < response.data.length; i++) {
            totalQuantity += response.data[i].quantity;
        }
        updateCart(itemCount, totalQuantity);
    } catch (error) {
        console.error("Adding to cart failed");
    }
};
</script>

<template>
    <article class="product-info-container">
        <div class="product-info">
            <h1 class="product-title">{{ item.name }}</h1>
            <h6 class="product-category">{{ item.category }}</h6>
            <h3 class="product-price">{{ item.price }}&euro;</h3>
            <p class="product-description">{{ item.description }}</p>
        </div>
        <section class="product-action">
            <form @submit.prevent="addToCart">
                <div class="size-container">
                    <p class="product-description">Odaberi veličinu:</p>
                    <section class="size">
                        <div class="single-size">
                            <label for="s">S</label>
                            <input
                                type="radio"
                                name="size"
                                id="s"
                                value="S"
                                v-model="selectedSize"
                            />
                        </div>
                        <div class="single-size">
                            <label for="m">M</label>
                            <input
                                type="radio"
                                name="size"
                                id="m"
                                value="M"
                                v-model="selectedSize"
                            />
                        </div>
                        <div class="single-size">
                            <label for="l">L</label>
                            <input
                                type="radio"
                                name="size"
                                id="l"
                                value="L"
                                v-model="selectedSize"
                            />
                        </div>
                        <div class="single-size">
                            <label for="xl">XL</label>
                            <input
                                type="radio"
                                name="size"
                                id="xl"
                                value="XL"
                                v-model="selectedSize"
                            />
                        </div>
                    </section>
                </div>
                <section class="quantity">
                    <label
                        type="button"
                        @click="incrementQty"
                        class="qty-btn"
                        for="qty"
                        id="plus"
                        >+</label
                    >
                    <label
                        type="button"
                        @click="decrementQty"
                        class="qty-btn"
                        for="qty"
                        id="minus"
                        >-</label
                    >
                    <input
                        type="number"
                        name="qty"
                        id="qty"
                        v-model="qty"
                        min="1"
                        max="5"
                    />
                </section>
                <button v-if="user" type="submit" class="submit-button">
                    Dodaj u košaricu
                </button>
                <RouterLink v-else to="/cart" class="submit-button">
                    Dodaj u košaricu
                </RouterLink>
            </form>
        </section>
    </article>
</template>
