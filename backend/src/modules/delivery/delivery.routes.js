const { Router } = require('express')
const { pool } = require('../../database/data-source')

const router = Router()

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM deliveries ORDER BY id DESC LIMIT 20')
    res.json(rows)
  } catch {
    res.json([])
  }
})

module.exports = router