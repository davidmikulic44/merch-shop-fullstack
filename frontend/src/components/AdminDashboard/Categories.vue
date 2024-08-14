<template>
    <h2 class="table-title">Categories</h2>
    <div>
        <form @submit.prevent="addCategory" class="new-category">
            <input
                v-model="newCategory.name"
                type="text"
                placeholder="Category Name"
                required
            />
            <button class="action-button" type="submit">Add New Category</button>
        </form>
    </div>
    
    <div v-for="category in categories" :key="category.id">
        <div v-if="editingCategory && editingCategory.id === category.id">
            <form @submit.prevent="saveCategoryEdits" class="category-form">
                <input
                    v-model="editingCategory.name"
                    type="text"
                    placeholder="Category Name"
                    required
                />
                <button class="action-button" type="submit">Save</button>
                <button class="action-button-danger" @click="cancelEditCategory">Cancel</button>
            </form>
        </div>
        <div v-else class="category-row">
            <div class="category-name">{{ category.name }}</div>
            <button class="action-button" @click="startEditCategory(category)">Edit</button>
            <button class="action-button-danger" @click="deleteCategory(category.id)">Delete</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const categories = ref([]);

const newCategory = ref({
    name: "",
});

const editingCategory = ref(null);

const startEditCategory = (category) => {
    editingCategory.value = { ...category }; // Create a copy for editing
};





const saveCategoryEdits = async () => {
    try {
        const response = await axios.put(
            `http://localhost:3000/categories/${editingCategory.value.id}`,
            { category: editingCategory.value.name } // Ensure the key matches the backend
        );
        const updatedCategory = response.data;

        // Update the categories list with the updated category data
        const index = categories.value.findIndex(
            (c) => c.id === updatedCategory.id
        );
        if (index !== -1) {
            categories.value[index] = updatedCategory;
        }

        editingCategory.value = null; // Clear the editing state
    } catch (error) {
        console.error("Error saving category edits:", error);
    }
};

const cancelEditCategory = () => {
    editingCategory.value = null; // Clear the editing state
};

const addCategory = async () => {
    try {
        const response = await axios.post(
            "http://localhost:3000/categories",
            { category: newCategory.value.name } // Use 'category' for the request body
        );
        categories.value.push({
            id: response.data.id,
            name: newCategory.value.name, // Mapping to display the correct name
        });
        newCategory.value = { name: "" };
    } catch (error) {
        console.error("Error adding category:", error);
    }
};

// Delete Category
const deleteCategory = async (categoryId) => {
    console.log("Deleting category with ID:", categoryId); // Log the ID
    if (!categoryId) {
        console.error("Category ID is undefined. Cannot delete.");
        return;
    }
    try {
        const response = await axios.delete(
            `http://localhost:3000/categories/${categoryId}`
        );
        categories.value = categories.value.filter(
            (category) => category.id !== categoryId
        );
    } catch (error) {
        console.error("Error deleting category:", error);
    }
};

const fetchCategories = async () => {
    try {
        const response = await axios.get("http://localhost:3000/categories");
        categories.value = response.data.map((item) => ({
            id: item.id,
            name: item.category,
        }));
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

onMounted(() => {
    fetchCategories();
})
</script>
