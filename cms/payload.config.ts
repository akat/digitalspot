import path from 'path'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'

import Media from './src/collections/Media'
import Pages from './src/collections/Pages'
import Users from './src/collections/Users'
import SiteSettings from './src/globals/SiteSettings'

const s3StorageAdapter = s3Adapter({
  bucket: process.env.S3_BUCKET ?? 'agency-media',
  config: {
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: true,
    region: process.env.S3_REGION ?? 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
    },
  },
})

const mediaOptions: Parameters<typeof cloudStorage>[0]['collections'][string] = {
  adapter: s3StorageAdapter,
}

if (process.env.S3_PUBLIC_BASE_URL) {
  mediaOptions.generateFileURL = ({ filename }) =>
    `${process.env.S3_PUBLIC_BASE_URL!.replace(/\/$/, '')}/${filename}`
}

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  editor: lexicalEditor({}),
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  collections: [Users, Pages, Media],
  globals: [SiteSettings],
  plugins: [
    cloudStorage({
      collections: {
        media: mediaOptions,
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? '',
  }),
})
