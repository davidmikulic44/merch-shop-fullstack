import { ref } from "vue";
import axios from "axios";

const cartItemCount = ref(0);
const sum = ref(0);

const updateCart = (count, total) => {
    cartItemCount.value = count;
    sum.value = total;
};

const fetchCartItemCount = async (userId) => {
    try {
        const response = await axios.get(`/cart/active-cart/${userId}`);
        const itemCount = response.data.length;
        let totalQuantity = 0;
        for (let i = 0; i < response.data.length; i++) {
            totalQuantity += response.data[i].quantity;
        }
        updateCart(itemCount, totalQuantity);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            updateCart(0, 0); // No active cart found
        } else {
            console.error("Failed to fetch cart item count:", error);
        }
    }
};

export { cartItemCount, sum, updateCart, fetchCartItemCount };
