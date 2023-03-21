<template>
  <div>

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
