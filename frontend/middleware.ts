import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ROUTES } from "@/config/constants/routes"
import { AUTH_CONFIG } from "@/config/constants/app-config"
import { getUser } from "@/config/auth/auth"

export async function middleware(request: NextRequest) {
  const user = await getUser(request)
  const path = request.nextUrl.pathname

  if (isProtectedRoute(path, user)) {
    return NextResponse.redirect(new URL("/access-denied", request.url))
  }

  if (isPublicRoute(path)) {
    return NextResponse.next()
  }

  if (!isAuthenticated(request)) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
  }

  const userRole = getUserRole(request)

  if (isDashboardRoute(path)) {
    return handleDashboardRoute(path, userRole, request)
  }

  return NextResponse.next()
}

function isProtectedRoute(path: string, user: any): boolean {
  return path.startsWith("/generate-certificate") && (!user || user.role !== "admin")
}

function isPublicRoute(path: string): boolean {
  const publicRoutes = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER, "/access-denied"]
  return publicRoutes.includes(path) || path.includes("/_next") || path.includes("/favicon.ico")
}

function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.has(AUTH_CONFIG.cookieName)
}

function getUserRole(request: NextRequest): string {
  const userRoleCookie = request.cookies.get("user_role")
  return userRoleCookie?.value ?? "junior"
}

function isDashboardRoute(path: string): boolean {
  return path.startsWith("/dashboard/")
}

function handleDashboardRoute(path: string, userRole: string, request: NextRequest) {
  if (path === ROUTES.PROFILE|| path === ROUTES.MESSAGER) {
    return NextResponse.next()
  }

  const allowedDashboard = getDashboardRouteByRole(userRole)

  if (isNotAllowedDashboardAccess(path, allowedDashboard)) {
    return NextResponse.redirect(new URL("/access-denied", request.url))
  }

  if (path === ROUTES.DASHBOARD) {
    return NextResponse.redirect(new URL(allowedDashboard, request.url))
  }

  return NextResponse.next()
}

function isNotAllowedDashboardAccess(path: string, allowedDashboard: string): boolean {
  const isDashboardPath = path.startsWith("/dashboard/")
  const isNotAllowedDashboard = !path.startsWith(allowedDashboard)
  const isNotBaseDashboard = path !== ROUTES.DASHBOARD
  return isDashboardPath && isNotAllowedDashboard && isNotBaseDashboard
}

function getDashboardRouteByRole(role: string): string {
  switch (role) {
    case "admin":
      return ROUTES.ADMIN
    case "mentor":
      return ROUTES.MENTOR
    case "company":
      return ROUTES.COMPANY
    case "junior":
    default:
      return ROUTES.JUNIOR
  }
}


export const config = {
  matcher: ["/dashboard/:path*", "/generate-certificate/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
