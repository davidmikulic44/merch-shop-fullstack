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
import axios from "axios";

const items = ref([]);

const fetchItems = async (category) => {
    try {
        const response = await axios.get(`http://localhost:3000/items`, {
            params: { category }
        });
        
        items.value = response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
    }
};
</script>

