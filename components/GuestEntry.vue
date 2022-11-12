<script setup lang="ts">
import type { GuestbookEntry } from '~~/types/guestbookEntry'
const props = defineProps<{
  entry: GuestbookEntry,
}>()
</script>

<template>
  <div>{{ entry.person }} um {{ entry.date_created }}</div>
</template>
