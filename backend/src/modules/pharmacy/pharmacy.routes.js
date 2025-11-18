const { Router } = require('express')
const { pool } = require('../../database/data-source')

const router = Router()

router.get('/inventory', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inventory ORDER BY pharmacy, drug LIMIT 50')
    res.json(rows)
  } catch {
    res.json([])
  }
})

module.exports = router