<template>
    <div class="checkout-container">
        <form class="checkout-form" @submit.prevent="submitCheckout">
            <h1>Informacije za naplatu:</h1>
            <section v-if="user" class="checkout-details">
                <div class="input-container">
                    <label>Ime:</label>
                    <p>{{ user.firstname }}</p>
                </div>
                <div class="input-container">
                    <label>Prezime:</label>
                    <p>{{ user.lastname }}</p>
                </div>
                <div class="input-container">
                    <label>Adresa:</label>
                    <p>{{ user.address }}</p>
                </div>
                <div class="input-container">
                    <label>Grad:</label>
                    <p>{{ user.city }}</p>
                </div>
                <div class="input-container">
                    <label>Poštanski broj:</label>
                    <p>{{ user.postal_code }}</p>
                </div>
            </section>
            <section v-else>
                <div class="input-container">
                    <label for="firstName">Ime:</label>
                    <input
                        type="text"
                        id="firstName"
                        v-model="firstName"
                        required
                    />
                </div>
                <div class="input-container">
                    <label for="lastName">Prezime:</label>
                    <input
                        type="text"
                        id="lastName"
                        v-model="lastName"
                        required
                    />
                </div>
                <div class="input-container">
                    <label for="address">Adresa:</label>
                    <input
                        type="text"
                        id="address"
                        v-model="address"
                        required
                    />
                </div>
                <div class="input-container">
                    <label for="city">Grad:</label>
                    <input type="text" id="city" v-model="city" required />
                </div>
                <div class="input-container">
                    <label for="postalCode">Poštanski broj:</label>
                    <input
                        type="text"
                        id="postalCode"
                        v-model="postalCode"
                        required
                    />
                </div>
            </section>
            <div class="input-container">
                <label for="paymentMethod">Vrsta plaćanja:</label>
                <select id="paymentMethod" v-model="paymentMethod" required>
                    <option value="card">Kartica</option>
                    <option value="pp">Plaćanje pouzećem</option>
                </select>
            </div>
            <section v-if="paymentMethod === 'card'" class="checkout-form">
                <div class="input-container">
                    <label for="cardNumber">Broj kartice:</label>
                    <input
                        type="text"
                        id="cardNumber"
                        v-model="cardNumber"
                        required
                        placeholder="1234 1234 1234 1234"
                    />
                </div>
                <div class="input-container">
                    <label for="expiryDate">Datum isteka:</label>
                    <input
                        type="text"
                        id="expiryDate"
                        v-model="expiryDate"
                        required
                        placeholder="01/24"
                    />
                </div>
                <div class="input-container">
                    <label for="cvv">CVV:</label>
                    <input
                        type="text"
                        id="cvv"
                        v-model="cvv"
                        required
                        placeholder="123"
                    />
                </div>
                <p v-if="cardNumberError" class="error-message">
                    {{ cardNumberError }}
                </p>
                <p v-if="expiryDateError" class="error-message">
                    {{ expiryDateError }}
                </p>
                <p v-if="cvvError" class="error-message">{{ cvvError }}</p>
            </section>
            <button type="submit" class="submit-button">Naruči</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUser } from "../../store/auth.js";

const firstName = ref("");
const lastName = ref("");
const address = ref("");
const city = ref("");
const postalCode = ref("");
const paymentMethod = ref("card");
const cardNumber = ref("");
const expiryDate = ref("");
const cvv = ref("");

const cardNumberError = ref("");
const expiryDateError = ref("");
const cvvError = ref("");

const { user } = useUser();
const router = useRouter();

const validateCardDetails = () => {
    cardNumberError.value = "";
    expiryDateError.value = "";
    cvvError.value = "";

    const cardNumberValue = cardNumber.value.replace(/\s+/g, "");
    const expiryDateValue = expiryDate.value.split("/");
    const cvvValue = cvv.value;

    let valid = true;

    if (cardNumberValue.length !== 16) {
        cardNumberError.value = "Broj kartice mora imati 16 znamenki.";
        valid = false;
    }

    if (
        expiryDateValue.length !== 2 ||
        expiryDateValue[0].length !== 2 ||
        expiryDateValue[1].length !== 2
    ) {
        expiryDateError.value = "Datum isteka mora biti u formatu MM/YY.";
        valid = false;
    } else {
        const month = parseInt(expiryDateValue[0], 10);
        const year = parseInt(`20${expiryDateValue[1]}`, 10);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        if (
            month < 1 ||
            month > 12 ||
            year < currentYear ||
            (year === currentYear && month < currentMonth)
        ) {
            expiryDateError.value = "Datum isteka nije važeći.";
            valid = false;
        }
    }

    if (cvvValue.length !== 3) {
        cvvError.value = "CVV mora imati 3 znamenke.";
        valid = false;
    }

    return valid;
};

const submitCheckout = async () => {
    if (paymentMethod.value === "card" && !validateCardDetails()) {
        return;
    }

    const userId = user.value?.ID || null;

    try {
        await axios.post("http://localhost:3000/cart/update-status", {
            userId,
        });
        router.push("/checkout/success");
    } catch (error) {
        console.error("Error updating cart:", error);
    }
};
</script>

<style scoped>

</style>
