export interface SiteLink {
  id?: string
  label: string
  url: string
  openInNewTab?: boolean | null
  children?: SiteLink[] | null
}

export interface FooterColumn {
  id?: string
  title: string
  links?: SiteLink[] | null
}

export interface SiteSettings {
  mainNavigation?: SiteLink[] | null
  headerCta?: {
    label?: string | null
    url?: string | null
  } | null
  footerDescription?: string | null
  footerColumns?: FooterColumn[] | null
  footerSocialLinks?: SiteLink[] | null
  footerContact?: {
    email?: string | null
    phone?: string | null
    location?: string | null
  } | null
  copyright?: string | null
}
