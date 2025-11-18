import { Link } from 'react-router-dom'
import Button from '../../components/ui/button'
import { Video, FileCheck2, Pill, ShieldCheck, Bike, Bot } from 'lucide-react'

export default function Home() {
  return (
    <div className="grid gap-8">
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Healthcare, delivered</h1>
          <p className="text-neutral-600 dark:text-neutral-300">Consult doctors, get prescriptions, find medicine, pre-approve insurance, and receive delivery — in minutes.</p>
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link to="/patient">Get started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/how">How it works</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-40 rounded-xl glass border border-white/10"></div>
          <div className="h-40 rounded-xl glass border border-white/10"></div>
          <div className="h-40 rounded-xl glass border border-white/10"></div>
          <div className="h-40 rounded-xl glass border border-white/10"></div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Consult', desc: 'Video call with a doctor from home.', Icon: Video },
          { title: 'Prescribe', desc: 'Receive a secure, QR-coded prescription.', Icon: FileCheck2 },
          { title: 'Find medicine', desc: 'Locate pharmacies with all items in stock.', Icon: Pill },
          { title: 'Insurance', desc: 'Pre-approval in seconds, transparent copay.', Icon: ShieldCheck },
          { title: 'Delivery', desc: 'Tracked rider, sealed packages, privacy-first.', Icon: Bike },
          { title: 'Automation', desc: 'Automatic claims and payouts for providers.', Icon: Bot },
        ].map(({ title, desc, Icon }) => (
          <div key={title} className="p-5 rounded-xl border border-white/10 glass">
            <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600">
              <Icon className="size-5 text-white" />
            </div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{desc}</p>
          </div>
        ))}

      </section>

      <section className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Registered patients', value: '120,458' },
          { label: 'Doctors online', value: '312' },
          { label: 'Pharmacies synced', value: '845' },
          { label: 'Avg. delivery time', value: '22m' },
        ].map(s => (
          <div key={s.label} className="p-5 rounded-xl border border-white/10 glass">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-neutral-500">{s.label}</div>
          </div>
        ))}
      </section>
    </div>
  )
}