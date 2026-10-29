import type { CollectionConfig } from 'payload/types'

const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Αρχείο πολυμέσων', plural: 'Αρχεία πολυμέσων' },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/mp4', 'video/webm'],
  },
  access: { read: () => true },
  fields: [
    { name: 'alt', label: 'Εναλλακτικό κείμενο', type: 'text', required: true },
  ],
}

export default Media
