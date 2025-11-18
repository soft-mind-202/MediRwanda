const { Router } = require('express')
const { pool } = require('../../database/data-source')

const router = Router()

router.get('/coverage', async (req, res) => {
  const nid = String(req.query.nid || '')
  if (!nid) return res.json(null)
  try {
    const [rows] = await pool.query('SELECT nid, plan, covered, copay, valid FROM insurance_coverages WHERE nid = ? LIMIT 1', [nid])
    const row = Array.isArray(rows) && rows.length ? rows[0] : null
    res.json(row)
  } catch {
    res.json(null)
  }
})

router.post('/preapprove', async (req, res) => {
  const { items, nid } = req.body || {}
  const claim_ref = 'CLM-'+Date.now()
  try {
    await pool.query('INSERT INTO insurance_claims (claim_ref, nid, items, approved, coveredAmount, copayAmount, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())', [claim_ref, nid || null, JSON.stringify(items || []), 1, 0, 0])
  } catch {}
  res.json({ claimId: claim_ref, approved: true, nid, items, coveredAmount: 0, copayAmount: 0 })
})

module.exports = router