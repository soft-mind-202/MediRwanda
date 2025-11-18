export default function AdminDashboard() {
  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-indigo-500 to-sky-600">
            <Activity className="size-5 text-white" />
          </div>
          <h3 className="font-semibold">System Health</h3>
          <p className="text-sm text-neutral-500">All systems operational</p>
        </div>
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-indigo-500 to-sky-600">
            <Users className="size-5 text-white" />
          </div>
          <h3 className="font-semibold">Users</h3>
          <p className="text-sm text-neutral-500">Manage roles and access</p>
        </div>
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-indigo-500 to-sky-600">
            <FileBarChart className="size-5 text-white" />
          </div>
          <h3 className="font-semibold">Reports</h3>
          <p className="text-sm text-neutral-500">Analytics and KPIs</p>
        </div>
      </div>
    </div>
  )
}
import { Activity, Users, FileBarChart } from 'lucide-react'