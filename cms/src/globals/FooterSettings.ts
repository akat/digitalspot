import type { Field, GlobalConfig } from 'payload/types'

const linkFields: Field[] = [
  { name: 'label', label: 'Κείμενο συνδέσμου', type: 'text', required: true },
  { name: 'url', label: 'Διεύθυνση συνδέσμου', type: 'text', required: true },
  { name: 'openInNewTab', label: 'Άνοιγμα σε νέα καρτέλα', type: 'checkbox', defaultValue: false },
]

const FooterSettings: GlobalConfig = {
  slug: 'footer-settings',
  label: 'Υποσέλιδο',
  access: { read: () => true },
  fields: [
    { name: 'footerDescription', label: 'Περιγραφή υποσέλιδου', type: 'textarea' },
    {
      name: 'footerColumns',
      label: 'Στήλες συνδέσμων',
      type: 'array',
      labels: { singular: 'Στήλη υποσέλιδου', plural: 'Στήλες υποσέλιδου' },
      fields: [
        { name: 'title', label: 'Τίτλος στήλης', type: 'text', required: true },
        {
          name: 'links',
          label: 'Σύνδεσμοι',
          type: 'array',
          labels: { singular: 'Σύνδεσμος', plural: 'Σύνδεσμοι' },
          fields: [...linkFields],
        },
      ],
    },
    {
      name: 'footerSocialLinks',
      label: 'Κοινωνικά δίκτυα',
      type: 'array',
      labels: { singular: 'Κοινωνικός σύνδεσμος', plural: 'Κοινωνικοί σύνδεσμοι' },
      fields: [...linkFields],
    },
    {
      name: 'footerContact',
      label: 'Στοιχεία επικοινωνίας',
      type: 'group',
      fields: [
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Τηλέφωνο', type: 'text' },
        { name: 'location', label: 'Τοποθεσία', type: 'text' },
      ],
    },
    {
      name: 'copyright',
      label: 'Κείμενο πνευματικών δικαιωμάτων',
      type: 'text',
      admin: { description: 'Το έτος προστίθεται αυτόματα.' },
    },
  ],
}

export default FooterSettings
