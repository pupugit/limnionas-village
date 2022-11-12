<template>
  <div>
    <div>gb</div>
    <GuestEntry v-for="e in guestbook" :entry="e" :key="e.id" />
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
