const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "1nointrO1",
    host: "localhost",
    port: 5001,
    database: "hrrequest"
});


module.exports = pool;