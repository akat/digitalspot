<script setup lang="ts">
const interests = [
  { value: 'website', label: 'Ιστοσελίδα' },
  { value: 'eshop', label: 'Ηλεκτρονικό κατάστημα' },
  { value: 'mobile-app', label: 'Εφαρμογή κινητού' },
  { value: 'custom-platform', label: 'Προσαρμοσμένη πλατφόρμα' },
  { value: 'ai-automation', label: 'AI και αυτοματισμοί' },
  { value: 'brand-design', label: 'Σχεδιασμός και ταυτότητα' },
  { value: 'seo-growth', label: 'SEO και ανάπτυξη' },
  { value: 'other', label: 'Κάτι άλλο' },
]

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  interest: '',
  message: '',
  consent: false,
})

const pending = ref(false)
const errorMessage = ref('')
const submitted = ref(false)

const submitLead = async () => {
  if (pending.value) return

  pending.value = true
  errorMessage.value = ''

  try {
    await $fetch('/api/leads', {
      method: 'POST',
      body: { ...form },
    })
    submitted.value = true
  } catch (error) {
    errorMessage.value = error && typeof error === 'object' && 'statusMessage' in error
      ? String(error.statusMessage)
      : 'Δεν ήταν δυνατή η αποστολή του αιτήματος. Δοκίμασε ξανά.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="lead-form">
    <template v-if="submitted">
      <div class="lead-form-success" role="status">
        <h3>Ευχαριστούμε για το μήνυμά σου.</h3>
        <p>Το αίτημά σου καταχωρίστηκε και θα επικοινωνήσουμε μαζί σου σύντομα.</p>
      </div>
    </template>
    <form v-else class="grid gap-5 sm:grid-cols-2" @submit.prevent="submitLead">
      <label class="lead-form-field">
        <span>Ονοματεπώνυμο *</span>
        <input v-model="form.name" name="name" autocomplete="name" required minlength="2" maxlength="160">
      </label>
      <label class="lead-form-field">
        <span>Email *</span>
        <input v-model="form.email" name="email" type="email" autocomplete="email" required maxlength="254">
      </label>
      <label class="lead-form-field">
        <span>Τηλέφωνο</span>
        <input v-model="form.phone" name="phone" type="tel" autocomplete="tel" maxlength="40">
      </label>
      <label class="lead-form-field">
        <span>Επιχείρηση</span>
        <input v-model="form.company" name="company" autocomplete="organization" maxlength="160">
      </label>
      <label class="lead-form-field sm:col-span-2">
        <span>Τι σε ενδιαφέρει; *</span>
        <select v-model="form.interest" name="interest" required>
          <option value="" disabled>Επίλεξε υπηρεσία ή προϊόν</option>
          <option v-for="interest in interests" :key="interest.value" :value="interest.value">
            {{ interest.label }}
          </option>
        </select>
      </label>
      <label class="lead-form-field sm:col-span-2">
        <span>Πες μας λίγα λόγια για το project σου *</span>
        <textarea v-model="form.message" name="message" rows="5" required minlength="10" maxlength="10000" />
      </label>
      <label class="lead-form-consent sm:col-span-2">
        <input v-model="form.consent" type="checkbox" required>
        <span>Συμφωνώ να επικοινωνήσετε μαζί μου σχετικά με το αίτημά μου.</span>
      </label>
      <p v-if="errorMessage" class="lead-form-error sm:col-span-2" role="alert">{{ errorMessage }}</p>
      <div class="sm:col-span-2">
        <button class="primary-button" type="submit" :disabled="pending">
          {{ pending ? 'Αποστολή…' : 'Στείλε το αίτημα' }}
          <span v-if="!pending" aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  </div>
</template>
