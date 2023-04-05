<template>
  <div class="blog-page">
    <div></div>
    <div class="entries">
      <BlogEntry v-for="e in blog" :entry="e" :key="e.id" small />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
mergeHead(i18n.locale.value, i18n.t('blog'), 'Stillen Sie hier Ihre Sehnsucht mit immer wieder neuen Eindrücken aus Limnionas Village.', '')
const blog = useBlog()
onMounted(() => {
  initBlog()
})
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
