import type { H3Event } from 'h3'
import { getCookie, getRequestProtocol } from 'h3'

// httpOnly cookie that holds the editor's Payload token while previewing drafts.
export const PREVIEW_TOKEN_COOKIE = 'payload-preview-token'
// Readable flag so the page can show the preview banner.
export const PREVIEW_FLAG_COOKIE = 'payload-preview'

export const getPreviewToken = (event: H3Event) => getCookie(event, PREVIEW_TOKEN_COOKIE)

export const previewCookieOptions = (event: H3Event) => ({
  path: '/',
  sameSite: 'lax' as const,
  secure: getRequestProtocol(event) === 'https',
})

export const safeRedirectPath = (path: unknown) =>
  typeof path === 'string' && path.startsWith('/') && !path.startsWith('//') ? path : '/'
