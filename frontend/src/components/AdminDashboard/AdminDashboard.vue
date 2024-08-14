<template>
    <h1 class="items-container">Admin Dashboard</h1>
    <!-- Top Menu for Table Selection -->
    <div class="categories-outer-container">
        <section class="categories">
            <span
                :class="{ 'active-category': activeTable.value === 'orders' }"
                class="category-btn"
                @click="setActiveTable('orders')"
            >
                Orders
            </span>
            <span
                :class="{ 'active-category': activeTable.value === 'items' }"
                class="category-btn"
                @click="setActiveTable('items')"
            >
                Items
            </span>
            <span
                :class="{ 'active-category': activeTable.value === 'categories',}"
                class="category-btn"
                @click="setActiveTable('categories')"
            >
                Categories
            </span>
            <span
                :class="{ 'active-category': activeTable.value === 'users' }"
                class="category-btn"
                @click="setActiveTable('users')"
            >
                Users
            </span>
        </section>
    </div>

    <!-- Items Section -->
    <section v-if="activeTable === 'items'" class="admin-table">
        <Items></Items>
    </section>

    <!-- Categories Section -->
    <section v-if="activeTable === 'categories'" class="admin-table">
        <Categories></Categories>
    </section>

    <!-- Users Section -->
    <section v-if="activeTable === 'users'" class="admin-table">
        <Users></Users>
    </section>

    <!-- Orders Section -->
    <section v-if="activeTable === 'orders'" class="admin-table">
        <Orders></Orders>
    </section>
</template>

<script setup>
import { ref } from "vue";
import Orders from "./Orders.vue";
import Categories from "./Categories.vue";
import Users from "./Users.vue";
import Items from "./Items.vue";

const activeTable = ref(localStorage.getItem("activeTable") || "orders"); // Set default table to 'orders'

const setActiveTable = (table) => {
    activeTable.value = table;
    localStorage.setItem("activeTable", activeTable.value);
    console.log("active: ", activeTable.value);
};
</script>
