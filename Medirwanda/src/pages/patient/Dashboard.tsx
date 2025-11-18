import { Link } from 'react-router-dom'
import Button from '../../components/ui/button'
import { CalendarDays, FileText, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getConsultations, getInsuranceCoverage } from '../../lib/api/endpoints'
import { getNid } from '../../store/auth.store'
import { getUser } from '../../store/auth.store'

export default function PatientDashboard() {
  const [consultations, setConsultations] = useState<any[]>([])
  const [coverage, setCoverage] = useState<any | null>(null)
  const [coverageMissing, setCoverageMissing] = useState(false)
  useEffect(() => {
    const nid = getNid()
    const user = getUser()
    const pid = user?.id || 0
    getConsultations(pid).then(setConsultations).catch(()=>setConsultations([]))
    if (nid) {
      getInsuranceCoverage(nid).then(r => { if (r) setCoverage(r); else setCoverageMissing(true) }).catch(()=>setCoverageMissing(true))
    } else {
      setCoverageMissing(true)
    }
  }, [])
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Patient Dashboard</h2>
        <Button variant="secondary" asChild>
          <Link to="/consultation">Start consultation</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-emerald-500 to-sky-600">
            <CalendarDays className="size-5 text-white" />
          </div>
          <h3 className="font-semibold mb-2">Upcoming</h3>
          <ul className="space-y-2">
            {consultations.length === 0 && <li className="text-sm text-neutral-500">No upcoming consultations</li>}
            {consultations.map(c => (
              <li key={c.id} className="text-sm">{new Date(c.scheduled_at).toLocaleString()} • {c.status}</li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-emerald-500 to-sky-600">
            <FileText className="size-5 text-white" />
          </div>
          <h3 className="font-semibold mb-2">Prescriptions</h3>
          <p className="text-sm text-neutral-500">Your prescriptions will appear here</p>
        </div>
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-emerald-500 to-sky-600">
            <ShieldCheck className="size-5 text-white" />
          </div>
          <h3 className="font-semibold mb-1">Insurance</h3>
          {!coverage && !coverageMissing && <p className="text-sm text-neutral-500">Loading coverage…</p>}
          {coverageMissing && <p className="text-sm text-neutral-500">No coverage found</p>}
          {coverage && (
            <div className="text-sm">
              <div>{coverage.plan}</div>
              <div>Covered {coverage.covered}% • Copay {coverage.copay}%</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}