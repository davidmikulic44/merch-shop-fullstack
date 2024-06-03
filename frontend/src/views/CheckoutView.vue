<template>
    <div>
        <Header></Header>
        <h2>Checkout</h2>
        <form @submit.prevent="submitCheckout">
            <div>
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" v-model="firstName" required>
            </div>
            <div>
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" v-model="lastName" required>
            </div>
            <div>
                <label for="address">Address:</label>
                <input type="text" id="address" v-model="address" required>
            </div>
            <div>
                <label for="city">City:</label>
                <input type="text" id="city" v-model="city" required>
            </div>
            <div>
                <label for="postalCode">Postal Code:</label>
                <input type="text" id="postalCode" v-model="postalCode" required>
            </div>
            <div>
                <label>Payment Method:</label>
                <select v-model="paymentMethod" required>
                    <option value="card">Card</option>
                    <option value="paypal">Plaćanje pouzećem</option>
                </select>
            </div>
            <div v-if="paymentMethod === 'card'">
                <div>
                    <label for="cardNumber">Card Number:</label>
                    <input type="text" id="cardNumber" v-model="cardNumber" required>
                </div>
                <div>
                    <label for="expiryDate">Expiry Date:</label>
                    <input type="text" id="expiryDate" v-model="expiryDate" required>
                </div>
                <div>
                    <label for="cvv">CVV:</label>
                    <input type="text" id="cvv" v-model="cvv" required>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/Header/Header.vue';
import axios from 'axios';
import { useUser } from '../store/auth.js';

const firstName = ref('');
const lastName = ref('');
const address = ref('');
const city = ref('');
const postalCode = ref('');
const paymentMethod = ref('card');
const cardNumber = ref('');
const expiryDate = ref('');
const cvv = ref('');



const { user } = useUser();

const submitCheckout = async () => {
    const userId = user.value.ID;

    try {
        await axios.post('http://localhost:3000/cart/update-status', { userId });
        console.log('Cart updated successfully');
        // Optionally, you can navigate to a confirmation page or display a success message
    } catch (error) {
        console.error('Error updating cart:', error);
        // Handle error, display error message to user, etc.
    }
};
</script>

<style scoped>
/* Add your styles here */
form div {
    margin-bottom: 1rem;
}

form label {
    display: block;
    margin-bottom: 0.5rem;
}

form input, form select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
}
</style>
