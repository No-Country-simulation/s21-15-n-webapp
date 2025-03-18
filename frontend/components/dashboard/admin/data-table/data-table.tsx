"use client"

import { ChangeEvent, useState } from "react"
import { Search, MoreVertical, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DataTableColumn<T> {
  header: string
  accessorKey: keyof T
  cell?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  readonly title: string
  readonly columns: DataTableColumn<T>[]
  readonly data: T[]
  readonly searchPlaceholder?: string
  readonly addButtonText?: string
  readonly onSearch?: (query: string) => void
  readonly onAdd?: () => void
  readonly onEdit?: (item: T) => void
  readonly onDisable?: (item: T) => void
  readonly onDelete?: (item: T) => void
  readonly className?: string
}

export function DataTable<T>({
  title,
  columns,
  data,
  searchPlaceholder = "Buscar",
  addButtonText = "Agregar",
  onSearch,
  onAdd,
  onEdit,
  onDisable,
  onDelete,
  className,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
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
                  {columns.map((column, index) => (
                    <TableHead key={index}>{column.header}</TableHead>
                  ))}
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex}>
                        {column.cell ? column.cell(item) : String(item[column.accessorKey] || "")}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <DropdownMenu
                        open={activeDropdown === rowIndex}
                        onOpenChange={(open) => setActiveDropdown(open ? rowIndex : null)}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-5 w-5" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onEdit && <DropdownMenuItem onClick={() => onEdit(item)}>Editar</DropdownMenuItem>}
                          {onDisable && (
                            <DropdownMenuItem onClick={() => onDisable(item)}>Deshabilitar</DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem
                              onClick={() => onDelete(item)}
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
