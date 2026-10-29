import type { Ref } from 'vue'

// Keeps `page` in sync with the unsaved form state while the page is open
// inside the Payload admin's Live Preview (iframe or popup window).
export const useLivePreview = <T extends object>(page: Ref<T | null | undefined>) => {
  const serverURL = useRuntimeConfig().public.payloadURL.replace(/\/$/, '')
  let stop: (() => void) | undefined

  onMounted(async () => {
    const isEmbedded = window.self !== window.top || Boolean(window.opener)
    if (!isEmbedded) return

    const { ready, subscribe, unsubscribe } = await import('@payloadcms/live-preview')
    const listener = subscribe<T>({
      serverURL,
      depth: 2,
      initialData: (page.value ?? {}) as T,
      callback: (data) => {
        page.value = data
      },
    })
    stop = () => unsubscribe(listener)
    ready({ serverURL })
  })

  onBeforeUnmount(() => stop?.())
}
