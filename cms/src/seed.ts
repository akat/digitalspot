import dotenv from 'dotenv'
import type { Payload } from 'payload'

import payloadConfig from '../payload.config'

dotenv.config()

const payload = require('payload') as Payload

type MenuLink = {
  label: string
  url: string
  openInNewTab?: boolean
  children?: MenuLink[]
}

type MainNavigationSettings = {
  mainNavigation?: MenuLink[]
  headerCta?: { label?: string; url?: string }
}

type FooterSettings = {
  footerDescription?: string
  footerColumns?: Array<{ title: string; links?: MenuLink[] }>
  footerSocialLinks?: MenuLink[]
  footerContact?: { email?: string; phone?: string; location?: string }
  copyright?: string
}

const projectStackExample = {
  blockType: 'projectStackSlice',
  eyebrow: 'Η λύση, σε επίπεδα',
  heading: 'Χτίζουμε σε σταθερές βάσεις.',
  description: 'Κάθε έργο ξεκινά από τα απαραίτητα και μπορεί να εξελιχθεί με λειτουργίες που εξυπηρετούν την ομάδα σου.',
  layers: [
    { title: 'Σχεδιασμός και περιεχόμενο', items: [{ label: 'Ταυτότητα' }, { label: 'Ιστοσελίδες' }, { label: 'Προσβασιμότητα' }] },
    { title: 'Λειτουργίες', items: [{ label: 'Φόρμες' }, { label: 'Κρατήσεις' }, { label: 'Αναφορές' }] },
    { title: 'Σύνδεση και αυτοματοποίηση', items: [{ label: 'Εργαλεία ομάδας' }, { label: 'Ψηφιακοί βοηθοί' }] },
  ],
}

