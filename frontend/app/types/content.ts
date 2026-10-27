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

export interface AgencyProject {
  id?: string
  name?: string | null
  category?: string | null
  description?: string | null
  image?: {
    url?: string
    alt?: string
    sizes?: Record<string, { url?: string } | undefined>
  } | string | null
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
