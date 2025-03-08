// Definición del tema global de la aplicación
export const THEME_COLORS = {
  // Fondos
  background: {
    primary: "#070A1B", // Fondo principal
    secondary: "#0A0B1E", // Fondo secundario
    tertiary: "#12142A", // Fondo terciario
  },

  // Acentos
  accent: {
    primary: "#463FC0", // Acento principal (morado/indigo)
    secondary: "#2802D3", // Acento secundario
    success: "#2B9962", // Verde para éxito
    error: "#FD384C", // Rojo para error
  },

  // Texto
  text: {
    primary: "#FFFFFF", // Texto principal
    secondary: "#A79C9C", // Texto secundario
    muted: "#6C7293", // Texto desactivado
  },

  // Bordes
  border: {
    primary: "rgba(70, 63, 192, 0.2)", // Borde principal con opacidad
    secondary: "rgba(167, 156, 156, 0.1)", // Borde secundario con opacidad
  },

  // Gradientes
  gradient: {
    primary: "linear-gradient(to right, #463FC0, #2802D3)",
    hover: "linear-gradient(to right, #5048D5, #2E02F3)",
  },

  // Estados
  state: {
    active: "#463FC0",
    hover: "#5048D5",
    disabled: "#1F2137",
  },
} as const

// Tipos para el tema
export type ThemeColors = typeof THEME_COLORS

