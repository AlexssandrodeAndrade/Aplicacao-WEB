const { Pool } = require('pg')
const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: 'postgres123',
  database: 'aula55',
})

module.exports = pool
