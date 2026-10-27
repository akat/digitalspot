<script setup lang="ts">
import type { AgencyBlock, AgencyProject } from '~/types/content'

defineProps<{
  slice: AgencyBlock
}>()

const config = useRuntimeConfig()
const externalLink = (url?: string | null) => Boolean(url && /^https?:\/\//i.test(url))

const imageUrl = (image: AgencyProject['image']) => {
  if (!image) return ''
  const rawUrl = typeof image === 'string'
    ? image
    : image.url || Object.values(image.sizes ?? {}).find(size => size?.url)?.url || ''

  if (!rawUrl || /^https?:\/\//i.test(rawUrl)) return rawUrl

  try {
    return new URL(rawUrl, config.public.payloadURL).toString()
  } catch {
    return rawUrl
  }
}

const imageAlt = (image: NonNullable<AgencyBlock['projects']>[number]['image'], fallback: string) =>
  typeof image === 'object' && image && image.alt ? image.alt : fallback

const faqOpen = ref<number | null>(0)
</script>

<template>
  <section v-if="slice.blockType === 'agencyHero'" class="hero-section relative overflow-hidden">
    <div class="hero-grid absolute inset-0" aria-hidden="true" />
    <div class="agency-shell relative grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.05fr_.95fr] lg:py-32">
      <div class="max-w-2xl">
        <p v-if="slice.eyebrow" class="eyebrow"><span class="live-dot" />{{ slice.eyebrow }}</p>
        <h1 class="mt-7 text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
          {{ slice.headline }}
        </h1>
        <p v-if="slice.description" class="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
          {{ slice.description }}
        </p>
        <div class="mt-9 flex flex-wrap gap-3">
          <NuxtLink v-if="slice.primaryLabel && slice.primaryUrl" :to="slice.primaryUrl" class="primary-button">
            {{ slice.primaryLabel }} <span aria-hidden="true">↗</span>
          </NuxtLink>
          <NuxtLink v-if="slice.secondaryLabel && slice.secondaryUrl" :to="slice.secondaryUrl" class="secondary-button">
            {{ slice.secondaryLabel }}
          </NuxtLink>
        </div>
        <p v-if="slice.note" class="mt-6 text-sm text-slate-500">{{ slice.note }}</p>
      </div>

      <div class="hero-visual relative mx-auto w-full max-w-[540px]" aria-hidden="true">
        <div class="hero-orbit hero-orbit-one" />
        <div class="hero-orbit hero-orbit-two" />
        <div class="visual-card">
          <div class="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-[#040707]" /><span class="text-xs font-semibold tracking-wide text-slate-500">DIGITAL SPOT / 01</span></div>
            <span class="text-xs text-slate-400">Αθήνα · Παντού</span>
          </div>
          <div class="p-6 sm:p-8">
            <div class="flex items-end justify-between">
              <div><p class="text-sm text-slate-500">Ψηφιακή παρουσία</p><p class="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Νέα προοπτική.</p></div>
              <span class="mb-1 rounded-full bg-[#ededed] px-3 py-1 text-xs font-semibold text-[#343839]">LIVE</span>
            </div>
            <div class="chart-bars mt-8 flex h-40 items-end gap-2 sm:gap-3">
              <span v-for="height in [31, 48, 39, 67, 55, 76, 62, 92, 75, 100, 84, 112]" :key="height" :style="{ height: `${height}px` }" />
            </div>
            <div class="mt-5 flex items-center justify-between text-xs text-slate-400"><span>Στρατηγική</span><span>Σχεδιασμός</span><span>Ανάπτυξη</span></div>
          </div>
        </div>
        <div class="floating-note"><span class="note-icon">✳</span><span><strong>Σκέψη με πρόθεση.</strong><br>Σχεδιασμός με αποτέλεσμα.</span></div>
      </div>
    </div>
    <div class="agency-shell pb-8"><div class="flex flex-wrap items-center justify-between gap-5 border-t border-slate-200/80 pt-7"><p class="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Από την πρώτη ιδέα μέχρι την επόμενη μεγάλη κίνηση</p><a href="#services" class="text-sm font-semibold text-slate-700 transition hover:text-leaf">Ανακάλυψε τι μπορούμε να κάνουμε <span aria-hidden="true">↓</span></a></div></div>
  </section>

  <section v-else-if="slice.blockType === 'servicesSlice'" id="services" class="agency-section agency-shell">
    <div class="section-heading">
      <p v-if="slice.eyebrow" class="eyebrow">{{ slice.eyebrow }}</p>
      <h2 class="section-title">{{ slice.heading }}</h2>
      <p v-if="slice.description" class="section-lead">{{ slice.description }}</p>
    </div>
    <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <article v-for="(service, index) in slice.services || []" :key="service.id ?? index" class="service-card">
        <span class="service-number">{{ service.number || `0${index + 1}` }}</span>
        <h3 class="mt-12 text-xl font-semibold tracking-tight text-slate-900">{{ service.title }}</h3>
        <p class="mt-3 text-sm leading-6 text-slate-600">{{ service.description }}</p>
        <NuxtLink v-if="service.linkLabel && service.linkUrl" :to="service.linkUrl" class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-leaf">
          {{ service.linkLabel }} <span aria-hidden="true">↗</span>
        </NuxtLink>
      </article>
    </div>
  </section>

  <section v-else-if="slice.blockType === 'statsSlice'" class="stats-section">
    <div class="agency-shell grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
      <p v-if="slice.intro" class="max-w-xs text-sm leading-6 text-white/70">{{ slice.intro }}</p>
      <div v-for="(item, index) in slice.items || []" :key="item.id ?? index" class="border-l border-white/20 pl-5">
        <p class="text-3xl font-semibold tracking-tight text-white">{{ item.value }}</p>
        <p class="mt-1 text-sm text-white/65">{{ item.label }}</p>
      </div>
    </div>
  </section>

  <section v-else-if="slice.blockType === 'projectsSlice'" id="work" class="agency-section agency-shell">
    <div class="section-heading flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p v-if="slice.eyebrow" class="eyebrow">{{ slice.eyebrow }}</p>
        <h2 class="section-title">{{ slice.heading }}</h2>
        <p v-if="slice.description" class="section-lead">{{ slice.description }}</p>
      </div>
      <NuxtLink to="/#contact" class="hidden shrink-0 text-sm font-semibold text-slate-800 hover:text-leaf sm:inline-flex">Έχεις ένα project; ↗</NuxtLink>
    </div>
    <div class="mt-12 grid gap-7 md:grid-cols-2">
      <article v-for="(project, index) in slice.projects || []" :key="project.id ?? index" class="project-card" :class="{ 'md:mt-12': index % 2 === 1 }">
        <NuxtLink :to="project.url || '#contact'" :external="externalLink(project.url)" :target="externalLink(project.url) ? '_blank' : undefined" :rel="externalLink(project.url) ? 'noopener noreferrer' : undefined" class="group block">
          <div class="project-image" :class="`project-image-${index % 4}`">
            <img v-if="imageUrl(project.image)" :src="imageUrl(project.image)" :alt="imageAlt(project.image, project.name || '')" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
            <div v-else class="project-art"><span>{{ project.name?.slice(0, 1) }}</span><span class="project-spark">✳</span></div>
            <span class="project-arrow" aria-hidden="true">↗</span>
          </div>
          <div class="mt-5 flex items-start justify-between gap-4">
            <div><p class="text-xs font-semibold uppercase tracking-[.15em] text-slate-500">{{ project.category }}</p><h3 class="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{{ project.name }}</h3><p v-if="project.description" class="mt-2 max-w-lg text-sm leading-6 text-slate-600">{{ project.description }}</p></div>
            <span class="mt-1 text-sm text-slate-400">0{{ index + 1 }}</span>
          </div>
        </NuxtLink>
      </article>
    </div>
  </section>

  <section v-else-if="slice.blockType === 'processSlice'" id="process" class="process-section">
    <div class="agency-shell py-20 sm:py-24">
      <div class="section-heading max-w-2xl">
        <p v-if="slice.eyebrow" class="eyebrow">{{ slice.eyebrow }}</p>
        <h2 class="section-title">{{ slice.heading }}</h2>
        <p v-if="slice.description" class="section-lead">{{ slice.description }}</p>
      </div>
      <ol class="mt-12 grid gap-8 md:grid-cols-4">
        <li v-for="(step, index) in slice.steps || []" :key="step.id ?? index" class="border-t border-slate-300 pt-5">
          <span class="text-sm font-semibold text-[#343839]">0{{ index + 1 }}</span>
          <h3 class="mt-5 text-lg font-semibold text-slate-900">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">{{ step.description }}</p>
        </li>
      </ol>
    </div>
  </section>

  <section v-else-if="slice.blockType === 'faqSlice'" class="agency-section agency-shell">
    <div class="section-heading max-w-2xl">
      <p class="eyebrow">Συχνές ερωτήσεις</p>
      <h2 class="section-title">{{ slice.heading }}</h2>
    </div>
    <div class="mt-9 max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
      <article v-for="(item, index) in slice.questions || []" :key="item.id ?? index" class="faq-item border-b border-slate-100 last:border-b-0">
        <button type="button" class="flex w-full items-center justify-between gap-5 py-5 text-left text-base font-semibold text-slate-900" :aria-expanded="faqOpen === index" @click="faqOpen = faqOpen === index ? null : index">
          {{ item.question }}
          <span class="faq-plus" :class="{ 'rotate-45': faqOpen === index }" aria-hidden="true">+</span>
        </button>
        <p v-if="faqOpen === index" class="max-w-2xl pb-5 text-sm leading-7 text-slate-600">{{ item.answer }}</p>
      </article>
    </div>
  </section>

  <section v-else-if="slice.blockType === 'callToActionSlice'" class="cta-section">
    <div class="agency-shell flex flex-col gap-8 py-14 sm:flex-row sm:items-center sm:justify-between sm:py-16">
      <div class="max-w-2xl">
        <p v-if="slice.eyebrow" class="text-xs font-semibold uppercase tracking-[.18em] text-white/60">{{ slice.eyebrow }}</p>
        <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{{ slice.heading }}</h2>
        <p v-if="slice.description" class="mt-3 text-base leading-7 text-white/70">{{ slice.description }}</p>
      </div>
      <NuxtLink v-if="slice.buttonLabel" :to="slice.buttonUrl || '/#contact'" class="primary-button button-light shrink-0">
        {{ slice.buttonLabel }} <span aria-hidden="true">↗</span>
      </NuxtLink>
    </div>
  </section>

  <section v-else-if="slice.blockType === 'contactSlice'" id="contact" class="agency-section agency-shell">
    <div class="grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end">
      <div>
        <p v-if="slice.eyebrow" class="eyebrow">{{ slice.eyebrow }}</p>
        <h2 class="section-title max-w-2xl">{{ slice.heading }}</h2>
        <p v-if="slice.description" class="section-lead">{{ slice.description }}</p>
      </div>
      <div class="grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-2">
        <a v-if="slice.email" :href="`mailto:${slice.email}`" class="contact-link"><span>Email</span><strong>{{ slice.email }}</strong></a>
        <a v-if="slice.phone" :href="`tel:${slice.phone.replace(/\\s/g, '')}`" class="contact-link"><span>Τηλέφωνο</span><strong>{{ slice.phone }}</strong></a>
        <p v-if="slice.location" class="contact-link sm:col-span-2"><span>Τοποθεσία</span><strong>{{ slice.location }}</strong></p>
      </div>
    </div>
  </section>
</template>
