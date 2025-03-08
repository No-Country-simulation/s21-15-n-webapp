import type React from "react"

export interface User {
  id?: string
  fullName: string
  email: string
  password?: string
  pin?: string
  role: "junior" | "mentor" | "company" | "admin" // Roles disponibles
  level: number
  experience: number
  streakDays: number
  badges: string[]
  bio?: string
  avatar?: string
  createdAt: string
  updatedAt?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
}

export interface Streak {
  currentStreak: number
  longestStreak: number
  lastCheckIn: string
  weekProgress: boolean[]
}

export interface NavigationItem {
  label: string
  href: string
  icon?: React.ReactNode
}

