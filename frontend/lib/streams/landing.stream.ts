import { create } from "zustand"

// Estado para la navegación
interface NavigationState {
  isNavOpen: boolean
  activeNavItem: string
  setNavOpen: (isOpen: boolean) => void
  setActiveNavItem: (item: string) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isNavOpen: false,
  activeNavItem: "",
  setNavOpen: (isOpen) => set({ isNavOpen: isOpen }),
  setActiveNavItem: (item) => set({ activeNavItem: item }),
}))

// Estado para el scroll
interface ScrollState {
  scrollPosition: number
  isScrolled: boolean
  setScrollPosition: (position: number) => void
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollPosition: 0,
  isScrolled: false,
  setScrollPosition: (position) =>
    set({
      scrollPosition: position,
      isScrolled: position > 0,
    }),
}))

// Estado para el tema
interface ThemeState {
  theme: string
  setTheme: (theme: string) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark",
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
    }
    set({ theme })
  },
}))

// Estado para los modales
// import { atom } from "jotai"
// import { atomWithStorage } from "jotai/utils"

// // Estado para el tema
// export const themeAtom = atomWithStorage("theme", "dark")

// // Estado para la navegación
// export const isNavOpenAtom = atom(false)
// export const activeNavItemAtom = atom("")

// // Estado para el scroll
// export const scrollPositionAtom = atom(0)
// export const isScrolledAtom = atom((get) => get(scrollPositionAtom) > 0)

// // Estado para las animaciones
// export const sectionAnimationsAtom = atomWithStorage("section-animations", true)

// Estado para los modales
// export const modalStateAtom = atom({
//   isOpen: false,
//   type: "",
//   data: null,
// })

// // Estado para el formulario de contacto
// export const contactFormAtom = atom({
//   name: "",
//   email: "",
//   message: "",
// })

// // Estado para las notificaciones
// export const notificationsAtom = atom({
//   show: false,
//   message: "",
//   type: "success" as "success" | "error" | "info",
// })

