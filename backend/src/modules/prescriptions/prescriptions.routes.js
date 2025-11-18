const { Router } = require('express')
const { pool } = require('../../database/data-source')

const router = Router()

router.post('/', async (req, res) => {
  const { patient_id, doctor_id, payload } = req.body || {}
  const ref = 'RX-'+Date.now()
  try {
    await pool.query('INSERT INTO prescriptions (patient_id, doctor_id, ref, status, payload, created_at) VALUES (?, ?, ?, ?, ?, NOW())', [patient_id, doctor_id, ref, 'issued', JSON.stringify(payload || {})])
    res.json({ ref })
  } catch {
    res.status(500).json({ error: 'db_error' })
  }
})

module.exports = router