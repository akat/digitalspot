import type { CollectionConfig } from 'payload/types'

import AgencySlices from '../blocks'

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Σελίδα', plural: 'Σελίδες' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
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
