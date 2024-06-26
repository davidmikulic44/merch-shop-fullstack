<template>
    <div class="categories-outer-container">
        <section class="categories">
            <span
                v-for="(category, index) in categoryList"
                :key="index"
                :class="{'active-category': activeCategory === category.category}"
                class="category-btn"
                @click="handleClick(category)"
            >
                {{ category.category }}
            </span>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Define the emit function
const emit = defineEmits(['categorySelected']);

const categoryList = ref([]);
const activeCategory = ref(localStorage.getItem("activeCategory") || '');

const fetchCategories = async () => {
    try {
        const response = await fetch("http://localhost:3000/categories");
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        categoryList.value = data;
        if (!activeCategory.value && categoryList.value.length) {
            activeCategory.value = categoryList.value[0].category;
            localStorage.setItem("activeCategory", categoryList.value[0].category);
            emit('categorySelected', categoryList.value[0].category);
        } else {
            emit('categorySelected', activeCategory.value);
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const handleClick = (category) => {
    activeCategory.value = category.category;
    localStorage.setItem("activeCategory", category.category);
    emit('categorySelected', category.category);
};

onMounted(fetchCategories);
</script>
