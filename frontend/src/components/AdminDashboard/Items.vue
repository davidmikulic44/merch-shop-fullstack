<template>
    <h2 class="table-title">Items</h2>
    <div class="new-item">
        <form @submit.prevent="addItem" class="new-item">
            <input
                v-model="newItem.name"
                type="text"
                placeholder="Name"
                required
            />
            <input
                v-model="newItem.price"
                type="number"
                placeholder="Price"
                required
            />
            <select v-model="newItem.category_id" required>
                <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                >
                    {{ category.name }}
                </option>
            </select>
            <input
                v-model="newItem.image_path"
                type="text"
                placeholder="Image Path"
            />
            <div class="header-action-btn" type="submit">Add New Item</div>
        </form>
    </div>

    <div v-for="item in items" :key="item.ID" class="items-admin">
        <!-- Only show the item card or the edit form, not both -->
        <div class="editing-item" v-if="editingItem && editingItem.ID === item.ID">
            <ItemCard :item="item" />
            <form @submit.prevent="updateItem" class="edit-item-form">
                <input
                    v-model="editingItem.name"
                    type="text"
                    placeholder="Name"
                />
                <input
                    v-model="editingItem.price"
                    type="number"
                    placeholder="Price"
                />
                <select v-model="editingItem.category_id">
                    <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                    >
                        {{ category.name }}
                    </option>
                </select>
                <input
                    v-model="editingItem.image_path"
                    type="text"
                    placeholder="Image Path"
                />
                <div class="form-buttons">
                    <button class="action-button" type="submit">Save Changes</button>
                    <button class="action-button-danger" type="button" @click="cancelEditItem">Cancel</button>
                </div>
            </form>
        </div>
        <div class="item-admin" v-else>
            <!-- Display the item card if not in edit mode -->
            <ItemCard :item="item" />
            <div class="form-buttons">
                <button class="action-button" @click="startEditItem(item)">Edit</button>
                <button class="action-button-danger" @click="deleteItem(item.ID)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ItemCard from "../Items/ItemCard.vue";

const items = ref([]);
const editingItem = ref(null);
const categories = ref([]);
const newItem = ref({
    name: "",
    price: "",
    category_id: "",
    image_path: "",
    model_path: "",
});

const startEditItem = (item) => {
    editingItem.value = { ...item }; // Create a copy for editing
};

const cancelEditItem = () => {
    editingItem.value = null; // Clear the editing state
};

const addItem = async () => {
    try {
        console.log("Submitting new item:", newItem.value); // Log to check data
        const response = await axios.post(
            "http://localhost:3000/items",
            newItem.value
        );
        items.value.push(response.data);
        newItem.value = {
            name: "",
            price: "",
            category_id: "",
            image_path: "",
            model_path: "",
        };
    } catch (error) {
        console.error("Error adding item:", error);
    }
};

const updateItem = async () => {
    console.log("updateItem called");
    try {
        const updatedItemData = { ...editingItem.value };
        console.log("Data to update:", updatedItemData);

        Object.keys(updatedItemData).forEach((key) => {
            if (
                updatedItemData[key] === "" ||
                updatedItemData[key] === null ||
                updatedItemData[key] === undefined
            ) {
                delete updatedItemData[key];
            }
        });

        const itemId = updatedItemData.ID;

        if (!itemId) {
            throw new Error("Item ID is missing");
        }

        const response = await axios.put(
            `http://localhost:3000/items/${itemId}`,
            updatedItemData
        );
        console.log("Update response:", response.data);

        const index = items.value.findIndex((i) => i.ID === itemId);
        if (index !== -1) {
            items.value[index] = response.data;
        }
        editingItem.value = null; // Clear the editing state
    } catch (error) {
        console.error("Error updating item:", error);
    }
};

const deleteItem = async (itemId) => {
    console.log("Deleting item with ID:", itemId);
    if (!itemId) {
        console.error("Invalid item ID");
        return;
    }

    try {
        const response = await axios.delete(
            `http://localhost:3000/items/${itemId}`
        );

        if (response.status === 200) {
            console.log("Item successfully deleted");
            items.value = items.value.filter((item) => item.id !== itemId);
        } else {
            console.error(
                "Failed to delete item:",
                response.status,
                response.data
            );
        }
    } catch (error) {
        console.error(
            "Error deleting item:",
            error.response ? error.response.data : error.message
        );
    }
};

const fetchItems = async () => {
    try {
        const response = await axios.get("http://localhost:3000/items");
        items.value = response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
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
    fetchItems();
    fetchCategories();
});
</script>
