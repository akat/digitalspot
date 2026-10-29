<script setup lang="ts">
import type { AgencyPage } from '~/types/content'

const { data: page, error } = await useFetch<AgencyPage>('/api/pages/home', {
  key: 'agency-home-page',
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    message: error.value.statusMessage || 'Δεν ήταν δυνατή η φόρτωση της αρχικής σελίδας.',
  })
}

useLivePreview(page)

useHead(() => ({
  title: page.value?.seo?.metaTitle || 'Digital Spot — Ψηφιακή στρατηγική & δημιουργία',
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
    <h1 class="text-3xl font-semibold">Δεν υπάρχει ακόμη περιεχόμενο.</h1>
    <p class="mt-4 text-slate-600">Συνδέσου στο Payload και δημιούργησε τις ενότητες της αρχικής σελίδας.</p>
    <NuxtLink to="http://localhost:3055/admin" external class="primary-button mt-8">Άνοιγμα διαχείρισης</NuxtLink>
  </section>
</template>
