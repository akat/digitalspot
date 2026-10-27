import type { Field, GlobalConfig } from 'payload/types'

const linkFields: Field[] = [
  { name: 'label', label: 'Κείμενο συνδέσμου', type: 'text', required: true },
  { name: 'url', label: 'Διεύθυνση συνδέσμου', type: 'text', required: true },
  { name: 'openInNewTab', label: 'Άνοιγμα σε νέα καρτέλα', type: 'checkbox', defaultValue: false },
]

const MainNavigation: GlobalConfig = {
  slug: 'main-navigation',
  label: 'Κύριο μενού',
  access: { read: () => true },
  fields: [
    {
      name: 'mainNavigation',
      label: 'Σύνδεσμοι μενού',
      type: 'array',
      labels: { singular: 'Σύνδεσμος μενού', plural: 'Σύνδεσμοι μενού' },
      fields: [
        ...linkFields,
        {
          name: 'children',
          label: 'Υπομενού',
          type: 'array',
          labels: { singular: 'Υποσύνδεσμος', plural: 'Υποσύνδεσμοι' },
          fields: [...linkFields],
        },
      ],
    },
    {
      name: 'headerCta',
      label: 'Κουμπί κεφαλίδας',
      type: 'group',
      fields: [
        { name: 'label', label: 'Κείμενο κουμπιού', type: 'text' },
        { name: 'url', label: 'Διεύθυνση κουμπιού', type: 'text' },
      ],
    },
  ],
}

export default MainNavigation
