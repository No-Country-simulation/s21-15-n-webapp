import type { LandingPageData } from "@/config/types/landing";

export const LANDING_CONFIG: LandingPageData = {
  navigation: {
    items: [
      { id: "1", label: "Inicio", href: "#inicio" },
      { id: "2", label: "Funcionamiento", href: "#como-funciona" },
      { id: "3", label: "Beneficios", href: "#beneficios" },
      { id: "4", label: "Ranking", href: "#ranking" },
      { id: "5", label: "Conquistas", href: "#conquistas" },
      { id: "6", label: "Testimonios", href: "#testimonios" },
      { id: "7", label: "Preguntas frecuentes", href: "#faq" },
    ],
  },
  /*Textos de la lLanding Page*/
  hero: {
    title: {
      section1: "Gana ",
      section2: "conocimientos",
      section3: ", valida tus ",
      section4: "habilidades",
      section5: " y ",
      section6: "desbloquea",
      section7: " tu futuro",
    },
    description:
      "Regístrate como cadete en StartPerks y prepárate para vivir una aventura galáctica llena de desafíos y recompensas. Cada misión te lleva un paso más cerca de dominar nuevas habilidades, cada logro te acerca a tus metas, y cada mentor te acompaña en tu camino hacia el éxito. Es hora de encender los motores y trazar tu ruta hacia las estrellas",
    ctaText: "Únete y empieza a ganar puntos",
  },
  stats: {
    title: "Nuestro viaje intergaláctico está redefiniendo el universo tech",
    items: [
      { id: "1", value: "100+", label: "Tecnologías", subLabel: "enseñadas" },
      { id: "2", value: "50+", label: "Empresas", subLabel: "aliadas" },
      { id: "3", value: "1k+", label: "Junior's", subLabel: "activos" },
      { id: "4", value: "200+", label: "Mentorías", subLabel: "completadas" },
    ],
  },
  howItWorks: {
    title: "Cómo Funciona",
    items: [
      {
        id: "1",
        icon: "Rocket",
        title: "Conviértete en cadete",
        description:
          "Supera el entrenamiento inicial y asciende de cadete a explorador. Tu mayor objetivo será conquistar tu próximo rango y obtener apoyo del Alto Mando",
      },
      {
        id: "2",
        icon: "Target",
        title: "Asciende al rango de Explorador",
        description:
          "Desbloquea misiones estratégicas del Alto Mando, colabora con El Consejo de Exploradores en objetivos mayores y avanza hacia el rango superior donde te esperan beneficios exclusivos",
      },
      {
        id: "3",
        icon: "Award",
        title: "Lidera como Comandante Galáctico",
        description:
          "Enfrenta desafíos críticos junto a tu equipo y destaca ante las tripulaciones galácticas. Como Comandante, podrás ser reclutado por empresas emergentes en busca de talento validado y listo para brillar",
      },
    ],
  },
  benefits: {
    title: "Beneficios",
    items: [
      {
        id: "1",
        title: "Juniors",
        description:
          "Inicia tu entrenamiento y desarrolla las habilidades clave para trabajar en equipo. Aprende a coordinar misiones, compartir conocimientos y liderar proyectos que te llevarán al éxito en el cosmos tech",
        image:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741592154/startperks/ben1_xra1gp.png",
        imagePosition: "right",
      },
      {
        id: "2",
        title: "Startups",
        description:
          "Accede a un pool de talentos que han demostrado habilidades excepcionales en misiones críticas. Identifica futuros líderes listos para impulsar tu startup hacia nuevas galaxias",
        image:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741592163/startperks/bene2_zqzeof.png",
        imagePosition: "left",
      },
      {
        id: "3",
        title: "Mentores",
        description:
          "Conviértete en uno de los Generales Galácticos de los Altos Mandos y ayuda a nuestros exploradores a alcanzar las estrellas. Comparte tu sabiduría, gana reconocimiento en el universo tech y accede a recompensas exclusivas por tu liderazgo",
        image:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741592172/startperks/bene3_okakpx.png",
        imagePosition: "right",
      },
    ],
  },
  ranking: {
    title: "Ranking Galáctico",
    tableTitle: [
      {
        id: "1",
        title: "Nombre",
        align: "text-left",
      },
      {
        id: "2",
        title: "Rol",
        align: "text-left",
      },
      {
        id: "3",
        title: "Nivel",
        align: "text-center",
      },
      {
        id: "5",
        title: "Experiencia",
        align: "text-right",
      },
    ],
    description:
      "Compara tu progreso con otros cadetes y mantén viva la competencia interplanetaria",
    items: [
      {
        id: "1",
        name: "Matias Badano",
        role: "Team Leader",
        avatar:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741736812/dc%20dev/T02KS88FB0E-U06GHUXGWMB-0e3dd8d5df7d-512_w9fxfc.jpg",
        level: 90,
        experience: 894,
        active: true,
      },
      {
        id: "2",
        name: "Noemí Zalazar",
        role: "Project Manager",
        avatar:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741706559/dc%20dev/1518502426283_nnhmny.jpg",
        level: 85,
        experience: 787,
        active: true,
      },
      {
        id: "3",
        name: "Sandro Borga",
        role: "Diseñador UX/UI",
        avatar:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741706799/dc%20dev/1703885238963_xdwwil.jpg",
        level: 85,
        experience: 640,
        active: true,
      },
      {
        id: "4",
        name: "Gianella Achetoni",
        role: "Desarrollador Front End",
        avatar:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741737098/dc%20dev/T02KS88FB0E-U0803CH9LJC-2fba0364855e-512_eouahd-Square_ub6poh.jpg",
        level: 85,
        experience: 645,
        active: true,
      },
      {
        id: "5",
        name: "David Caycedo",
        role: "Desarrollador Front End",
        avatar:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741673288/dc%20dev/Avata-info-10-removebg-preview_kxxlui.png",
        level: 85,
        experience: 650,
        active: true,
      },
      {
        id: "6",
        name: "Wilson Osorio",
        role: "Desarrollador Back End",
        avatar:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741707291/dc%20dev/1718213640869_hp8dx5.jpg",
        level: 85,
        experience: 648,
        active: true,
      },
      {
        id: "7",
        name: "José lambrechts",
        role: "Desarrollador Back End",
        avatar:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741753525/dc%20dev/T02KS88FB0E-U041L9PCUQ3-705b1f66b8ab-512_toukec.jpg",
        level: 85,
        experience: 621,
        active: true,
      },
      {
        id: "8",
        name: "Omar Alvarado",
        role: "Desarrollador Back End",
        avatar:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741707497/dc%20dev/1738773720336_ufhx3d.jpg",
        level: 85,
        experience: 619,
        active: true,
      },
    ],
  },
  stellarConquests: {
    title: "Tus Conquistas Estelares",
    description:
      "Cada insignia que consigas, demostrará tu progreso y generará nuevas oportunidades",
    items: [
      {
        id: "1",
        title: "Explorador Cósmico",
        description:
          "Gana reconocimiento al completar misiones críticas y superar desafíos en diversas tecnologías. Cada aventura es un paso hacia tu legado tecnológico",
        icon: "Star",
      },
      {
        id: "2",
        title: "Piloto Intergaláctico",
        description:
          " Demuestra tu dominio del cosmos tech alcanzando rangos adicionales. Cada nivel validado refleja tu experiencia y compromiso con la excelencia",
        icon: "Rocket",
      },
      {
        id: "3",
        title: "Y mucho más",
        description:
          "Además de insignias y rangos, encuentra recompensas exclusivas y sorpresas diseñadas para potenciar tu viaje digital",
        icon: "Sparkles",
      },
    ],
  },
  testimonials: {
    title: "Voces de la flota",
    description:
      "Descubre cómo StartPerks ha impulsado las carreras de nuestros usuarios",
    items: [
      {
        id: "1",
        name: "David Caycedo",
        role: "Desarrollador Front End",
        avatar:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741673288/dc%20dev/Avata-info-10-removebg-preview_kxxlui.png",
        quote:
          "StartPerks me ha dado las herramientas y habilidades tanto técnicas como blandas para mejorar mi carrera profesional",
      },
      {
        id: "2",
        name: "Sandro Borga",
        role: "Diseñador UX/UI",
        avatar:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741706799/dc%20dev/1703885238963_xdwwil.jpg",
        quote:
          "Las mentorías de StartPerks me han ayudado a mejorar mis habilidades de diseño y a crear un portafolio impresionante que me ha abierto muchas puertas",
      },
      {
        id: "3",
        name: "Wilson Osorio",
        role: "Desarrollador Back End",
        avatar:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741707291/dc%20dev/1718213640869_hp8dx5.jpg",
        quote:
          "La comunidad de StartPerks es increíble. He aprendido tanto de mis compañeros como de los mentores y he hecho conexiones valiosas en el mundo tech",
      },
      {
        id: "4",
        name: "Gianella Achetoni",
        role: "Desarrolladora Front End",
        avatar:
          "https://ca.slack-edge.com/T02KS88FB0E-U0803CH9LJC-2fba0364855e-512",
        quote:
          "StartPerks me ha dado las herramientas y el apoyo que necesitaba para conseguir mi primer trabajo como desarrolladora Front End",
      },
      {
        id: "5",
        name: "José lambrechts",
        role: "Desarrollador Back End",
        avatar:
          "https://ca.slack-edge.com/T02KS88FB0E-U041L9PCUQ3-705b1f66b8ab-512",
        quote:
          "Los desafíos técnicos y proyectos prácticos me ayudaron a consolidar mis conocimientos de manera efectiva y a prepararme para el mundo laboral",
      },
      {
        id: "6",
        name: "Noemí Zalazar",
        role: "Product Manager",
        avatar:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741706559/dc%20dev/1518502426283_nnhmny.jpg",
        quote:
          "StartPerks me dio la confianza y las habilidades necesarias para liderar equipos técnicos exitosamente y me ayudó a conseguir mi primer trabajo como Product Manager",
      },
      {
        id: "7",
        name: "Omar Alvarado",
        role: "Desarrollador Back End",
        avatar:
          "https://res.cloudinary.com/dcdevcd/image/upload/v1741707497/dc%20dev/1738773720336_ufhx3d.jpg",
        quote:
          "Los desafíos técnicos y proyectos prácticos me ayudaron a consolidar mis conocimientos de manera efectiva y a prepararme para el mundo laboral",
      },
      {
        id: "8",
        name: "Matias Badano",
        role: "Team Leader",
        avatar:
          "https://ca.slack-edge.com/T02KS88FB0E-U06GHUXGWMB-0e3dd8d5df7d-512",
        quote:
          "StartPerks me dio la confianza y las habilidades necesarias para liderar equipos técnicos exitosamente y ser un líder en el mundo tech",
      },
    ],
  },
  faqs: {
    title: "Preguntas frecuentes",
    description:
      "Resolvemos tus dudas para ayudarte en tu viaje a través del universo StartPerks",
    items: [
      {
        id: "1",
        question: "¿Qué es StartPerks?",
        answer:
          "StartPerks es una plataforma gamificada donde puedes validar tus habilidades, ganar puntos, desbloquear mentorías y conectarte con oportunidades en el universo tech. Nuestro objetivo es impulsar tu crecimiento profesional a través de misiones y logros reconocidos por la comunidad",
      },
      {
        id: "2",
        question: "¿Cómo puedo unirme?",
        answer:
          "Simplemente haz clic en el botón ‘Únete y empieza a ganar puntos’ y completa el formulario de registro. ¡Es gratis y solo te llevará unos minutos!",
      },
      {
        id: "3",
        question: "¿Qué tipo de ofrece StartPerks?",
        answer:
          "Ofrecemos cursos, mentorías, insignias, certificaciones y una comunidad de profesionales apasionados por la tecnología que te ayudarán a impulsar tu carrera profesional",
      },
      {
        id: "4",
        question: "¿Qué son las insignias?",
        answer:
          "Las insignias son reconocimientos que obtienes al completar misiones, superar desafíos y alcanzar nuevos rangos en StartPerks. Cada insignia refleja tus logros y te acerca a nuevas oportunidades en el universo tech",
      },
      {
        id: "5",
        question: "¿Cómo funciona el sistema de puntos?",
        answer:
          "Ganarás puntos al completar cursos, participar en desafíos, recibir evaluaciones positivas y colaborar con otros miembros de la comunidad StartPerks. Cuantos más puntos acumules, más beneficios y oportunidades desbloquearás",
      },
      {
        id: "6",
        question: "¿Puedo acceder desde cualquier dispositivo?",
        answer:
          "Sí, nuestra plataforma es completamente responsive y puedes acceder desde cualquier dispositivo con conexión a internet para continuar tu viaje en cualquier momento y lugar",
      },
      {
        id: "7",
        question: "¿Necesito experiencia previa en tecnología?",
        answer:
          "No necesariamente, StartPerks está diseñado para que tanto principiantes como profesionales en desarrollo puedan avanzar a su propio ritmo y aprender en el proceso de validación de habilidades",
      },
      {
        id: "8",
        question: "¿Puedo ser mentor y cadete a la vez?",
        answer:
          "Sí, puedes registrarte con un rol principal y, más adelante, postularte como mentor si cumples los requisitos de experiencia. De esta forma, seguirás aprendiendo mientras compartes tus conocimientos con otros miembros de la comunidad",
      },
    ],
  },
  footer: {
    description: "Transformando carreras en el universo tech",
    social: [
      {
        id: "1",
        platform: "GitHub",
        href: "https://github.com/No-Country-simulation/s21-15-n-webapp",
        icon: "Github",
      },
      {
        id: "2",
        platform: "Twitter",
        href: "https://x.com",
        icon: "x",
      },
      {
        id: "3",
        platform: "LinkedIn",
        href: "https://linkedin.com",
        icon: "Linkedin",
      },
      {
        id: "4",
        platform: "Instagram",
        href: "https://instagram.com",
        icon: "Instagram",
      },
      {
        id: "5",
        platform: "Discrod",
        href: "https://discord.com",
        icon: "Discord",
      },
    ],
    sections: [
      {
        id: "1",
        title: "Producto",
        links: [
          { id: "1", label: "Simulaciones", href: "#" },
          { id: "2", label: "Características", href: "#" },
          { id: "3", label: "Precios", href: "#" },
        ],
      },
      {
        id: "2",
        title: "Compañía",
        links: [
          { id: "1", label: "Nosotros", href: "#" },
          { id: "2", label: "Misión", href: "#" },
          { id: "3", label: "Visión", href: "#" },
        ],
      },
      {
        id: "3",
        title: "Recursos",
        links: [
          { id: "1", label: "Certificados", href: "#" },
          { id: "2", label: "Tutoriales", href: "#" },
          { id: "3", label: "Documentación", href: "#" },
        ],
      },
    ],
  },
};
