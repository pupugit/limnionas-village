<script setup lang="ts">
import type { Article } from "~~/types/articles"

const config = useRuntimeConfig()
const props = defineProps<{
  article: Article,
}>()
const width = ref(0)
const height = ref(1024)

onMounted(() => {
  if (window) {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }
})
</script>

<template>
  <div v-for="s in article.sections" class="article-block">
    <div v-if="width" class="article-section-bg"
      :style="`background-image: url(${config.public.directusBase}/assets/${s.image_back}?fit=cover&width=${width}&height=${height})`">
    </div>
  </div>
</template>

<style>
.article-section-bg {
  width: 100vw;
  height: 100vh;
  place-content: center;
  background-position: center;
  background-size: cover;
  padding-top: 72px;
  box-sizing: border-box;

}
</style>
