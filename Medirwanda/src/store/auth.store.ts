let nidRef: string | null = null
let userRef: { id: number, nid: string, name: string, role: string } | null = null

export function setNid(nid: string) {
  nidRef = nid
  try { localStorage.setItem('nid', nid) } catch {}
}

export function getNid(): string | null {
  if (nidRef) return nidRef
  try { nidRef = localStorage.getItem('nid') } catch {}
  return nidRef
}

export function setUser(user: { id: number, nid: string, name: string, role: string }) {
  userRef = user
  try { localStorage.setItem('user', JSON.stringify(user)) } catch {}
}

export function getUser(): { id: number, nid: string, name: string, role: string } | null {
  if (userRef) return userRef
  try {
    const raw = localStorage.getItem('user')
    userRef = raw ? JSON.parse(raw) : null
  } catch {}
  return userRef
}

export function clearUser() {
  userRef = null
  nidRef = null
  try { localStorage.removeItem('user'); localStorage.removeItem('nid') } catch {}
}
