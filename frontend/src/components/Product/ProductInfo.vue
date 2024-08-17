<template>
    <article class="product-info-container">
        <div class="product-info">
            <h1 class="product-title">{{ item.name }}</h1>
            <h6 class="product-category">{{ item.category }}</h6>
            <h3 class="product-price">{{ item.price }}&euro;</h3>
            <p class="product-description">{{ item.description }}</p>
        </div>
        <section class="product-action">
            <form @submit="handleSubmit">
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
                    >
                        +
                    </label>
                    <label
                        type="button"
                        @click="decrementQty"
                        class="qty-btn"
                        for="qty"
                        id="minus"
                    >
                        -
                    </label>
                    <input
                        type="number"
                        name="qty"
                        id="qty"
                        v-model="qty"
                        min="1"
                        max="5"
                    />
                </section>
                <button
                    v-if="userValue === null"
                    type="submit"
                    class="submit-button"
                >
                    Dodaj u košaricu kao gost
                </button>
                <button
                    v-else
                    type="submit"
                    class="submit-button"
                >
                    Dodaj u košaricu
                </button>
            </form>
        </section>
    </article>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useUser } from "../../store/auth.js";
import { updateCart } from "../../store/cart.js";

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const qty = ref(1);
const selectedSize = ref("M");
const { user } = useUser();
const userValue = computed(() => user.value);

// Increment quantity
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

// Handle form submission
const handleSubmit = async (event) => {
    event.preventDefault();
    if (userValue.value) {
        await addToCart();
    } else {
        await addToGuestCart();
    }
};

// Function to add an item to the cart for logged-in users
const addToCart = async () => {
    const itemId = props.item.ID;
    const size = selectedSize.value;
    const quantity = qty.value;
    const userId = userValue.value.ID;

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
        console.error("Adding to cart failed", error.message);
    }
};

// Function to add an item to the cart for guests
const addToGuestCart = async () => {
    const itemId = props.item.ID;
    const size = selectedSize.value;
    const quantity = qty.value;

    try {
        // Retrieve guest ID from localStorage
        let guestId = localStorage.getItem('guestId');

        if (!guestId) {
            // Create a new guest ID if not already present
            const guestResponse = await axios.get("http://localhost:3000/guest/create");
            guestId = guestResponse.data.guestId;
            console.log(guestId)
            localStorage.setItem('guestId', guestId); // Store guest ID in localStorage
        }

        // Add the item to the guest's cart
        await axios.post("http://localhost:3000/guest/add-to-guest-cart", {
            itemId,
            size,
            quantity,
            guestId,
        });

        // Optionally: Update UI or state to reflect changes
    } catch (error) {
        console.error("Adding to guest cart failed", error.message);
    }
};
</script>
