import { createError, defineEventHandler, getRouterParam } from 'h3'
import type { AgencyPage } from '~/types/content'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Λείπει η διεύθυνση της σελίδας.' })
  }

  const config = useRuntimeConfig(event)
  const payloadURL = new URL('/api/pages', config.payloadURL)
  payloadURL.searchParams.set('where[slug][equals]', slug)
  payloadURL.searchParams.set('limit', '1')
  payloadURL.searchParams.set('depth', '2')

  let response: { docs?: AgencyPage[] }
  try {
    response = await $fetch<{ docs?: AgencyPage[] }>(payloadURL.toString(), {
      headers: { Accept: 'application/json' },
    })
  } catch (error) {
    console.error(`Αποτυχία φόρτωσης της σελίδας "${slug}" από το Payload.`, error)
    throw createError({ statusCode: 502, message: 'Δεν ήταν δυνατή η φόρτωση της σελίδας.' })
  }

  const page = response.docs?.[0]
  if (!page) {
    throw createError({ statusCode: 404, message: 'Η σελίδα δεν βρέθηκε.' })
  }

  return page
})
