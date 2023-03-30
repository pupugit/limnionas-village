<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import 'swiper/css/bundle'
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Zen+Maru+Gothic&display=swap');

.current-color {
  fill: currentColor;
  stroke: currentColor;
}

html {
  scrollbar-width: thin;
  scrollbar-color: var(--col-main);
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  overflow-x: hidden;
  letter-spacing: 0.0ch;
}

body {
  --col-main: #363c90;
  --col-sub: #86bd97;
  --col-highlight: #0070b3;
  --trans: .80;
  font-family: 'Zen Maru Gothic', 'Open Sans', sans-serif;
  font-size: 16px;
  color: var(--col-main);
  border-color: var(--col-main);
  margin: 0;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: white;
}

@media (min-resolution: 2x) {
  html>body {
    font-size: 16px;
  }
}

h1,
h2,
h3,
h4 {
  margin-bottom: .25em;
}

h1~p,
h2~p,
h3~p,
h4~p {
  margin-top: .5em;
}

table {
  border-collapse: collapse;
}

td,
th {
  padding: 8px 8px 8px 0;
}

.default-page {
  margin: 128px 10vw 32px 10vw;
  /* max-width: min(1280px, 100vw); */
  justify-self: center;

}

.layout {
  min-height: 100vh;
  min-height: 100dvh;
  background-position: top;
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
  display: grid;
  grid-template-areas: 'first';
  align-items: start;
}

.layout>div {
  grid-area: first;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.pic-fade-enter-active,
.pic-fade-leave-active {
  transition: all 1s;
}

.pic-fade-enter-from,
.pic-fade-leave-to {
  opacity: 0;
}


.page-enter-active,
.page-leave-active {
  transition: all 1s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.click-it {
  cursor: pointer;
}

.grid-center {
  display: grid;
  place-content: center;
}

a {
  color: var(--col-highlight);
  text-decoration: none;
  cursor: pointer;
}

a>svg {
  transition: all .5s;
  color: var(--col-main);
  text-decoration: none;
  cursor: pointer;
}

a:hover>svg {
  color: var(--col-sub);
  text-decoration: none;
  cursor: pointer;
}


h2 {
  text-align: center;
}

p {
  text-align: justify;
  text-align-last: auto;
}

p:first-child {
  margin-top: 0;
}

p:last-child {
  margin-bottom: 0;
}

table {
  line-height: normal;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}


.mySwiper {
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper .swiper-slide {
  /* width: 25%; */
  height: calc(100vh - 164px);
  /* max-width: 100vw; */
  /* opacity: 0.4; */
  width: unset;
}

/* .mySwiper .swiper-slide-thumb-active {
  opacity: 1;
} */

.swiper-slide img {
  display: block;
  object-fit: contain;
  height: calc(100vh - 164px);
  max-width: 100vw;
}
</style>
