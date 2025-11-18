const mysql = require('mysql2/promise')
const { dbConfig } = require('../config/database.config')

const pool = mysql.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  connectionLimit: 10,
})

async function initSchema() {
  await pool.query(`CREATE TABLE IF NOT EXISTS patients (id INT AUTO_INCREMENT PRIMARY KEY, nid VARCHAR(30) UNIQUE, name VARCHAR(120));`)
  await pool.query(`CREATE TABLE IF NOT EXISTS doctors (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120));`)
  await pool.query(`CREATE TABLE IF NOT EXISTS consultations (id INT AUTO_INCREMENT PRIMARY KEY, patient_id INT, doctor_id INT, scheduled_at DATETIME, status VARCHAR(30));`)
  await pool.query(`CREATE TABLE IF NOT EXISTS prescriptions (id INT AUTO_INCREMENT PRIMARY KEY, patient_id INT, doctor_id INT, ref VARCHAR(60) UNIQUE, status VARCHAR(30), payload JSON, created_at DATETIME);`)
  await pool.query(`CREATE TABLE IF NOT EXISTS inventory (id INT AUTO_INCREMENT PRIMARY KEY, pharmacy VARCHAR(120), drug VARCHAR(120), price DECIMAL(10,2), stock INT);`)
  await pool.query(`CREATE TABLE IF NOT EXISTS deliveries (id INT AUTO_INCREMENT PRIMARY KEY, order_ref VARCHAR(60), status VARCHAR(30), eta_minutes INT);`)
  await pool.query(`CREATE TABLE IF NOT EXISTS insurance_coverages (id INT AUTO_INCREMENT PRIMARY KEY, nid VARCHAR(30) UNIQUE, plan VARCHAR(60), covered INT, copay INT, valid TINYINT(1));`)
  await pool.query(`CREATE TABLE IF NOT EXISTS insurance_claims (id INT AUTO_INCREMENT PRIMARY KEY, claim_ref VARCHAR(60) UNIQUE, nid VARCHAR(30), items JSON, approved TINYINT(1), coveredAmount DECIMAL(10,2), copayAmount DECIMAL(10,2), created_at DATETIME);`)
  try { await pool.query(`ALTER TABLE prescriptions ADD COLUMN status VARCHAR(30)`) } catch {}
  try { await pool.query(`ALTER TABLE prescriptions ADD COLUMN ref VARCHAR(60) UNIQUE`) } catch {}
}

module.exports = { pool, initSchema }