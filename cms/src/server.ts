import express from 'express'
import dotenv from 'dotenv'
import { createRequire } from 'node:module'
import type { Payload } from 'payload'

import payloadConfig from '../payload.config'

dotenv.config()

const nodeRequire = createRequire(__filename)
const payload = nodeRequire('payload') as Payload
const app = express()
const port = Number(process.env.PORT ?? 3055)

app.get('/healthz', (_request, response) => {
  response.json({ ok: true })
})

const start = async () => {
  await payload.init({
    config: payloadConfig,
    express: app,
    secret: process.env.PAYLOAD_SECRET ?? 'development-secret',
  })

  app.listen(port, '0.0.0.0', () => {
    payload.logger.info(`Payload running on port ${port}`)
  })
}

start().catch((error: unknown) => {
  console.error('Failed to start Payload CMS', error)
  process.exit(1)
})
