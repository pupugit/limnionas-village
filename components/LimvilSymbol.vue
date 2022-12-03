<template>
  <i class="limvil-symbol" v-html="file.default"></i>
</template>
<script setup lang="ts">
const props = defineProps<{
  symbol: string
}>()
const filename = `../public/symbols/${props.symbol}.svg?raw`
/* @vite-ignore */
const file = await import(filename)
</script>

<style>
.limvil-symbol {
  fill: currentColor;
  stroke: currentColor;
}
</style>
