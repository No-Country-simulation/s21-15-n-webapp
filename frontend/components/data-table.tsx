import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { memo } from "react"

interface DataTableProps {
  data: Array<{
    id: string
    name: string
    status: string
    date: string
    progress: number
  }>
}

export const DataTable = memo(function DataTable({ data }: DataTableProps) {
  return (
    <div className="rounded-lg border border-gray-800 bg-[#0A0A0A]">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800 hover:bg-gray-900/50">
            <TableHead className="text-gray-400">Name</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-gray-400">Date</TableHead>
            <TableHead className="text-right text-gray-400">Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="border-gray-800 hover:bg-gray-900/50">
              <TableCell className="font-medium text-white">{row.name}</TableCell>
              <TableCell className="text-gray-400">{row.status}</TableCell>
              <TableCell className="text-gray-400">{row.date}</TableCell>
              <TableCell className="text-right text-gray-400">{row.progress}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
})

