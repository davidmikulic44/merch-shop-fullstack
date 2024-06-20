<template>
    <footer class="footer">
        <h6 class="copyright-text">SBL 2024®</h6>
        <a v-if="song" :href="song.external_urls.spotify" class="spotify-song" target="_blank">
            <img
                :src="song.album.images[0].url"
                alt="Album cover"
                class="album-cover"
            />
            <div class="song-info">
                <h6 class="song-name">{{ song.name }}</h6>
                <p class="artist-name">
                    {{ song.artists.map((artist) => artist.name).join(", ") }}
                </p>
            </div>
        </a>
        <section v-else class="spotify-song">
            <img src="/src/assets/images/sblgreen.png" class="album-cover">
            <div class="song-info">
                <h6 class="song-name">Loading...</h6>
            </div>
        </section>
    </footer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const song = ref(null);
const playlistId = "6CLiojP2gPQkZ0AlRI5ZMl";
onMounted(async () => {
    try {
        const response = await axios.get(
            "http://localhost:3000/spotify/random-songs/" + playlistId
        );
        song.value = response.data[0]; // Assuming you want to display the first song from the response
    } catch (error) {
        console.error("Error fetching song data:", error);
    }
});
</script>
