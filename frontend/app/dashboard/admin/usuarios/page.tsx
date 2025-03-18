"use client"

import { toast } from "sonner"
import { DASHBOARD_TEXT } from "@/config/constants/dashboard-text"
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout"
import { UserStatus, UserTable, type UserData} from "@/components/dashboard/admin/data-table/user-table"
import { StarsBackground } from "@/components/common/effects/stars-background"
import { MouseReflection } from "@/components/common/effects/mouse-reflection"

export default function UsersPage() {
  const { users } = DASHBOARD_TEXT.admin

  // Event handlers for user table
  const handleUserSearch = (query: string) => {
    console.log("Searching user:", query)
  }

  const handleAddUser = () => {
    toast.success("Agregar nuevo usuario")
  }

  const handleEditUser = (user: UserData) => {
    toast.info(`Editando: ${user.nombre} ${user.apellido}`)
  }

  const handleDeleteUser = (user: UserData) => {
    toast.error(`Eliminando: ${user.nombre} ${user.apellido}`)
  }

  const handleStatusChange = (user: UserData, newStatus: "Activo" | "Pendiente" | "Danger") => {
    toast.info(`Cambiando estado de ${user.nombre} ${user.apellido} a ${newStatus}`)
  }

  return (
    <DashboardLayout>
      <div className="relative">
        {/* Stars Background */}
        <StarsBackground count={100} colors={["primary", "white", "secondary"]} className="z-1" />
        <div className="z-2 pointer-events-none">
          <MouseReflection />
        </div>

        <div className=" space-y-6 p-6 z-10">
          <h1 className="text-2xl font-bold text-white mb-6">Gestión de Usuarios</h1>

          {/* Users Table */}
          <UserTable
            title={users.title}
            data={users.data.map(user => ({ ...user, estado: user.estado as UserStatus }))}
            searchPlaceholder={users.searchPlaceholder}
            addButtonText={users.addButtonText}
            onSearch={handleUserSearch}
            onAdd={handleAddUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
