<template>
  <div class="arrival-page">
    <div class="arrival-content">
      <div v-for="h in hikes" :key="h.id">
        <h1>{{ h.title }}</h1>
        <div v-html="h.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
useHead({ title: i18n.t('hiking') })
const config = useRuntimeConfig()
await initHikes()
const hikes = useHikes()
</script>

<style>
.hikes-page {
  min-height: 100vh;
  box-sizing: border-box;
  background-attachment: fixed;
  display: grid;
}

.hikes-content {
  background: rgba(255, 255, 255, 80%);
  margin: 128px 10vw 32px 10vw;
  padding: 2rem;
  max-width: 1000px;
  align-self: start;
  justify-self: center;
}
</style>