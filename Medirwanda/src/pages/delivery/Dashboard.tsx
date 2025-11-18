import { useEffect, useState } from 'react'
import { getDeliveries } from '../../lib/api/endpoints'

export default function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState<any[]>([])
  useEffect(() => { getDeliveries().then(setDeliveries).catch(()=>{}) }, [])
  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-semibold">Delivery Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-emerald-500 to-sky-600">
            <Route className="size-5 text-white" />
          </div>
          <h3 className="font-semibold">Active Deliveries</h3>
          <ul className="text-sm mt-2 space-y-1 max-h-48 overflow-auto">
            {deliveries.filter(d=>d.status!=='delivered').length===0 && <li className="text-neutral-500">No active tasks</li>}
            {deliveries.filter(d=>d.status!=='delivered').map(d => (
              <li key={d.id}>{d.order_ref} • {d.status} • ETA {d.eta_minutes}m</li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-emerald-500 to-sky-600">
            <History className="size-5 text-white" />
          </div>
          <h3 className="font-semibold">History</h3>
          <ul className="text-sm mt-2 space-y-1 max-h-48 overflow-auto">
            {deliveries.filter(d=>d.status==='delivered').length===0 && <li className="text-neutral-500">None</li>}
            {deliveries.filter(d=>d.status==='delivered').map(d => (
              <li key={d.id}>{d.order_ref} • delivered</li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-emerald-500 to-sky-600">
            <Wallet className="size-5 text-white" />
          </div>
          <h3 className="font-semibold">Earnings</h3>
          <p className="text-sm text-neutral-500">Weekly summary</p>
        </div>
      </div>
    </div>
  )
}
import { Route, History, Wallet } from 'lucide-react'