const seed = async () => {
  const email = process.env.PAYLOAD_ADMIN_EMAIL?.trim()
  const password = process.env.PAYLOAD_ADMIN_PASSWORD
  if (!email || !password) {
    throw new Error('Τα PAYLOAD_ADMIN_EMAIL και PAYLOAD_ADMIN_PASSWORD πρέπει να έχουν οριστεί πριν από το seed.')
  }

  await payload.init({
    config: payloadConfig,
    secret: process.env.PAYLOAD_SECRET ?? '',
    local: true,
  })

  // Seed only an empty database, so later runs never touch content edited in the admin.
  const existingUsers = await payload.find({ collection: 'users', limit: 1, depth: 0 })
  if (existingUsers.docs.length) {
    console.log('Το CMS έχει ήδη αρχικοποιηθεί· το seed παραλείπεται.')
    process.exit(0)
  }

  await payload.create({
    collection: 'users',
    data: {
      email,
      password,
      firstName: 'Διαχειριστής',
      lastName: 'Ιστοσελίδας',
    },
  })

  const homePageContent = {
    title: 'Αρχική',
    slug: 'home',
    seo: {
      metaTitle: 'Digital Spot — Ψηφιακή στρατηγική & δημιουργία',
      metaDescription: 'Στρατηγική, σχεδιασμός και τεχνολογία για brands με ξεκάθαρο ψηφιακό αποτύπωμα.',
    },
    blocks: [
      {
        blockType: 'agencyHero',
        eyebrow: 'Στρατηγική · Δημιουργία · Τεχνολογία',
        headline: 'Δίνουμε μορφή στις ιδέες που αξίζει να ξεχωρίσουν.',
        description: 'Είμαστε ένα ανεξάρτητο digital studio που σχεδιάζει ουσιαστικές εμπειρίες και δυνατές ψηφιακές παρουσίες για σύγχρονα brands.',
        primaryLabel: 'Ας ξεκινήσουμε μια συζήτηση',
        primaryUrl: '/#contact',
        secondaryLabel: 'Γνώρισε τις υπηρεσίες μας',
        secondaryUrl: '/#services',
        note: 'Μικρή ομάδα. Καθαρή σκέψη. Μεγάλη προσοχή στη λεπτομέρεια.',
      },
      {
        blockType: 'servicesSlice',
        eyebrow: 'Τι κάνουμε',
        heading: 'Όλα όσα χρειάζεσαι για να πας ένα βήμα παραπέρα.',
        description: 'Συνδυάζουμε στρατηγική, δημιουργικότητα και τεχνολογία σε μια ενιαία συνεργασία, από την πρώτη ιδέα μέχρι την καθημερινή εξέλιξη.',
        services: [
          { number: '01', title: 'Στρατηγική & ταυτότητα', description: 'Τοποθέτηση brand, naming και οπτική ταυτότητα με ξεκάθαρο χαρακτήρα και συνέπεια.' },
          { number: '02', title: 'Ιστοσελίδες & ηλεκτρονικά καταστήματα', description: 'Γρήγορες, προσεγμένες ψηφιακές εμπειρίες σχεδιασμένες γύρω από τους ανθρώπους που τις χρησιμοποιούν.' },
          { number: '03', title: 'Περιεχόμενο & καμπάνιες', description: 'Ιδέες και περιεχόμενο που κάνουν τη φωνή του brand σου αναγνωρίσιμη σε κάθε σημείο επαφής.' },
          { number: '04', title: 'Ανάπτυξη & υποστήριξη', description: 'Αξιόπιστη τεχνολογία, συνεχής βελτίωση και ένας συνεργάτης δίπλα σου σε κάθε επόμενο βήμα.' },
        ],
      },
      {
        blockType: 'statsSlice',
        intro: 'Μια συνεργασία, σχεδιασμένη γύρω από τις πραγματικές ανάγκες του brand σου.',
        items: [
          { value: '360°', label: 'Συνολική ψηφιακή εικόνα' },
          { value: '01', label: 'Σταθερός συνεργάτης' },
          { value: '∞', label: 'Περιθώριο εξέλιξης' },
        ],
      },
      {
        blockType: 'projectsSlice',
        eyebrow: 'Ενδεικτικές κατευθύνσεις',
        heading: 'Ιδέες με ουσία. Εμπειρίες με χαρακτήρα.',
        description: 'Κάθε project ξεκινά από μια διαφορετική ανάγκη. Αυτές είναι μερικές δημιουργικές κατευθύνσεις που μπορούμε να εξερευνήσουμε μαζί.',
        projects: [
          { name: 'Μια ταυτότητα με καθαρή κατεύθυνση', category: 'Στρατηγική · Branding', description: 'Από την τοποθέτηση μέχρι το σύστημα ταυτότητας, κάθε λεπτομέρεια υπηρετεί την ίδια ιδέα.' },
          { name: 'Μια ψηφιακή εμπειρία που ρέει', category: 'UX/UI · Ιστοσελίδα', description: 'Σχεδιασμός με έμφαση στη σαφήνεια, την προσβασιμότητα και την ευκολία χρήσης.' },
          { name: 'Ένα κατάστημα φτιαγμένο για ανθρώπους', category: 'Ηλεκτρονικό εμπόριο · Ανάπτυξη', description: 'Μια απλή και προσεγμένη διαδρομή από την ανακάλυψη μέχρι την ολοκλήρωση της αγοράς.' },
        ],
      },
      {
        blockType: 'processSlice',
        eyebrow: 'Πώς δουλεύουμε',
        heading: 'Καλή δουλειά, χωρίς περιττές περιπλοκές.',
        description: 'Κρατάμε τη διαδικασία διαφανή, συνεργατική και προσαρμοσμένη στο δικό σου project.',
        steps: [
          { title: 'Ακούμε', description: 'Μαθαίνουμε για την ομάδα, το κοινό και τους στόχους σου πριν προτείνουμε λύσεις.' },
          { title: 'Σχεδιάζουμε', description: 'Ορίζουμε κατεύθυνση, προτεραιότητες και μια κοινή εικόνα για το αποτέλεσμα.' },
          { title: 'Δημιουργούμε', description: 'Σχεδιάζουμε, αναπτύσσουμε και δοκιμάζουμε με συχνή επικοινωνία και feedback.' },
          { title: 'Εξελίσσουμε', description: 'Παραδίδουμε με φροντίδα και παραμένουμε δίπλα σου για ό,τι ακολουθεί.' },
        ],
      },
      {
        blockType: 'faqSlice',
        heading: 'Μερικές γρήγορες απαντήσεις.',
        questions: [
          { question: 'Με τι είδους επιχειρήσεις συνεργάζεστε;', answer: 'Συνεργαζόμαστε με ομάδες και επιχειρήσεις που θέλουν να χτίσουν ή να εξελίξουν την ψηφιακή τους παρουσία. Κάθε συνεργασία προσαρμόζεται στις ανάγκες και τους στόχους της.' },
          { question: 'Μπορώ να συνεργαστώ μαζί σας για ένα μόνο μέρος του project;', answer: 'Βεβαίως. Μπορούμε να αναλάβουμε ένα συγκεκριμένο κομμάτι, όπως τον σχεδιασμό ιστοσελίδας, ή να συμμετέχουμε από τη στρατηγική μέχρι την υλοποίηση.' },
          { question: 'Πώς ξεκινάμε;', answer: 'Στείλε μας λίγα λόγια για την ιδέα ή την πρόκλησή σου. Θα κανονίσουμε μια πρώτη συζήτηση για να δούμε μαζί τα επόμενα βήματα.' },
        ],
      },
      {
        blockType: 'callToActionSlice',
        eyebrow: 'Έχεις μια ιδέα;',
        heading: 'Ας τη μετατρέψουμε σε κάτι πραγματικό.',
        description: 'Πες μας τι έχεις στο μυαλό σου. Θα χαρούμε να ακούσουμε και να βρούμε μαζί την καλύτερη κατεύθυνση.',
        buttonLabel: 'Επικοινώνησε μαζί μας',
        buttonUrl: '/#contact',
      },
      {
        blockType: 'contactSlice',
        eyebrow: 'Επικοινωνία',
        heading: 'Η επόμενη καλή ιδέα μπορεί να ξεκινήσει εδώ.',
        description: 'Στείλε μας ένα μήνυμα με λίγα λόγια για το project σου και θα επανέλθουμε για να κανονίσουμε μια πρώτη γνωριμία.',
        email: 'hello@digitalspot.gr',
        phone: '+30 210 000 0000',
        location: 'Αθήνα, Ελλάδα · Συνεργασίες παντού',
      },
    ],
  }

  await payload.create({
    collection: 'pages',
    data: { ...homePageContent, _status: 'published' },
  })

  const mainNavigation = await payload.findGlobal({ slug: 'main-navigation', depth: 0 }) as MainNavigationSettings
  const navigationItems = mainNavigation.mainNavigation || []

  if (!navigationItems.length) {
    await payload.updateGlobal({
      slug: 'main-navigation',
      data: {
        mainNavigation: [
          {
            label: 'Υπηρεσίες',
            url: '/#services',
            children: [
              { label: 'Εφαρμογές για κινητά', url: '/#services' },
              { label: 'Ιστοσελίδες', url: '/#services' },
              { label: 'Ηλεκτρονικά καταστήματα', url: '/#services' },
              { label: 'Εξατομικευμένες πλατφόρμες', url: '/#services' },
            ],
          },
          { label: 'Έργα', url: '/#work' },
          { label: 'Η διαδικασία', url: '/#process' },
        ],
        headerCta: {
          label: mainNavigation.headerCta?.label || 'Ας μιλήσουμε',
          url: mainNavigation.headerCta?.url || '/#contact',
        },
      },
    })
  }

  const updatedNavigation = await payload.findGlobal({ slug: 'main-navigation', depth: 0 }) as MainNavigationSettings
  if (!updatedNavigation.mainNavigation?.some(item => item.url === '/paradeigmata-slices')) {
    await payload.updateGlobal({
      slug: 'main-navigation',
      data: {
        mainNavigation: [
          ...(updatedNavigation.mainNavigation || []),
          { label: 'Παραδείγματα', url: '/paradeigmata-slices' },
        ],
      },
    })
  }

  const footerSettings = await payload.findGlobal({ slug: 'footer-settings', depth: 0 }) as FooterSettings
  if (!footerSettings.footerColumns?.length) {
    await payload.updateGlobal({
      slug: 'footer-settings',
      data: {
        footerDescription: footerSettings.footerDescription
          || 'Στρατηγική, σχεδιασμός και τεχνολογία για brands που θέλουν να ξεχωρίζουν.',
        footerColumns: [
          {
            title: 'Περιήγηση',
            links: [
              { label: 'Υπηρεσίες', url: '/#services' },
              { label: 'Έργα', url: '/#work' },
              { label: 'Η διαδικασία', url: '/#process' },
            ],
          },
          {
            title: 'Επικοινωνία',
            links: [
              { label: 'Στείλε μας email', url: 'mailto:hello@digitalspot.gr' },
              { label: 'Πες μας την ιδέα σου', url: '/#contact' },
            ],
          },
        ],
        footerSocialLinks: footerSettings.footerSocialLinks || [],
        footerContact: {
          email: footerSettings.footerContact?.email || 'hello@digitalspot.gr',
          phone: footerSettings.footerContact?.phone || '+30 210 000 0000',
          location: footerSettings.footerContact?.location || 'Αθήνα, Ελλάδα · Συνεργασίες παντού',
        },
        copyright: footerSettings.copyright || 'Digital Spot. Με φροντίδα, στην Ελλάδα.',
      },
    })
  }

  const sliceExamples = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'paradeigmata-slices' } },
    limit: 1,
  })

  if (!sliceExamples.docs.length) {
    await payload.create({
      collection: 'pages',
      data: {
        _status: 'published',
        title: 'Παραδείγματα ενοτήτων',
        slug: 'paradeigmata-slices',
        seo: {
          metaTitle: 'Παραδείγματα ενοτήτων | Digital Spot',
          metaDescription: 'Δες παραδείγματα από τις επαναχρησιμοποιήσιμες ενότητες του Digital Spot.',
        },
        blocks: [
          {
            blockType: 'agencyHero',
            eyebrow: 'Εργαστήριο περιεχομένου',
            headline: 'Κάθε σελίδα, ένας συνδυασμός από τις σωστές ενότητες.',
            description: 'Αυτή η σελίδα συγκεντρώνει παραδείγματα όλων των διαθέσιμων slices. Πρόσθεσε, αφαίρεσε ή αναδιάταξέ τα από το Payload.',
            primaryLabel: 'Μίλησέ μας',
            primaryUrl: '/#contact',
            secondaryLabel: 'Δες έργα',
            secondaryUrl: '/#work',
            animation: 'fade-up',
          },
          {
            blockType: 'servicesSlice',
            eyebrow: 'Υπηρεσίες',
            heading: 'Ολοκληρωμένες ψηφιακές λύσεις.',
            description: 'Οργάνωσε υπηρεσίες και δυνατότητες σε ευανάγνωστες κάρτες.',
            services: [
              { title: 'Ιστοσελίδες', description: 'Σχεδιασμός και ανάπτυξη ιστοσελίδων με εύκολη διαχείριση περιεχομένου.' },
              { title: 'Εφαρμογές', description: 'Εφαρμογές προσαρμοσμένες στις καθημερινές ανάγκες της ομάδας σου.' },
              { title: 'Στρατηγική', description: 'Καθαρή κατεύθυνση και ταυτότητα για κάθε ψηφιακό προϊόν.' },
            ],
          },
          {
            blockType: 'statsSlice',
            intro: 'Μικρά ή μεγάλα, μετρήσιμα βήματα προς τα εμπρός.',
            items: [
              { value: '01', label: 'Σταθερός συνεργάτης' },
              { value: '360°', label: 'Ολοκληρωμένη προσέγγιση' },
              { value: '∞', label: 'Δυνατότητα εξέλιξης' },
            ],
          },
          {
            blockType: 'featuresSlice',
            eyebrow: 'Τι περιλαμβάνει',
            heading: 'Σχεδιασμένο γύρω από τη δική σου ομάδα.',
            features: [
              { title: 'Σχεδιασμός για όλους', description: 'Προσεγμένη εμπειρία σε κινητό, tablet και υπολογιστή.', icon: '01' },
              { title: 'Εύκολη διαχείριση', description: 'Άλλαξε κείμενα, εικόνες και ενότητες χωρίς τεχνικές γνώσεις.', icon: '02' },
              { title: 'Έτοιμο για εξέλιξη', description: 'Μια σταθερή βάση που μεγαλώνει μαζί με τις ανάγκες σου.', icon: '03' },
            ],
            animation: 'fade-up',
          },
          projectStackExample,
          {
            blockType: 'imageTextSlice',
            eyebrow: 'Από την ιδέα στην πράξη',
            heading: 'Μια συνεργασία με καθαρά επόμενα βήματα.',
            description: 'Ξεκινάμε κατανοώντας τους στόχους σου και φτιάχνουμε μια ψηφιακή εμπειρία που τους υπηρετεί.',
            imagePosition: 'right',
            buttonLabel: 'Μάθε πώς δουλεύουμε',
            buttonUrl: '/#process',
          },
          {
            blockType: 'logoCloudSlice',
            heading: 'Συνεργαζόμαστε με ομάδες που κοιτούν μπροστά',
            logos: [
              { name: 'North Studio' },
              { name: 'Forma' },
              { name: 'Aster' },
              { name: 'Mero' },
              { name: 'Onda' },
            ],
          },
          {
            blockType: 'projectsSlice',
            eyebrow: 'Επιλεγμένα έργα',
            heading: 'Σκέψη, σχεδιασμός και υλοποίηση.',
            projects: [
              { name: 'Μια νέα ψηφιακή παρουσία', category: 'Ιστοσελίδα · UX/UI', description: 'Ένα καθαρό, γρήγορο σημείο εκκίνησης για την επόμενη φάση μιας επιχείρησης.', url: '/project-paradeigma' },
              { name: 'Εργαλεία που απλοποιούν την εργασία', category: 'Ψηφιακό προϊόν', description: 'Λειτουργίες και περιεχόμενο σχεδιασμένα γύρω από τις πραγματικές ανάγκες των ανθρώπων.' },
            ],
          },
          {
            blockType: 'processSlice',
            eyebrow: 'Η προσέγγισή μας',
            heading: 'Από την πρώτη συζήτηση μέχρι την παράδοση.',
            steps: [
              { title: 'Ακούμε', description: 'Κατανοούμε την επιχείρηση, το κοινό και τους στόχους σου.' },
              { title: 'Σχεδιάζουμε', description: 'Ορίζουμε την εμπειρία, την αισθητική και τις προτεραιότητες.' },
              { title: 'Υλοποιούμε', description: 'Χτίζουμε και δοκιμάζουμε με συχνή επικοινωνία.' },
              { title: 'Εξελίσσουμε', description: 'Παραμένουμε δίπλα σου και μετά την παράδοση.' },
            ],
          },
          {
            blockType: 'testimonialSlice',
            eyebrow: 'Μια συνεργασία που αφήνει αποτύπωμα',
            quote: 'Η διαδικασία ήταν ξεκάθαρη από την πρώτη μέρα και το αποτέλεσμα ανταποκρίθηκε ακριβώς στις ανάγκες μας.',
            person: 'Μαρία Παπαδοπούλου',
            role: 'Ιδρύτρια',
            company: 'Παράδειγμα Studio',
          },
          {
            blockType: 'faqSlice',
            heading: 'Συχνές ερωτήσεις.',
            questions: [
              { question: 'Πόσο διαρκεί ένα project;', answer: 'Ο χρόνος εξαρτάται από το εύρος και τις λειτουργίες. Μετά την πρώτη συζήτηση ορίζουμε συγκεκριμένο πλάνο.' },
              { question: 'Μπορώ να αλλάζω το περιεχόμενο;', answer: 'Ναι. Η διαχείριση γίνεται από το Payload CMS, χωρίς να χρειάζονται τεχνικές γνώσεις.' },
            ],
          },
          {
            blockType: 'projectDetailsSlice',
            eyebrow: 'Μελέτη έργου',
            heading: 'Μια εμπειρία που ξεκινά από τους ανθρώπους.',
            description: 'Παράδειγμα παρουσίασης εσωτερικής σελίδας portfolio με περιγραφή, στοιχεία έργου, πρόκληση, λύση και αποτελέσματα.',
            client: 'Παράδειγμα Studio',
            year: '2026',
            services: 'Στρατηγική · UX/UI · Ανάπτυξη',
            challenge: 'Η πληροφορία ήταν διάσπαρτη και οι επισκέπτες δυσκολεύονταν να καταλάβουν τι να κάνουν στη συνέχεια.',
            solution: 'Σχεδιάσαμε μια καθαρή διαδρομή που συνδυάζει περιεχόμενο, σαφή πλοήγηση και ξεκάθαρες ενέργειες.',
            results: [
              { value: '01', label: 'Ενιαία ψηφιακή εμπειρία' },
              { value: '100%', label: 'Προσαρμοσμένο περιεχόμενο' },
            ],
            buttonLabel: 'Συζήτησε το δικό σου έργο',
            buttonUrl: '/#contact',
          },
          {
            blockType: 'callToActionSlice',
            eyebrow: 'Έχεις μια ιδέα;',
            heading: 'Ας τη μετατρέψουμε σε κάτι πραγματικό.',
            description: 'Πες μας τι έχεις στο μυαλό σου και θα βρούμε μαζί την καλύτερη κατεύθυνση.',
            buttonLabel: 'Επικοινώνησε μαζί μας',
            buttonUrl: '/#contact',
          },
          {
            blockType: 'contactSlice',
            eyebrow: 'Επικοινωνία',
            heading: 'Ας ξεκινήσουμε μια συζήτηση.',
            description: 'Στείλε μας λίγα λόγια για το project σου και θα επανέλθουμε σύντομα.',
            email: 'hello@digitalspot.gr',
            phone: '+30 210 000 0000',
            location: 'Αθήνα, Ελλάδα · Συνεργασίες παντού',
            showMap: false,
          },
        ],
      },
    })
  }

  const projectPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'project-paradeigma' } },
    limit: 1,
  })

  if (!projectPage.docs.length) {
    await payload.create({
      collection: 'pages',
      data: {
        _status: 'published',
        title: 'Μελέτη έργου: Ψηφιακή παρουσία',
        slug: 'project-paradeigma',
        seo: {
          metaTitle: 'Μελέτη έργου | Digital Spot',
          metaDescription: 'Ένα παράδειγμα εσωτερικής σελίδας portfolio του Digital Spot.',
        },
        blocks: [
          {
            blockType: 'projectDetailsSlice',
            eyebrow: 'Ιστοσελίδα · UX/UI · Ανάπτυξη',
            heading: 'Μια ψηφιακή εμπειρία με ξεκάθαρη κατεύθυνση.',
            description: 'Ένα δείγμα εσωτερικής παρουσίασης έργου, από την αρχική πρόκληση έως την τελική εμπειρία.',
            client: 'North Studio',
            year: '2026',
            services: 'Στρατηγική · Σχεδιασμός · Ανάπτυξη',
            challenge: 'Η επιχείρηση χρειαζόταν έναν σύγχρονο τρόπο να παρουσιάζει τις υπηρεσίες της και να μετατρέπει το ενδιαφέρον σε επικοινωνία.',
            solution: 'Δημιουργήσαμε μια ευέλικτη ιστοσελίδα με έμφαση στην αναγνωσιμότητα, την ταχύτητα και τη διαχείριση περιεχομένου από την ομάδα.',
            results: [
              { value: '01', label: 'Ενιαία ψηφιακή ταυτότητα' },
              { value: '100%', label: 'Προσαρμοσμένο CMS' },
              { value: '24/7', label: 'Διαθεσιμότητα περιεχομένου' },
            ],
            buttonLabel: 'Θέλω κάτι αντίστοιχο',
            buttonUrl: '/#contact',
            animation: 'fade-up',
          },
          {
            blockType: 'testimonialSlice',
            quote: 'Μια συνεργασία με συνέπεια, δημιουργική σκέψη και προσοχή σε κάθε λεπτομέρεια.',
            person: 'Ελένη Νικολάου',
            role: 'Υπεύθυνη επικοινωνίας',
            company: 'North Studio',
          },
          {
            blockType: 'callToActionSlice',
            heading: 'Έχεις ένα project στο μυαλό σου;',
            description: 'Ας συζητήσουμε πώς μπορούμε να το κάνουμε πραγματικότητα.',
            buttonLabel: 'Επικοινώνησε μαζί μας',
            buttonUrl: '/#contact',
          },
        ],
      },
    })
  }

  console.log('Ο αρχικός χρήστης και η ελληνική αρχική σελίδα είναι έτοιμα.')
  process.exit(0)
}

seed().catch((error: unknown) => {
  console.error('Η αρχικοποίηση του CMS απέτυχε.', error)
  process.exit(1)
})
