<template>
  <div class="blog-page">
    <div></div>
    <div class="entries">
      <BlogEntry v-for="e in blog" :entry="e" :key="e.id" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
useHead({ title: i18n.t('blog') })
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
  display: grid;
  gap: 20px;
}
</style>
