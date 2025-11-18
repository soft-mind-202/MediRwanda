import { useState } from 'react'
import Input from '../../components/ui/input'
import Button from '../../components/ui/button'
import QRCodeGenerator from '../../components/features/prescription/QRCodeGenerator'
import Dialog from '../../components/ui/dialog'
import { notifySuccess, notifyError } from '../../components/shared/NotificationToast'

export default function CreatePrescription() {
  const [patientId, setPatientId] = useState('')
  const [doctorId, setDoctorId] = useState('1')
  const [payload, setPayload] = useState('')
  const [ref, setRef] = useState<string>('')
  const [open, setOpen] = useState(false)

  async function create() {
    try {
      const res = await fetch('http://localhost:4000/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient_id: Number(patientId), doctor_id: Number(doctorId), payload: JSON.parse(payload || '{}') })
      })
      const data = await res.json()
      if (!res.ok) throw new Error('error')
      setRef(data.ref)
      setOpen(true)
      notifySuccess('Prescription created')
    } catch {
      notifyError('Failed to create prescription')
    }
  }

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-2xl font-semibold">Create Prescription</h2>
      <Input label="Patient ID" value={patientId} onChange={e=>setPatientId(e.target.value)} placeholder="Numeric patient id" />
      <Input label="Doctor ID" value={doctorId} onChange={e=>setDoctorId(e.target.value)} placeholder="Numeric doctor id" />
      <div>
        <label className="block text-sm mb-1">Payload JSON</label>
        <textarea value={payload} onChange={e=>setPayload(e.target.value)} className="w-full min-h-40 rounded-md bg-white/5 border border-white/10 px-3 py-2" placeholder='{"drug":"Paracetamol","dose":"500mg"}' />
      </div>
      <Button onClick={create}>Create</Button>

      <Dialog open={open} title="Prescription QR" onClose={()=>setOpen(false)} actions={<Button onClick={()=>setOpen(false)} variant="outline">Close</Button>}>
        {ref && <div className="space-y-3">
          <div className="text-sm">Ref: {ref}</div>
          <QRCodeGenerator value={ref} />
        </div>}
      </Dialog>
    </div>
  )
}