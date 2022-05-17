var pg = require('pg')

const connectionString = "postgres://zifgygnxatkljx:2b1e9e2b1128b4273b23b4198c03a771c3df9de0d79217e46ef3aca7d51973a6@ec2-34-247-72-29.eu-west-1.compute.amazonaws.com:5432/df0b6ue4s4v4ib"
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