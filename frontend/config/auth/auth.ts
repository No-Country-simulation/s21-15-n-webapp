import Cookies from "js-cookie"
import type { User } from "../types"
import { AUTH_CONFIG } from "@/config/constants/app-config"
import { DEFAULT_USERS } from "@/config/mock/default-data"

// Inicializar usuarios predeterminados si no existen
export function initializeDefaultUsers() {
  const storedUsers = localStorage.getItem(AUTH_CONFIG.defaultUsersKey)
  if (!storedUsers) {
    localStorage.setItem(AUTH_CONFIG.defaultUsersKey, JSON.stringify(DEFAULT_USERS))
  }
}

export function setAuthCookie(value = "true", expires = 7) {
  Cookies.set(AUTH_CONFIG.cookieName, value, { expires })
}

export function removeAuthCookie() {
  Cookies.remove(AUTH_CONFIG.cookieName)
  Cookies.remove("user_role") // También eliminar la cookie de rol
}

export function getStoredUser(): User | null {
  try {
    const userData = localStorage.getItem(AUTH_CONFIG.userStorageKey)
    return userData ? JSON.parse(userData) : null
  } catch {
    return null
  }
}

export function setStoredUser(user: User) {
  localStorage.setItem(AUTH_CONFIG.userStorageKey, JSON.stringify(user))
  // También establecer una cookie con el rol para que el middleware pueda acceder a ella
  Cookies.set("user_role", user.role, { expires: 7 })
}

export function removeStoredUser() {
  localStorage.removeItem(AUTH_CONFIG.userStorageKey)
  Cookies.remove("user_role") // También eliminar la cookie de rol
}

export function getAllUsers(): User[] {
  try {
    const users = localStorage.getItem(AUTH_CONFIG.defaultUsersKey)
    return users ? JSON.parse(users) : []
  } catch {
    return []
  }
}

export function updateUser(email: string, updates: Partial<User>) {
  const users = getAllUsers()
  const updatedUsers = users.map((user) => {
    if (user.email === email) {
      return { ...user, ...updates }
    }
    return user
  })
  localStorage.setItem(AUTH_CONFIG.defaultUsersKey, JSON.stringify(updatedUsers))

  // Si el usuario actualizado es el actual, actualizar también en currentUser
  const currentUser = getStoredUser()
  if (currentUser && currentUser.email === email) {
    const updatedUser = { ...currentUser, ...updates }
    setStoredUser(updatedUser)
    // Actualizar también la cookie de rol si el rol cambió
    if (updates.role) {
      Cookies.set("user_role", updates.role, { expires: 7 })
    }
  }
}

export function updateUserRole(email: string, newRole: User["role"]) {
  updateUser(email, { role: newRole })
}

export async function getUser(request: any): Promise<User | null> {
  const isAuthenticated = request.cookies.has(AUTH_CONFIG.cookieName)

  if (!isAuthenticated) {
    return null
  }

  return getStoredUser()
}
