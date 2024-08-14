<template>
    <h2 class="table-title">Users</h2>
    <div v-for="user in users" :key="user.id">
        <div v-if="editingUser && editingUser.id === user.id">
            <h1>
                Editing user: {{ editingUser.firstname }}
                {{ editingUser.lastname }}
            </h1>
            <form @submit.prevent="saveUserEdits" class="edit-user-form">
                <label>Email:</label>
                <input v-model="editingUser.email" type="text" />
                <label>First Name:</label>
                <input v-model="editingUser.firstname" type="text" />
                <label>Last Name:</label>
                <input v-model="editingUser.lastname" type="text" />
                <label>Role:</label>
                <input v-model="editingUser.role" type="text" />
                <label>Address:</label>
                <input v-model="editingUser.address" type="text" />
                <label>City:</label>
                <input v-model="editingUser.city" type="text" />
                <label>Postal Code:</label>
                <input v-model="editingUser.postal_code" type="text" />
                <div class="form-buttons">
                    <button class="action-button" type="submit">Save</button>
                    <button class="action-button-danger" @click="cancelEdit">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
        <div class="admin-user" v-else>
            <div class="admin-user-info">
                <p>{{ user.email }}</p>
                <p>{{ user.firstname }} {{ user.lastname }}</p>
                <p>
                    Role: <span v-if="user.role === '0'">user</span>
                    <span v-else>{{ user.role }}</span>
                </p>
            </div>
            <button class="action-button" @click="startEdit(user)">Edit</button>
            <button class="action-button-danger" @click="deleteUser(user.id)">
                Delete
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);
const editingUser = ref(null); // Define editingUser as a reactive reference

// Fetch users
const fetchUsers = async () => {
    try {
        const response = await axios.get("http://localhost:3000/auth/users");
        users.value = response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

// Start editing a user
const startEdit = (user) => {
    editingUser.value = { ...user }; // Clone the user object to avoid direct mutations
};

// Save user edits
const saveUserEdits = async () => {
    if (!editingUser.value) return;

    try {
        const response = await axios.put(
            `http://localhost:3000/auth/users/${editingUser.value.id}`,
            editingUser.value
        );
        const updatedUser = response.data;

        // Update the user in the local state
        const index = users.value.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
            users.value[index] = updatedUser;
        }

        editingUser.value = null; // Clear the editingUser after save
    } catch (error) {
        console.error("Error editing user:", error);
    }
};

// Cancel editing
const cancelEdit = () => {
    editingUser.value = null;
};

// Delete user
const deleteUser = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/auth/users/${id}`);
        users.value = users.value.filter((user) => user.id !== id);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
};

onMounted(() => {
    fetchUsers();
});
</script>
