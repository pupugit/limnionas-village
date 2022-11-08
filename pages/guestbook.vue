<template>
  <div>gb
    <div v-for="entry in guestbook">
      <div>{{ entry.person }} um {{ entry.date_created }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
useHead({ title: i18n.t('guestbook') })
await initGuestbook()
const guestbook = useGuestbook()

</script>