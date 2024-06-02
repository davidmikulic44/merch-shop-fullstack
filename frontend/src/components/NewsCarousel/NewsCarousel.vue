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
            <img src="/src/assets/images/spotify.jpg" alt="" srcset="">
        </SplideSlide>
        
    </Splide>
    <section class="scrolling-text">
        <p>Ulicu zapali kada vozi Kawasaki
Vozi me kô Kawasaki
Briju da smo loši, al' uopće nismo takvi
Al' uopće nismo takvi
Yeah, shit, okay, ona nemre gledat me
Zato svaku noć se skrivam, odem skijat u WC
Ona banula na party
Sada pravi sranja, niko nemre zaustavit (Yeah, yeah, yeah)
Ja sam potpuno okej-kej
Igru davno prešô sam, al' čekam svoj trofej-fej
Rolamo to sranje, sticky kao selotejp
Ako pita me za sliku kažem "Hvala, ali ne"
Ulicu zapali kada vozi Kawasaki
Vozi me kô Kawasaki
Briju da smo loši, al' uopće nismo takvi
Al' uopće nismo takvi
Jedna noć nam treba da dignemo krov
Jedna litra da prevrnem stol
U petoj brzini da slupamo Golf
Al' boli me briga sve dok je sa njom
Ulicu zapali kada vozi Kawasaki
Vozi me kô Kawasaki
Briju da smo loši, al' uopće nismo takvi
Al' uopće nismo takvi
Kawasaki, vozi me kô Kawasaki, yeah
Kawasaki, vozi me kô Kawasaki, yeah
Kawasaki, vozi me kô Kawasaki, yeah
Ka-Kawasaki, vozi me kô Kawasaki, yeah
Zaustavit, nju se nemre zaustavit, ne
Ušô u WC, unutra našô pola rodbine
Bratić nudi brašno kô da ušô sam u plodine
Ženska 'oće sliku pa na binu baca mobitel
Kawasaki, ona divlja kao jetski
Pijem samo jeger, ona kô da pije benzin
To sam sam ja, to si samo ti
I na tebe neću mislit, al' smo nekad bili dream team
Želi se zabaljvat, neću joj ponavljat
Samu sebe laže kad mi kaže "Nije faza"
Noć je duga, linija je tanka
Znam da je zamka, al' ne mogu si pomoć, ona
Ulicu zapali kada vozi Kawasaki
Vozi me kô Kawasaki
Briju da smo loši, al' uopće nismo takvi
Al' uopće nismo takvi
Kawasaki, vozi me kô Kawasaki, yeah
Kawasaki, vozi me kô Kawasaki, yeah
Kawasaki, vozi me kô Kawasaki, yeah
Ka-Kawasaki, vozi me kô Kawasaki, yeah
Kawasaki, vozi me kô Kawasaki, yeah
Kawasaki, vozi me kô Kawasaki, yeah
Kawasaki, vozi me kô Kawasaki, yeah
Ka-Kawasaki, vozi me kô Kawasaki, yeah
        </p>
    </section>
    </div>
</template>
