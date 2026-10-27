import type { Field, GlobalConfig } from 'payload/types'

const linkFields: Field[] = [
  { name: 'label', label: 'Κείμενο συνδέσμου', type: 'text', required: true },
  { name: 'url', label: 'Διεύθυνση συνδέσμου', type: 'text', required: true },
  {
    name: 'openInNewTab',
    label: 'Άνοιγμα σε νέα καρτέλα',
    type: 'checkbox',
    defaultValue: false,
  },
]

const navigationFields: Field[] = [
  ...linkFields,
  {
    name: 'children',
    label: 'Υπομενού',
    type: 'array',
    labels: { singular: 'Υποσύνδεσμος', plural: 'Υποσύνδεσμοι' },
    admin: {
      description: 'Προσθέστε συνδέσμους που θα εμφανίζονται κάτω από αυτό το στοιχείο του μενού.',
    },
    fields: [...linkFields],
  },
]

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Μενού και υποσέλιδο',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'mainNavigation',
      label: 'Κύριο μενού',
      type: 'array',
      labels: { singular: 'Σύνδεσμος μενού', plural: 'Σύνδεσμοι μενού' },
      admin: {
        description: 'Προσθέστε, αφαιρέστε ή αλλάξτε τη σειρά των συνδέσμων της κύριας πλοήγησης.',
      },
      fields: [...navigationFields],
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
    {
      name: 'footerDescription',
      label: 'Περιγραφή υποσέλιδου',
      type: 'textarea',
    },
    {
      name: 'footerColumns',
      label: 'Στήλες συνδέσμων υποσέλιδου',
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
      label: 'Στοιχεία επικοινωνίας υποσέλιδου',
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
      admin: {
        description: 'Το έτος προστίθεται αυτόματα.',
      },
    },
  ],
}

export default SiteSettings
