<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { SiteLink, SiteSettings } from '~/types/site-settings'

const route = useRoute()
const menuOpen = ref(false)
const openMobileSubmenu = ref<string | null>(null)
const openDesktopSubmenu = ref<number | null>(null)
const { data: settings, error } = await useFetch<SiteSettings>('/api/site-settings', {
  key: 'agency-site-settings',
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 502,
    statusMessage: 'Δεν ήταν δυνατή η φόρτωση του μενού.',
  })
}

watch(() => route.fullPath, () => {
  menuOpen.value = false
  openMobileSubmenu.value = null
  openDesktopSubmenu.value = null
})

const navigation = computed(() => (settings.value?.mainNavigation || [])
  .filter(item => item.label?.trim() && item.url?.trim())
  .map(item => ({
    ...item,
    children: (item.children || []).filter(child => child.label?.trim() && child.url?.trim()),
  })))
const cta = computed(() => settings.value?.headerCta)
const isExternal = (url: string) => !url.startsWith('/')

const toggleMobileSubmenu = (item: SiteLink) => {
  openMobileSubmenu.value = openMobileSubmenu.value === item.url ? null : item.url
}

const closeDesktopMenuIfFocusLeaves = (event: FocusEvent) => {
  const nextTarget = event.relatedTarget
  if (!(nextTarget instanceof Node) || !event.currentTarget?.contains(nextTarget)) {
    openDesktopSubmenu.value = null
  }
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200/80 bg-paper/90 backdrop-blur-xl">
    <div class="agency-shell flex h-[76px] items-center justify-between gap-6">
      <NuxtLink to="/" class="inline-flex items-center" aria-label="Digital Spot — αρχική">
        <img
          src="/brand/digital-spot-logo-dark.png"
          alt="Digital Spot"
          class="h-11 w-auto"
          width="92"
          height="40"
        >
      </NuxtLink>

      <nav aria-label="Κύρια πλοήγηση" class="hidden items-center gap-8 md:flex">
        <div
          v-for="(item, index) in navigation"
          :key="item.id ?? item.url"
          class="group relative"
          @mouseenter="item.children?.length && (openDesktopSubmenu = index)"
          @mouseleave="openDesktopSubmenu === index && (openDesktopSubmenu = null)"
          @focusin="item.children?.length && (openDesktopSubmenu = index)"
          @focusout="closeDesktopMenuIfFocusLeaves"
        >
          <div class="flex items-center gap-1">
            <NuxtLink
              :to="item.url"
              :external="isExternal(item.url)"
              :target="item.openInNewTab ? '_blank' : undefined"
              :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
              class="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              {{ item.label }}
            </NuxtLink>
            <button
              v-if="item.children?.length"
              type="button"
              class="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
              :aria-label="`Εμφάνιση υπομενού: ${item.label}`"
              :aria-expanded="openDesktopSubmenu === index"
              :aria-controls="`desktop-submenu-${index}`"
              @click="openDesktopSubmenu = openDesktopSubmenu === index ? null : index"
            >
              <svg class="h-3.5 w-3.5 transition-transform" :class="{ 'rotate-180': openDesktopSubmenu === index }" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.18l3.71-2.95a.75.75 0 01.94 1.16l-4.25 3.38a.75.75 0 01-.94 0L5.21 8.39a.75.75 0 01.02-1.18z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <ul
            v-if="item.children?.length"
            v-show="openDesktopSubmenu === index"
            :id="`desktop-submenu-${index}`"
            class="absolute left-0 top-full z-50 mt-3 min-w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10"
          >
            <li v-for="(child, childIndex) in item.children" :key="child.id ?? `${child.url}-${childIndex}`">
              <NuxtLink
                :to="child.url"
                :external="isExternal(child.url)"
                :target="child.openInNewTab ? '_blank' : undefined"
                :rel="child.openInNewTab ? 'noopener noreferrer' : undefined"
                class="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
              >
                {{ child.label }}
                <span aria-hidden="true" class="text-slate-400">↗</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>

      <NuxtLink
        v-if="cta?.label && cta.url"
        :to="cta.url"
        :external="isExternal(cta.url)"
        class="header-cta hidden sm:inline-flex"
      >
        {{ cta.label }} <span aria-hidden="true">↗</span>
      </NuxtLink>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-800 md:hidden"
        aria-label="Άνοιγμα μενού"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        @click="menuOpen = !menuOpen"
      >
        <span aria-hidden="true">{{ menuOpen ? '×' : '☰' }}</span>
      </button>
    </div>

    <nav v-if="menuOpen" id="mobile-navigation" aria-label="Πλοήγηση για κινητά" class="border-t border-slate-200 bg-paper px-5 py-5 md:hidden">
      <ul class="agency-shell space-y-2">
        <li v-for="item in navigation" :key="item.id ?? item.url">
          <div class="flex items-center gap-2">
            <NuxtLink
              :to="item.url"
              :external="isExternal(item.url)"
              :target="item.openInNewTab ? '_blank' : undefined"
              :rel="item.openInNewTab ? 'noopener noreferrer' : undefined"
              class="block flex-1 rounded-xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-white"
            >
              {{ item.label }}
            </NuxtLink>
            <button
              v-if="item.children?.length"
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 hover:bg-white"
              :aria-label="`${openMobileSubmenu === item.url ? 'Απόκρυψη' : 'Εμφάνιση'} υπομενού: ${item.label}`"
              :aria-expanded="openMobileSubmenu === item.url"
              :aria-controls="`mobile-submenu-${navigation.indexOf(item)}`"
              @click="toggleMobileSubmenu(item)"
            >
              <svg class="h-4 w-4 transition-transform" :class="{ 'rotate-180': openMobileSubmenu === item.url }" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.18l3.71-2.95a.75.75 0 01.94 1.16l-4.25 3.38a.75.75 0 01-.94 0L5.21 8.39a.75.75 0 01.02-1.18z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <ul
            v-if="item.children?.length"
            v-show="openMobileSubmenu === item.url"
            :id="`mobile-submenu-${navigation.indexOf(item)}`"
            class="ml-4 mt-1 space-y-1 border-l border-slate-200 pl-3"
          >
            <li v-for="(child, childIndex) in item.children" :key="child.id ?? `${child.url}-${childIndex}`">
              <NuxtLink
                :to="child.url"
                :external="isExternal(child.url)"
                :target="child.openInNewTab ? '_blank' : undefined"
                :rel="child.openInNewTab ? 'noopener noreferrer' : undefined"
                class="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-950"
              >
                {{ child.label }}
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li v-if="cta?.label && cta.url" class="pt-2">
          <NuxtLink :to="cta.url" :external="isExternal(cta.url)" class="primary-button w-full">
            {{ cta.label }} <span aria-hidden="true">↗</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
