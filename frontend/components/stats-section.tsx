import { memo } from "react"
import { DataTable } from "./data-table"

const tableData = [
  {
    id: "1",
    name: "Project Alpha",
    status: "Active",
    date: "2024-02-23",
    progress: 75,
  },
  {
    id: "2",
    name: "Project Beta",
    status: "In Review",
    date: "2024-02-22",
    progress: 45,
  },
  {
    id: "3",
    name: "Project Gamma",
    status: "Completed",
    date: "2024-02-21",
    progress: 100,
  },
]

export const StatsSection = memo(function StatsSection() {
  return (
    <section className="py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Project Statistics</h2>
        <p className="text-gray-400">Track the progress of active gaming projects</p>
      </div>
      <DataTable data={tableData} />
    </section>
  )
})

