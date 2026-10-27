<script setup lang="ts">
import { computed } from 'vue'
import type { FooterColumn, SiteLink, SiteSettings } from '~/types/site-settings'

const year = new Date().getFullYear()
const { data: settings, error } = await useFetch<SiteSettings>('/api/site-settings', {
  key: 'agency-site-settings',
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 502,
    message: 'Δεν ήταν δυνατή η φόρτωση του υποσέλιδου.',
  })
}

const footerColumns = computed(() => (settings.value?.footerColumns || [])
  .map((column: FooterColumn) => ({
    ...column,
    links: (column.links || []).filter(link => link.label?.trim() && link.url?.trim()),
  }))
  .filter(column => column.title?.trim() && column.links.length))

const socialLinks = computed(() => (settings.value?.footerSocialLinks || [])
  .filter((link: SiteLink) => link.label?.trim() && link.url?.trim()))

const contact = computed(() => settings.value?.footerContact)
const isExternal = (url: string) => !url.startsWith('/')
</script>

<template>
  <footer class="bg-[#040707]">
    <div class="agency-shell grid gap-12 py-12 md:grid-cols-[1.4fr_repeat(2,1fr)]">
      <div>
        <NuxtLink to="/" class="inline-flex items-center" aria-label="Digital Spot — αρχική">
          <img
            src="/brand/digital-spot-logo-light.png"
            alt="Digital Spot"
            class="h-11 w-auto"
            width="92"
            height="40"
            loading="lazy"
          >
        </NuxtLink>
        <p v-if="settings?.footerDescription" class="mt-4 max-w-md text-sm leading-6 text-white/60">
          {{ settings.footerDescription }}
        </p>
        <ul v-if="contact?.email || contact?.phone || contact?.location" class="mt-5 space-y-2 text-sm text-white/70">
          <li v-if="contact.email"><a class="transition hover:text-white" :href="`mailto:${contact.email}`">{{ contact.email }}</a></li>
          <li v-if="contact.phone"><a class="transition hover:text-white" :href="`tel:${contact.phone.replace(/\\s/g, '')}`">{{ contact.phone }}</a></li>
          <li v-if="contact.location">{{ contact.location }}</li>
        </ul>
      </div>

      <nav
        v-for="(column, index) in footerColumns"
        :key="column.id ?? `${column.title}-${index}`"
        :aria-label="column.title"
        class="space-y-4"
      >
        <h2 class="text-xs font-semibold uppercase tracking-[.18em] text-white/50">{{ column.title }}</h2>
        <ul class="space-y-3">
          <li v-for="(link, linkIndex) in column.links" :key="link.id ?? `${link.url}-${linkIndex}`">
            <NuxtLink
              :to="link.url"
              :external="isExternal(link.url)"
              :target="link.openInNewTab ? '_blank' : undefined"
              :rel="link.openInNewTab ? 'noopener noreferrer' : undefined"
              class="text-sm text-white/75 transition hover:text-white"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <div class="border-t border-white/10">
      <div class="agency-shell flex flex-col gap-4 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} {{ settings?.copyright || 'Digital Spot. Με φροντίδα, στην Ελλάδα.' }}</p>
        <ul v-if="socialLinks.length" class="flex flex-wrap gap-5">
          <li v-for="(link, index) in socialLinks" :key="link.id ?? `${link.url}-${index}`">
            <NuxtLink
              :to="link.url"
              :external="isExternal(link.url)"
              :target="link.openInNewTab === false ? undefined : '_blank'"
              :rel="link.openInNewTab === false ? undefined : 'noopener noreferrer'"
              class="transition hover:text-white"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
