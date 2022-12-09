<template>
  <div :class="`top-logo${miniLogo ? ' scrolled' : ''}${zenMode ? ' zen-mode' : ''}`">
    <LimvilLogo :class="`top-logo-inner click-it${showMenu ? ' show-it' : ''}`" @click="clickLogo" suid="limvil-logo" />
    <div :class="`top-menu${showMenu ? ' show-it' : ''}`">
      <div>
        <nuxt-link to="/">
          <SymbolHouse class="top-symbol" />
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/blog">
          <SymbolBlog class="top-symbol" />
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/guestbook">
          <SymbolGuestbook class="top-symbol" />
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/gallery">
          <SymbolGallery class="top-symbol" />
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/contact">
          <SymbolContact class="top-symbol" />
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/arrival">
          <SymbolAnreise class="top-symbol" />
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/hiking">
          <SymbolWanderungen class="top-symbol" />
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/samos">
          <SymbolInsel class="top-symbol" />
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/tos">
          <SymbolAGB class="top-symbol" />
        </nuxt-link>
      </div>
      <div>
        <Icon name="carbon:language" :title="$t('button.toggle_langs')" @click="toggleLocales()" /><span
          style="font-size:.75em;">{{ locale }}</span>
      </div>
    </div>
  </div>
  <!-- <div v-if="router.currentRoute.value.path === '/' && y > 200" class="arrow-up" @click="goTop">
    <SymbolArrowUp />
  </div> -->
</template>
<script setup>
import { useI18n } from 'vue-i18n'

const zenMode = useZenMode()
const { y } = useWindowScroll()
const miniLogo = computed(() => y.value > 200 || route.path !== '/')
const router = useRouter()
const route = useRoute()
const showMenu = ref(false)
router.afterEach(() => {
  showMenu.value = false
})
const { availableLocales, locale } = useI18n()
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
const goTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const clickLogo = () => {
  // if (router.currentRoute.value.path === '/') {
  // const el = document.getElementById('grid-index')
  showMenu.value = !showMenu.value
  // }
  // else router.push('/')
}
</script>
<style>
.top-symbol {
  width: min(75px, 25vw);
  height: min(75px, 25vw);
}

.arrow-up {
  position: fixed;
  bottom: 5px;
  right: 5px;
  width: min(75px, 25vw);
  cursor: pointer;
  transition: all .5s;
}

.arrow-up:hover {
  color: var(--col-highlight);
}

.top-menu {
  --block-size: min(80px, 25vw);
  background-color: rgba(255, 255, 255, var(--trans));
  border-radius: 0 0 16px 16px;
  transition: all .5s;
  font-size: 1em;
  height: 0%;
  overflow: hidden;
  width: min(400px, 85vw);
  box-sizing: border-box;
  align-self: start;
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--block-size));
  grid-template-rows: repeat(auto-fill, var(--block-size));
  gap: 32px;
  padding: 0 16px;
  justify-content: center;
}

.top-menu>div {
  height: var(--block-size);
  width: var(--block-size);
}

.top-menu.show-it {
  height: 100%;
  padding: 16px;
}

.top-menu>div>* {
  cursor: pointer;
  transition: all .5s;
}

.top-menu>div:hover>* {
  color: var(--col-sub);
}

.top-logo.zen-mode {
  visibility: hidden;
  opacity: 0;
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
  top: 16px;
}

.scrolled>.top-logo-inner {
  background-color: rgba(255, 255, 255, var(--trans));
  padding: 16px 24px;
  border-radius: 24px;

}

@media screen and (max-height:620px) {
  .top-logo {
    top: 0;
    height: 64px;
    padding: 8px 0;
  }
}

@media screen and (max-width: 515px) {
  .scrolled>.top-logo-inner {
    width: min(400px, 85vw);
  }

  .scrolled>.top-logo-inner.show-it {
    border-radius: 24px 24px 0 0;
  }
}
</style>
