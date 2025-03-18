"use client"

import { ChangeEvent, useState } from "react"
import { Search, MoreVertical, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export type UserStatus = "Activo" | "Pendiente" | "Danger"

export interface UserData {
  readonly id: string | number
  readonly avatar: string
  readonly nombre: string
  readonly apellido: string
  readonly email: string
  readonly nickname: string
  readonly rol: string
  readonly estado: UserStatus
}

interface UserTableProps {
  readonly title: string
  readonly data: UserData[]
  readonly searchPlaceholder?: string
  readonly addButtonText?: string
  readonly onSearch?: (query: string) => void
  readonly onAdd?: () => void
  readonly onEdit?: (user: UserData) => void
  readonly onDelete?: (user: UserData) => void
  readonly onStatusChange?: (user: UserData, newStatus: UserStatus) => void
  readonly className?: string
}

export function UserTable({
  title,
  data,
  searchPlaceholder = "Buscar usuario",
  addButtonText = "Agregar Usuario",
  onSearch,
  onAdd,
  onEdit,
  onDelete,
  onStatusChange,
  className,
}: UserTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<string | number | null>(null)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  const getStatusBadge = (status: "Activo" | "Pendiente" | "Danger") => {
    const variants = {
      Activo: (
        <Badge variant="outline" className="bg-green-600 text-white hover:bg-green-700">
          Activo
        </Badge>
      ),
      Pendiente: (
        <Badge variant="outline" className="bg-yellow-600 text-white hover:bg-yellow-700">
          Pendiente
        </Badge>
      ),
      Danger: (
        <Badge variant="outline" className="bg-red-500 text-white hover:bg-red-600">
          Danger
        </Badge>
      ),
    }
    return variants[status]
  }

  const getInitials = (name: string, lastName: string) => {
    return `${name.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <Card className={cn("border-primary/20", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder={searchPlaceholder} value={searchQuery} onChange={handleSearch} className="pl-9" />
          </div>
          {onAdd && (
            <Button onClick={onAdd} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              {addButtonText}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Apellido</TableHead>
                  <TableHead>Nickname</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={user.avatar} alt={user.nombre} />
                          <AvatarFallback>{getInitials(user.nombre, user.apellido)}</AvatarFallback>
                        </Avatar>
                        <span>{user.nombre}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.apellido}</TableCell>
                    <TableCell>{user.nickname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.rol}</TableCell>
                    <TableCell>{getStatusBadge(user.estado)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu
                        open={activeDropdown === user.id}
                        onOpenChange={(open) => setActiveDropdown(open ? user.id : null)}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-5 w-5" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onEdit && <DropdownMenuItem onClick={() => onEdit(user)}>Editar</DropdownMenuItem>}
                          {onStatusChange && (
                            <>
                              <DropdownMenuItem onClick={() => onStatusChange(user, "Activo")}>
                                Marcar Activo
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onStatusChange(user, "Pendiente")}>
                                Marcar Pendiente
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onStatusChange(user, "Danger")}>
                                Marcar Danger
                              </DropdownMenuItem>
                            </>
                          )}
                          {onDelete && (
                            <DropdownMenuItem
                              onClick={() => onDelete(user)}
                              className="text-destructive focus:text-destructive"
                            >
                              Eliminar
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
