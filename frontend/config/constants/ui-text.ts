/**
 * Textos de navegación
 */
export const NAVIGATION_TEXT = {
  startPerks: "StartPerks",
  inicio: "Inicio",
  ranking: "Ranking",
  lorem: "Lorem",
  perfil: "Perfil",
  configuracion: "Configuración",
  cerrarSesion: "Cerrar sesión",
  navegacion: "Navegación",
  cerrarMenu: "Cerrar menú",
}

/**
 * Common UI text
 */
export const COMMON_TEXT = {
  loading: "Cargando...",
  error: "Ha ocurrido un error",
  success: "Operación exitosa",
}

/**
 * Authentication text
 */
export const AUTH_TEXT = {
  login: {
    title: "Welcome Back",
    description: "Sign in to your account",
    button: "Sign in",
    loading: "Signing in...",
    error: "Invalid credentials",
    noAccount: "Don't have an account?",
    createAccount: "Create account",
  },
  register: {
    title: "Create Account",
    description: "Enter your details to create an account",
    button: "Create account",
    loading: "Creating account...",
    error: "Error registering user",
    passwordMismatch: "Passwords do not match",
    pinRequired: "Please enter a 4-digit PIN",
    emailExists: "Email already registered",
    hasAccount: "Already have an account?",
    signIn: "Sign in",
    pinLabel: "Enter a 4-digit PIN for app locking",
  },
  lockScreen: {
    title: "Session Locked",
    description: "Enter your PIN to unlock the session",
    invalidPin: "Invalid PIN",
    attemptsRemaining: "attempts remaining",
    maxAttemptsExceeded: "Maximum Attempts Exceeded",
    browserClose: "For security reasons, the browser will close in",
    seconds: "seconds",
  },
}

/**
 * Textos del dashboard
 */
export const DASHBOARD_TEXT = {
  titles: {
    admin: "PANEL DE ADMINISTRACIÓN",
    mentor: "PANEL DE MENTORIA",
    company: "PANEL EMPRESARIAL",
    junior: "SISTEMA DE NAVEGACIÓN ESPACIAL",
    profile: "PERFIL DE USUARIO",
  },
  navigation: {
    menu: "Navegación",
    close: "Cerrar menú",
  },
}

/**
 * Landing text
 */
export const LANDING_TEXT = {
  navigation: {
    items: [
      { label: "Inicio", href: "hero" },
      { label: "Cómo funciona", href: "como-funciona" },
      { label: "Beneficios", href: "beneficios" },
      { label: "Ranking", href: "ranking" },
      { label: "Conquistas", href: "conquistas" },
      { label: "Testimonios", href: "testimonios" },
      { label: "FAQ", href: "faq" },
    ],
    login: "Iniciar Sesión",
    register: "Regístrate",
    menu: "Menú",
    closeMenu: "Cerrar menú",
  },
  userMenu: {
    profile: "Perfil",
    dashboard: "Dashboard",
    settings: "Configuración",
    logout: "Cerrar sesión",
  },
  hero: {
    title: "Gana experiencia, valida tus habilidades y desbloquea tu futuro",
    description:
      "Regístrate como cadete en StartPerks y comienza tu aventura intergalactica. Acumula puntos, desbloquea mentorias y conquista cada desafío para elevar tu carrera en tecnología",
    button: "Únete y empieza a ganar puntos",
  },
  stats: {
    title: "Nuestro viaje intergalactico ha dejado huella en el universo tech",
    items: [
      { value: "100+", label: "Tecnologias", sublabel: "enseñadas" },
      { value: "50+", label: "Empresas", sublabel: "aliadas" },
      { value: "1k+", label: "Exploradores", sublabel: "activos" },
      { value: "200+", label: "Mentorias", sublabel: "completadas" },
    ],
  },
  howItWorks: {
    title: "Cómo Funciona",
    features: [
      {
        icon: "Rocket",
        title: "Gana puntos de experiencia",
        description: "Completa tareas, colabora con otros y recibe evaluaciones para acumular puntos",
      },
      {
        icon: "Target",
        title: "Participa",
        description: "Desafía tus límites completando misiones y acumulando puntos en cada travesía",
      },
      {
        icon: "Award",
        title: "Avanza",
        description: "Accede a mentorias exclusivas y conviértete en un explorador galáctico en el universo tech",
      },
    ],
  },
  benefits: {
    title: "Beneficios de unirte a StartPerks",
    description: "Descubre cómo StartPerks puede transformar tu carrera en el universo tech",
    items: [
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
      {
        title: "Valida tus conocimientos",
        description: "Obtén insignias y certificaciones que demuestren tus habilidades a los reclutadores.",
        image: "/placeholder.svg?height=400&width=600",
        imagePosition: "right",
      },
    ],
  },
  testimonials: {
    title: "Lo que dicen nuestros exploradores",
    description: "Descubre cómo StartPerks ha impulsado las carreras de nuestros usuarios",
    items: [
      {
        id: "1",
        name: "Elena Rodriguez",
        role: "Desarrolladora Frontend",
        avatar: "/placeholder.svg?height=80&width=80",
        quote:
          "StartPerks me ha dado las herramientas y el apoyo que necesitaba para conseguir mi primer trabajo como desarrolladora. ¡Estoy muy agradecida!",
      },
      {
        id: "2",
        name: "Javier Pérez",
        role: "Diseñador UX/UI",
        avatar: "/placeholder.svg?height=80&width=80",
        quote:
          "Las mentorias de StartPerks me han ayudado a mejorar mis habilidades de diseño y a crear un portafolio impresionante.",
      },
      {
        id: "3",
        name: "Sofia Gomez",
        role: "Ingeniera de Datos",
        avatar: "/placeholder.svg?height=80&width=80",
        quote:
          "Gracias a StartPerks, he podido conectar con empresas líderes en el sector y encontrar oportunidades laborales increíbles.",
      },
    ],
  },
  faq: {
    title: "Preguntas Frecuentes",
    description: "Resuelve tus dudas sobre StartPerks",
    items: [
      {
        question: "¿Qué es StartPerks?",
        answer:
          "StartPerks es una plataforma de desarrollo profesional para el universo tech. Ofrecemos cursos, mentorias y herramientas para ayudarte a impulsar tu carrera.",
      },
      {
        question: "¿Cómo puedo unirme a StartPerks?",
        answer: "Simplemente regístrate en nuestra página web y comienza tu aventura intergalactica.",
      },
      {
        question: "¿Qué tipo de recursos ofrece StartPerks?",
        answer:
          "Ofrecemos cursos, mentorias, insignias, certificaciones y una comunidad de profesionales apasionados por la tecnología.",
      },
    ],
  },
  footer: {
    social: [
      { icon: "Github", href: "https://github.com/smartninja" },
      { icon: "Twitter", href: "https://twitter.com/smartninja" },
      { icon: "Linkedin", href: "https://linkedin.com/smartninja" },
    ],
    links: {
      product: [
        { label: "Visión general", href: "#" },
        { label: "Características", href: "#" },
        { label: "Soluciones", href: "#" },
        { label: "Precios", href: "#" },
      ],
      company: [
        { label: "Acerca de", href: "#" },
        { label: "Carreras", href: "#" },
        { label: "Prensa", href: "#" },
        { label: "Blog", href: "#" },
      ],
      legal: [
        { label: "Términos", href: "#" },
        { label: "Privacidad", href: "#" },
        { label: "Cookies", href: "#" },
      ],
    },
    copyright: "© {year} SmartNinja. Todos los derechos reservados.",
  },
}
