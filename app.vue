<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
</script>

<style>
html {
  scrollbar-width: thin;
  scrollbar-color: var(--col-main);
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  overflow-x: hidden;
}

body {
  --col-main: #363c90;
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
  background-position: center;
  background-size: cover;
  display: grid;
  grid-template-areas: 'first';
  align-items: start;
}

.layout>div {
  grid-area: first;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
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
  color: #0070b3;
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
  text-align-last: left;
}

p:first-child {
  margin-top: 0;
}

p:last-child {
  margin-bottom: 0;
}

.house-page {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  justify-content: center;
  align-content: start;
}

.house-content {
  margin: 148px 32px 32px 32px;
  padding: 32px;
  background-color: rgba(255, 255, 255, var(--trans));
  border-radius: 32px;
  max-width: 600px;
}

@media screen and (max-width: 400px) {
  .house-content {
    margin: 96px 0 0 0;
    padding: 16px;
    background-color: rgba(255, 255, 255, var(--trans));
    border-radius: 0;
    max-width: 600px;
  }
}
</style>
