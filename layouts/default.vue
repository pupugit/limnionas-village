<template>
  <div class="layout" :style="bgStyle">
    <LimvilNav />
    <slot />
  </div>
</template>

<script setup lang="ts">
// const scrollState = useScrollState()
// const wScroll = useWindowScroll()
// const onScroll = (e) => {
//   scrollState.value.scrollPos = e.target.scrollTop
//   if (e.target.scrollTop > 200) scrollState.value.isScrolled = true
//   else scrollState.value.isScrolled = false
// }
const router = useRouter()
const route = useRoute()
const bgStyle = useBackgroundImageState()
router.afterEach(() => {
  bgStyle.value = ''
})

</script>
