import { createError, defineEventHandler, readBody } from 'h3'

const interestOptions = new Set([
  'website',
  'eshop',
  'mobile-app',
  'custom-platform',
  'ai-automation',
  'brand-design',
  'seo-growth',
  'other',
])

type LeadRequest = {
  name?: unknown
  email?: unknown
  phone?: unknown
  company?: unknown
  interest?: unknown
  message?: unknown
  consent?: unknown
}

const cleanString = (value: unknown) => typeof value === 'string' ? value.trim() : ''

export default defineEventHandler(async (event) => {
  const body = await readBody<LeadRequest>(event)
  const name = cleanString(body?.name)
  const email = cleanString(body?.email)
  const phone = cleanString(body?.phone)
  const company = cleanString(body?.company)
  const interest = cleanString(body?.interest)
  const message = cleanString(body?.message)

  if (name.length < 2 || name.length > 160) {
    throw createError({ statusCode: 400, statusMessage: 'Συμπλήρωσε το ονοματεπώνυμό σου.' })
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Συμπλήρωσε μια έγκυρη διεύθυνση email.' })
  }
  if (phone.length > 40 || company.length > 160) {
    throw createError({ statusCode: 400, statusMessage: 'Τα στοιχεία επικοινωνίας είναι πολύ μεγάλα.' })
  }
  if (!interestOptions.has(interest)) {
    throw createError({ statusCode: 400, statusMessage: 'Επίλεξε την υπηρεσία που σε ενδιαφέρει.' })
  }
  if (message.length < 10 || message.length > 10000) {
    throw createError({ statusCode: 400, statusMessage: 'Το μήνυμα πρέπει να έχει από 10 έως 10.000 χαρακτήρες.' })
  }
  if (body.consent !== true) {
    throw createError({ statusCode: 400, statusMessage: 'Χρειάζεται να συμφωνήσεις για να επικοινωνήσουμε σχετικά με το αίτημά σου.' })
  }

  const config = useRuntimeConfig(event)
  if (!config.crmApiToken) {
    console.error('Λείπει η ρύθμιση CRM_API_TOKEN για την αποστολή αιτημάτων στο CRM.')
    throw createError({ statusCode: 503, statusMessage: 'Η φόρμα επικοινωνίας δεν είναι προσωρινά διαθέσιμη.' })
  }

  try {
    const result = await $fetch<{ id: number }>(new URL('/api/website/leads', config.crmURL).toString(), {
      method: 'POST',
      headers: {
        'X-Website-CRM-Token': config.crmApiToken,
      },
      body: { name, email, phone, company, interest, message },
    })

    return { success: true, leadId: result.id }
  } catch (error) {
    console.error('Αποτυχία καταχώρισης του αιτήματος επικοινωνίας στο CRM.', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Δεν ήταν δυνατή η αποστολή του αιτήματος. Δοκίμασε ξανά αργότερα.',
    })
  }
})
