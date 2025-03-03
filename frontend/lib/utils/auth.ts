import Cookies from "js-cookie"
import type { User } from "../types"

export const AUTH_COOKIE_NAME = "auth"
export const USER_STORAGE_KEY = "currentUser"

export function setAuthCookie(value = "true", expires = 7) {
  Cookies.set(AUTH_COOKIE_NAME, value, { expires })
}

export function removeAuthCookie() {
  Cookies.remove(AUTH_COOKIE_NAME)
}

export function getStoredUser(): User | null {
  try {
    const userData = localStorage.getItem(USER_STORAGE_KEY)
    return userData ? JSON.parse(userData) : null
  } catch {
    return null
  }
}

export function setStoredUser(user: User) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export function removeStoredUser() {
  localStorage.removeItem(USER_STORAGE_KEY)
}

export function getAllUsers(): User[] {
  try {
    const users = localStorage.getItem("users")
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
  localStorage.setItem("users", JSON.stringify(updatedUsers))
}
