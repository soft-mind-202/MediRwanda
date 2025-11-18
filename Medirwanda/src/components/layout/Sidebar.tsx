import { NavLink } from 'react-router-dom'

const links = [
  { to: '/patient', label: 'Patient' },
  { to: '/doctor', label: 'Doctor' },
  { to: '/pharmacy', label: 'Pharmacy' },
  { to: '/delivery', label: 'Delivery' },
  { to: '/admin', label: 'Admin' },
]

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 border-r border-white/10 glass">
      <div className="p-4">
        <div className="mb-6">
          <input className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" placeholder="Search" />
        </div>
        <ul className="space-y-1">
          {links.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} className={({ isActive }) => `block px-3 py-2 rounded-md ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-white/10'}`}>{l.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}