<template>
  <div :class="`welcome-other${zenMode ? ' zen-mode' : ''}`" :style="calcBG" @click.self="zenMode = !zenMode">
    <div class="welcome-info" ref="infoEl">
      <div class="welcome-text" v-html="entry" />
    </div>
  </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig()
const zenMode = useZenMode()
const infoEl = ref<HTMLElement | null>(null)

const props = defineProps<{
  entry: string,
  pic: string
}>()
const { width, height } = useWindowSize()
const calcBG = computed(() => {
  if (!props.pic || width.value === Infinity || !infoEl.value) return ''
  return `background-image: url(${config.public.directusBase}/assets/${props.pic}?fit=inside&width=${width.value}&height=${height.value - infoEl.value.clientHeight}&format=${config.public.imageFormat});`
})
</script>
