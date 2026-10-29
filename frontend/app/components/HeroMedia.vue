<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  video: boolean
  fit?: 'contain' | 'cover' | null
}>()

// Shown only from the lg breakpoint, where the hero has two columns.
const DESKTOP_QUERY = '(min-width: 1024px)'
// Smaller screens get a 1px placeholder instead of downloading the image.
const BLANK_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// Videos are not autoplayed by the browser, so phones never download them.
// They start here on desktop, unless the visitor prefers reduced motion.
const videoElement = ref<HTMLVideoElement | null>(null)
let desktop: MediaQueryList | undefined

const syncPlayback = () => {
  const video = videoElement.value
  if (!video || !desktop) return
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (desktop.matches && !reducedMotion) {
    // Set as a property: the SSR-rendered attribute is not reliable, and
    // browsers only allow unprompted playback of muted videos.
    video.muted = true
    video.play().catch(() => {})
  } else {
    video.pause()
  }
}

onMounted(() => {
  desktop = window.matchMedia(DESKTOP_QUERY)
  desktop.addEventListener('change', syncPlayback)
  syncPlayback()
})
watch(videoElement, syncPlayback, { flush: 'post' })
onBeforeUnmount(() => desktop?.removeEventListener('change', syncPlayback))
</script>

<template>
  <div class="hero-media relative mx-auto hidden w-full max-w-[540px] lg:block" :class="`hero-media-${fit || 'contain'}`">
    <video
      v-if="video"
      ref="videoElement"
      :src="src"
      :aria-label="alt || undefined"
      role="img"
      preload="none"
      muted
      loop
      playsinline
    />
    <picture v-else>
      <source :media="`not all and ${DESKTOP_QUERY}`" :srcset="BLANK_PIXEL">
      <img :src="src" :alt="alt" fetchpriority="high">
    </picture>
  </div>
</template>
