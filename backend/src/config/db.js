require("dotenv/config");
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT) || 5432,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool
  .query("SELECT 1")
  .then(() => console.log("PosgreSQL connected"))
  .catch((err) => {
    console.error(`PosgreSQL connection failed ${err}`);
    process.exit(1);
  });

module.exports = pool;
