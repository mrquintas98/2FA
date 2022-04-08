var pg = require('pg')

const connectionString = "postgres://postgres:1234@localhost:5432/2fa_M"
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10
	
})
 
module.exports = pool