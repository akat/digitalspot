<script setup lang="ts">
import type { AgencyPage } from '~/types/content'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const { data: page, error } = await useFetch<AgencyPage>(() => `/api/pages/${encodeURIComponent(slug.value)}`, {
  key: `agency-page-${slug.value}`,
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    message: error.value.statusMessage || 'Δεν ήταν δυνατή η φόρτωση της σελίδας.',
  })
}

useHead(() => ({
  title: page.value?.seo?.metaTitle || `${page.value?.title || 'Σελίδα'} | Digital Spot`,
  meta: [
    {
      name: 'description',
      content: page.value?.seo?.metaDescription || 'Στρατηγική, σχεδιασμός και τεχνολογία για brands με ξεκάθαρο ψηφιακό αποτύπωμα.',
    },
  ],
}))
</script>

<template>
  <PageSlices v-if="page?.blocks?.length" :blocks="page.blocks" />
  <section v-else class="agency-shell py-28 text-center">
    <h1 class="text-3xl font-semibold">Η σελίδα δεν έχει ενότητες.</h1>
    <NuxtLink to="/" class="primary-button mt-8">Επιστροφή στην αρχική</NuxtLink>
  </section>
</template>
