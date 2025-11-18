import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/ui/input'
import Button from '../../components/ui/button'
import { notifySuccess } from '../../components/shared/NotificationToast'
import { setNid } from '../../store/auth.store'
import { loginPatient } from '../../lib/api/endpoints'
import { setUser } from '../../store/auth.store'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nid: '', phone: '' })
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await loginPatient(form.nid)
      setNid(form.nid)
      setUser(data.user)
      notifySuccess('Account created')
      navigate('/patient')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid place-items-center min-h-[60vh]">
      <form onSubmit={onSubmit} className="w-full max-w-sm p-6 rounded-xl border border-white/10 glass space-y-3">
        <h2 className="text-xl font-semibold">Create account</h2>
        <Input label="National ID" value={form.nid} onChange={e=>setForm({ ...form, nid: e.target.value })} placeholder="Enter NID" />
        <Input label="Phone" value={form.phone} onChange={e=>setForm({ ...form, phone: e.target.value })} placeholder="07xx xxx xxx" />
        <Button full disabled={loading} variant="secondary">{loading ? 'Verifying…' : 'Create account'}</Button>
      </form>
    </div>
  )
}