import dotenv from 'dotenv'
import type { Payload } from 'payload'

import payloadConfig from '../payload.config'

dotenv.config()

const payload = require('payload') as Payload

const seed = async () => {
  await payload.init({
    config: payloadConfig,
    secret: process.env.PAYLOAD_SECRET ?? 'development-secret',
    local: true,
  })

  const email = process.env.PAYLOAD_ADMIN_EMAIL ?? 'admin@stigma.studio'
  const existingUser = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (!existingUser.docs.length) {
    await payload.create({
      collection: 'users',
      data: {
        email,
        password: process.env.PAYLOAD_ADMIN_PASSWORD ?? 'change-this-password',
        firstName: 'Διαχειριστής',
        lastName: 'Ιστοσελίδας',
      },
    })
  }

  const existingPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 0,
  })

  if (!existingPage.docs.length) {
    await payload.create({
      collection: 'pages',
      data: {
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
            email: 'hello@stigma.studio',
            phone: '+30 210 000 0000',
            location: 'Αθήνα, Ελλάδα · Συνεργασίες παντού',
          },
        ],
      },
    })
  }

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 0,
  })

  const hasNavigation = Array.isArray(siteSettings.mainNavigation) && siteSettings.mainNavigation.length > 0
  const hasFooterColumns = Array.isArray(siteSettings.footerColumns) && siteSettings.footerColumns.length > 0
  const navigationItems = Array.isArray(siteSettings.mainNavigation) ? siteSettings.mainNavigation : []
  const servicesMenuItem = navigationItems.find(
    (item: { label?: string; children?: unknown }) => item.label?.trim().toLocaleLowerCase('el') === 'υπηρεσίες',
  )

  if (servicesMenuItem && (!Array.isArray(servicesMenuItem.children) || !servicesMenuItem.children.length)) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        mainNavigation: navigationItems.map(        (item: { label?: string; children?: unknown; [key: string]: unknown }) =>
          item === servicesMenuItem
            ? {
                ...item,
                children: [
                  { label: 'Εφαρμογές για κινητά', url: '/#services' },
                  { label: 'Ιστοσελίδες', url: '/#services' },
                  { label: 'Ηλεκτρονικά καταστήματα', url: '/#services' },
                  { label: 'Εξατομικευμένες πλατφόρμες', url: '/#services' },
                ],
              }
            : item,
        ),
      },
    })
  }

  if (siteSettings.copyright === 'Στίγμα Studio. Με φροντίδα, στην Ελλάδα.') {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: { copyright: 'Digital Spot. Με φροντίδα, στην Ελλάδα.' },
    })
  }

  if (!hasNavigation && !hasFooterColumns) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        mainNavigation: [
          { label: 'Υπηρεσίες', url: '/#services' },
          { label: 'Έργα', url: '/#work' },
          { label: 'Η διαδικασία', url: '/#process' },
        ],
        headerCta: { label: 'Ας μιλήσουμε', url: '/#contact' },
        footerDescription: 'Στρατηγική, σχεδιασμός και τεχνολογία για brands που θέλουν να ξεχωρίζουν.',
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
              { label: 'Στείλε μας email', url: 'mailto:hello@stigma.studio' },
              { label: 'Πες μας την ιδέα σου', url: '/#contact' },
            ],
          },
        ],
        footerSocialLinks: [],
        footerContact: {
          email: 'hello@stigma.studio',
          phone: '+30 210 000 0000',
          location: 'Αθήνα, Ελλάδα · Συνεργασίες παντού',
        },
        copyright: 'Digital Spot. Με φροντίδα, στην Ελλάδα.',
      },
    })
  }

  const existingSeo = existingPage.docs[0]?.seo
  const hasOldSeoTitle = existingSeo
    && typeof existingSeo === 'object'
    && 'metaTitle' in existingSeo
    && existingSeo.metaTitle === 'Στίγμα Studio — Ψηφιακή στρατηγική & δημιουργία'

  if (hasOldSeoTitle && existingPage.docs[0]) {
    await payload.update({
      collection: 'pages',
      id: existingPage.docs[0].id,
      data: {
        seo: {
          metaTitle: 'Digital Spot — Ψηφιακή στρατηγική & δημιουργία',
        },
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
