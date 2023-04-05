<script setup lang="ts">
import type { BlogEntry } from '~/types/blogEntry'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const props = defineProps<{
  entry: BlogEntry,
  small?: boolean,
}>()
const content = computed(() => props.entry.content)
const format = computed(() => { return new Intl.DateTimeFormat(locale.value, { day: 'numeric', month: 'long', year: 'numeric' }) })
const finalDate = new Date(props.entry.date_publish)
const formatedDate = computed(() => format.value.format(finalDate))
const config = useRuntimeConfig()
const imgcnt = ref<HTMLElement | null>(null)
const img = ref<HTMLImageElement | null>(null)
if (!props.small) {
  onMounted(() => {
    if (window) {
      if (imgcnt?.value?.clientWidth && img.value) {
        console.log('clientWidth instantly set to ', imgcnt?.value?.clientWidth)
        img.value.src = `${config.public.directusBase}/assets/${props.entry.picture}?width=${imgcnt.value.clientWidth}&format=${config.public.imageFormat}`
        img.value.style.aspectRatio = '';
      } else {
        window.setTimeout(() => {
          if (imgcnt?.value?.clientWidth && img.value) {
            console.log('clientWidth set after timeout to ', imgcnt?.value?.clientWidth)
            img.value.src = `${config.public.directusBase}/assets/${props.entry.picture}?width=${imgcnt.value.clientWidth}&format=${config.public.imageFormat}`
            img.value.style.aspectRatio = '';
          } else {
            console.log('clientWidth not set', imgcnt.value)
          }
        }, 1400)
      }
    }
  })
}

</script>

<template>
  <div class="blog-small" v-if="small">
    <img
      :src="`${config.public.directusBase}/assets/${props.entry.picture}?width=400&height=400&fit=cover&format=${config.public.imageFormat}`"
      loading="lazy" />
  </div>
  <div class="thought" v-else>
    <div style="width: 100%;" ref="imgcnt">
      <img ref="img" style="width: 100%;aspect-ratio: 4/3;" loading="lazy" />
      <p v-html="content" style="margin-bottom:0;margin-top:.5em;"></p>
      <div style="margin-bottom:16px;font-size:.85em;">{{ formatedDate }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-small {
  width: min(calc(100vw - 40px), 400px);
  height: min(calc(100vw - 40px), 400px);

  img {
    width: 100%;
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
