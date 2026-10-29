<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  video: boolean
  fit?: 'contain' | 'cover' | null
}>()

// Videos autoplay; stop them for visitors who prefer reduced motion.
const videoElement = ref<HTMLVideoElement | null>(null)
watch(videoElement, (video) => {
  if (video && window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause()
})
</script>

<template>
  <div class="hero-media relative mx-auto w-full max-w-[540px]" :class="`hero-media-${fit || 'contain'}`">
    <video
      v-if="video"
      ref="videoElement"
      :src="src"
      :aria-label="alt || undefined"
      role="img"
      autoplay
      muted
      loop
      playsinline
    />
    <img v-else :src="src" :alt="alt" fetchpriority="high">
  </div>
</template>
