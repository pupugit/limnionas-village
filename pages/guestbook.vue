<template>
  <div class="guestbook-page">
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
useHead({ title: i18n.t('guestbook') })
await initGuestbook()
const guestbook = useGuestbook()
</script>

<style scoped>
.guestbook-page {
  background-color: #363c90;
  min-height: 100vh;
  min-height: 100dvh;
  padding-top: 128px;
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  align-content: start;
}

.entries {
  display: grid;
  gap: 8px;
}
</style>
