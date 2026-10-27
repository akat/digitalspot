import type { Block } from 'payload/types'

const AgencyHero: Block = {
  slug: 'agencyHero',
  labels: { singular: 'Κεντρικό μήνυμα', plural: 'Κεντρικά μηνύματα' },
  fields: [
    { name: 'eyebrow', label: 'Μικρός τίτλος', type: 'text' },
    { name: 'headline', label: 'Κεντρικός τίτλος', type: 'text', required: true },
    { name: 'description', label: 'Περιγραφή', type: 'textarea', required: true },
    { name: 'primaryLabel', label: 'Κείμενο βασικού κουμπιού', type: 'text', required: true },
    { name: 'primaryUrl', label: 'Σύνδεσμος βασικού κουμπιού', type: 'text', required: true },
    { name: 'secondaryLabel', label: 'Κείμενο δεύτερου κουμπιού', type: 'text' },
    { name: 'secondaryUrl', label: 'Σύνδεσμος δεύτερου κουμπιού', type: 'text' },
    { name: 'note', label: 'Σύντομη σημείωση', type: 'text' },
  ],
}

const ServicesSlice: Block = {
  slug: 'servicesSlice',
  labels: { singular: 'Υπηρεσίες', plural: 'Ενότητες υπηρεσιών' },
  fields: [
    { name: 'eyebrow', label: 'Μικρός τίτλος', type: 'text' },
    { name: 'heading', label: 'Τίτλος ενότητας', type: 'text', required: true },
    { name: 'description', label: 'Περιγραφή ενότητας', type: 'textarea' },
    {
      name: 'services', label: 'Υπηρεσίες', type: 'array', minRows: 1,
      fields: [
        { name: 'number', label: 'Αριθμός', type: 'text' },
        { name: 'title', label: 'Τίτλος', type: 'text', required: true },
        { name: 'description', label: 'Περιγραφή', type: 'textarea', required: true },
        { name: 'linkLabel', label: 'Κείμενο συνδέσμου', type: 'text' },
        { name: 'linkUrl', label: 'Σύνδεσμος', type: 'text' },
      ],
    },
  ],
}

const StatsSlice: Block = {
  slug: 'statsSlice',
  labels: { singular: 'Αριθμοί και αποτελέσματα', plural: 'Ενότητες αριθμών' },
  fields: [
    { name: 'intro', label: 'Εισαγωγικό κείμενο', type: 'text' },
    {
      name: 'items', label: 'Στατιστικά', type: 'array', minRows: 1,
      fields: [
        { name: 'value', label: 'Αριθμός ή τιμή', type: 'text', required: true },
        { name: 'label', label: 'Περιγραφή', type: 'text', required: true },
      ],
    },
  ],
}

const ProjectsSlice: Block = {
  slug: 'projectsSlice',
  labels: { singular: 'Έργα', plural: 'Ενότητες έργων' },
  fields: [
    { name: 'eyebrow', label: 'Μικρός τίτλος', type: 'text' },
    { name: 'heading', label: 'Τίτλος ενότητας', type: 'text', required: true },
    { name: 'description', label: 'Περιγραφή ενότητας', type: 'textarea' },
    {
      name: 'projects', label: 'Έργα', type: 'array', minRows: 1,
      fields: [
        { name: 'name', label: 'Όνομα έργου', type: 'text', required: true },
        { name: 'category', label: 'Κατηγορία', type: 'text', required: true },
        { name: 'description', label: 'Περιγραφή', type: 'textarea' },
        { name: 'image', label: 'Εικόνα', type: 'upload', relationTo: 'media' },
        { name: 'url', label: 'Σύνδεσμος έργου', type: 'text' },
      ],
    },
  ],
}

const ProcessSlice: Block = {
  slug: 'processSlice',
  labels: { singular: 'Η διαδικασία μας', plural: 'Ενότητες διαδικασίας' },
  fields: [
    { name: 'eyebrow', label: 'Μικρός τίτλος', type: 'text' },
    { name: 'heading', label: 'Τίτλος ενότητας', type: 'text', required: true },
    { name: 'description', label: 'Περιγραφή ενότητας', type: 'textarea' },
    {
      name: 'steps', label: 'Βήματα', type: 'array', minRows: 1,
      fields: [
        { name: 'title', label: 'Τίτλος βήματος', type: 'text', required: true },
        { name: 'description', label: 'Περιγραφή βήματος', type: 'textarea', required: true },
      ],
    },
  ],
}

const CallToActionSlice: Block = {
  slug: 'callToActionSlice',
  labels: { singular: 'Πρόσκληση επικοινωνίας', plural: 'Προσκλήσεις επικοινωνίας' },
  fields: [
    { name: 'eyebrow', label: 'Μικρός τίτλος', type: 'text' },
    { name: 'heading', label: 'Κεντρικός τίτλος', type: 'text', required: true },
    { name: 'description', label: 'Περιγραφή', type: 'textarea' },
    { name: 'buttonLabel', label: 'Κείμενο κουμπιού', type: 'text', required: true },
    { name: 'buttonUrl', label: 'Σύνδεσμος κουμπιού', type: 'text', required: true },
  ],
}

const ContactSlice: Block = {
  slug: 'contactSlice',
  labels: { singular: 'Στοιχεία επικοινωνίας', plural: 'Ενότητες επικοινωνίας' },
  fields: [
    { name: 'eyebrow', label: 'Μικρός τίτλος', type: 'text' },
    { name: 'heading', label: 'Τίτλος ενότητας', type: 'text', required: true },
    { name: 'description', label: 'Περιγραφή', type: 'textarea' },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Τηλέφωνο', type: 'text' },
    { name: 'location', label: 'Τοποθεσία', type: 'text' },
  ],
}

const FaqSlice: Block = {
  slug: 'faqSlice',
  labels: { singular: 'Συχνές ερωτήσεις', plural: 'Ενότητες συχνών ερωτήσεων' },
  fields: [
    { name: 'heading', label: 'Τίτλος ενότητας', type: 'text', required: true },
    {
      name: 'questions', label: 'Ερωτήσεις', type: 'array', minRows: 1,
      fields: [
        { name: 'question', label: 'Ερώτηση', type: 'text', required: true },
        { name: 'answer', label: 'Απάντηση', type: 'textarea', required: true },
      ],
    },
  ],
}

export default [
  AgencyHero,
  ServicesSlice,
  StatsSlice,
  ProjectsSlice,
  ProcessSlice,
  FaqSlice,
  CallToActionSlice,
  ContactSlice,
]
