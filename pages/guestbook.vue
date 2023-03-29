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

const i18n = useI18n()
const config = useRuntimeConfig()
useHead({ title: i18n.t('guestbook') })
await initSpecials()
const specials = useSpecials()
const { width, height } = useWindowSize()
await initGuestbook()
const guestbook = useGuestbook()
const calcPic = ref('')

onMounted(() => {
  if (!specials.value.guestbook || width.value == 0) return ''
  calcPic.value = `background-image: url(${config.public.directusBase}/assets/${specials.value.guestbook}?fit=cover&width=${width.value}&height=${height.value}&withoutEnlargement&format=${config.public.imageFormat});`
})
</script>

<style scoped>
.guestbook-page {
  min-height: 100vh;
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
  gap: 20px;
}
</style>
