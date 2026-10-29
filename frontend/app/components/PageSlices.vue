<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { AgencyBlock, SliceTheme } from '~/types/content'

// Slices without an explicit theme keep the background they were designed with.
const defaultThemes: Record<string, SliceTheme> = {
  agencyHeroAnimated: 'dark',
  statsSlice: 'dark',
  callToActionSlice: 'dark',
  processSlice: 'ecru',
  testimonialSlice: 'ecru',
}

const themeClass = (slice: AgencyBlock) =>
  `slice-theme-${slice.theme || defaultThemes[slice.blockType] || 'light'}`

const animationClass = (animation?: string | null) =>
  animation && animation !== 'none' ? `slice-animation-${animation}` : ''

const sliceContainer = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!sliceContainer.value || !('IntersectionObserver' in window)) return

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-visible')
      observer?.unobserve(entry.target)
    }
  }, { threshold: 0.12 })

  sliceContainer.value.querySelectorAll<HTMLElement>('[data-slice-animation]').forEach((slice) => {
    observer?.observe(slice)
  })
})

onBeforeUnmount(() => observer?.disconnect())

defineProps<{
  blocks: AgencyBlock[]
}>()
</script>

<template>
  <div ref="sliceContainer">
    <template v-for="(slice, index) in blocks" :key="slice.id ?? `${slice.blockType}-${index}`">
      <div :class="[themeClass(slice), animationClass(slice.animation)]" :data-slice-animation="animationClass(slice.animation) || undefined">
        <AgencySlice :slice="slice" />
      </div>
    </template>
  </div>
</template>
