import { User } from "../types"

export const DEFAULT_USERS : User[] = [
  {
    id: "1",
    avatar: "",
    name: "Admin",
    lastName: "User",
    email: "admin@startperks.com",
    password: "admin123",
    pin: "1234",
    role: "admin",
    level: 99,
    experience: 9999,
    streakDays: 365,
    badges: ["admin"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    avatar: "",
    name: "Mentor",
    lastName: "User",
    email: "mentor@startperks.com",
    password: "mentor123",
    pin: "1234",
    role: "mentor",
    level: 50,
    experience: 5000,
    streakDays: 180,
    badges: ["mentor"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    avatar: "",
    name: "Company",
    lastName: "User",
    email: "company@startperks.com",
    password: "company123",
    pin: "1234",
    role: "company",
    level: 30,
    experience: 3000,
    streakDays: 90,
    badges: ["company"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    avatar: "",
    name: "Junior",
    lastName: "User",
    email: "junior@startperks.com",
    password: "junior123",
    pin:"1234",
    role: "junior",
    level: 1,
    experience: 0,
    streakDays: 0,
    badges: [],
    createdAt: new Date().toISOString(),
  },
]

export const WEEK_DAYS = ["L", "M", "M", "J", "V", "S", "D"]

export const DEFAULT_COURSES = [
  {
    id:"1",
    title: "Curso avanzado de figma",
    progress: 55,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    title: "Fundamentos de UI/UX",
    progress: 30,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export const DEFAULT_FEEDBACK = [
  {
    id:"1",
    mentor: "Eduardo Romero",
    role: "Diseñador UI",
    avatar: "/placeholder.svg?height=40&width=40",
    message:
      "Excelente progreso en el desarrollo del MVP. Las iteraciones basadas en feedback de usuarios muestran gran capacidad de adaptación.",
    date: "Hace 4 días",
  },
]

export const DEFAULT_PROJECTS = [
  {
    id:"1",
    name: "Proyecto Alpha",
    description: "Desarrollo de UI/UX para aplicación móvil",
    progress: 75,
    team: 4,
    status: "En progreso",
  },
  {
    id: "2",
    name: "Proyecto Beta",
    description: "Diseño de sistema de diseño",
    progress: 45,
    team: 3,
    status: "En revisión",
  },
  {
    id: "3",
    name: "Proyecto Gamma",
    description: "Prototipado de nueva plataforma",
    progress: 90,
    team: 5,
    status: "Casi completo",
  },
]
