<script setup lang="ts">
const houses = useHouses()
</script>

<template>
  <div>
    <div v-for="h in houses" :key="h.id">
      <RouterLink :to="`/house/${h.name}`">
        {{ h.name }}
      </RouterLink>
    </div>
  </div>
</template>
