import { useEffect, useState } from 'react'
import { getPharmacyInventory } from '../../lib/api/endpoints'

export default function PharmacyDashboard() {
  const [inventory, setInventory] = useState<any[]>([])
  useEffect(() => { getPharmacyInventory().then(setInventory).catch(()=>{}) }, [])
  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-semibold">Pharmacy Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600">
            <Boxes className="size-5 text-white" />
          </div>
          <h3 className="font-semibold">Inventory</h3>
          <ul className="text-sm mt-2 space-y-1 max-h-48 overflow-auto">
            {inventory.length === 0 && <li className="text-neutral-500">No items</li>}
            {inventory.map(i => (
              <li key={i.id}>{i.pharmacy} • {i.drug} • RWF {i.price} • {i.stock}</li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600">
            <PackageCheck className="size-5 text-white" />
          </div>
          <h3 className="font-semibold">Orders</h3>
          <p className="text-sm text-neutral-500">Pending deliveries</p>
        </div>
        <div className="p-5 rounded-xl border border-white/10 glass">
          <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600">
            <FileBadge className="size-5 text-white" />
          </div>
          <h3 className="font-semibold">Claims</h3>
          <p className="text-sm text-neutral-500">Insurance claims</p>
        </div>
      </div>
    </div>
  )
}
import { Boxes, PackageCheck, FileBadge } from 'lucide-react'