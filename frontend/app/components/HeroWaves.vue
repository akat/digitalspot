<script setup lang="ts">
// Decorative background for the animated hero: thin wave lines that drift
// sideways across the full width. Each path spans two identical periods, so
// shifting it left by half its width loops without a visible seam.
const WIDTH = 1440
const HEIGHT = 800
const STEP = 12

type Wave = { d: string, opacity: number, duration: number, reverse: boolean }

const wavePath = (base: number, amp: number, cycles: number, phase: number) => {
  const points: string[] = []
  for (let x = 0; x <= WIDTH * 2; x += STEP) {
    const t = (x / WIDTH) * Math.PI * 2
    // Two sines with whole cycles per period keep the line organic but seamless.
    const y = base + amp * Math.sin(t * cycles + phase) + amp * .35 * Math.sin(t * (cycles + 1) + phase * 1.7)
    points.push(`${x},${y.toFixed(1)}`)
  }
  return `M${points.join(' L')}`
}

const waves: Wave[] = Array.from({ length: 9 }, (_, i) => ({
  d: wavePath(170 + i * 58, 26 + (i % 3) * 12, 1 + (i % 2), i * .9),
  opacity: .07 + (i % 4) * .035,
  duration: 38 + (i % 5) * 9,
  reverse: i % 3 === 1,
}))
</script>

<template>
  <div class="hero-waves" aria-hidden="true">
    <span class="hero-waves-glow" />
    <svg :viewBox="`0 0 ${WIDTH} ${HEIGHT}`" preserveAspectRatio="none">
      <g
        v-for="(wave, index) in waves"
        :key="index"
        class="hero-wave"
        :class="{ 'hero-wave-reverse': wave.reverse }"
        :style="{ animationDuration: `${wave.duration}s` }"
      >
        <path :d="wave.d" :stroke-opacity="wave.opacity" />
      </g>
    </svg>
  </div>
</template>
