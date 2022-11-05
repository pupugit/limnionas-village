<template>
  <svg version="1.1" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path :d="path" :fill="fill || 'rgba(255, 255, 255, var(--trans))'" stroke-width="0" />
  </svg>
</template>

<script setup lang="ts">
import { rand } from '@vueuse/core';

const props = defineProps<{
  fill?: string,
}>()

const pos1 = ref<number>(1)
const pos2 = ref<number>(1)
const path = ref<string>('')

onMounted(() => {
  pos1.value = rand(1, 20)
  pos2.value = rand(-1, 20)
  path.value = `M 0,100 V 1 c 195,-1.6 390,${pos1.value} 550,${pos1.value + 6} 160,5.9 286,${pos2.value - pos1.value + 4} 429, ${pos2.value - pos1.value + 5} 143, 0.79 302, 9.1 461, -2.9 v 99 z`
})
</script>
