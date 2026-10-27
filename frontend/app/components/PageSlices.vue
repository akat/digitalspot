<script setup lang="ts">
import type { AgencyBlock } from '~/types/content'

defineProps<{
  blocks: AgencyBlock[]
}>()
</script>

<template>
  <template v-for="(slice, index) in blocks" :key="slice.id ?? `${slice.blockType}-${index}`">
    <AgencySlice :slice="slice" />
  </template>
</template>
