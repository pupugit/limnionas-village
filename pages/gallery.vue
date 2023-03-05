<template>
  <div class="gallery-page"></div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const config = useRuntimeConfig()
useHead({ title: i18n.t('gallery') })
</script>

<style scoped>
.gallery-page {
  min-height: 100vh;
  padding-top: 128px;
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  align-content: start;
  gap: 40px;
  background-attachment: fixed;
}
</style>
