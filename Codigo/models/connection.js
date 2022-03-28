var pg = require('pg')

const connectionString = "postgres://postgres:1234@localhost:5432/artTatto"
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10
	/*,
    ssl: {
        require: true, 
        rejectUnauthorized: false
    }*/
})
 
module.exports = pool