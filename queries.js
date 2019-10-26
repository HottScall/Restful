const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'local host',
  database: 'api',
  password: 'password',
  port: 5432; 
})
