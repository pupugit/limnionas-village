<template>
  <div class="guestbook-page" :style="calcPic">
    <div></div>
    <div class="entries">
      <GuestEntry v-for="e in guestbook" :entry="e" :key="e.id" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import GuestEntry from '~~/components/GuestEntry.vue';

const i18n = useI18n()
const config = useRuntimeConfig()
useHead({ title: i18n.t('guestbook') })
await initSpecials()
const specials = useSpecials()
const width = ref(0)
const height = ref(1024)
const loaded = ref(false)
await initGuestbook()
const guestbook = useGuestbook()

onMounted(() => {
  if (window) {
    width.value = window.innerWidth
    height.value = window.innerHeight
    loaded.value = true
  }
})
const calcPic = computed(() => {
  if (!specials.value.guestbook || width.value == 0) return ''
  return `background-image: url(${config.public.directusBase}/assets/${specials.value.guestbook}?fit=cover&width=${width.value}&height=${height.value}&withoutEnlargement&format=webp);`
})
</script>

<style scoped>
.guestbook-page {
  min-height: 100vh;
  /* min-height: 100dvh; */
  padding-top: 128px;
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  align-content: start;
  gap: 40px;
  background-attachment: fixed;
}

.entries {
  display: grid;
}
</style>
