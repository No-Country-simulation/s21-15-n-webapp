import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ROUTES } from "@/lib/constants/routes"
import { AUTH_CONFIG } from "@/lib/constants/app-config"
import { getUser } from "@/lib/utils/auth"

export async function middleware(request: NextRequest) {
  const user = await getUser(request)

  // Proteger la ruta de generación de certificados
  if (request.nextUrl.pathname.startsWith("/generate-certificate")) {
    if (!user || user.role !== "admin") {
      return NextResponse.redirect(new URL("/access-denied", request.url))
    }
  }

  const isAuthenticated = request.cookies.has(AUTH_CONFIG.cookieName)
  const path = request.nextUrl.pathname

  // Rutas públicas que no requieren autenticación
  const publicRoutes = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER, "/access-denied"]
  const isPublicRoute = publicRoutes.includes(path) || path.includes("/_next") || path.includes("/favicon.ico")

  // Si es una ruta pública, permitir acceso sin restricciones
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Si no está autenticado y no es una ruta pública, redirigir a login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
  }

  // A partir de aquí, el usuario está autenticado

  // Obtener el rol del usuario de la cookie
  const userRoleCookie = request.cookies.get("user_role")
  const userRole = userRoleCookie?.value || "junior" // Default a junior si no hay rol

  // Verificar acceso a rutas de dashboard según rol
  if (path.startsWith("/dashboard/")) {
    // Permitir acceso al perfil para todos los usuarios autenticados
    if (path === ROUTES.PROFILE) {
      return NextResponse.next()
    }

    // Verificar acceso a dashboards específicos
    const allowedDashboard = getDashboardRouteByRole(userRole)

    // Si intenta acceder a un dashboard que no es el suyo
    if (path.startsWith("/dashboard/") && !path.startsWith(allowedDashboard) && path !== ROUTES.DASHBOARD) {
      // Redirigir a la página de acceso denegado
      return NextResponse.redirect(new URL("/access-denied", request.url))
    }

    // Si está en la ruta base del dashboard, redirigir a su dashboard específico
    if (path === ROUTES.DASHBOARD) {
      return NextResponse.redirect(new URL(allowedDashboard, request.url))
    }
  }

  return NextResponse.next()
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

