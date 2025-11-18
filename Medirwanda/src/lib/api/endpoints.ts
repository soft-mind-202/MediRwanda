const BASE_URL = 'http://localhost:4000/api'

async function j<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}

export async function getConsultations(patientId: number) {
  const res = await fetch(`${BASE_URL}/consultations?patientId=${patientId}`)
  return j<any[]>(res)
}

export async function getInsuranceCoverage(nid: string) {
  const res = await fetch(`${BASE_URL}/insurance/coverage?nid=${encodeURIComponent(nid)}`)
  return j<{ nid: string, plan: string, covered: number, copay: number, valid: boolean }>(res)
}

export async function getPharmacyInventory() {
  const res = await fetch(`${BASE_URL}/pharmacy/inventory`)
  return j<any[]>(res)
}

export async function getDeliveries() {
  const res = await fetch(`${BASE_URL}/delivery`)
  return j<any[]>(res)
}

export async function loginPatient(nid: string, name?: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nid, name }),
  })
  return j<{ user: { id: number, nid: string, name: string, role: string } }>(res)
}

export async function getMe(nid: string) {
  const res = await fetch(`${BASE_URL}/auth/me?nid=${encodeURIComponent(nid)}`)
  return j<{ id: number, nid: string, name: string, role: string } | null>(res)
}