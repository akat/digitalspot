// Runs inside the admin bundle, so the site URL is read at runtime from the CMS
// server instead of being baked into the bundle at build time.

type PreviewConfig = { siteURL: string }

let previewConfig: Promise<PreviewConfig> | undefined

const getPreviewConfig = () => {
  previewConfig ??= fetch('/api/preview-config', { credentials: 'include' })
    .then(response => response.json() as Promise<PreviewConfig>)
    .catch((error: unknown) => {
      previewConfig = undefined
      throw error
    })
  return previewConfig
}

const getSessionToken = async () => {
  const response = await fetch('/api/users/me', { credentials: 'include' })
  const { token } = await response.json() as { token?: string }
  return token
}

export const pagePath = (slug: unknown) =>
  !slug || slug === 'home' ? '/' : `/${encodeURIComponent(String(slug))}`

export const buildPreviewURL = async (slug: unknown, token?: string) => {
  const [{ siteURL }, sessionToken] = await Promise.all([
    getPreviewConfig(),
    token ? Promise.resolve(token) : getSessionToken(),
  ])

  const url = new URL('/api/preview', siteURL)
  url.searchParams.set('path', pagePath(slug))
  if (sessionToken) url.searchParams.set('token', sessionToken)
  return url.toString()
}
