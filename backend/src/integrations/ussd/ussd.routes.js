const { Router } = require('express')
const { pool } = require('../../database/data-source')

const router = Router()

router.post('/menu', async (req, res) => {
  const { text } = req.body || {}
  if (!text) return res.send('CON 1. Check Coverage\n2. Prescription Status')
  if (text === '1') return res.send('CON Enter National ID:')
  if (text.startsWith('1*')) {
    const nid = text.split('*')[1]
    try {
      const [rows] = await pool.query('SELECT plan, covered FROM insurance_coverages WHERE nid = ? LIMIT 1', [nid])
      const row = Array.isArray(rows) && rows.length ? rows[0] : null
      if (!row) return res.send('END No coverage found')
      return res.send(`END Coverage: ${row.plan}, ${row.covered}%`)
    } catch {
      return res.send('END Error')
    }
  }
  if (text === '2') return res.send('CON Enter Prescription Ref:')
  if (text.startsWith('2*')) {
    const ref = text.split('*')[1]
    try {
      const [rows] = await pool.query('SELECT status FROM prescriptions WHERE ref = ? LIMIT 1', [ref])
      const row = Array.isArray(rows) && rows.length ? rows[0] : null
      if (!row) return res.send('END Not found')
      return res.send(`END Prescription ${ref} ${row.status || 'issued'}`)
    } catch {
      return res.send('END Error')
    }
  }
  return res.send('END Thank you')
})

module.exports = router