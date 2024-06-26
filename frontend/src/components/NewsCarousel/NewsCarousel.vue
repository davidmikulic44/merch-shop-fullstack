<script setup>
import "@splidejs/vue-splide/css";
const mainOptions = {
    rewind: true,
    pagination: false,
    gap: "1rem",
    height: "40rem",
    arrows: false,
    autoplay: true,
};
</script>
<template>
    <div class="carousel-container">
        <Splide :options="mainOptions" class="news-carousel-container">
            <SplideSlide>
                <video class="news-carousel-slide" autoplay loop muted>
                    <source
                        src="../../assets/images/videoautoplay.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </SplideSlide>
            <SplideSlide>
                <img src="/src/assets/images/spotify.jpg" alt="" srcset="" />
            </SplideSlide>
        </Splide>
    </div>
</template>
