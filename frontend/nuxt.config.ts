const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
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
    public: {
      siteUrl,
      payloadURL: process.env.NUXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3055',
    },
  },
})
