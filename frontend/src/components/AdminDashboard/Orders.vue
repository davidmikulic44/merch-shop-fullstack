<template>
    <h2 class="table-title">Orders</h2>
    <div v-for="order in orders" :key="order.order_id" class="order-container">
        <div class="order-header">
            <div>
                ID: {{ order.order_id }} - User: {{ order.firstname }}
                {{ order.lastname }}
            </div>
            <button
                @click="toggleOrderDetails(order.order_id)"
                class="action-button"
            >
                {{
                    isDetailsVisible(order.order_id)
                        ? "Hide Details"
                        : "View Details"
                }}
            </button>
        </div>
        <!-- Cart Details Section -->
        <div v-if="isDetailsVisible(order.order_id)" class="order-details">
            
            <p>Email: {{ order.email }}</p>
            <p>
                Address: {{ order.address }}, {{ order.city }},
                {{ order.postal_code }}
            </p>
            <ul>
                <li
                    v-for="item in getCartItems(order.order_id)"
                    :key="item.cart_item_id"
                >
                    {{ item.name }} - {{ item.quantity }} x {{ item.size }} -
                    {{ item.price }}&euro;
                </li>
            </ul>
            <h3 class="order-cost">Total cost: {{ order.cost }}&euro;</h3>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const orders = ref([]);
const orderDetails = ref({});
const toggleOrderDetails = (orderId) => {
    if (orderDetails.value[orderId]) {
        delete orderDetails.value[orderId];
    } else {
        // Fetch and store the details for this order
        const order = orders.value.find((o) => o.order_id === orderId);
        orderDetails.value[orderId] = order.items; // Assuming items is a list of cart items

    }
};

const deleteOrder = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/orders/${id}`);
        orders.value = orders.value.filter((order) => order.id !== id);
    } catch (error) {
        console.error("Error deleting order:", error);
    }
};

const isDetailsVisible = (orderId) => {
    return Boolean(orderDetails.value[orderId]);
};

const getCartItems = (orderId) => {
    return orderDetails.value[orderId] || [];
};

const fetchOrders = async () => {
    try {
        const response = await axios.get("http://localhost:3000/orders");
        orders.value = response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
};

onMounted(() => {
    fetchOrders();
});
</script>
