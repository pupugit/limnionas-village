<script setup lang="ts">
import type { Article } from "~~/types/articles"

const config = useRuntimeConfig()
const props = defineProps<{
  article: Article,
}>()
const { width, height } = useWindowSize()
const zenMode = useZenMode()

</script>

<template>
  <ClientOnly>
    <div v-for="(s, idx) in article.sections" class="article-block" :key="s.id">
      <div v-if="width" :class="`article-section-bg${zenMode ? ' zen-mode' : ''}`" @click.self="zenMode = !zenMode"
        :style="`background-image: url(${config.public.directusBase}/assets/${s.image_back}?fit=cover&width=${width}&height=${height}&format=png)`">
        <div v-if="idx > 0" class="article-section-top"></div>
        <div class="article-section-info">
          <div v-html="s.content"></div>
          <p v-if="article.title && idx == article.sections.length - 1" class="source">{{ article.title }}</p>
        </div>
        <div v-if="idx < article.sections.length - 1" class="article-section-bottom"></div>
      </div>
    </div>
  </ClientOnly>
</template>

<style>
.article-section-bg {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;
  background-position: center;
  background-size: cover;
  box-sizing: border-box;
  grid-template-rows: 1fr auto 1fr;
  grid-template-areas: "top" "content" "bottom";
}

.article-section-bg.zen-mode>div {
  visibility: hidden;
  opacity: 0;
}

.article-section-top {
  grid-area: top;
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, var(--trans)) 0%, rgba(255, 255, 255, var(--trans)) 30%, transparent 30%);
  background-size: 30px 30px;
  background-repeat: repeat-y;
  min-height: 96px;
  background-position: center 15px;
}

.article-section-bottom {
  grid-area: bottom;
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, var(--trans)) 0%, rgba(255, 255, 255, var(--trans)) 30%, transparent 30%);
  background-size: 30px 30px;
  background-repeat: repeat-y;
  background-position: center 15px;
}

.article-section-info {
  grid-area: content;
  display: grid;
  place-items: center;
  background-color: rgba(255, 255, 255, var(--trans));
  /* border-radius: 50%; */
  transition: all .5s ease-out;
  cursor: pointer;
  /* border-radius: 32px; */
  color: var(--col-main);
  padding: 32px;
  width: min(600px, 85vw);
  box-sizing: border-box;
}

.article-section-info .source {
  margin-top: 0;
  text-align: center;
  font-size: .90em;
  font-weight: bold;
  font-style: italic;
  margin-top: .5em;
}
</style>
