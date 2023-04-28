<script setup lang="ts">
import type { BlogEntry } from '~/types/blogEntry'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const props = defineProps<{
  entry: BlogEntry,
  small?: boolean,
}>()
const format = computed(() => { return new Intl.DateTimeFormat(locale.value, { day: 'numeric', month: 'long', year: 'numeric' }) })
const finalDate = new Date(props.entry.date_publish)
const formatedDate = computed(() => format.value.format(finalDate))
const config = useRuntimeConfig()
</script>

<template>
  <div class="blog-small" v-if="small">
    <NuxtLink :to="`/blog/${props.entry.id}`" class="image-block"><img
        :src="`${config.public.directusBase}/assets/${props.entry.picture}?width=400&height=400&fit=cover&format=${config.public.imageFormat}`"
        style="display:block;" loading="lazy" /></NuxtLink>
    <LimvilWave />
    <NuxtLink :to="`/blog/${props.entry.id}`" class="font-block">
      <ClientOnly>
        <p v-html="props.entry.content" class="blog-content"></p>
      </ClientOnly>
      <div style="font-size:.85em;">{{ formatedDate }}</div>
    </NuxtLink>
  </div>
  <div class="thought" v-else>
    <div style="width: 100%;">
      <img style="width: 100%;" loading="lazy"
        :src="`${config.public.directusBase}/assets/${props.entry.picture}?format=${config.public.imageFormat}`" />
      <ClientOnly>
        <p v-html="props.entry.content" style="margin-bottom:0;margin-top:.5em;"></p>
      </ClientOnly>
      <div style="margin-bottom:16px;font-size:.85em;">{{ formatedDate }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-small {
  --trans: 0.9;
  width: min(calc(100vw - 40px), 400px);
  height: min(calc(100vw - 40px), 400px);
  display: grid;
  grid-template-rows: 1fr 24px auto;
  cursor: pointer;
  align-content: end;
  box-sizing: border-box;
  transition: .5s;
  border: white 1px solid;


  &>.image-block {
    width: 100%;
    grid-row: 1/3;

    img {
      width: 100%;
    }
  }

  &>svg {
    --trans: 0.9;
    opacity: 0;
    transition: .5s;
  }

  &>.font-block {
    display: block;
    background-color: rgba(255, 255, 255, var(--trans));
    color: var(--col-main);
    opacity: 0;
    transition: .5s;
    padding: 0 16px 16px 16px;
    text-align: center;
  }

  &:hover {
    border: var(--col-main) 1px solid;
  }

  &:hover>.font-block {
    opacity: 1;
  }

  &:hover>svg {
    opacity: 1;
  }
}

@media screen and (max-width:600px) {
  .blog-small>.font-block {
    padding: 8px;
    align-self: stretch;
    align-content: center;
    display: grid;
  }

  .blog-content :deep(p) {
    text-align: center;
  }

}

.thought {
  display: flex;
  // background: var(--col-sub);
  // border-radius: 30px;
  padding-bottom: 10px;
  min-width: 40px;
  max-width: 800px;
  width: 85vw;
  min-height: 40px;
  // border-bottom: 1px solid var(--col-main);
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 0;
}
</style>
