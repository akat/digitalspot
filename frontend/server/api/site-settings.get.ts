import { createError, defineEventHandler } from 'h3'
import type { SiteSettings } from '~/types/site-settings'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const menuURL = new URL('/api/globals/main-navigation', config.payloadURL)
  const footerURL = new URL('/api/globals/footer-settings', config.payloadURL)

  try {
    const [menu, footer] = await Promise.all([
      $fetch<SiteSettings>(menuURL.toString(), { headers: { Accept: 'application/json' } }),
      $fetch<SiteSettings>(footerURL.toString(), { headers: { Accept: 'application/json' } }),
    ])
    return { ...menu, ...footer }
  } catch (error) {
    console.error('Αποτυχία φόρτωσης των ρυθμίσεων μενού ή υποσέλιδου από το Payload.', error)
    throw createError({
      statusCode: 502,
      message: 'Δεν ήταν δυνατή η φόρτωση των ρυθμίσεων πλοήγησης.',
    })
  }
})
