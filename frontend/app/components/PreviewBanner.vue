<script setup lang="ts">
const route = useRoute()
const previewMode = useCookie('payload-preview')
const exitURL = computed(() => `/api/preview/exit?path=${encodeURIComponent(route.fullPath)}`)
</script>

<template>
  <div
    v-if="previewMode"
    class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-amber-400 px-4 py-2 text-center text-sm font-medium text-slate-950"
    role="status"
  >
    <span>Λειτουργία προεπισκόπησης — βλέπεις και τις μη δημοσιευμένες αλλαγές.</span>
    <a :href="exitURL" class="underline underline-offset-2 hover:no-underline">Έξοδος</a>
  </div>
</template>
