var pg = require('pg')

const connectionString = "postgres://johgdkgmzpdnxa:889df68dd11f2e23401d1ce9960088c8ea1a5812015210d0a06ee095e0a547ea@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d849fpnpdgm1fq"
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10
    ,
    ssl: {
        require: true, 
        rejectUnauthorized: false
    }
	
})
 
module.exports = pool