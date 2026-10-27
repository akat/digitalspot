import { createError, defineEventHandler } from 'h3'
import type { SiteSettings } from '~/types/site-settings'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const url = new URL('/api/globals/site-settings', config.payloadURL)

  try {
    return await $fetch<SiteSettings>(url.toString(), {
      headers: { Accept: 'application/json' },
    })
  } catch (error) {
    console.error('Αποτυχία φόρτωσης των ρυθμίσεων μενού και υποσέλιδου από το Payload.', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Δεν ήταν δυνατή η φόρτωση των ρυθμίσεων πλοήγησης.',
    })
  }
})
