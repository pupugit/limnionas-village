<template>
  <div class="blog-page">
    <div></div>
    <div class="entries" v-if="blog">
      <BlogEntry v-for="e in blog" :entry="e" :key="e.id" small />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { BlogEntry } from '~/types/blogEntry'
const i18n = useI18n()
mergeHead(i18n.locale.value, i18n.t('blog'), 'Satisfy your longing here with new impressions from Limnionas Village.', '')
const { data: blog } = await useBlog()
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  padding-top: 128px;
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  align-content: start;
}

.entries {
  display: flex;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, 400px);
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  max-width: calc(100vw - 40px);
}
</style>
