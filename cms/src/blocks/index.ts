import type { Block, Field } from 'payload/types'

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
    { name: 'mapUrl', label: 'Σύνδεσμος ενσωμάτωσης χάρτη', type: 'text' },
    { name: 'showMap', label: 'Εμφάνιση χάρτη', type: 'checkbox', defaultValue: false },
    { name: 'showLeadForm', label: 'Εμφάνιση φόρμας ενδιαφέροντος', type: 'checkbox', defaultValue: true },
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

const FeaturesSlice: Block = {
  slug: 'featuresSlice',
  labels: { singular: 'Χαρακτηριστικά', plural: 'Ενότητες χαρακτηριστικών' },
  fields: [
    { name: 'eyebrow', label: 'Μικρός τίτλος', type: 'text' },
    { name: 'heading', label: 'Τίτλος ενότητας', type: 'text', required: true },
    { name: 'description', label: 'Περιγραφή ενότητας', type: 'textarea' },
    {
      name: 'features',
      label: 'Χαρακτηριστικά',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', label: 'Τίτλος', type: 'text', required: true },
        { name: 'description', label: 'Περιγραφή', type: 'textarea', required: true },
        { name: 'icon', label: 'Σύμβολο ή σύντομη ένδειξη', type: 'text' },
      ],
    },
  ],
}

const ProjectStackSlice: Block = {
  slug: 'projectStackSlice',
  labels: { singular: 'Επίπεδα λύσης', plural: 'Ενότητες επιπέδων λύσης' },
  fields: [
    { name: 'eyebrow', label: 'Μικρός τίτλος', type: 'text' },
    { name: 'heading', label: 'Τίτλος ενότητας', type: 'text', required: true },
    { name: 'description', label: 'Περιγραφή ενότητας', type: 'textarea' },
    {
      name: 'layers',
      label: 'Επίπεδα',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', label: 'Τίτλος επιπέδου', type: 'text', required: true },
        {
          name: 'items',
          label: 'Στοιχεία',
          type: 'array',
          fields: [{ name: 'label', label: 'Κείμενο', type: 'text', required: true }],
        },
      ],
    },
  ],
}

const ImageTextSlice: Block = {
  slug: 'imageTextSlice',
  labels: { singular: 'Κείμενο με εικόνα', plural: 'Ενότητες κειμένου με εικόνα' },
  fields: [
    { name: 'eyebrow', label: 'Μικρός τίτλος', type: 'text' },
    { name: 'heading', label: 'Τίτλος ενότητας', type: 'text', required: true },
    { name: 'description', label: 'Περιγραφή', type: 'textarea', required: true },
    { name: 'image', label: 'Εικόνα', type: 'upload', relationTo: 'media' },
    { name: 'imageAlt', label: 'Περιγραφή εικόνας', type: 'text' },
    {
      name: 'imagePosition',
      label: 'Θέση εικόνας',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Δεξιά', value: 'right' },
        { label: 'Αριστερά', value: 'left' },
      ],
    },
    { name: 'buttonLabel', label: 'Κείμενο κουμπιού', type: 'text' },
    { name: 'buttonUrl', label: 'Σύνδεσμος κουμπιού', type: 'text' },
  ],
}

const TestimonialSlice: Block = {
  slug: 'testimonialSlice',
  labels: { singular: 'Μαρτυρία πελάτη', plural: 'Μαρτυρίες πελατών' },
  fields: [
    { name: 'eyebrow', label: 'Μικρός τίτλος', type: 'text' },
    { name: 'quote', label: 'Μαρτυρία', type: 'textarea', required: true },
    { name: 'person', label: 'Όνομα', type: 'text', required: true },
    { name: 'role', label: 'Ιδιότητα', type: 'text' },
    { name: 'company', label: 'Επιχείρηση', type: 'text' },
  ],
}

const LogoCloudSlice: Block = {
  slug: 'logoCloudSlice',
  labels: { singular: 'Λογότυπα συνεργατών', plural: 'Ενότητες λογοτύπων' },
  fields: [
    { name: 'heading', label: 'Τίτλος ενότητας', type: 'text' },
    {
      name: 'logos',
      label: 'Λογότυπα',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', label: 'Όνομα επιχείρησης', type: 'text', required: true },
        { name: 'image', label: 'Λογότυπο', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

const ProjectDetailsSlice: Block = {
  slug: 'projectDetailsSlice',
  labels: { singular: 'Παρουσίαση έργου', plural: 'Παρουσιάσεις έργων' },
  fields: [
    { name: 'eyebrow', label: 'Μικρός τίτλος', type: 'text' },
    { name: 'heading', label: 'Τίτλος έργου', type: 'text', required: true },
    { name: 'description', label: 'Σύνοψη έργου', type: 'textarea', required: true },
    { name: 'image', label: 'Κεντρική εικόνα', type: 'upload', relationTo: 'media' },
    { name: 'client', label: 'Πελάτης', type: 'text' },
    { name: 'year', label: 'Έτος', type: 'text' },
    { name: 'services', label: 'Υπηρεσίες', type: 'text' },
    { name: 'challenge', label: 'Η πρόκληση', type: 'textarea' },
    { name: 'solution', label: 'Η λύση', type: 'textarea' },
    {
      name: 'results',
      label: 'Αποτελέσματα',
      type: 'array',
      fields: [
        { name: 'value', label: 'Αριθμός ή σύντομη φράση', type: 'text', required: true },
        { name: 'label', label: 'Περιγραφή', type: 'text', required: true },
      ],
    },
    {
      name: 'gallery',
      label: 'Εικόνες έργου',
      type: 'array',
      fields: [
        { name: 'image', label: 'Εικόνα', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', label: 'Λεζάντα', type: 'text' },
      ],
    },
    { name: 'buttonLabel', label: 'Κείμενο συνδέσμου', type: 'text' },
    { name: 'buttonUrl', label: 'Σύνδεσμος έργου', type: 'text' },
  ],
}

const slices: Block[] = [
  AgencyHero,
  ServicesSlice,
  StatsSlice,
  ProjectsSlice,
  ProcessSlice,
  FaqSlice,
  CallToActionSlice,
  ContactSlice,
  FeaturesSlice,
  ProjectStackSlice,
  ImageTextSlice,
  TestimonialSlice,
  LogoCloudSlice,
  ProjectDetailsSlice,
]

const animationFields: Field[] = [
  {
    name: 'animation',
    label: 'Κίνηση κατά την εμφάνιση',
    type: 'select',
    defaultValue: 'none',
    options: [
      { label: 'Χωρίς κίνηση', value: 'none' },
      { label: 'Απαλή εμφάνιση', value: 'fade' },
      { label: 'Εμφάνιση από κάτω', value: 'fade-up' },
      { label: 'Εμφάνιση από αριστερά', value: 'slide-left' },
      { label: 'Εμφάνιση από δεξιά', value: 'slide-right' },
      { label: 'Μεγέθυνση', value: 'zoom' },
    ],
  },
]

export default slices.map(block => ({
  ...block,
  fields: [...block.fields, ...animationFields],
}))
