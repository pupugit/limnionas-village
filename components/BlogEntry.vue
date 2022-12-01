<script setup lang="ts">
import type { BlogEntry } from '~~/types/blogEntry'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const props = defineProps<{
  entry: BlogEntry,
}>()

const format = new Intl.DateTimeFormat(locale.value, { day: 'numeric', month: 'long', year: 'numeric' })
const finalDate = new Date(props.entry.date_publish)
const formatedDate = format.format(finalDate)

</script>

<template>
  <div class="thought">
    <div>
      <p v-html="entry.content"></p>
      <p>{{ formatedDate }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.thought {
  display: flex;
  background: var(--col-sub);
  padding: 20px;
  border-radius: 30px;
  min-width: 40px;
  max-width: 800px;
  width: 80vw;
  min-height: 40px;
  margin: 20px;
  color: white;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 0;

  &:before,
  &:after {
    content: "";
    background-color: var(--col-main);
    border-radius: 50%;
    display: block;
    position: absolute;
    z-index: -1;
  }
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
