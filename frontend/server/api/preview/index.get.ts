import { createError, defineEventHandler, getQuery, sendRedirect, setCookie } from 'h3'

// Entry point used by the Payload admin ("Preview" button and Live Preview iframe).
// Verifies the editor's token, stores it in a cookie and opens the requested page in draft mode.
export default defineEventHandler(async (event) => {
  const { token, path } = getQuery(event)
  if (typeof token !== 'string' || !token) {
    throw createError({ statusCode: 401, message: 'Λείπει το διακριτικό προεπισκόπησης.' })
  }

  const config = useRuntimeConfig(event)
  const session = await $fetch<{ user?: unknown; exp?: number }>(
    new URL('/api/users/me', config.payloadURL).toString(),
    { headers: { Accept: 'application/json', Authorization: `JWT ${token}` } },
  ).catch((error: unknown) => {
    console.error('Αποτυχία επιβεβαίωσης του χρήστη προεπισκόπησης στο Payload.', error)
    return null
  })

  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Η συνεδρία προεπισκόπησης δεν είναι έγκυρη.' })
  }

  const maxAge = session.exp ? Math.max(session.exp - Math.floor(Date.now() / 1000), 0) : 2 * 60 * 60
  const options = { ...previewCookieOptions(event), maxAge }
  setCookie(event, PREVIEW_TOKEN_COOKIE, token, { ...options, httpOnly: true })
  setCookie(event, PREVIEW_FLAG_COOKIE, '1', options)

  return sendRedirect(event, safeRedirectPath(path))
})
