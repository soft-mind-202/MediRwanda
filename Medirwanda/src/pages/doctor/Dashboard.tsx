import { Link } from 'react-router-dom'

export default function DoctorDashboard() {
  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-semibold">Doctor Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-indigo-500 to-sky-600">
            <Users className="size-5 text-white" />
          </div>
          <h3 className="font-semibold">Queue</h3>
          <p className="text-sm text-neutral-500">No patients in queue</p>
        </div>
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-indigo-500 to-sky-600">
            <Stethoscope className="size-5 text-white" />
          </div>
          <h3 className="font-semibold">Consultations</h3>
          <p className="text-sm text-neutral-500">Recent consultations</p>
          <div className="mt-3">
            <Link to="/doctor/create-prescription" className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500">Create prescription</Link>
          </div>
        </div>
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-indigo-500 to-sky-600">
            <Wallet className="size-5 text-white" />
          </div>
          <h3 className="font-semibold">Earnings</h3>
          <p className="text-sm text-neutral-500">Payments summary</p>
        </div>
      </div>
    </div>
  )
}
import { Users, Stethoscope, Wallet } from 'lucide-react'