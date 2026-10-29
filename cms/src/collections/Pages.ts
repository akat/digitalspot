import type { CollectionConfig } from 'payload/types'

import AgencySlices from '../blocks'
import { buildPreviewURL } from '../preview'

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Σελίδα', plural: 'Σελίδες' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    preview: (doc, { token }) => buildPreviewURL(doc.slug, token),
    livePreview: {
      url: ({ data }) => buildPreviewURL(data.slug),
      breakpoints: [
        { label: 'Κινητό', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  access: {
    // Visitors only see published pages; signed-in editors also see drafts.
    // Pages created before drafts were enabled have no _status and count as published.
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        or: [
          { _status: { equals: 'published' } },
          { _status: { exists: false } },
        ],
      }
    },
  },
  fields: [
    { name: 'title', label: 'Τίτλος', type: 'text', required: true },
    {
      name: 'slug',
      label: 'Διεύθυνση',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar', description: 'Για την αρχική σελίδα χρησιμοποίησε το home.' },
    },
    {
      name: 'blocks',
      label: 'Ενότητες σελίδας',
      type: 'blocks',
      blocks: AgencySlices,
    },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'metaTitle', label: 'Τίτλος αποτελέσματος', type: 'text', maxLength: 60 },
        { name: 'metaDescription', label: 'Περιγραφή αποτελέσματος', type: 'textarea', maxLength: 160 },
      ],
    },
  ],
}

export default Pages
