import type { Payload } from 'payload'

// Pages created before drafts were enabled have no entry in the versions collection,
// and the admin list (which queries drafts) does not show them. Give each such page
// a published version from its current content. Runs on every start; no-op once done.
export const backfillPageVersions = async (payload: Payload) => {
  const pages = await payload.find({
    collection: 'pages',
    depth: 0,
    pagination: false,
    overrideAccess: true,
  })

  for (const page of pages.docs) {
    const versions = await payload.findVersions({
      collection: 'pages',
      where: { parent: { equals: page.id } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    if (versions.totalDocs > 0) continue

    await payload.update({
      collection: 'pages',
      id: page.id,
      data: { _status: 'published' },
      overrideAccess: true,
    })
    payload.logger.info(`Δημιουργήθηκε δημοσιευμένη έκδοση για τη σελίδα "${String(page.slug)}".`)
  }
}
