<template>
    <div v-if="user.role === 'admin'" class="admin-container">
        <h1>admin dashboard</h1>
        <section class="admin-items">
            <div>
                <form class="new-item">
                    <input type="name" name="item" id="name" placeholder="name" required >
                    <input type="number" name="item" id="price" placeholder="price" required>
                    <input type="name" name="item" id="category" placeholder="category" required>
                    <textarea name="item" id="imagepath" cols="30" rows="10" placeholder="image path"></textarea>
                    <textarea name="item" id="modelpath" cols="30" rows="10" placeholder="model path"></textarea>
                    <button type="submit" @click="addItem">add new</button>
                </form>
            </div>
            <div v-for="item in items" :key="item.id">
                <ItemCard :item="item" />
            </div>
        </section>
    </div>
    <div v-else>
        <h1>email: {{ user.email }}</h1>
        <h1>firstname: {{ user.firstname }}</h1>
        <h1>lastname: {{ user.lastname }}</h1>
        <h1>address: {{ user.address }}</h1>
        <h1>city: {{ user.city }}</h1>
        <h1>postal code: {{ user.postal_code }}</h1>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useUser } from "../../store/auth";
import ItemCard from '../Items/ItemCard.vue'

const { user } = useUser();
const items = ref([]);
const fetchItems = async () => {
    try {
        const response = await axios.get("http://localhost:3000/items"); // Use axios.get
        items.value = response.data; // Assign the data property from the response

        // Debug log
        console.log("Fetched items:", items.value);
    } catch (error) {
        console.error("Error fetching items:", error);
    }
};

const addItem = async () => {
    try {

    }
    catch (error) {
        console.error("error adding item", error);
    }
}

onMounted(fetchItems);
</script>
