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
        loading="lazy" /></NuxtLink>
    <NuxtLink :to="`/blog/${props.entry.id}`" class="font-block">
      <p v-html="entry.content" class="blog-content"></p>
      <div style="font-size:.85em;">{{ formatedDate }}</div>
    </NuxtLink>
  </div>
  <div class="thought" v-else>
    <div style="width: 100%;">
      <img style="width: 100%;" loading="lazy"
        :src="`${config.public.directusBase}/assets/${props.entry.picture}?format=${config.public.imageFormat}`" />
      <p v-html="entry.content" style="margin-bottom:0;margin-top:.5em;"></p>
      <div style="margin-bottom:16px;font-size:.85em;">{{ formatedDate }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-small {
  width: min(calc(100vw - 40px), 400px);
  height: min(calc(100vw - 40px), 400px);
  display: grid;
  grid-template-areas: main;
  cursor: pointer;

  &>.image-block {
    grid-area: main;
    width: 100%;
  }

  &>.font-block {
    display: block;
    grid-area: main;
    background: linear-gradient(to bottom, #ffffff00, #fff 20%, #fff);
    align-self: end;
    border-color: var(--col-main);
    border-style: solid;
    border-width: 0 1px 1px 1px;
    opacity: 0;
    transition: .5s;
    padding: 48px 16px 16px 16px;
    text-align: center;
  }

  &:hover>.font-block {
    opacity: 1;
  }
}

@media screen and (max-width:600px) {
  .blog-small>.font-block {
    padding: 8px;
    background: white;
    align-self: stretch;
    border-width: 1px;
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

  // &:before,
  // &:after {
  //   content: "";
  //   background-color: var(--col-main);
  //   border-radius: 50%;
  //   display: block;
  //   position: absolute;
  //   z-index: -1;
  // }
}

.thought:nth-child(4n+1) {
  &:before {
    width: 44px;
    height: 44px;
    top: -12px;
    left: 28px;
    box-shadow: -50px 30px 0 -12px var(--col-main);
  }

  &:after {
    bottom: -10px;
    right: 26px;
    width: 30px;
    height: 30px;
    box-shadow: 40px -34px 0 0 var(--col-main),
      -28px -6px 0 -2px var(--col-main),
      -24px 17px 0 -6px var(--col-main),
      -5px 25px 0 -10px var(--col-main);

  }
}

.thought:nth-child(4n+3) {
  &:before {
    width: 44px;
    height: 44px;
    top: -12px;
    right: 28px;
    box-shadow: -50px 30px 0 -12px var(--col-main);
  }

  &:after {
    bottom: -10px;
    left: 26px;
    width: 30px;
    height: 30px;
    box-shadow: 40px -34px 0 0 var(--col-main),
      -28px -6px 0 -2px var(--col-main),
      -24px 17px 0 -6px var(--col-main),
      -5px 25px 0 -10px var(--col-main);

  }
}
</style>
