<template>
  <div :class="`top-logo${miniLogo ? ' scrolled' : ''}`">
    <LimvilLogo class="top-logo-inner click-it" @click="clickLogo" suid="limvil-logo" />
    <div :class="`top-menu${showMenu ? ' show-it' : ''}`">
      <a :title="$t('button.toggle_langs')" @click="toggleLocales()">
        <Icon name="carbon:language" />{{ locale }}
      </a>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { y } = useWindowScroll()
const miniLogo = computed(() => y.value > 200 || route.path !== '/')
const router = useRouter()
const route = useRoute()
const showMenu = ref(false)
const { availableLocales, locale } = useI18n()
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const clickLogo = () => {
  if (router.currentRoute.value.path === '/') {
    // const el = document.getElementById('grid-index')
    if (showMenu.value === true) {
      showMenu.value = false
    } else if (window.scrollY === 0) {
      showMenu.value = true
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  else router.push('/')
}
</script>
<style>
.top-menu {
  position: absolute;
  transition: all 1s;
  top: -400px;
  z-index: 199;
}

.top-menu.show-it {
  top: 128px;
}

.top-logo {
  width: 100vw;
  position: sticky;
  z-index: 200;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  transition: all .5s;
  top: 0;
  /* filter: drop-shadow(1px 1px 2px white) drop-shadow(-1px 1px 2px white) drop-shadow(1px -1px 2px white) drop-shadow(-1px -1px 2px white); */
}

.top-logo-inner {
  background-color: rgba(255, 255, 255, 0);
  /* height: 100%; */
  width: min(600px, 85vw);
  box-sizing: border-box;
  padding-top: 16px;
  transition: all .5s ease-out;
}

.top-logo.scrolled {
  filter: none;
}

.scrolled>.top-logo-inner {
  background-color: rgba(255, 255, 255, var(--trans));
  padding: 16px 24px;
  border-radius: 0 0 24px 24px;

}

@media screen and (max-height:620px) {
  .top-logo {
    top: 0;
    height: 64px;
    padding: 8px 0;
  }
}
</style>
