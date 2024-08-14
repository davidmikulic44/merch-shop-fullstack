<template>
  <div v-if="user.role === 'admin'" class="admin-container">
    <AdminDashboard></AdminDashboard>
  </div>
  <!-- Regular User Profile -->
  <div class="user-profile-container" v-else>

    <form @submit.prevent="updateUserProfile">
      <div>
        <label class="user-label">Email:</label>
        <span class="user-information">{{ user.email }}</span>
      </div>
      <div>
        <label class="user-label">First Name:</label>
        <span class="user-information">{{ user.firstname }}</span>
      </div>
      <div>
        <label class="user-label">Last Name:</label>
        <span class="user-information">{{ user.lastname }}</span>
      </div>
      <div>
        <label class="user-label">Address:</label>
        <span class="user-information" v-if="!isEditing">{{ user.address }}</span>
        <input class="user-information-input" v-else v-model="editableUser.address" type="text" placeholder="Address" />
      </div>
      <div>
        <label class="user-label">City:</label>
        <span class="user-information" v-if="!isEditing">{{ user.city }}</span>
        <input class="user-information-input" v-else v-model="editableUser.city" type="text" placeholder="City" />
      </div>
      <div>
        <label class="user-label">Postal Code:</label>
        <span class="user-information" v-if="!isEditing">{{ user.postal_code }}</span>
        <input class="user-information-input" v-else v-model="editableUser.postal_code" type="text" placeholder="Postal Code" />
      </div>
      
      <div v-if="isEditing" class="form-buttons">
        <button class="action-button" type="submit">Save Changes</button>
        <button class="action-button-danger" type="button" @click="cancelEdit">Cancel</button>
      </div>
      <button class="action-button" v-else type="button" @click="startEdit">Edit Profile</button>
    </form>
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref } from "vue";
import AdminDashboard from "../AdminDashboard/AdminDashboard.vue";
import Footer from "../Footer/Footer.vue";
import { useUser } from "../../store/auth";
import axios from "axios";

const { user } = useUser();
const editableUser = ref({ ...user.value });
const isEditing = ref(false);

const startEdit = () => {
  isEditing.value = true;
  editableUser.value = { ...user.value }; // Make a copy of the current user data
};

const cancelEdit = () => {
  isEditing.value = false;
  editableUser.value = { ...user.value }; // Reset the editable fields
};

const updateUserProfile = async () => {
  try {
  console.log("updating user profil")
    const updatedUserData = { ...editableUser.value, ID: user.value.ID };
    
    const response = await axios.put(
      `http://localhost:3000/auth/profile`,
      updatedUserData
    );

    if (response.status === 200) {
      Object.assign(user.value, response.data); // Update the user store with the new data
      isEditing.value = false; // Exit the editing mode
      alert("Profile updated successfully!");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile. Please try again.");
  }
};
</script>
