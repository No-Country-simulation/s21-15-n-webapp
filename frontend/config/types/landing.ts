export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface HeroTitle {
  section1: string;
  section2: string;
  section3: string;
  section4: string;
  section5: string;
  section6: string;
  section7: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  subLabel: string;
}

export interface HowItWorkItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imagePosition: "left" | "right";
}

export interface TableTitleItem {
  id: string;
  title: string;
  align: string;
}

export interface RankItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  level: number;
  experience: number;
  active: boolean;
}

export interface ConquestItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export interface FAQItem {
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

export interface LandingPageData {
  navigation: {
    items: NavItem[];
  };
  hero: {
    title: HeroTitle;
    description: string;
    ctaText: string;
  };
  stats: {
    title: string;
    items: StatItem[];
  };
  howItWorks: {
    title: string;
    items: HowItWorkItem[];
  };
  benefits: {
    title: string;
    items: BenefitItem[];
  }
  ranking: {
    title: string;
    tableTitle: TableTitleItem[];
    description: string;
    items: RankItem[]
  };
  stellarConquests: {
    title: string;
    description: string;
    items: ConquestItem[]
  };
  testimonials: {
    title: string;
    description: string;
    items: TestimonialItem[]
  };
  faqs: {
    title: string;
    description: string;
    items: FAQItem[]
  };
  footer: {
    description: string;
    social: SocialLink[];
    sections: FooterSection[];
  };
}
