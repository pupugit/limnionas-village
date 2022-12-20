<script setup lang="ts">
import type { GuestbookEntry } from '~~/types/guestbookEntry'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
type tDot = {
  pos: number
  pos2: number
  side: number
  size: number
}
const props = defineProps<{
  entry: GuestbookEntry,
}>()
const dots = ref<tDot[]>([])

const format = new Intl.DateTimeFormat(locale.value, { day: 'numeric', month: 'long', year: 'numeric' })
const finalDate = new Date(props.entry.date_created)
const formatedDate = format.format(finalDate)

onMounted(() => {
  const dotCount = randInt(1, 4)
  for (let i = 0; i < dotCount; i++) {
    dots.value.push({
      pos: randInt(-5, 5),
      pos2: randInt(-5, 5),
      side: randInt(1, 4),
      size: randInt(15, 35)
    })
  }
})
const styleIt = (d: tDot) => {
  let ret = `width:${d.size}px;height:${d.size}px;`
  if (d.side === 1) {
    ret += `left:${d.pos2}px;top:${d.pos}px;`
  } else if (d.side === 3) {
    ret += `right:${d.pos2}px;top:${d.pos}px;`
  } else if (d.side === 2) {
    ret += `left:${d.pos2}px;bottom:${d.pos}px;`
  } else if (d.side === 4) {
    ret += `right:${d.pos2}px;bottom:${d.pos}px;`
  } return ret
}
</script>

<template>
  <div class="thought">
    <!-- <div v-for="(dot, idx) in dots" class="dot" :style="styleIt(dot)" :key="idx"></div> -->
    <div>
      <p>{{ entry.entry }}</p>
      <p style="font-weight: bold;">{{ entry.person }}, {{ formatedDate }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dot {
  background: var(--col-main);
  position: absolute;
  content: "";
  border-radius: 50%;
  display: block;
  position: absolute;
  z-index: -1;
}

.thought {
  display: flex;
  color: var(--col-main);
  padding: 20px;
  // border-radius: 30px;
  min-width: 40px;
  max-width: 800px;
  width: 80vw;
  min-height: 40px;
  margin: 20px;
  background: #ffffff99;
  position: relative;
  align-items: center;
  text-align: center;
  z-index: 0;
}
</style>
