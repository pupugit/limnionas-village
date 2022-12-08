<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
</script>

<style>
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
}

body {
  --col-main: #363c90;
  --col-sub: #86bd97;
  --col-highlight: #0070b3;
  --trans: .85;
  font-family: 'Verdana', Arial, Helvetica, sans-serif;
  color: var(--col-main);
  border-color: var(--col-main);
  margin: 0;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: white;
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

/* .svg-glow {
  stroke: lime;
  stroke-width: .7;
  fill: none;
  opacity: .5;
} */

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
</style>
