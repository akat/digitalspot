import { fileURLToPath } from 'node:url'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  alias: {
    // The package ships `"exports": null`, which Vite refuses to resolve.
    '@payloadcms/live-preview': fileURLToPath(new URL('./node_modules/@payloadcms/live-preview/dist/index.js', import.meta.url)),
  },
  ssr: true,
  app: {
    head: {
      htmlAttrs: { lang: 'el' },
      title: 'Digital Spot — Ψηφιακή στρατηγική & δημιουργία',
      meta: [
        { name: 'description', content: 'Στρατηγική, σχεδιασμός και τεχνολογία για brands με ξεκάθαρο ψηφιακό αποτύπωμα.' },
        { name: 'theme-color', content: '#fafafa' },
      ],
    },
  },
  runtimeConfig: {
    payloadURL: process.env.NUXT_PAYLOAD_URL || process.env.NUXT_INTERNAL_PAYLOAD_URL || 'http://localhost:3055',
    crmURL: process.env.NUXT_CRM_URL || process.env.CRM_INTERNAL_URL || 'http://localhost:8000',
    crmApiToken: process.env.NUXT_CRM_API_TOKEN || process.env.CRM_API_TOKEN || '',
    public: {
      siteUrl,
      payloadURL: process.env.NUXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3055',
    },
  },
})
