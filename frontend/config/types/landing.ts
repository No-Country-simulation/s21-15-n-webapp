export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface HeroSection {
  title: string;
  description: string;
  ctaText: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  image: string;
  imagePosition: "left" | "right";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  id: string;
  platform: string;
  href: string;
  icon: string;
}

export interface StatsItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
}

export interface LandingPageData {
  navigation: {
    items: NavItem[];
  };
  stats: {
    items: StatsItem[];
  };
  hero: HeroSection;
  features: Feature[];
  benefits: Benefit[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  footer: {
    social: SocialLink[];
    sections: FooterSection[];
  };
}
