const { Router } = require('express')
const { pool } = require('../../database/data-source')

const router = Router()

router.get('/', async (req, res) => {
  const patientId = Number(req.query.patientId)
  if (!patientId) return res.json([])
  try {
    const [rows] = await pool.query('SELECT * FROM consultations WHERE patient_id = ? ORDER BY scheduled_at DESC LIMIT 10', [patientId])
    res.json(rows)
  } catch {
    res.json([])
  }
})

module.exports = router