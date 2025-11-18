import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/ui/input'
import Button from '../../components/ui/button'
import { notifySuccess } from '../../components/shared/NotificationToast'
import { setNid } from '../../store/auth.store'
import { loginPatient } from '../../lib/api/endpoints'
import { setUser } from '../../store/auth.store'

export default function Login() {
  const navigate = useNavigate()
  const [nid, setNid] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await loginPatient(nid)
      setNid(nid)
      setUser(data.user)
      notifySuccess('Logged in')
      navigate('/patient')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid place-items-center min-h-[60vh]">
      <form onSubmit={onSubmit} className="w-full max-w-sm p-6 rounded-xl border border-white/10 glass space-y-3">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <Input label="National ID" value={nid} onChange={e=>setNid(e.target.value)} placeholder="Enter NID" />
        <Button full disabled={loading}>{loading ? 'Verifying…' : 'Continue'}</Button>
        <p className="text-xs mt-3">No account? <Link to="/register" className="underline">Register</Link></p>
      </form>
    </div>
  )
}