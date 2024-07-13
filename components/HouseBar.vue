<script setup lang="ts">
const { data: houses } = await useHouses()
</script>

<template>
  <div v-if="houses">
    <div v-for="h in houses" :key="h.id">
      <RouterLink :to="`/house/${h.name}`">
        {{ h.name }}
      </RouterLink>
    </div>
  </div>
</template>
