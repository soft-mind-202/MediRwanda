const { Router } = require('express')
const { pool } = require('../../database/data-source')

const router = Router()

router.post('/login', async (req, res) => {
  const { nid, name } = req.body || {}
  if (!nid) return res.status(400).json({ error: 'nid_required' })
  try {
    const [rows] = await pool.query('SELECT id, nid, name FROM patients WHERE nid = ? LIMIT 1', [nid])
    let row = Array.isArray(rows) && rows.length ? rows[0] : null
    if (!row) {
      await pool.query('INSERT INTO patients (nid, name) VALUES (?, ?)', [nid, name || 'User'])
      const [created] = await pool.query('SELECT id, nid, name FROM patients WHERE nid = ? LIMIT 1', [nid])
      row = Array.isArray(created) && created.length ? created[0] : null
    }
    return res.json({ user: { id: row.id, nid: row.nid, name: row.name, role: 'patient' } })
  } catch {
    return res.status(500).json({ error: 'db_error' })
  }
})

router.get('/me', async (req, res) => {
  const nid = String(req.query.nid || '')
  if (!nid) return res.json(null)
  try {
    const [rows] = await pool.query('SELECT id, nid, name FROM patients WHERE nid = ? LIMIT 1', [nid])
    const row = Array.isArray(rows) && rows.length ? rows[0] : null
    return res.json(row ? { id: row.id, nid: row.nid, name: row.name, role: 'patient' } : null)
  } catch {
    return res.json(null)
  }
})

module.exports = router