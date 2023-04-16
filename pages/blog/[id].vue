<template>
  <div class="blog-page">
    <div></div>
    <BlogEntry :entry="selectedBlog" v-if="selectedBlog" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { BlogEntry } from '~/types/blogEntry'
const route = useRoute()
const id: string = route.params.id.toString()
const i18n = useI18n()
const blog = useBlog()
await initBlog()
const selectedBlog = blog.value.find(b => b.id === id)
if (selectedBlog) {
  const format = computed(() => { return new Intl.DateTimeFormat(i18n.locale.value, { day: 'numeric', month: 'long', year: 'numeric' }) })
  const finalDate = new Date(selectedBlog.date_publish)
  const formatedDate = computed(() => format.value.format(finalDate))

  mergeHead(i18n.locale.value, `${formatedDate.value} - ${i18n.t('blog')}`, selectedBlog?.content, '')
}
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
