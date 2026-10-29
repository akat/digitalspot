import { defineEventHandler, deleteCookie, getQuery, sendRedirect } from 'h3'

export default defineEventHandler((event) => {
  const options = previewCookieOptions(event)
  deleteCookie(event, PREVIEW_TOKEN_COOKIE, options)
  deleteCookie(event, PREVIEW_FLAG_COOKIE, options)
  return sendRedirect(event, safeRedirectPath(getQuery(event).path))
})
