import type { LandingPageData } from "@/lib/types/landing"

export const LANDING_CONFIG: LandingPageData = {
  navigation: {
    items: [
      { label: "Inicio", href: "#inicio" },
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "Beneficios", href: "#beneficios" },
      { label: "Ranking", href: "#ranking" },
      { label: "Conquistas", href: "#conquistas" },
      { label: "Testimonios", href: "#testimonios" },
      { label: "Preguntas y Respuestas", href: "#faq" },
    ],
  },
  stats: {
    items: [
      { value: "100+", label: "Tecnologías", sublabel: "enseñadas" },
      { value: "50+", label: "Empresas", sublabel: "aliadas" },
      { value: "1k+", label: "Exploradores", sublabel: "activos" },
      { value: "200+", label: "Mentorías", sublabel: "completadas" },
    ],
  },
  hero: {
    title: "Gana experiencia, valida tus habilidades y desbloquea tu futuro",
    description:
      "Regístrate como cadete en StartPerks y comienza tu aventura intergaláctica. Acumula puntos, desbloquea mentorías y conquista cada desafío para elevar tu carrera en tecnología",
    ctaText: "Únete y empieza a ganar puntos",
  },
  features: [
    {
      title: "Gana puntos de experiencia",
      description: "Completa tareas, colabora con otros y recibe evaluaciones para acumular puntos",
      icon: "Rocket",
    },
    {
      title: "Participa en desafíos",
      description: "Desafía tus límites completando misiones y acumulando puntos en cada travesía",
      icon: "Target",
    },
    {
      title: "Avanza en tu carrera",
      description: "Accede a mentorías exclusivas y conviértete en un explorador galáctico en el universo tech",
      icon: "Award",
    },
  ],
  benefits: [
    {
      title: "Aprende habilidades demandadas",
      description:
        "Accede a cursos y recursos diseñados para desarrollar las habilidades que las empresas están buscando.",
      image: "/placeholder.svg?height=400&width=600",
      imagePosition: "right",
    },
    {
      title: "Conecta con mentores expertos",
      description: "Recibe guía y apoyo de profesionales experimentados que te ayudarán a alcanzar tus metas.",
      image: "/placeholder.svg?height=400&width=600",
      imagePosition: "left",
    },
  ],
  testimonials: [
    {
      id: "1",
      name: "Elena Rodriguez",
      role: "Desarrolladora Frontend",
      avatar: "/placeholder.svg?height=80&width=80",
      quote:
        "StartPerks me ha dado las herramientas y el apoyo que necesitaba para conseguir mi primer trabajo como desarrolladora.",
    },
    {
      id: "2",
      name: "Javier Pérez",
      role: "Diseñador UX/UI",
      avatar: "/placeholder.svg?height=80&width=80",
      quote:
        "Las mentorías de StartPerks me han ayudado a mejorar mis habilidades de diseño y a crear un portafolio impresionante.",
    },
    {
      id: "3",
      name: "Ana Martínez",
      role: "Data Scientist",
      avatar: "/placeholder.svg?height=80&width=80",
      quote: "La comunidad de StartPerks es increíble. He aprendido tanto de mis compañeros como de los mentores.",
    },
    {
      id: "4",
      name: "Carlos González",
      role: "Backend Developer",
      avatar: "/placeholder.svg?height=80&width=80",
      quote:
        "Los desafíos técnicos y proyectos prácticos me ayudaron a consolidar mis conocimientos de manera efectiva.",
    },
    {
      id: "5",
      name: "María Sánchez",
      role: "Product Manager",
      avatar: "/placeholder.svg?height=80&width=80",
      quote: "StartPerks me dio la confianza y las habilidades necesarias para liderar equipos técnicos exitosamente.",
    },
    {
      id: "6",
      name: "Luis Torres",
      role: "DevOps Engineer",
      avatar: "/placeholder.svg?height=80&width=80",
      quote: "La plataforma me permitió aprender a mi propio ritmo mientras construía proyectos del mundo real.",
    },
  ],
  faqs: [
    {
      question: "¿Qué es StartPerks?",
      answer:
        "StartPerks es una plataforma de desarrollo profesional para el universo tech. Ofrecemos cursos, mentorías y herramientas para ayudarte a impulsar tu carrera.",
    },
    {
      question: "¿Cómo puedo unirme?",
      answer: "Simplemente regístrate en nuestra página web y comienza tu aventura intergaláctica.",
    },
    {
      question: "¿Qué tipo de recursos ofrece StartPerks?",
      answer:
        "Ofrecemos cursos, mentorías, insignias, certificaciones y una comunidad de profesionales apasionados por la tecnología.",
    },
    {
      question: "¿Cómo funciona el sistema de puntos?",
      answer:
        "Ganarás puntos al completar cursos, participar en desafíos, recibir evaluaciones positivas y colaborar con otros miembros de la comunidad.",
    },
    {
      question: "¿Puedo acceder desde cualquier dispositivo?",
      answer:
        "Sí, nuestra plataforma es completamente responsive y puedes acceder desde cualquier dispositivo con conexión a internet.",
    },
  ],
  footer: {
    social: [
      { platform: "GitHub", href: "https://github.com/startperks", icon: "Github" },
      { platform: "Twitter", href: "https://twitter.com/startperks", icon: "Twitter" },
      { platform: "LinkedIn", href: "https://linkedin.com/company/startperks", icon: "Linkedin" },
    ],
    sections: [
      {
        title: "Producto",
        links: [
          { label: "Características", href: "#" },
          { label: "Precios", href: "#" },
          { label: "Recursos", href: "#" },
        ],
      },
      {
        title: "Compañía",
        links: [
          { label: "Acerca de", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Carreras", href: "#" },
        ],
      },
    ],
  },
}

