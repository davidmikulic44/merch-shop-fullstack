<template>
    <div>
        <Categories @categorySelected="fetchItems" />
        <div v-if="items.length" class="items-container">
            <ItemCard v-for="item in items" :item="item" :key="item.id" />
            
        </div>
        <div v-else class="items-container no-items">
            <h1>Trenutno nema proizvoda u ovoj kategoriji.</h1>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Categories from "../Categories/Categories.vue";
import ItemCard from "./ItemCard.vue";

const items = ref([]);

const fetchItems = async (category) => {
    try {
        const response = await fetch(`http://localhost:3000/items?category=${category}`);
        if (!response.ok) {
            throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        items.value = data;
    } catch (error) {
        console.error("Error fetching items:", error);
    }
};
</script>