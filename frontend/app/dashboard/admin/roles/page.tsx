"use client"

import { useState, useEffect } from "react"
import type { User } from "@/config/types"
import { getAllUsers, updateUserRole } from "@/config/auth/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarsBackground } from "@/components/common/effects/stars-background"
import { MouseReflection } from "@/components/common/effects/mouse-reflection"
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout"

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    setUsers(getAllUsers())
  }, [])

  const handleRoleChange = (email: string, newRole: User["role"]) => {
    updateUserRole(email, newRole)
    setUsers(getAllUsers())
  }

  return (
    <DashboardLayout>
      <div className="relative">
        {/* Stars Background */}
        <StarsBackground count={100} colors={["primary", "white", "secondary"]} className="z-1" />

        <div className="z-2 pointer-events-none">
          <MouseReflection />
        </div>
        <div className="space-y-6 p-6">
          <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white">Estadísticas del Sistema</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Usuarios</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Usuarios Activos</p>
                <p className="text-2xl font-bold text-white">{users.filter((u) => u.streakDays > 0).length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Nuevos Usuarios (Hoy)</p>
                <p className="text-2xl font-bold text-white">
                  {
                    users.filter((u) => {
                      const today = new Date()
                      const createdAt = new Date(u.createdAt)
                      return (
                        createdAt.getDate() === today.getDate() &&
                        createdAt.getMonth() === today.getMonth() &&
                        createdAt.getFullYear() === today.getFullYear()
                      )
                    }).length
                  }
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Panel de Administración</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Nivel</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell className="font-medium text-white">{`${user.name} ${user.lastName}`}</TableCell>
                      <TableCell className="text-gray-400">{user.email}</TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onValueChange={(value: User["role"]) => handleRoleChange(user.email, value)}
                        >
                          <SelectTrigger className="w-32 border-primary/20 bg-primary/10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="junior">Junior</SelectItem>
                            <SelectItem value="mentor">Mentor</SelectItem>
                            <SelectItem value="company">Company</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-gray-400">{user.level}</TableCell>
                      <TableCell>
                        <Button variant="ghost" className="text-primary hover:text-primary/80">
                          Ver detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
