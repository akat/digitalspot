import type { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: { singular: 'Χρήστης', plural: 'Χρήστες' },
  admin: { useAsTitle: 'email' },
  fields: [
    { name: 'firstName', label: 'Όνομα', type: 'text' },
    { name: 'lastName', label: 'Επώνυμο', type: 'text' },
  ],
}

export default Users
