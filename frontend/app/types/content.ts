export interface AgencyService {
  id?: string
  number?: string | null
  title?: string | null
  description?: string | null
  linkLabel?: string | null
  linkUrl?: string | null
}

export interface AgencyStat {
  id?: string
  value?: string | null
  label?: string | null
}

export interface AgencyImage {
  url?: string
  alt?: string
  sizes?: Record<string, { url?: string } | undefined>
}

export interface AgencyProject {
  id?: string
  name?: string | null
  category?: string | null
  description?: string | null
  image?: AgencyImage | string | null
  url?: string | null
}

export interface AgencyQuestion {
  id?: string
  question?: string | null
  answer?: string | null
}

export interface AgencyStep {
  id?: string
  title?: string | null
  description?: string | null
}

export interface AgencyFeature {
  id?: string
  title?: string | null
  description?: string | null
  icon?: string | null
}

export interface AgencyLayerItem {
  id?: string
  label?: string | null
}

export interface AgencyLayer {
  id?: string
  title?: string | null
  items?: AgencyLayerItem[] | null
}

export interface AgencyLogo {
  id?: string
  name?: string | null
  image?: AgencyImage | string | null
}

export interface AgencyProjectResult {
  id?: string
  value?: string | null
  label?: string | null
}

export interface AgencyProjectGalleryItem {
  id?: string
  image?: AgencyImage | string | null
  caption?: string | null
}

export interface AgencyBlock {
  id?: string
  blockType: string
  eyebrow?: string | null
  headline?: string | null
  heading?: string | null
  description?: string | null
  primaryLabel?: string | null
  primaryUrl?: string | null
  secondaryLabel?: string | null
  secondaryUrl?: string | null
  note?: string | null
  intro?: string | null
  services?: AgencyService[] | null
  items?: AgencyStat[] | null
  projects?: AgencyProject[] | null
  steps?: AgencyStep[] | null
  questions?: AgencyQuestion[] | null
  buttonLabel?: string | null
  buttonUrl?: string | null
  email?: string | null
  phone?: string | null
  location?: string | null
  mapUrl?: string | null
  showMap?: boolean | null
  animation?: string | null
  image?: AgencyImage | string | null
  imageAlt?: string | null
  imagePosition?: 'left' | 'right' | null
  features?: AgencyFeature[] | null
  layers?: AgencyLayer[] | null
  quote?: string | null
  person?: string | null
  role?: string | null
  company?: string | null
  logos?: AgencyLogo[] | null
  client?: string | null
  year?: string | null
  services?: string | null
  challenge?: string | null
  solution?: string | null
  results?: AgencyProjectResult[] | null
  gallery?: AgencyProjectGalleryItem[] | null
}

export interface AgencyPage {
  id: string | number
  title: string
  slug: string
  blocks?: AgencyBlock[]
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
  } | null
}
