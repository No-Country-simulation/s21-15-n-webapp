export interface NavItem {
  label: string
  href: string
}

export interface HeroSection {
  title: string
  description: string
  ctaText: string
}

export interface Feature {
  title: string
  description: string
  icon: string
}

export interface Benefit {
  title: string
  description: string
  image: string
  imagePosition: "left" | "right"
}

export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  quote: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface SocialLink {
  platform: string
  href: string
  icon: string
}

export interface LandingPageData {
  navigation: {
    items: NavItem[]
  }
  hero: HeroSection
  features: Feature[]
  benefits: Benefit[]
  testimonials: Testimonial[]
  faqs: FAQ[]
  footer: {
    social: SocialLink[]
    sections: FooterSection[]
  }
}

